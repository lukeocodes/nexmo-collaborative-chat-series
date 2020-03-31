<template>
  <div class="flex flex-col min-h-screen max-h-screen bg-white overflow-hidden">
    <ChatWindowHeader :channelName="'#' + conversation.display_name" :members="members.size"/>
    <ChatWindowEvents :conversation="conversation" :user="user" :members="members" :inputRows="inputRows" :inputMessage="inputMessage" />
    <ChatWindowFooter :conversation="conversation" v-on:resizeInput="resizeInput($event)" v-on:sendText="textSent($event)" />
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
      members: new Map(),
      inputRows: 1,
      inputMessage: null
    }
  },
  mounted () {
    this.user = this.$props.app.me
    this.fetchMembers()
  },
  methods: {
    textSent (inputMessage) {
      this.inputMessage = inputMessage
    },
    resizeInput (inputRows) {
      this.inputRows = inputRows
    },
    fetchMembers () {
      this.members = this.$props.conversation.members
    }
  }
}
</script>