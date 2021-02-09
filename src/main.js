import Vue from 'vue'
import Buefy from 'buefy'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
import './helper/filter'
import './styles/style.scss'
// import { notified, checkConnection } from '@/helper/tools.js'

Vue.config.productionTip = false

Vue.use(Buefy)
// Vue.use(checkConnection)
// Vue.use(notified)
Vue.use(VueSession)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
