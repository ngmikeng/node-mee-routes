import VueRouter from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import LoginPage from './pages/Login.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: []
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
})

export default router;