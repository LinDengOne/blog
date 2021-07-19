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
        path: '/messageboard',
        name:"messageboard",
        component: resolve => require(['../views/messageBoard.vue'],resolve)
      },
      {
        path: '/setting',
        name: "setting",
        component: resolve => require(['../views/setting.vue'],resolve)
      },
      {
        path: '/comment',
        name: "comment",
        component: resolve => require(['../views/comment/comment.vue'],resolve)
      },
      {
        path: '/introducing',
        name: "introducing",
        component: resolve => require(['../views/introducing.vue'],resolve)
      },
      
    ]
  },
  {
    path: '/login',
    name: "login",
    component: resolve => require(['../views/login.vue'],resolve)
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
