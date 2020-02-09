<template>
  <div class="flex flex-col min-h-screen max-h-screen bg-white overflow-hidden">
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <ChatWindowEvents :events="events" :user="user" :members="members" />
    <ChatWindowFooter :conversation="conversation" />
  </div>
</template>

<script>
import ChatWindowHeader from '@/components/ChatWindowHeader.vue'
import ChatWindowEvents from '@/components/ChatWindowEvents.vue'
import ChatWindowFooter from '@/components/ChatWindowFooter.vue'

export default {
  name: 'ChatWindow',
  props: {
    app: Object,
    conversation: Object
  },
  components: {
    ChatWindowHeader,
    ChatWindowEvents,
    ChatWindowFooter
  },
  data () {
    return {
      user: {},
      events: [],
      members: new Map(),
    }
  },
  beforeMount () {
    this.user = this.$props.app.me
    this.getEventHistory()
    this.registerListeners()
    this.getMembers()
  },
  methods: {
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
        .catch((err) => {
          console.error(err) // eslint-disable-line no-console
          // this.$parent.error = { title: 'Chat Service Error', message: err.reason } // todo: determine if this is good practice to pass the error up the component tree
        })
    },
    getMembers () {
      this.members = this.$props.conversation.members
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>