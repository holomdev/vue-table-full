<script setup lang="ts">
import { computed } from 'vue'
import { ElDialog } from 'element-plus'
import type { Billing } from '../../types'
import BaseStatus from '@/components/base/BaseStatus.vue'

const props = defineProps<{
  modelValue: boolean
  billing: Billing | null
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount)
}

const details = computed(() => {
  if (!props.billing) return []
  
  return [
    { label: 'ID', value: `#${props.billing.id}` },
    { label: 'ID Usuario', value: `#${props.billing.userId}` },
    { label: 'Usuario', value: props.billing.userName },
    { label: 'Monto', value: formatCurrency(props.billing.amount) },
    { label: 'Estado', value: props.billing.status, isStatus: true },
    { label: 'Fecha Vencimiento', value: formatDate(props.billing.dueDate) },
    { label: 'Fecha Pago', value: props.billing.paidAt ? formatDate(props.billing.paidAt) : '-' }
  ]
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="value => emit('update:modelValue', value)"
    title="Detalles del Cobro"
    width="500px"
    class="billing-modal"
    :close-on-click-modal="false"
  >
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
            :variants="{
              pendiente: 'warning',
              pagado: 'success',
              vencido: 'danger',
              cancelado: 'default'
            }"
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
.billing-modal {
  @apply rounded-lg;
}

.dark .billing-modal {
  --el-dialog-bg-color: #18181b !important;
  --el-dialog-border-color: #27272a !important;
}

.billing-modal :deep(.el-dialog__header) {
  @apply pb-0 mb-4 border-b border-gray-100 dark:border-gray-800;
}

.dark .billing-modal :deep(.el-dialog__title) {
  @apply text-gray-100;
}

.billing-modal :deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  @apply text-primary-500;
}

.dark .billing-modal :deep(.el-dialog__close) {
  @apply text-gray-400;
}
</style>