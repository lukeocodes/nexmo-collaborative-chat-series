<template>
  <div class="flex items-start mb-4 text-sm">
    <!-- <img :src="message.image" class="w-10 h-10 rounded mr-3"> -->
    <div class="flex-1 overflow-hidden">
      <div>
        <span class="font-bold">{{ members.get(event.from).display_name }}</span>
        <span class="text-gray-500 text-xs pl-2">{{ event.timestamp | messageDate }}</span>
      </div>
      <p class="text-black leading-normal whitespace-pre-line">{{ event.body.text }}</p>
      <!-- <div v-if="message.code" class="bg-grey-lighter border border-grey-light text-grey-darkest text-sm font-mono rounded p-3 mt-2 whitespace-pre overflow-scroll">{{message.code}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventMessage',
  props: {
    event: Object,
    user: Object,
    members: Map
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>