<template>
  <div class="px-6 py-4 flex-auto overflow-y-auto" ref="chatWindow" >
    <Event v-for="event in events" v-bind:key="event.id" :event="event" :user="user" :members="members" />
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
    user: Object,
    events: Array,
    members: Map
  },
  mounted() {
    console.log('parent')  // eslint-disable-line no-console
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>