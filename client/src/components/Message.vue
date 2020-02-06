<template>
  <div class="flex items-start mb-4 text-sm">
      <img :src="message.image" class="w-10 h-10 rounded mr-3">
      <div class="flex-1 overflow-hidden">
          <div>
              <span class="font-bold">{{message.name}}</span>
              <span class="text-grey text-xs">{{message.timestamp}}</span>
          </div>
          <p class="text-black leading-normal">{{message.text}}</p>
          <div v-if="message.code" class="bg-grey-lighter border border-grey-light text-grey-darkest text-sm font-mono rounded p-3 mt-2 whitespace-pre overflow-scroll">{{message.code}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
