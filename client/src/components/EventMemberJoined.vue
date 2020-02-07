<template>
  <p class="mb-4 text-sm">
    {{ event.body.user.display_name }} has joined #{{ event.conversation.display_name }}.
  </p>
</template>

<script>
export default {
  name: 'EventMemberJoined',
  props: {
    event: Object,
    user: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>