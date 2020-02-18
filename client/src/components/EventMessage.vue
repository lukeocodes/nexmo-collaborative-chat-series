<template>
  <div class="flex items-start mb-2 text-sm">
    <!-- <img :src="message.image" class="w-10 h-10 mr-3 rounded"> -->
    <div class="flex-1" v-on:mouseover="showMenu = true" v-on:mouseleave="showMenu = false">
      <div class="float-right" v-bind:class="{ block: showMenu, hidden: !showMenu }">
<div class="inline-flex">
  <button class="px-2 py-1 text-xs font-bold border border-gray-300 rounded-l hover:bg-gray-400">
    ⁝
  </button>
</div>
      </div>
      <div>
        <span class="font-bold">{{ members.get(event.from).display_name }}</span>
        <span class="pl-2 text-xs text-gray-500">{{ event.timestamp | messageDate }}</span>
      </div>
      <div class="leading-normal text-black whitespace-pre-wrap text-event" v-html="this.$options.filters.markdown(event.body.text)"></div>
      <!-- <div v-if="message.code" class="p-3 mt-2 overflow-scroll font-mono text-sm whitespace-pre border rounded bg-grey-lighter border-grey-light text-grey-darkest">{{message.code}}</div> -->
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
  },
  data () {
    return {
      showMenu: false,
    }
  }
}
</script>