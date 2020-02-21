<template>
  <div class="px-6 py-4 flex-auto overflow-y-auto" ref="chatWindow" v-on:scroll="onScroll">
    <template v-if="!!lastEventsPage && lastEventsPage.hasNext()">
      <EventDummy v-for="(n, index) in 10" v-bind:key="'dummy' + index" />
    </template>
    <template v-if="!!lastEventsPage && !lastEventsPage.hasNext()">
      <EventBeginning :conversation="conversation" />
    </template>
    <EventError v-if="!!error" :error="error" />
    <template v-if="!!events.length">
      <Event v-for="event in events" v-bind:key="'event' + event.id" :event="event" :user="user" :members="members" />
    </template>
    <Loading v-else message="Loading messages..." />
    <EventNotice :lastEvent="lastEvent" :unreadMessages="unreadMessages" :lastUnreadEvent="events[events.length - 1]" v-if="unreadMessages > 0 && !!lastEvent"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Event from '@/components/Event.vue'
import EventBeginning from '@/components/EventBeginning.vue'
import EventDummy from '@/components/EventDummy.vue'
import EventError from '@/components/EventError.vue'
import EventNotice from '@/components/EventNotice.vue'

export default {
  name: 'ChatWindowEvents',
  components: {
    Loading,
    Event,
    EventBeginning,
    EventDummy,
    EventError,
    EventNotice
  },
  props: {
    user: Object,
    conversation: Object,
    members: Map,
    inputRows: Number,
    inputMessage: String
  },
  data () {
    return {
      events: [],
      wasTop: false,
      wasBottom: false,
      loadingMore: false,
      lastEvent: null,
      lastEventsPage: null,
      error: null,
      unreadMessages: 0
    }
  },
  mounted () {
    this.getEventHistory()
    this.registerListeners()
  },
  beforeUpdate () {
    this.setWasBottom()
  },
  updated () {
    if (this.wasBottom) {
      this.scrollToBottom()
    }
  },
  watch: {
    inputRows () {
      if (this.wasBottom) {
        this.scrollToBottom()
      }
    },
    inputMessage () {
      this.scrollToBottom()
    }
  },
  methods: {
    onScroll() {
      this.setWasBottom()
      this.setWasStop()

      if (this.isTop()) this.atTop()
      if (this.isBottom()) this.atBottom()
    },
    atTop() {
      this.setWasStop()
      this.getNextEventsPage()
    },
    atBottom () {
      this.setWasBottom()
      this.markAllRead()
    },
    setWasStop () {
      this.wasTop = this.isTop()
    },
    setWasBottom () {
      this.wasBottom = this.isBottom()
    },
    isTop () {
      return this.viewTop() < this.chatTop()
    },
    isBottom () {
      return this.viewBottom() === this.chatBottom()
    },
    viewTop () {
      return this.$refs.chatWindow.scrollTop
    },
    viewBottom () {
      return this.$refs.chatWindow.offsetHeight+this.$refs.chatWindow.scrollTop
    },
    chatTop () {
      return 700
    },
    chatBottom () {
      return this.$refs.chatWindow.scrollHeight
    },
    markAllRead () {
      this.unreadMessages = 0
    },
    addUnreadMessage () {
      this.unreadMessages++
    },
    scrollTo (position) {
      this.$refs.chatWindow.scrollTop = position
    },
    scrollToBottom () {
      this.scrollTo(this.chatBottom())
    },
    setLastEvent (event) {
      this.lastEvent = event
    }, 
    getLastEvent () {
      return this.lastEvent
    },
    setLastEventsPage (eventsPage) {
      this.lastEventsPage = eventsPage
    },
    getLastEventsPage () {
      return this.lastEventsPage
    },
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        if (this.isBottom()) {
          this.setLastEvent(event)
        }

        this.events.push(event)

        if (event !== this.getLastEvent()) {
          this.addUnreadMessage()
        }
      })

      conversation.on("member:joined", (user, event) => {
        this.events.push(event)
      })
    },
    deleteEvent (event) {
      delete(this.events[Object.keys(this.events).find(key => this.events[key] === event)])
      this.conversation.deleteEvent(event)
    },
    setLoadingMore (loadingMore) {
      this.loadingMore = loadingMore
    },
    getLoadingMore () {
      return this.loadingMore
    },
    getNextEventsPage () {
      if (!this.getLoadingMore()) {
        this.setLoadingMore(true)

        if (!!this.getLastEventsPage() && this.getLastEventsPage().hasNext()) {
          const scrollHeightBefore = this.chatBottom()

          this.getLastEventsPage().getNext()
            .then(eventsPage => {
              this.setLastEventsPage(eventsPage)

              eventsPage.items.forEach(event => {
                this.events.unshift(event)
              })
            })
            .catch(err => {
              this.error = { title: 'Chat Service Error', message: err.message }
            })
            .finally(() => {
              this.scrollTo(this.viewTop()+(this.chatBottom()-scrollHeightBefore))
              this.setLoadingMore(false)
            })
        }
      }
    },
    getEventHistory () {
      this.$props.conversation
        .getEvents({ page_size: 40, order: 'desc' })
        .then(eventsPage => {
          this.setLastEventsPage(eventsPage)

          eventsPage.items.forEach(event => {
            if (!this.getLastEvent()) {
              this.setLastEvent(event)
            }

            this.events.unshift(event)
          })
        })
        .catch(err => {
          this.error = { title: 'Chat Service Error', message: err.message }
        })
        .finally(() => {
          this.setWasBottom()
          this.scrollToBottom()
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>