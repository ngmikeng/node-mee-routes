import Vue from 'vue'
import VueRouter from 'vue-router'
import { Button, Icon, Layout, Menu } from 'ant-design-vue';
import App from './App.vue'
import MapView from './components/MapView.vue'
import User from './components/User.vue'

Vue.use(VueRouter)

Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Footer.name, Layout.Footer)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Menu.name, Menu)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Item.name, Menu.Item)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/map-view' },
    { path: '/map-view', component: MapView },
    { path: '/user', component: User }
  ]
})

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
