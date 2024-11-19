<script setup lang="ts">
import { ElTableColumn, ElButton } from 'element-plus'
import { View, Edit, Delete } from '@element-plus/icons-vue'
import BaseHighlight from '@/components/base/BaseHighlight.vue'
import BaseStatus from '@/components/base/BaseStatus.vue'

const props = defineProps({
  visibleColumns: {
    type: Object,
    required: true
  },
  searchFilters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])

const columnDefinitions = [
  { prop: 'id', label: 'ID', minWidth: '80' },
  { prop: 'userId', label: 'ID Usuario', minWidth: '100' },
  { prop: 'userName', label: 'Usuario', minWidth: '200' },
  { prop: 'amount', label: 'Monto', minWidth: '120' },
  { prop: 'status', label: 'Estado', minWidth: '120' },
  { prop: 'dueDate', label: 'Fecha Vencimiento', minWidth: '150' },
  { prop: 'paidAt', label: 'Fecha Pago', minWidth: '150' },
  { prop: 'actions', label: 'Acciones', minWidth: '180' }
]

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount)
}
</script>

<template>
  <template v-for="col in columnDefinitions" :key="col.prop">
    <el-table-column
      v-if="visibleColumns[col.prop]"
      :prop="col.prop"
      :label="col.label"
      :min-width="col.minWidth"
      show-overflow-tooltip
    >
      <template #default="{ row }">
        <template v-if="col.prop === 'id'">
          <span class="font-mono text-gray-600 dark:text-gray-400 font-medium">#{{ row.id }}</span>
        </template>

        <template v-else-if="col.prop === 'userId'">
          <span class="font-mono text-gray-600 dark:text-gray-400">#{{ row.userId }}</span>
        </template>

        <template v-else-if="col.prop === 'userName'">
          <BaseHighlight :text="row.userName" :search-term="searchFilters.userName" />
        </template>

        <template v-else-if="col.prop === 'amount'">
          <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(row.amount) }}</span>
        </template>
        
        <template v-else-if="col.prop === 'status'">
          <BaseStatus 
            :status="row.status"
            :variants="{
              pendiente: 'warning',
              pagado: 'success',
              vencido: 'danger',
              cancelado: 'default'
            }"
          />
        </template>

        <template v-else-if="col.prop === 'dueDate' || col.prop === 'paidAt'">
          <span class="text-gray-600 dark:text-gray-400">
            {{ row[col.prop] ? formatDate(row[col.prop]) : '-' }}
          </span>
        </template>

        <template v-else-if="col.prop === 'actions'">
          <div class="flex items-center gap-2">
            <el-button
              type="primary"
              circle
              size="small"
              @click="emit('view', row)"
            >
              <el-icon><View /></el-icon>
            </el-button>
            <el-button
              type="warning"
              circle
              size="small"
              @click="emit('edit', row)"
            >
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button
              type="danger"
              circle
              size="small"
              @click="emit('delete', row)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </template>

        <template v-else>
          {{ row[col.prop] }}
        </template>
      </template>
    </el-table-column>
  </template>
</template>

<style>
:deep(.el-table) {
  --el-table-header-text-color: #666 !important;
  --el-table-border-color: #eee !important;
}

.dark :deep(.el-table) {
  --el-table-header-text-color: #a1a1aa !important;
  --el-table-border-color: #27272a !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-current-row-bg-color: #27272a !important;
  --el-table-row-hover-bg-color: #27272a !important;
}

:deep(.el-button) {
  --el-button-hover-text-color: currentColor !important;
  --el-button-hover-bg-color: transparent !important;
  --el-button-hover-border-color: transparent !important;
}

:deep(.el-button.is-circle) {
  @apply flex items-center justify-center;
}

.dark :deep(.el-table__cell) {
  background-color: transparent !important;
}

.dark :deep(.el-table__header) th {
  background-color: rgb(17 24 39) !important;
}

.dark :deep(.el-table__body) td {
  border-bottom-color: #27272a !important;
}
</style>