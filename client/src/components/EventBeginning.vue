<template>
  <header>
    <h1 class="text-3xl mt-2 mb-3">#{{ conversation.display_name }}</h1>
    <p class="text-l mb-8">This is the very beginning of the {{ conversation.display_name }} channel.</p>
    <hr class="border-b mb-8"/>
  </header>
</template>

<script>
export default {
  name: 'EventBeginning',
  props: {
    conversation: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>