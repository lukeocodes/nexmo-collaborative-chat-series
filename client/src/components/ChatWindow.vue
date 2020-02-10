<template>
  <div class="flex flex-col min-h-screen max-h-screen bg-white overflow-hidden">
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <ChatWindowEvents :conversation="conversation" :user="user" :members="members" />
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
      members: new Map(),
    }
  },
  mounted () {
    this.user = this.$props.app.me
    this.getMembers()
  },
  methods: {
    getMembers () {
      this.members = this.$props.conversation.members
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>