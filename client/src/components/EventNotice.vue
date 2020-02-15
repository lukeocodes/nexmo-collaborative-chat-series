<template>
  <div class="fixed top-0 left-0 right-0 mt-20 text-white text-xs flex mx-6 text-center">
    <div class="w-full flex font-bold bg-blue-600 hover:bg-blue-700 rounded-l-lg  cursor-pointer" v-on:click="$parent.scrollToBottom(true)">
      <div class="w-32 py-1">￬ Jump</div>
      <div class="w-full py-1">{{ unseenEvents }} new {{ message }} since {{ latestEvent.timestamp | messageDate }} </div>
    </div>
    <div class="w-32 bg-blue-600 hover:bg-blue-700 border-l border-blue-700 py-1 rounded-r-lg cursor-pointer" v-on:click="markAsRead">
      Mark as read <span class="font-bold">x</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventNotice',
  props: {
    latestEvent: Object,
    unseenEvents: Number,
    lastEvent: Object
  },
  methods: {
    markAsRead () {
      this.$parent.latestEvent = this.lastEvent
      this.$parent.unseenEvents = 0
    }
  },
  computed: {
    message () {
      return this.unseenEvents > 1 ? 'messages' : 'message'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>