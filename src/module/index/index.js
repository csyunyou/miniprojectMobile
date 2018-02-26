// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from '../../../src/utils/http.js'
import '../resetMint.css'
import 'video.js/dist/video-js.css'
import './assets/myVideo.css'
import router from './router'
import store from './store'
import '../resetMint.css'
// import './invitation.css'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$axios = axios;
const whiteList = ['/login','/']
router.beforeEach((to, from, next) => {
  // console.log('beforeEach')
  console.log(to, from)
  if (whiteList.indexOf(to.path) === -1)
    axios.post('/public/islogin').then(function({ data }) {
      if (data.code === 0) {
        store.commit('SET_USERINFO',data.data)
        next()
      } else {
        if (to.path === '/videoPlayer')
          store.commit('SET_TMPURL',window.location.href)
        next({ path: '/login' })

      }
    })
  else
    next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
