<template>
  <div class="flex flex-col min-h-screen bg-white overflow-hidden">
    <!-- Top bar -->
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <!-- Chat messages -->
    <ChatWindowMessages />
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
  // mounted () {
  //   this.login()
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>