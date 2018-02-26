// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../resetMint.css'
import axios from '../../../src/utils/http.js'
// import router from './router'
// import './invitation.css'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$axios = axios;  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  // router
})
