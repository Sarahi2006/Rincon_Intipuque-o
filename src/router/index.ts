import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import AboutView from '@/views/AboutView.vue'
import ServicesView from '@/views/ServicesView.vue'
import AboutUs from '@/components/AboutUs.vue'
import Admin from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/about-us',
      name: 'aboutUs',
      component: AboutUs,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('@/views/ClientesView.vue'),
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('@/views/PedidosView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    }
  ],
})

export default router
