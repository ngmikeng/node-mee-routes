import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
