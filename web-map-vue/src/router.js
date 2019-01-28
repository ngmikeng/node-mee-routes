import VueRouter from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import LoginPage from './pages/Login.vue'
import RequestPage from './pages/Request.vue'
import RequestDetailPage from './pages/RequestDetail.vue'
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
      children: [
      	{ 
      		path: 'request', component: RequestPage, children: [
      			{
      				path: ':id', name: 'requestDetail', component: RequestDetailPage
      			}
      		]
      	}
      ]
    },
    {
      path: '/login',
      beforeEnter: isUnloggedIn,
      component: LoginPage
    }
  ]
})

export default router;