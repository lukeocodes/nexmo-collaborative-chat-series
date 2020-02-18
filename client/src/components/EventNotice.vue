<template>
  <div class="fixed top-0 left-0 right-0 flex mx-6 mt-20 text-xs text-center text-white">
    <div class="flex w-full font-bold bg-blue-600 rounded-l-lg cursor-pointer hover:bg-blue-700" v-on:click="$parent.scrollToBottom(true)">
      <div class="w-32 py-1">￬ Jump</div>
      <div class="w-full py-1">{{ unreadMessages }} new {{ message }} since {{ lastEvent.timestamp | messageDate }} </div>
    </div>
    <div class="w-32 py-1 bg-blue-600 border-l border-blue-700 rounded-r-lg cursor-pointer hover:bg-blue-700" v-on:click="markAsRead">
      Mark as read <span class="font-bold">x</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventNotice',
  props: {
    lastEvent: Object,
    unreadMessages: Number,
    lastUnreadEvent: Object
  },
  methods: {
    markAsRead () {
      this.$parent.setLastEvent(this.lastUnreadEvent)
      this.$parent.markAllRead()
    }
  },
  computed: {
    message () {
      return this.unreadMessages > 1 ? 'messages' : 'message'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>