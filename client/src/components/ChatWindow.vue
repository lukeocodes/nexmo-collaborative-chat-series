<template>
  <div class="flex flex-col min-h-screen bg-white overflow-hidden">
    <!-- Top bar -->
    <ChatWindowHeader :channel="channel" description="Chit-chattin' about ugly HTML and mixing of concerns."/>
    <!-- Chat messages -->
    <ChatWindowMessages />
    <ChatWindowFooter :channel="channel" />
  </div>
</template>

<script>
import ChatWindowHeader from '@/components/ChatWindowHeader.vue'
import ChatWindowFooter from '@/components/ChatWindowFooter.vue'
import ChatWindowMessages from '@/components/ChatWindowMessages.vue'

export default {
  name: 'ChatWindow',
  props: {
    channel: String,
    user: Object
  },
  components: {
    ChatWindowHeader,
    ChatWindowFooter,
    ChatWindowMessages
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
