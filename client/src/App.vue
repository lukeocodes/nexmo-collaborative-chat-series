<template>
  <div id="app">
    <template v-if="!!userSession.user">
      <ChatWindow channel="#general" :userSession="userSession" />
    </template>
    <template v-else>
      <div class="flex h-screen">
        <div class="m-auto text-center">
          <span class="text-grey">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M4.06 13a8 8 0 0 0 5.18 6.51A18.5 18.5 0 0 1 8.02 13H4.06zm0-2h3.96a18.5 18.5 0 0 1 1.22-6.51A8 8 0 0 0 4.06 11zm15.88 0a8 8 0 0 0-5.18-6.51A18.5 18.5 0 0 1 15.98 11h3.96zm0 2h-3.96a18.5 18.5 0 0 1-1.22 6.51A8 8 0 0 0 19.94 13zm-9.92 0c.16 3.95 1.23 7 1.98 7s1.82-3.05 1.98-7h-3.96zm0-2h3.96c-.16-3.95-1.23-7-1.98-7s-1.82 3.05-1.98 7zM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg>
          </span>
          <p class="text-2xl">
            Couldn't connect to Nexmo.
          </p>
          <p class="text-base">
            There may be a connection problem. Keep trying, it might work!
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue'
import UserService from '@/services/User'

export default {
  name: 'App',
  components: {
    ChatWindow
  },
  data () {
    return {
      userSession: {},
    }
  },
  mounted () {
    this.getUserSession()
  },
  methods: {
    async getUserSession () {
      const response = await UserService.fetchSession()
      console.log(response.data)
      this.userSession = response.data
    }
  }
}
</script>

<style>
</style>
