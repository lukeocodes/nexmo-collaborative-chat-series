<template>
  <ChatWindow channel="#general" :userSession="userSession" />
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue'
import UserService from '@/services/User'

export default {
  name: 'Nexmo',
  components: {
    ChatWindow
  },
  data () {
    return {
      userSession: {}
    }
  },
  mounted () {
    this.getUserSession()
  },
  methods: {
    async getUserSession () {
      const response = await UserService.fetchSession()
      // console.log(response.data)
      this.userSession = response.data
    }
  }
}
</script>
