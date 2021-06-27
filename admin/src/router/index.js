import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
    children: [
      {
        path: '/',
        name: "welcome",
        component: resolve => require(['../views/welcome/welcome.vue'],resolve)
      },
      {
        path: '/article',
        name:"article",
        component: resolve => require(['../views/article/list.vue'],resolve)
      },
      {
        path: '/article/detail',
        name: "detail",
        component: resolve => require(['../views/article/detail.vue'],resolve)
      },
      {
        path: '/envelope',
        name:"envelop",
        component: resolve => require(['../views/envelope/list.vue'],resolve)
      },
      {
        path: '/envelope/detail',
        name: "envelopDetail",
        component: resolve => require(['../views/envelope/detail.vue'],resolve)
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  let list = ['/article/detail']
  let name = list.indexOf(to.path) > -1 ? '/' + to.path.split('/')[1] : to.path
  store.commit('setMenu',name)
  next()
})

export default router
