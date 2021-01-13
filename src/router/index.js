import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from 'views/Main'
import CategoryEdit from 'views/categoryedit/CategoryEdit'
import CategoryList from 'views/categorylist/CategoryList'

import EquipmentsEdit from 'views/equipmentsedit/EquipmentsEdit'
import EquipmentsList from 'views/equipmentslist/EquipmentsList'

import HeroEdit from 'views/heroedit/HeroEdit'
import HeroList from 'views/herolist/HeroList'

import ArticleEdit from 'views/articleedit/ArticleEdit'
import ArticleList from 'views/articlelist/ArticleList'

import AdEdit from 'views/adedit/AdEdit'
import AdList from 'views/adlist/AdList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {path: '/categories/create', component: CategoryEdit},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true},
      {path: '/categories/list', component: CategoryList},
      
      {path: '/equipments/create', component: EquipmentsEdit},
      {path: '/equipments/edit/:id', component: EquipmentsEdit, props: true},
      {path: '/equipments/list', component: EquipmentsList},

      {path: '/heroes/create', component: HeroEdit},
      {path: '/heroes/edit/:id', component: HeroEdit, props: true},
      {path: '/heroes/list', component: HeroList},

      {path: '/articles/create', component: ArticleEdit},
      {path: '/articles/edit/:id', component: ArticleEdit, props: true},
      {path: '/articles/list', component: ArticleList},

      {path: '/ads/create', component: AdEdit},
      {path: '/ads/edit/:id', component: AdEdit, props: true},
      {path: '/ads/list', component: AdList},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
