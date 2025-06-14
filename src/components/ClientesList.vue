<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '@/api/users.ts'
import type { User } from '@/api/interface/user.interface.ts'

const users = ref<User[]>([])

const pagina = ref(1)
const porPagina = 5

// Estado del modal
const modalRef = ref<HTMLDialogElement | null>(null)
const modalAction = ref<'edit' | 'delete'>('edit')
const selectedUser = ref<User | null>(null)
const formData = ref({
  name: '',
  email: '',
  role: ''
})

// Abrir modal para editar o eliminar
function openModal(action: 'edit' | 'delete', user: User) {
  modalAction.value = action
  selectedUser.value = user

  if (action === 'edit') {
    formData.value = {
      name: user.name,
      email: user.email,
      role: user.role
    }
  }

  modalRef.value?.showModal()
}

// Cerrar modal
function closeModal() {
  modalRef.value?.close()
  selectedUser.value = null
}

// Confirmar acción
function confirmAction() {
  if (!selectedUser.value) return

  if (modalAction.value === 'edit') {
    // Aquí iría la llamada a la API para actualizar
    console.log('Datos actualizados:', formData.value)
    // Actualizamos localmente
    const index = users.value.findIndex(u => u._id === selectedUser.value?._id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...formData.value }
    }
  } else {
    users.value = users.value.filter(c => c._id !== selectedUser.value?._id)
  }

  closeModal()
}

onMounted(async () => {
  const data = await getUsers()
  users.value = data.data
})
</script>

<template>
  <section class="py-10 px-4 md:px-10 bg-white text-gray-800">
    <h2 class="text-3xl font-bold text-center mb-6">Clientes Registrados</h2>

    <div class="overflow-x-auto">
      <table class="w-full bg-white border table-auto">
        <thead class="bg-gray-100">
        <tr>
          <th class="p-4 text-left">Nombre</th>
          <th class="p-4 text-left">Correo</th>
          <th class="p-4 text-left">Rol</th>
          <th class="p-4 text-left w-[160px]">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user._id" class="border-t">
          <td class="p-4">{{ user.name }}</td>
          <td class="p-4">{{ user.email }}</td>
          <td class="p-4">{{user.role}}</td>
          <td class="p-4">
            <div class="flex gap-2">
              <button
                @click="openModal('edit', user)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                @click="openModal('delete', user)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button @click="pagina--" :disabled="pagina === 1" class="px-4 py-1 bg-gray-200 rounded">Anterior</button>
      <button @click="pagina++" :disabled="pagina * porPagina >= users.length" class="px-4 py-1 bg-gray-200 rounded">Siguiente</button>
    </div>

    <!-- Modal Dialog -->
    <dialog ref="modalRef" class="backdrop:bg-black backdrop:bg-opacity-50 rounded-lg shadow-xl w-full max-w-md p-0">
      <div class="p-6">
        <h3 class="text-xl font-bold mb-4">
          {{ modalAction === 'edit' ? 'Editar Usuario' : 'Eliminar Usuario' }}
        </h3>

        <form v-if="modalAction === 'edit'" @submit.prevent="confirmAction" class="space-y-4 mb-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              v-model="formData.role"
              id="role"
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
              <option value="guest">Invitado</option>
            </select>
          </div>
        </form>

        <p v-else class="mb-6">
          ¿Estás seguro que deseas eliminar el usuario <strong>{{ selectedUser?.name }}</strong>?
          Esta acción no se puede deshacer.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            @click="confirmAction"
            :class="{
              'bg-blue-500 hover:bg-blue-600': modalAction === 'edit',
              'bg-red-500 hover:bg-red-600': modalAction === 'delete'
            }"
            class="px-4 py-2 text-white rounded"
          >
            {{ modalAction === 'edit' ? 'Guardar cambios' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </dialog>
  </section>
</template>
