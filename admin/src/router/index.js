import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroList from '../views/HeroList.vue'
import HeroEdit from '../views/HeroEdit.vue'

import ArticleList from '../views/ArticleList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'

import AdList from '../views/AdList.vue'
import AdEdit from '../views/AdEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create', component: CategoryEdit},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true}, // 把任何id注入CategoryEdit页面
      {path: '/categories/list', component: CategoryList},

      {path: '/items/create', component: ItemEdit},
      {path: '/items/edit/:id', component: ItemEdit, props: true}, // 把任何id注入ItemEdit页面
      {path: '/items/list', component: ItemList},

      {path: '/heroes/create', component: HeroEdit},
      {path: '/heroes/edit/:id', component: HeroEdit, props: true}, // 把任何id注入HeroEdit页面
      {path: '/heroes/list', component: HeroList},

      {path: '/articles/create', component: ArticleEdit},
      {path: '/articles/edit/:id', component: ArticleEdit, props: true}, // 把任何id注入ArticleEdit页面
      {path: '/articles/list', component: ArticleList},

      {path: '/ads/create', component: AdEdit},
      {path: '/ads/edit/:id', component: AdEdit, props: true}, // 把任何id注入AdEdit页面
      {path: '/ads/list', component: AdList}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
