import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import crud from '@/views/crud'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/crud',
    name: 'Crud Operations',
    component: crud,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
