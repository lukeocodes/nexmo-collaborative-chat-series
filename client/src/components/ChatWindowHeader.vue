<template>
  <div class="border-b flex px-6 py-2 items-center">
    <div class="flex flex-col">
      <h3 class="text-grey-darkest mb-1 font-extrabold">{{channel}}</h3>
      <div class="text-grey-dark text-sm truncate">
        {{description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindowHeader',
  props: {
    channel: String,
    description: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
