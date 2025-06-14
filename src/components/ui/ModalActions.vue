<template>
  <!-- Botón para abrir el modal (puedes ponerlo donde lo necesites) -->
  <button
    @click="openModal(itemId)"
    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
  >
    Acciones
  </button>

  <!-- Modal -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-96">
      <!-- Header -->
      <div class="border-b px-6 py-4 flex justify-between items-center">
        <h3 class="text-lg font-semibold">Selecciona una acción</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>

      <!-- Contenido -->
      <div class="p-6">
        <p class="mb-4">ID seleccionado: {{ selectedId }}</p>

        <div class="flex space-x-4">
          <button
            @click="handleUpdate"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex-1"
          >
            Actualizar
          </button>
          <button
            @click="handleDelete"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex-1"
          >
            Eliminar
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t px-6 py-3 bg-gray-50 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['update', 'delete']);

const isOpen = ref(false);
const selectedId = ref(null);

const openModal = (id) => {
  selectedId.value = id;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleUpdate = () => {
  emit('update', selectedId.value);
  closeModal();
};

const handleDelete = () => {
  emit('delete', selectedId.value);
  closeModal();
};
</script>
