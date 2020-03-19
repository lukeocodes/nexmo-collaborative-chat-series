import Vue from 'vue'
import App from './App.vue'
import Moment from 'moment'
import Markdown from 'markdown-it'
import MarkdownSlack from 'slack-markdown-it'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

import './assets/styles/index.css';

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.filter('messageDate', value => {
  if (value) {
    return Moment(String(value)).calendar(new Date())
  }
})

Vue.filter('markdown', value => {
  if (value) {
    const md = Markdown();
    md.use(MarkdownSlack);

    return md.render(value);
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
