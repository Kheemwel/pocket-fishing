import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeGame } from './core/game'
import { useDevStore } from './stores/devStore'

const pinia = createPinia()
setActivePinia(pinia) // IMPORTANT

const game = initializeGame()
const devStore = useDevStore()
devStore.setDispatcher(game.dispatcher)

const app = createApp(App)
app.use(pinia)
app.use(router)

app.provide('game', game)
app.mount('#app')
