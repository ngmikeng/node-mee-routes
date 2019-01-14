import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Button, Icon, Layout, Menu, Table, Popconfirm,
  Modal, Form, Input, Select, Card, Row, Col
} from 'ant-design-vue';
import App from './App.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import CustomerRequests from './components/CustomerRequests.vue'
import LoginPage from './pages/LoginPage.vue'
import MapView from './components/MapView.vue'
import User from './components/User.vue'
import Driver from './components/Driver.vue'
import { getUserInfo, setAuthHeader, removeUserInfo, apiService } from './services'
import './styles/main.css'

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
Vue.component(Table.name, Table)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Modal.name, Modal)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Card.name, Card)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.config.productionTip = false

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      beforeEnter: guard,
      component: DefaultLayout,
      redirect: 'driver',
      children: [
        { path: 'map-view', component: MapView },
        { path: 'customer-requests', component: CustomerRequests },
        { path: 'user', component: User },
        { path: 'driver', component: Driver }
      ]
    },
    { path: '/login', beforeEnter: isUnloggedIn, component: LoginPage },
  ]
})

function guard(to, from, next) {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.accessToken) {
    setAuthHeader(userInfo.accessToken);
    apiService({
      path: '/auth/isLoggedIn',
      method: 'get'
    }).then((result) => {
      next();
    }).catch(() => {
      removeUserInfo();
      next('/login');
    });
  } else {
    next('/login');
  }
}

function isUnloggedIn(to, from, next) {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.accessToken) {
    setAuthHeader(userInfo.accessToken);
    apiService({
      path: '/auth/isLoggedIn',
      method: 'get'
    }).then((result) => {
      console.log(result);
      next('/');
    }).catch(() => {
      removeUserInfo();
      next();
    });
  } else {
    next();
  }
}

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
