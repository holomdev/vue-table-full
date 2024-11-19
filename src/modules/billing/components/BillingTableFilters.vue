<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElInput, ElPopover, ElButton, ElRadioGroup, ElRadio } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { STATUS_OPTIONS, MONTH_OPTIONS } from '../constants'
import { useDebounce } from '@/composables/useDebounce'

const props = defineProps({
  searchFilters: {
    type: Object,
    required: true
  },
  selectedStatus: {
    type: String,
    required: true
  },
  selectedMonth: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  'update:searchFilters',
  'update:selectedStatus',
  'update:selectedMonth'
])

const localSearchFilters = ref({ ...props.searchFilters })
const debouncedSearchFilters = useDebounce(localSearchFilters)

watch(debouncedSearchFilters, (newVal) => {
  emit('update:searchFilters', newVal)
}, { deep: true })

watch(() => props.searchFilters, (newVal) => {
  if (JSON.stringify(localSearchFilters.value) !== JSON.stringify(newVal)) {
    localSearchFilters.value = { ...newVal }
  }
}, { deep: true })
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <div class="flex-1 min-w-[200px]">
      <el-input
        v-model="localSearchFilters.userName"
        placeholder="Buscar por nombre..."
        class="nextui-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
    
    <el-popover
      placement="bottom-start"
      trigger="click"
      :width="240"
      popper-class="nextui-popover"
    >
      <template #reference>
        <button class="nextui-button nextui-button-secondary">
          Filtros
        </button>
      </template>
      
      <div class="space-y-4">
        <div>
          <h4 class="mb-2 text-sm font-medium">Estado</h4>
          <el-radio-group 
            :model-value="selectedStatus"
            @update:modelValue="value => emit('update:selectedStatus', value)"
            class="nextui-radio-group"
          >
            <div class="flex items-start">
              <el-radio label="todos" class="!mr-0">Todos</el-radio>
            </div>
            <div v-for="status in STATUS_OPTIONS" :key="status" class="flex items-start">
              <el-radio :label="status" class="!mr-0">
                {{ status.charAt(0).toUpperCase() + status.slice(1) }}
              </el-radio>
            </div>
          </el-radio-group>
        </div>

        <div>
          <h4 class="mb-2 text-sm font-medium">Mes</h4>
          <el-radio-group 
            :model-value="selectedMonth"
            @update:modelValue="value => emit('update:selectedMonth', value)"
            class="nextui-radio-group"
          >
            <div v-for="month in MONTH_OPTIONS" :key="month.value" class="flex items-start">
              <el-radio :label="month.value" class="!mr-0">
                {{ month.label }}
              </el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style>
:deep(.el-input__wrapper) {
  @apply border border-gray-300 rounded-lg shadow-none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.el-input__wrapper.is-focus) {
  @apply border-primary-400 ring-2 ring-primary-400 ring-opacity-50 !important;
}

:deep(.el-input__inner) {
  height: 40px !important;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
}

:deep(.el-radio__label) {
  font-size: 0.875rem !important;
}

:deep(.el-radio) {
  @apply flex items-center h-8 w-full !m-0;
}

:deep(.el-radio__input) {
  @apply !mr-2;
}

.dark :deep(.el-radio__label) {
  @apply text-gray-300;
}
</style>