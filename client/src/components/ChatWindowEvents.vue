<template>
  <div class="px-6 py-4 flex-grow overflow-y-scroll">
    <Event v-for="event in events" v-bind:key="event.id" :event="event" :user="user" />
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
    events: Array,
    user: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>