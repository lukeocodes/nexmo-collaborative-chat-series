<template>
  <div>
    <ChatWindow v-if="!!app && !!conversation" :app="app" :conversation="conversation" />
    <template v-else>
      <Loading v-if="!error" message="Logging you in..." />
      <Error v-else :error="error" />
    </template>
  </div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import UserService from '@/services/User'
import NexmoClient from 'nexmo-client'

export default {
  name: 'Nexmo',
  props: {
    server: Object
  },
  components: {
    ChatWindow,
    Error,
    Loading
  },
  data () {
    return {
      app: null,
      conversation: null,
      error: null
    }
  },
  mounted () {
    this.fetchSession()
  },
  methods: {
    fetchSession () {
      UserService.fetchSession()
        .then((response) => {
          const { token } = response.data

          new NexmoClient()
            .login(token)
            .then(app => {
              this.app = app

              return app.getConversation(this.$props.server.defaultConversationId)
            })
            .then((conversation) => {
              this.conversation = conversation
            })
            .catch((err) => {
              this.error = { title: 'Chat Service Error', message: err.message }
            })
        })
        .catch((err) => {
          this.error = { title: 'Chat Service Error', message: err.reason }
        })
    }
  }
}
</script>
