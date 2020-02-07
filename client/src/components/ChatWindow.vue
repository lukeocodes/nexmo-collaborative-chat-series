<template>
  <div class="flex flex-col min-h-screen bg-white overflow-hidden">
    <!-- Top bar -->
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <!-- Chat messages -->
    <ChatWindowEvents :events="events" :user="user" />
    <ChatWindowFooter :conversation="conversation" />
  </div>
</template>

<script>
import ChatWindowHeader from '@/components/ChatWindowHeader.vue'
import ChatWindowFooter from '@/components/ChatWindowFooter.vue'
import ChatWindowEvents from '@/components/ChatWindowEvents.vue'

export default {
  name: 'ChatWindow',
  props: {
    app: Object,
    conversation: Object
  },
  components: {
    ChatWindowHeader,
    ChatWindowFooter,
    ChatWindowEvents
  },
  data () {
    return {
      user: {},
      events: [],
    }
  },
  mounted () {
    this.user = this.$props.app.me
    this.registerListeners()
    this.getEventHistory()
  },
  methods: {
    getEventHistory () {
      this.$props.conversation
        .getEvents({ page_size: 20, order: 'asc' })
        .then((eventsPage) => {
          eventsPage.items.forEach(event => {
            console.log(event) // eslint-disable-line no-console
            this.events.push(event)
          })
        })
        .catch((err) => {
          console.error(err) // eslint-disable-line no-console
          // this.$parent.error = { title: 'Chat Service Error', message: err.reason } // todo: determine if this is good practice to pass the error up the component tree
        })
    },
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        this.events.push(event)
      })

      conversation.on("member:joined", (user, event) => {
        this.events.push(event)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>