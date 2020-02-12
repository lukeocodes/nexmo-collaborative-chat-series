<template>
  <div class="px-6 py-4 flex-auto overflow-y-auto" ref="chatWindow" v-on:scroll="onScroll">
    <template v-if="!!this.lastEventsPage && this.lastEventsPage.hasNext()">
      <EventDummy v-for="(n, index) in 10" v-bind:key="'dummy' + index" />
    </template>
    <template v-if="!!this.lastEventsPage && !this.lastEventsPage.hasNext()">
      <EventBeginning :conversation="conversation" />
    </template>
    <EventError v-if="!!error" :error="error" />
    <template v-if="!!events.length">
      <Event v-for="event in events" v-bind:key="'message' + event.id" :event="event" :user="user" :members="members" />
    </template>
    <Loading v-else message="Loading messages..." />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Event from '@/components/Event.vue'
import EventBeginning from '@/components/EventBeginning.vue'
import EventDummy from '@/components/EventDummy.vue'
import EventError from '@/components/EventError.vue'

export default {
  name: 'ChatWindowEvents',
  components: {
    Loading,
    Event,
    EventBeginning,
    EventDummy,
    EventError
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
      lastEventsPage: null,
      error: null
    }
  },
  mounted () {
    this.getEventHistory()
    this.registerListeners()
  },
  beforeUpdate () {
    this.storeWhenBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  watch: {
    inputRows () {
      this.storeWhenBottom()
      this.scrollToBottom()
    },
    inputMessage () {
      this.scrollToBottom(true)
    }
  },
  methods: {
    onScroll() {
      this.storeWhenTop()
      this.storeWhenBottom()

      if (this.wasTop && !this.loadingMore) {
        this.loadingMore = true

        if (!!this.lastEventsPage && this.lastEventsPage.hasNext()) {
          const scrollHeightBefore = this.chatBottom()

          this.lastEventsPage
            .getNext()
            .then(eventsPage => {
              this.lastEventsPage = eventsPage

              eventsPage.items.forEach(event => {
                this.events.unshift(event)
              })
            })
            .catch(err => {
              this.error = { title: 'Chat Service Error', message: err.message }
            })
            .finally(() => {
              const scrollHeightDiff = this.chatBottom()-scrollHeightBefore // eslint-disable-line no-console
              this.scrollTo(this.viewTop()+scrollHeightDiff)
              this.loadingMore = false
            })
        }
      }
    },
    storeWhenTop () {
      this.wasTop = this.viewTop() < this.chatTop()
    },
    storeWhenBottom () {
      this.wasBottom = this.viewBottom() === this.chatBottom()
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
    scrollTo(position) {
      this.$refs.chatWindow.scrollTop = position
    },
    scrollToBottom (force) {
      if (this.wasBottom || !!force) {
        this.scrollTo(this.chatBottom())
      }
    },
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        this.events.push(event)
      })

      conversation.on("member:joined", (user, event) => {
        this.events.push(event)
      })
    },
    getEventHistory () {
      this.$props.conversation
        .getEvents({ page_size: 20, order: 'desc' })
        .then(eventsPage => {
          this.lastEventsPage = eventsPage

          eventsPage.items.forEach(event => {
            this.events.unshift(event)
          })
        })
        .catch(err => {
          this.error = { title: 'Chat Service Error', message: err.message }
        })
        .finally(() => {
          this.scrollTo(this.chatBottom())
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>