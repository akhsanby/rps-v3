import Vue from 'vue'
import VueRouter from 'vue-router'

import GameScreen from '../views/GameScreen.vue'
import MainMenuScreen from '../views/MainMenuScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'menu',
    component: MainMenuScreen
  },
  {
    path: '/game',
    name: 'game',
    component: GameScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
