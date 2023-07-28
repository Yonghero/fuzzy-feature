import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

// import { TestRenderer, createFuzzyApp } from '../../src'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

// const fuzzyApp = createFuzzyApp({
//   renderer: TestRenderer,
//   http: {},
//   layout: {}
// })

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// app.use(fuzzyApp.install('Fuzzy'))

app.use(router)
app.mount('#app')
