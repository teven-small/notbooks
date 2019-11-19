import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'',
      component:  resolve => require(['@/view/home'],resolve),
    },
    {
      path:'/home',
      name:'home',
      component:  resolve => require(['@/view/home'],resolve),
    },
    {
      path:'/software',
      name:'software',
      component:  resolve => require(['@/view/software'],resolve),
    },
    {
      path:'/details',
      name:'details',
      component:  resolve => require(['@/view/details'],resolve),
    },
    {
      path:'/head',
      name:'head',
      component: resolve => require(['@/view/head'], resolve),
    },
    {
      path: '/game',
      name: 'game',
      component: resolve => require(['@/view/game'], resolve),
    },
    {
      path:'/necessary',
      name:'necessary',
      component: resolve => require(['@/view/necessary'], resolve)
    },
    {
      path:'/ranking',
      name:'ranking',
      component: resolve => require(['@/view/ranking'], resolve)
    }
  ]
})
