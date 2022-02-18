import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend.vue'),
    children: [
      {
        path: ':id',
        name: 'AlbumDetail',
        component: () => import(/* webpackChunkName: "album-detail" */ '../views/album-detail.vue')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer.vue'),
    children: [
      {
        path: ':id',
        name: 'SingerDetail',
        component: () => import(/* webpackChunkName: "singer-detail" */ '../views/singer-detail.vue')
      }
    ]
  },
  {
    path: '/top-list',
    name: 'TopList',
    component: () => import(/* webpackChunkName: "top-list" */ '../views/top-list.vue'),
    children: [
      {
        path: ':id',
        name: 'TopListDetail',
        component: () => import(/* webpackChunkName: "toplist-detail" */ '../views/toplist-detail.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
  },
  {
    path: '/user',
    name: 'User',
    components: {
      user: () => import(/* webpackChunkName: "user-center" */ '../views/user-center.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
