import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.prototype.$http = http
Vue.config.productionTip = false

/**
 * @param {Object} data form对象集合
 */
 Vue.prototype.$formData = (data) => {
	const form = new FormData()
	for (let key in data) {
		form.append(key, data[key])
	}
	return form
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
