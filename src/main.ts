import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useCartStore } from '@/stores/cartStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const cartStore = useCartStore()
cartStore.loadFromLocalStorage()

cartStore.$subscribe((mutation, state) => {
  localStorage.setItem('cart', JSON.stringify(state.items))
})

router.push('/login')

app.mount('#app')
