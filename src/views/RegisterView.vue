<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '@/components/ui/AppNavbar.vue'

const router = useRouter()

// Estados del formulario
const formData = ref({
  nombre: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({
  nombre: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Estados para mostrar/ocultar contraseñas
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateForm = () => {
  let isValid = true

  if (!formData.value.nombre.trim()) {
    errors.value.nombre = 'El nombre es requerido'
    isValid = false
  } else {
    errors.value.nombre = ''
  }

  if (!formData.value.email.includes('@')) {
    errors.value.email = 'Ingrese un email válido'
    isValid = false
  } else {
    errors.value.email = ''
  }

  if (formData.value.password.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  } else {
    errors.value.password = ''
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  } else {
    errors.value.confirmPassword = ''
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Formulario válido:', formData.value)
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Registro de Usuario</h1>
        <p class="mt-2 text-sm text-gray-600">Crea una cuenta para comenzar</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Campo Nombre -->
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700"
              >Nombre completo</label
            >
            <input
              id="nombre"
              v-model="formData.nombre"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.nombre }"
            />
            <p v-if="errors.nombre" class="mt-1 text-sm text-red-600">{{ errors.nombre }}</p>
          </div>

          <!-- Campo Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo electrónico</label
            >
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Campo Contraseña -->
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.password }"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center mt-5"
              aria-label="Toggle password visibility"
            >
              <!-- Icono cuando la contraseña está VISIBLE (click para OCULTAR) -->
              <svg
                v-if="showPassword"
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <!-- Icono cuando la contraseña está OCULTA (click para MOSTRAR) -->
              <svg
                v-else
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Campo Confirmar Contraseña -->
          <div class="relative">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
              >Confirmar contraseña</label
            >
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center mt-5"
              aria-label="Mostrar/ocultar contraseña"
            >
              <!-- Icono cuando la contraseña está VISIBLE (click para OCULTAR) -->
              <svg
                v-if="showConfirmPassword"
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5
                       c4.478 0 8.268 2.943 9.542 7
                       -1.274 4.057-5.064 7-9.542 7
                       -4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>

              <!-- Icono cuando la contraseña está OCULTA (click para MOSTRAR) -->
              <svg
                v-else
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19
                       c-4.478 0-8.268-2.943-9.543-7
                       a9.97 9.97 0 011.563-3.029
                       m5.858.908a3 3 0 114.243 4.243
                       M9.878 9.878l4.242 4.242
                       M9.88 9.88l-3.29-3.29
                       m7.532 7.532l3.29 3.29
                       M3 3l3.59 3.59
                       m0 0A9.953 9.953 0 0112 5
                       c4.478 0 8.268 2.943 9.543 7
                       a10.025 10.025 0 01-4.132 5.411
                       m0 0L21 21"
                />
              </svg>
            </button>

            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </div>
      </form>

      <div class="text-center text-sm">
        <p class="text-gray-600">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
