import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
 
  {
    path: '/MyLeaves',
    name: 'MyLeaves',                 
    component: () => import(/* webpackChunkName: "about" */ '../views/MyLeaves.vue')
  },

  {
    path: '/LeavesAction',
    name: 'LeavesAction',                 
    component: () => import(/* webpackChunkName: "about" */ '../views/LeavesAction.vue')
  },

  {
    path: '/AllRequests',
    name: 'AllRequests',                 
    component: () => import(/* webpackChunkName: "about" */ '../views/AllRequests.vue')
  },


  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')   
  },
  {
    path: '/Homepage',
    name: 'Homepage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Homepage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
