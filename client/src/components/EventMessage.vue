<template>
  <div class="flex mb-3 text-sm">
    <!-- <img :src="message.image" class="w-10 h-10 mr-3 rounded"> -->
    <div class="flex-1 relative" v-on:mouseover="showMenu = true" v-on:mouseleave="showMenu = false; openExtraMenu = false">
      <div class="float-right -mt-1" v-bind:class="{ block: showMenu, hidden: !showMenu }">
        <div class="cursor-pointer relative px-2 py-1 border border-gray-300 rounded hover:bg-gray-400" v-on:click="openExtraMenu = !openExtraMenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path class="heroicon-ui" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg>
        </div>
        <div class="absolute top-0 right-0 -mt-1 mr-10" v-bind:class="{ block: openExtraMenu, hidden: !openExtraMenu }">
          <div class="border rounded bg-white py-2">
            <div v-on:click="openExtraMenu = false; deleteEvent()" class="block w-48 py-1 px-4 text-red-700 hover:bg-red-700 hover:text-white cursor-pointer">Delete message</div>
          </div>
        </div>
      </div>
      <div class="mb-1">
        <span class="font-bold">{{ members.get(event.from).display_name }}</span>
        <span class="pl-2 text-xs text-gray-500">{{ event.timestamp | messageDate }}</span>
      </div>
      <div v-if="!!event.body.text" class="leading-normal text-black whitespace-pre-wrap text-event" v-html="this.$options.filters.markdown(event.body.text)"></div>
      <div v-else class="leading-normal text-gray-500 whitespace-pre-wrap text-event"><em>message removed</em></div>
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
      openExtraMenu: false
    }
  },
  methods: {
    deleteEvent () {
      this.$parent.$parent.deleteEvent(this.event)
    },
  }
}
</script>


<style scoped>
.context-menu {
  width: 300px;
  height: 300px;
  opacity: 0;
  background: white;
  border-radius: 5%;
  border-color: #d3d3d3;
  border-width: thin;
}
.button:hover + .context-menu {
  opacity: 1;
}  
</style>