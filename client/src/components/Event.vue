<template>
  <div class="px-6 hover:bg-gray-100">
    <EventMessage v-if="event.type === 'text'" :event="event" :user="user" :members="members" />
    <EventMemberJoined v-else-if="event.type === 'member:joined'" :event="event" :user="user" />
  </div>
</template>

<script>
import EventMemberJoined from '@/components/EventMemberJoined.vue'
import EventMessage from '@/components/EventMessage.vue'

export default {
  name: 'Event',
  components: {
    EventMemberJoined,
    EventMessage
  },
  props: {
    event: Object,
    user: Object,
    members: Map
  },
}
</script>