import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.prototype.$http=axios
axios.defaults.baseURL='http://localhost:3000'

require('./api/init.js');  // 导入并执行 leanCloud 初始化

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
