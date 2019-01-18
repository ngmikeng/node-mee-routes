import VueRouter from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import CustomerRequests from './components/CustomerRequests.vue'
import LoginPage from './pages/LoginPage.vue'
import MapView from './components/MapView.vue'
import User from './components/User.vue'
import Driver from './components/Driver.vue'
import { getUserInfo, setAuthHeader, removeUserInfo, apiService } from './services'

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

const router = new VueRouter({
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

export default router;