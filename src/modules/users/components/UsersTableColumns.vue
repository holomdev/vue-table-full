<script setup lang="ts">
import { ElTableColumn, ElAvatar, ElButton } from 'element-plus'
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
  { prop: 'avatar', label: '', minWidth: '60' },
  { prop: 'firstName', label: 'Nombre', minWidth: '140' },
  { prop: 'lastName', label: 'Apellido', minWidth: '140' },
  { prop: 'email', label: 'Email', minWidth: '230' },
  { prop: 'phone', label: 'Teléfono', minWidth: '150' },
  { prop: 'workerType', label: 'Tipo', minWidth: '120' },
  { prop: 'status', label: 'Estado', minWidth: '120' },
  { prop: 'createdAt', label: 'Fecha Alta', minWidth: '150' },
  { prop: 'actions', label: 'Acciones', minWidth: '180' }
]

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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

        <template v-else-if="col.prop === 'avatar'">
          <el-avatar :size="32" :src="row.avatar" class="rounded-lg" />
        </template>

        <template v-else-if="col.prop === 'firstName'">
          <BaseHighlight :text="row.firstName" :search-term="searchFilters.firstName" />
        </template>

        <template v-else-if="col.prop === 'lastName'">
          <BaseHighlight :text="row.lastName" :search-term="searchFilters.lastName" />
        </template>

        <template v-else-if="col.prop === 'email'">
          <BaseHighlight :text="row.email" :search-term="searchFilters.email" />
        </template>

        <template v-else-if="col.prop === 'phone'">
          <BaseHighlight :text="row.phone" :search-term="searchFilters.phone" />
        </template>
        
        <template v-else-if="col.prop === 'status'">
          <BaseStatus :status="row.status" />
        </template>

        <template v-else-if="col.prop === 'workerType'">
          <span class="font-medium text-gray-700 dark:text-gray-300">
            {{ row.workerType.charAt(0).toUpperCase() + row.workerType.slice(1) }}
          </span>
        </template>

        <template v-else-if="col.prop === 'createdAt'">
          <span class="text-gray-600 dark:text-gray-400">{{ formatDate(row.createdAt) }}</span>
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