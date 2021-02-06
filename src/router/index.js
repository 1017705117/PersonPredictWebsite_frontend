import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import NotFind from '@/components/NotFind.vue'

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
    }
  ]
})