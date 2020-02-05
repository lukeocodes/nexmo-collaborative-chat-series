<template>
  <div id="app">
    <ChatWindow channel="#general" :userSession="userSession" />
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
      console.log(response)
      this.userSession = response.data
    }
  }
}
</script>

<style>
</style>
