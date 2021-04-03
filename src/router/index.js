import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import NotFind from '@/components/NotFind.vue'
import VideoPlay from '@/components/VideoPlay'
import infomation from "@/components/infomation";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/404',
      component: NotFind
    },
    // {
    //   path: '/video',
    //   name: 'video',
    //   component:Video
    // },
    {
      path: '/video',
      name: 'video',
      component: VideoPlay
    },
    {
      path: '/infomation',
      name: 'infomation',
      component: infomation
    }
  ]
})
