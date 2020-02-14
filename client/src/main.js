import Vue from 'vue'
import App from './App.vue'
import Moment from 'moment'
import Markdown from 'markdown-it'
import MarkdownSlack from 'slack-markdown-it'

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
