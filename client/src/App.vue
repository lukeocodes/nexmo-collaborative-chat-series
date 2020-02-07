<template>
  <div id="app">
    <Nexmo v-if="!!server.status && server.status === 'ok'" :server="server" />
    <Error v-else :error="{ title: 'Couldn\'t connect to server.', message: 'There may be a server connection problem. Keep trying, it might work!' }" />
  </div>
</template>

<script>
import Nexmo from '@/components/Nexmo.vue'
import Error from '@/components/Error.vue'
import ServerService from '@/services/Server'

export default {
  name: 'App',
  components: {
    Nexmo,
    Error
  },
  data () {
    return {
      server: {}
    }
  },
  mounted () {
    this.getServerStatus()
  },
  methods: {
    async getServerStatus () {
      const response = await ServerService.fetchStatus()
      this.server = response.data
    }
  }
}
</script>

<style>
</style>
