import { createApp } from 'vue'
import './style.css'

// import { createWebHistory } from 'vue-router'
// import { createRouter } from './route/routes.js'
import router from './route/routes.js'
import { createPinia } from 'pinia'

import App from './App.vue'

// const router = createRouter( createWebHistory() )

const store = createPinia()
const app = createApp(App)
app.use(router).use(store).mount('#app')
