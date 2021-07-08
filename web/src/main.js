import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import './assets/css/main.css'
import './assets/css/iconfont.css'
import common from'./plugins/common'
Vue.use(VueLazyload) //懒加载
Vue.use(common)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(ElementUI);

// 高亮富文本

// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/atom-one-dark.css'
// Vue.use(VueHighlightJS)
//全局方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
