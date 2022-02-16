import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/players',
    name: 'Players',
    component: () => import( '../pages/PlayersInfo/Players.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import( '../pages/PlayersInfo/Teams.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import( '../pages/PlayersInfo/Index.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
