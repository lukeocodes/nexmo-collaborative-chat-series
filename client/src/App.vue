<template>
  <div id="app">
    <Nexmo v-if="!!server.status && server.status === 'ok'" :server="server" />
    <template v-else>
      <Loading v-if="!error" message="Connecting..." />
      <Error v-else :error="error" />
      </template>
  </div>
</template>

<script>
import Nexmo from '@/components/Nexmo.vue'
import Error from '@/components/Error.vue'
import Loading from '@/components/Loading.vue'
import ServerService from '@/services/Server'

export default {
  name: 'App',
  components: {
    Nexmo,
    Error,
    Loading
  },
  data () {
    return {
      server: {},
      error: null
    }
  },
  mounted () {
    this.getServerStatus()
  },
  methods: {
    getServerStatus () {
      ServerService.fetchStatus()
        .then((response) => {
          this.server = response.data
        })
        .catch((err) => {
          this.error = { title: 'Chat Service Error', message: err.reason }
        })
    }
  }
}
</script>

<style>
.text-event pre, .text-event p code {
  background: #f8f8f8;
  border-radius: .2rem;
  border: 1px solid #ddd;
  font-family: Monaco,Menlo,Consolas,'Courier New',monospace;
  font-size: 0.9em;
  font-variant-ligatures: none;
  padding: .1rem .4rem;
  -webkit-font-variant-ligatures: none;
}
.text-event p code {
  background: rgba(232, 145, 45, 0.05);
  color: rgb(232, 145, 45);
}
.text-event pre {
  tab-size: 2;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  -webkit-tab-size: 2;
}
.text-event blockquote {
  border-left: 5px solid #ccc;
  padding: 0.5em;
}
.text-event blockquote {
  display: inline-flex;
}
.text-event p {
  display: inline;
}
.text-event pre {
  display: inline-block;
  width: 100%;
}
.text-event ul {
  display: inline-grid;
}
</style>
