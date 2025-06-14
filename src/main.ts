import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useCartStore } from './stores/cartStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const cartStore = useCartStore()

const savedUserId = localStorage.getItem('userId')


if (savedUserId) {
  cartStore.setUserId(savedUserId)
  cartStore.loadFromLocalStorage()
}

cartStore.$subscribe((mutation, state) => {
  if (state.userId) {
    localStorage.setItem(`cart_${state.userId}`, JSON.stringify(state.items))
  }
})

router.push('/login')

app.mount('#app')
