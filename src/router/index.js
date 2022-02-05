import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "about" */ '../views/recommend.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import(/* webpackChunkName: "about" */ '../views/singer.vue')
  },
  {
    path: '/top-list',
    name: 'TopList',
    component: () => import(/* webpackChunkName: "about" */ '../views/top-list.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
