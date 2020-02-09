import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

Vue.filter('messageDate', value => {
  if (value) {
    return moment(String(value)).calendar(new Date())
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
