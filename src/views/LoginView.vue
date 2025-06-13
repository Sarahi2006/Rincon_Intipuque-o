<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'

const router = useRouter()

// Estados del formulario
const formData = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
  password: '',
})

// Estado para mostrar/ocultar contraseña
const showPassword = ref(false)

// Validaciones de fortaleza de contraseña
const passwordValidations = ref({
  length: { isValid: false, message: 'Mínimo 8 caracteres' },
  uppercase: { isValid: false, message: 'Al menos una mayúscula' },
  number: { isValid: false, message: 'Al menos un número' },
  specialChar: { isValid: false, message: 'Al menos un carácter especial' },
})

// Comprobar fortaleza de contraseña en tiempo real
const checkPasswordStrength = () => {
  const pass = formData.value.password

  passwordValidations.value.length.isValid = pass.length >= 8
  passwordValidations.value.uppercase.isValid = /[A-Z]/.test(pass)
  passwordValidations.value.number.isValid = /[0-9]/.test(pass)
  passwordValidations.value.specialChar.isValid = /[!@#$%^&*(),.?":{}|<>]/.test(pass)
}

// Función para validar si la contraseña cumple todos los requisitos
const isPasswordValid = (): boolean => {
  return (
    passwordValidations.value.length.isValid &&
    passwordValidations.value.uppercase.isValid &&
    passwordValidations.value.number.isValid &&
    passwordValidations.value.specialChar.isValid
  )
}

const validateForm = () => {
  let isValid = true
  errors.value = { email: '', password: '' } // Resetear errores

  // Validación de email
  if (!formData.value.email) {
    errors.value.email = 'El email es requerido'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Ingrese un email válido'
    isValid = false
  }

  // Validación completa de contraseña
  if (!formData.value.password) {
    errors.value.password = 'La contraseña es requerida'
    isValid = false
  } else {
    checkPasswordStrength() // Actualizar estado de validaciones

    if (!isPasswordValid()) {
      errors.value.password = 'La contraseña no cumple con los requisitos de seguridad'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      // Aquí normalmente harías una llamada a tu API de autenticación
      // const response = await authService.login(formData.value.email, formData.value.password)

      // Simulamos autenticación exitosa solo si la contraseña es válida
      if (isPasswordValid()) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', formData.value.email)

        // Redirigir al home
        router.push('/')
      } else {
        errors.value.password = 'La contraseña no cumple con los requisitos de seguridad'
      }
    } catch (error) {
      // Manejo de errores (credenciales incorrectas, etc.)
      errors.value.password = 'Credenciales incorrectas. Por favor, intente nuevamente.'
    }
  }
}

const goToRegister = () => {
  router.push('/register')
}

// Computed para deshabilitar el botón si el formulario no es válido
const isFormValid = computed(() => {
  return (
    formData.value.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email) &&
    formData.value.password &&
    isPasswordValid()
  )
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
        <p class="mt-2 text-sm text-gray-600">Ingresa tus credenciales para acceder</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
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
              @input="errors.email = ''"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Campo Contraseña -->
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              v-model="formData.password"
              @input="checkPasswordStrength"
              :type="showPassword ? 'text' : 'password'"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.password }"
              @focus="checkPasswordStrength"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center mt-5"
              aria-label="Toggle password visibility"
            >
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

            <!-- Mensaje de error -->
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>

            <!-- Indicadores de fortaleza de contraseña -->
            <div class="mt-2 text-xs text-gray-600" v-if="formData.password">
              <p>Seguridad de la contraseña:</p>
              <ul class="list-disc list-inside">
                <li :class="{ 'text-green-500': passwordValidations.length.isValid }">
                  {{ passwordValidations.length.message }}
                </li>
                <li :class="{ 'text-green-500': passwordValidations.uppercase.isValid }">
                  {{ passwordValidations.uppercase.message }}
                </li>
                <li :class="{ 'text-green-500': passwordValidations.number.isValid }">
                  {{ passwordValidations.number.message }}
                </li>
                <li :class="{ 'text-green-500': passwordValidations.specialChar.isValid }">
                  {{ passwordValidations.specialChar.message }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Recuérdame</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
              >¿Olvidaste tu contraseña?</a
            >
          </div>
        </div>

        <div class="flex space-x-4">
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            :disabled="!isFormValid"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>

      <div class="text-center text-sm">
        <p class="text-gray-600">
          ¿No tienes una cuenta?
          <a
            @click="goToRegister"
            class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>
