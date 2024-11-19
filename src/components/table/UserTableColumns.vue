<script setup lang="ts">
import { ElTableColumn, ElAvatar, ElButton, ElMessageBox } from 'element-plus'
import { View, Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  visibleColumns: {
    type: Object,
    required: true
  }
})

const columnDefinitions = [
  { prop: 'id', label: 'ID', minWidth: '80' },
  { prop: 'avatar', label: '', minWidth: '60' },
  { prop: 'firstName', label: 'Nombre', minWidth: '140' },
  { prop: 'lastName', label: 'Apellido', minWidth: '140' },
  { prop: 'email', label: 'Email', minWidth: '230' },
  { prop: 'phone', label: 'Teléfono', minWidth: '150' },
  { prop: 'workerType', label: 'Tipo', minWidth: '120' },
  { prop: 'status', label: 'Estado', minWidth: '120' },
  { prop: 'createdAt', label: 'Fecha Alta', minWidth: '150' },
  { prop: 'actions', label: 'Acciones', minWidth: '180', fixed: 'right' }
]

const getStatusClass = (status: string) => {
  const classes = {
    activo: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    inactivo: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400',
    pausado: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
    vacacionando: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
  }
  return `nextui-badge ${classes[status]}`
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleView = async (row) => {
  try {
    await ElMessageBox.alert(`Visualizando usuario: ${row.firstName} ${row.lastName}`)
  } catch (e) {
    // Ignore cancel
  }
}

const handleEdit = async (row) => {
  try {
    await ElMessageBox.alert(`Editando usuario: ${row.firstName} ${row.lastName}`)
  } catch (e) {
    // Ignore cancel
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `¿Está seguro de eliminar al usuario ${row.firstName} ${row.lastName}?`,
      'Advertencia',
      {
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }
    )
  } catch (e) {
    // Ignore cancel
  }
}
</script>

<template>
  <template v-for="col in columnDefinitions" :key="col.prop">
    <el-table-column
      v-if="visibleColumns[col.prop]"
      :prop="col.prop"
      :label="col.label"
      :min-width="col.minWidth"
      :fixed="col.fixed"
      show-overflow-tooltip
    >
      <template #default="{ row }" v-if="col.prop === 'id'">
        <span class="font-mono text-gray-600 dark:text-gray-400 font-medium">#{{ row.id }}</span>
      </template>

      <template #default="{ row }" v-if="col.prop === 'avatar'">
        <el-avatar :size="32" :src="row.avatar" class="rounded-lg" />
      </template>
      
      <template #default="{ row }" v-if="col.prop === 'status'">
        <span :class="getStatusClass(row.status)">
          {{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}
        </span>
      </template>

      <template #default="{ row }" v-if="col.prop === 'workerType'">
        <span class="font-medium text-gray-700 dark:text-gray-300">
          {{ row.workerType.charAt(0).toUpperCase() + row.workerType.slice(1) }}
        </span>
      </template>

      <template #default="{ row }" v-if="col.prop === 'createdAt'">
        <span class="text-gray-600 dark:text-gray-400">{{ formatDate(row.createdAt) }}</span>
      </template>

      <template #default="{ row }" v-if="col.prop === 'actions'">
        <div class="flex items-center gap-2">
          <el-button
            type="primary"
            circle
            size="small"
            @click="handleView(row)"
          >
            <el-icon><View /></el-icon>
          </el-button>
          <el-button
            type="warning"
            circle
            size="small"
            @click="handleEdit(row)"
          >
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button
            type="danger"
            circle
            size="small"
            @click="handleDelete(row)"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
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
  --el-table-current-row-bg-color: #18181b !important;
  --el-table-row-hover-bg-color: #27272a !important;
}

:deep(.el-button) {
  --el-button-hover-text-color: currentColor !important;
  --el-button-hover-bg-color: transparent !important;
  --el-button-hover-border-color: transparent !important;
}

:deep(.el-table__fixed-right) {
  height: 100% !important;
  background-color: var(--background);
}

:deep(.el-table__fixed-right-patch) {
  background-color: var(--background);
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