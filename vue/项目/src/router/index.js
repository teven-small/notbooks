import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
    },
    {
      path: '/login',
      name: '/login',
      component(resolve){
        require(['@/components/login/login.vue'],resolve)
      }
    },
    {
      path: '/home',
      name: '/home',
      component(resolve){
        require(['@/components/home/home.vue'],resolve)
      }
    },
    {
      path: '/warning',
      name: '/warning',
      component(resolve){
        require(['@/components/warning/warning.vue'],resolve)
      }
    },
    {
      path: '/monitor',
      name: '/monitor',
      component(resolve){
        require(['@/components/monitor/monitor.vue'],resolve)
      }
    },
    {
      path: '/mine',
      name: '/mine',
      component(resolve){
        require(['@/components/mine/mine.vue'],resolve)
      }
    },
    {
      path: '/detail',
      name: '/detail',
      component(resolve){
        require(['@/components/monitor/detail.vue'],resolve)
      }
    },
    {
      path: '/dispose',
      name: '/dispose',
      component(resolve){
        require(['@/components/warning/dispose.vue'],resolve)
      }
    }
  ]
})
