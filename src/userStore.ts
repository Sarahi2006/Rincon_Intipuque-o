import { defineStore } from 'pinia'
import { profile } from '@/api/login.ts'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user') as string) || null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async getProfile() {
      this.loading = true
      this.error = null

      try {
        const userData = await profile()

        this.user = userData
        sessionStorage.setItem('user', JSON.stringify(userData))

        return userData
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error desconocido al obtener perfil'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearUser() {
      this.user = null
      sessionStorage.removeItem('user')
    }
  }
})
