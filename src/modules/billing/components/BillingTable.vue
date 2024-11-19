<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useBilling } from '../composables/useBilling'
import BaseTable from '@/components/base/BaseTable.vue'
import BillingTableFilters from './BillingTableFilters.vue'
import BillingTableColumns from './BillingTableColumns.vue'
import BillingViewModal from './modals/BillingViewModal.vue'
import BillingEditModal from './modals/BillingEditModal.vue'
import BillingDeleteModal from './modals/BillingDeleteModal.vue'
import BillingTableColumnSelector from './BillingTableColumnSelector.vue'
import { Plus } from '@element-plus/icons-vue'

const {
  searchFilters,
  selectedStatus,
  selectedMonth,
  displayedBillings,
  hasMore,
  generateBillings,
  loadMore,
  applyFilters,
  loading,
  filteredBillings
} = useBilling()

const viewModal = ref({
  isOpen: false,
  data: null
})

const editModal = ref({
  isOpen: false,
  data: null
})

const deleteModal = ref({
  isOpen: false,
  data: null
})

const visibleColumns = ref({
  id: true,
  userId: true,
  userName: true,
  amount: true,
  status: true,
  dueDate: true,
  paidAt: true,
  actions: true
})

const handleView = (billing) => {
  viewModal.value.data = billing
  viewModal.value.isOpen = true
}

const handleEdit = (billing) => {
  editModal.value.data = billing
  editModal.value.isOpen = true
}

const handleDelete = (billing) => {
  deleteModal.value.data = billing
  deleteModal.value.isOpen = true
}

const handleCreate = () => {
  editModal.value.data = null
  editModal.value.isOpen = true
}

const handleSave = (data) => {
  console.log('Saving billing:', data)
  // Aquí iría la lógica para guardar los cambios
  editModal.value.isOpen = false
}

const handleConfirmDelete = (id) => {
  console.log('Deleting billing:', id)
  // Aquí iría la lógica para eliminar
  deleteModal.value.isOpen = false
}

watch(
  [() => searchFilters.value, () => selectedStatus.value, () => selectedMonth.value], 
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      applyFilters()
    }
  },
  { deep: true }
)

onMounted(() => {
  generateBillings()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex flex-wrap items-start gap-4 flex-1">
        <BillingTableFilters
          v-model:searchFilters="searchFilters"
          v-model:selectedStatus="selectedStatus"
          v-model:selectedMonth="selectedMonth"
          class="flex-1 min-w-[300px]"
        />
        <BillingTableColumnSelector
          v-model:visibleColumns="visibleColumns"
        />
      </div>
      <button 
        class="nextui-button nextui-button-primary flex items-center gap-2"
        @click="handleCreate"
      >
        <el-icon><Plus /></el-icon>
        Nuevo Cobro
      </button>
    </div>
    
    <BaseTable
      :data="displayedBillings"
      :loading="loading"
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <BillingTableColumns
        :visible-columns="visibleColumns"
        :search-filters="searchFilters"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </BaseTable>

    <div class="text-center text-sm text-gray-500 dark:text-gray-400">
      <span>Mostrando {{ displayedBillings.length }} de {{ filteredBillings.length }} cobros</span>
      <span v-if="hasMore">
        {{ loading ? ' - Cargando más cobros...' : ' - Desplázate para ver más' }}
      </span>
    </div>

    <BillingViewModal
      v-model="viewModal.isOpen"
      :billing="viewModal.data"
    />

    <BillingEditModal
      v-model="editModal.isOpen"
      :billing="editModal.data"
      @save="handleSave"
    />

    <BillingDeleteModal
      v-model="deleteModal.isOpen"
      :billing="deleteModal.data"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>