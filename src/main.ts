import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia)
app.use(router)

// Redirigir al login si no está autenticado al cargar la app
router.push('/login')
app.mount('#app')
