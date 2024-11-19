import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import dashboard from '../components/dashboard.vue'
// import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  }
]

const router = new VueRouter({
  routes,
})
// router.beforeEach((to, from, next) => {
//   if( to.name === 'login' && from.name === 'dashboard' && store.getters['getUserData'].token){
//     router.forward()
//   }
//   else {
//     next()
//   }
// })
export default router
