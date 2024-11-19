<script setup lang="ts">
import { ElPopover, ElCheckbox } from 'element-plus'

const columnDefinitions = [
  { prop: 'id', label: 'ID', minWidth: '80' },
  { prop: 'avatar', label: 'Avatar', minWidth: '60' },
  { prop: 'firstName', label: 'Nombre', minWidth: '140' },
  { prop: 'lastName', label: 'Apellido', minWidth: '140' },
  { prop: 'email', label: 'Email', minWidth: '230' },
  { prop: 'phone', label: 'Teléfono', minWidth: '150' },
  { prop: 'workerType', label: 'Tipo', minWidth: '120' },
  { prop: 'status', label: 'Estado', minWidth: '120' },
  { prop: 'createdAt', label: 'Fecha Alta', minWidth: '150' },
  { prop: 'actions', label: 'Acciones', minWidth: '180' }
]

const props = defineProps({
  visibleColumns: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:visibleColumns'])
</script>

<template>
  <el-popover
    placement="bottom-end"
    :width="240"
    trigger="click"
    popper-class="nextui-popover"
  >
    <template #reference>
      <button class="nextui-button nextui-button-secondary">
        Columnas
      </button>
    </template>
    
    <div class="space-y-2">
      <label 
        v-for="col in columnDefinitions"
        :key="col.prop"
        class="nextui-checkbox"
      >
        <el-checkbox 
          :model-value="visibleColumns[col.prop]"
          @update:modelValue="value => emit('update:visibleColumns', { ...visibleColumns, [col.prop]: value })"
        >
          {{ col.label }}
        </el-checkbox>
      </label>
    </div>
  </el-popover>
</template>

<style>
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
}

:deep(.el-checkbox__label) {
  font-size: 0.875rem !important;
}
</style>