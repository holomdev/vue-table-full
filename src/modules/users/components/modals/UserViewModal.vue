<script setup lang="ts">
import { computed } from 'vue'
import { ElDialog } from 'element-plus'
import type { User } from '../../types'
import BaseStatus from '@/components/base/BaseStatus.vue'

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const emit = defineEmits(['update:modelValue'])

const formatDate = (date: Date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const details = computed(() => {
  if (!props.user) return []
  
  return [
    { label: 'ID', value: `#${props.user.id}` },
    { label: 'Nombre', value: props.user.firstName },
    { label: 'Apellido', value: props.user.lastName },
    { label: 'Email', value: props.user.email },
    { label: 'Teléfono', value: props.user.phone },
    { label: 'Tipo', value: props.user.workerType.charAt(0).toUpperCase() + props.user.workerType.slice(1) },
    { label: 'Estado', value: props.user.status, isStatus: true },
    { label: 'Fecha Alta', value: formatDate(props.user.createdAt) }
  ]
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
    title="Detalles del Usuario"
    width="500px"
    class="user-modal"
    :close-on-click-modal="false"
  >
    <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
      <img :src="user?.avatar" :alt="user?.firstName" class="w-16 h-16 rounded-lg object-cover">
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ user?.firstName }} {{ user?.lastName }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="detail in details"
        :key="detail.label"
        class="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
      >
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ detail.label }}</span>
        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
          <BaseStatus
            v-if="detail.isStatus"
            :status="detail.value"
          />
          <span v-else>{{ detail.value }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <button
          class="nextui-button nextui-button-secondary"
          @click="emit('update:modelValue', false)"
        >
          Cerrar
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

.user-modal :deep(.el-dialog__header) {
  @apply pb-0 mb-4 border-b border-gray-100 dark:border-gray-800;
}

.dark .user-modal :deep(.el-dialog__title) {
  @apply text-gray-100;
}

.user-modal :deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  @apply text-primary-500;
}

.dark .user-modal :deep(.el-dialog__close) {
  @apply text-gray-400;
}
</style>