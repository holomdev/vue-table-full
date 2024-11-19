<script setup lang="ts">
import { ElDialog } from 'element-plus'
import type { User } from '../../types'

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

const handleConfirm = () => {
  emit('confirm', props.user?.id)
  emit('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
    title="Eliminar Usuario"
    width="400px"
    class="user-modal"
    :close-on-click-modal="false"
  >
    <p class="text-gray-600 dark:text-gray-300">
      ¿Está seguro que desea eliminar al usuario <span class="font-medium text-gray-900 dark:text-gray-100">{{ user?.firstName }} {{ user?.lastName }}</span>?
      Esta acción no se puede deshacer.
    </p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          class="nextui-button nextui-button-secondary"
          @click="emit('update:modelValue', false)"
        >
          Cancelar
        </button>
        <button
          class="nextui-button nextui-button-danger"
          @click="handleConfirm"
        >
          Eliminar
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.user-modal {
  @apply rounded-lg;
}

.dark .user-modal {
  --el-dialog-bg-color: #18181b !important;
  --el-dialog-border-color: #27272a !important;
}

.nextui-button-danger {
  @apply bg-danger-500 text-white hover:bg-danger-600;
}
</style>