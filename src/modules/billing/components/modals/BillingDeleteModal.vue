<script setup lang="ts">
import { ElDialog } from 'element-plus'
import type { Billing } from '../../types'

const props = defineProps<{
  modelValue: boolean
  billing: Billing | null
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

const handleConfirm = () => {
  emit('confirm', props.billing?.id)
  emit('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="value => emit('update:modelValue', value)"
    title="Eliminar Cobro"
    width="400px"
    class="billing-modal"
    :close-on-click-modal="false"
  >
    <p class="text-gray-600 dark:text-gray-300">
      ¿Está seguro que desea eliminar el cobro <span class="font-medium text-gray-900 dark:text-gray-100">#{{ billing?.id }}</span>?
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
.billing-modal {
  @apply rounded-lg;
}

.dark .billing-modal {
  --el-dialog-bg-color: #18181b !important;
  --el-dialog-border-color: #27272a !important;
}

.nextui-button-danger {
  @apply bg-danger-500 text-white hover:bg-danger-600;
}
</style>