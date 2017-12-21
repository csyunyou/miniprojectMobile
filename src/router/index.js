import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VideoPlayer from '../components/videoPlayer.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
    	path:'/videoPlayer',
    	component:VideoPlayer
    }
  ]
})
