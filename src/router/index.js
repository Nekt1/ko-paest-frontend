import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PasswordChangeView from '../views/PasswordChangeView'
import PasswordResetView from '../views/PasswordResetView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: PasswordChangeView
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: PasswordResetView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
