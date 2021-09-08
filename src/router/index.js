import Vue from 'vue'
import VueRouter from 'vue-router'

import GameScreen from '../views/GameScreen.vue'
import HelpScreen from '../views/HelpScreen.vue'
import MainMenuScreen from '../views/MainMenuScreen.vue'
import WinnerScreen from '../views/WinnerScreen.vue'

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
  },
  {
    path: '/help',
    name: 'help',
    component: HelpScreen
  },
  {
    path: '/winner',
    name: 'winner',
    component: WinnerScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
