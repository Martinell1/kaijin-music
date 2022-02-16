import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "about" */ '../views/recommend.vue'),
    children: [
      {
        path: ':id',
        name: 'AlbumDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/album-detail.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "about" */ '../views/singer.vue'),
    children: [
      {
        path: ':id',
        name: 'SingerDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/singer-detail.vue')
      }
    ]
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
