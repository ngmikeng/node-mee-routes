import VueRouter from 'vue-router'
import DefaultLayout from './layouts/Default.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: []
    },
  ]
})

export default router;