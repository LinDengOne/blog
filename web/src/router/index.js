import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import ArticleList from '../views/Article/ArticleList.vue'
import Detail from '../views/Article/detail.vue'
import Introducing from '../views/Introducing.vue'
import Message from '../views/message/index.vue'
import Game from '../views/game/index.vue'
import Rain from '../views/rainy.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/introducing',
    name: 'Introducing',
    component: Introducing
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '/rain',
    name: 'rain',
    component: Rain
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  store.commit('setLoading',true)
  setTimeout(() => {
    next()
  }, 300);
  
})

 

router.afterEach((to, from) => {
  store.commit('setLoading',false)
  document.querySelector("html").setAttribute("style", "overflow: auto !important;")
})
export default router
