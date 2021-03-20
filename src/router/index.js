import Vue from 'vue'
import VueRouter from 'vue-router'
import WalkerPage from '../views/WalkerPage.vue'
import AboutUs from '../views/AboutUs.vue'
//import Menus from '../components/Menus.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: WalkerPage,
  },
  {
    path: '/aboutus',
    name:'about',
    component: AboutUs,
  },
  {
    path: '/menus',
    name: 'menus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "menus" */ '../components/Menus.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
