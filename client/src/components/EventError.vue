<template>
  <div class="flex items-start mb-4 text-sm">
    <div class="flex-1 overflow-hidden">
      <div>
        <span class="text-black font-bold">{{ error.title }}</span>
      </div>
      <p class="text-black leading-normal whitespace-pre-line">{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventError',
  props: {
    error: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>