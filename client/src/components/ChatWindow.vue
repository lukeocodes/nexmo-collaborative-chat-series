<template>
  <div class="flex flex-col min-h-screen bg-white overflow-hidden">
    <!-- Top bar -->
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <!-- Chat messages -->
    <ChatWindowMessages :events="events" :user="user" />
    <ChatWindowFooter :conversation="conversation" />
  </div>
</template>

<script>
import ChatWindowHeader from '@/components/ChatWindowHeader.vue'
import ChatWindowFooter from '@/components/ChatWindowFooter.vue'
import ChatWindowMessages from '@/components/ChatWindowMessages.vue'

export default {
  name: 'ChatWindow',
  props: {
    app: Object,
    conversation: Object
  },
  components: {
    ChatWindowHeader,
    ChatWindowFooter,
    ChatWindowMessages
  },
  data () {
    return {
      user: {},
      lastEventPage: {},
      events: [],
    }
  },
  mounted () {
    this.user = this.$props.app.me
    this.getEventHistory()
  },
  methods: {
    getEventHistory () {
      this.$props.conversation
        .getEvents({ page_size: 20, order: 'desc' })
        .then((eventsPage) => {
          this.lastEventPage = eventsPage;

          eventsPage.items.forEach(event => {
            this.events.push(event);
          });

          console.log(this.events) // eslint-disable-line no-console
        })
        .catch((err) => {
          console.error(err) // eslint-disable-line no-console
          // this.$parent.error = { title: 'Chat Service Error', message: err.reason }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>