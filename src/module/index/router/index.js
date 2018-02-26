import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue'
import videoPlayer from '../components/videoPlayer.vue'
import index from '../components/index.vue'
import testPlayer from '../components/testPlayer.vue'
import login from '../components/Login.vue'
import axios from '../../../utils/http.js'
Vue.use(Router)
const router=new Router({
  routes: [
  	{
  		path:'/',
  		component:index
  	},{
      path: '/videoPlayer',
      component: videoPlayer
    },{
      path: '/testPlayer',
      component: testPlayer
    },{
      path: '/login',
      component: login
    }
  ]
})
export default router