<template>
  <div class="px-6 py-4 flex-auto overflow-y-auto" ref="chatWindow" v-on:scroll="onScroll">
    <template v-if="!!events.length">
      <Event v-for="event in events" v-bind:key="event.id" :event="event" :user="user" :members="members" />
    </template>
  </div>
</template>

<script>
import Event from '@/components/Event.vue'

export default {
  name: 'ChatWindowEvents',
  components: {
    Event
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
      chatPosition: 0,
    }
  },
  mounted () {
    this.getEventHistory()
    this.registerListeners()
  },
  beforeUpdate() {
    this.storeWasBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  watch: {
    inputRows () {
      this.storeWasBottom()
      this.scrollToBottom()
    },
    inputMessage () {
      this.scrollToBottom(true)
    }
  },
  methods: {
    storeWasBottom () {
      this.wasBottom = this.viewBottom() === this.chatBottom()
    },
    scrollToBottom (force) {
      if (this.wasBottom || !!force) {
        this.scrollTo(this.chatBottom())
      }
    },
    onScroll() {
      this.storeWasBottom()
    },
    viewBottom () {
      return this.$refs.chatWindow.offsetHeight+this.$refs.chatWindow.scrollTop
    },
    chatBottom () {
      return this.$refs.chatWindow.scrollHeight
    },
    scrollTo(position) {
      this.$refs.chatWindow.scrollTop = position
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
        .then((eventsPage) => {
          eventsPage.items.forEach(event => {
            this.events.unshift(event)
          })
        })
        .catch(err => {
          console.error(err) // eslint-disable-line no-console
          // this.$parent.error = { title: 'Chat Service Error', message: err.reason } // todo: determine if this is good practice to pass the error up the component tree
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