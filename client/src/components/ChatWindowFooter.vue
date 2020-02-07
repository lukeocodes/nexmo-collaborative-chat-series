<template>
  <div class="pb-6 px-4">
    <input type="text" class="w-full rounded-lg border-2 border-grey overflow-hidden py-2 px-4" :placeholder="'Message #' + conversation.display_name" />
  </div>
</template>

<script>
export default {
  name: 'ChatWindowFooter',
  props: {
    conversation: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>