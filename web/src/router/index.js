import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import ArticleList from '../views/Article/ArticleList.vue'
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
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  store.commit('setLoading',true)
  setTimeout(() => {
    
  }, 2000);
  next()
})
router.afterEach((to, from) => {
  store.commit('setLoading',false)
})
export default router
