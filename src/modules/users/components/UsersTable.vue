<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUsers } from '../composables/useUsers'
import BaseTable from '@/components/base/BaseTable.vue'
import UsersTableFilters from './UsersTableFilters.vue'
import UsersTableColumns from './UsersTableColumns.vue'
import UsersTableColumnSelector from './UsersTableColumnSelector.vue'
import UserViewModal from './modals/UserViewModal.vue'
import UserEditModal from './modals/UserEditModal.vue'
import UserDeleteModal from './modals/UserDeleteModal.vue'
import { Plus } from '@element-plus/icons-vue'

const {
  searchFilters,
  selectedStatus,
  selectedWorkerType,
  selectedDateFilter,
  displayedUsers,
  hasMore,
  generateUsers,
  loadMore,
  applyFilters,
  loading,
  filteredUsers
} = useUsers()

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
  avatar: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  workerType: true,
  status: true,
  createdAt: true,
  actions: true
})

const handleView = (user) => {
  viewModal.value.data = user
  viewModal.value.isOpen = true
}

const handleEdit = (user) => {
  editModal.value.data = user
  editModal.value.isOpen = true
}

const handleDelete = (user) => {
  deleteModal.value.data = user
  deleteModal.value.isOpen = true
}

const handleCreate = () => {
  editModal.value.data = null
  editModal.value.isOpen = true
}

const handleSave = (data) => {
  console.log('Saving user:', data)
  // Aquí iría la lógica para guardar los cambios
  editModal.value.isOpen = false
}

const handleConfirmDelete = (id) => {
  console.log('Deleting user:', id)
  // Aquí iría la lógica para eliminar
  deleteModal.value.isOpen = false
}

watch(
  [
    () => searchFilters.value, 
    () => selectedStatus.value, 
    () => selectedWorkerType.value,
    () => selectedDateFilter.value
  ], 
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      applyFilters()
    }
  },
  { deep: true }
)

onMounted(() => {
  generateUsers()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex flex-wrap items-start gap-4 flex-1">
        <UsersTableFilters
          v-model:searchFilters="searchFilters"
          v-model:selectedStatus="selectedStatus"
          v-model:selectedWorkerType="selectedWorkerType"
          v-model:selectedDateFilter="selectedDateFilter"
          class="flex-1 min-w-[300px]"
        />
        <UsersTableColumnSelector
          v-model:visibleColumns="visibleColumns"
        />
      </div>
      <button 
        class="nextui-button nextui-button-primary flex items-center gap-2"
        @click="handleCreate"
      >
        <el-icon><Plus /></el-icon>
        Nuevo Usuario
      </button>
    </div>
    
    <BaseTable
      :data="displayedUsers"
      :loading="loading"
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <UsersTableColumns
        :visible-columns="visibleColumns"
        :search-filters="searchFilters"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </BaseTable>

    <div class="text-center text-sm text-gray-500 dark:text-gray-400">
      <span>Mostrando {{ displayedUsers.length }} de {{ filteredUsers.length }} usuarios</span>
      <span v-if="hasMore">
        {{ loading ? ' - Cargando más usuarios...' : ' - Desplázate para ver más' }}
      </span>
    </div>

    <UserViewModal
      v-model="viewModal.isOpen"
      :user="viewModal.data"
    />

    <UserEditModal
      v-model="editModal.isOpen"
      :user="editModal.data"
      @save="handleSave"
    />

    <UserDeleteModal
      v-model="deleteModal.isOpen"
      :user="deleteModal.data"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>