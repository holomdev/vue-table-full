<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable } from 'element-plus'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load-more'])

const tableRef = ref()

const handleScroll = (event) => {
  const scrollElement = event.target
  const { scrollTop, scrollHeight, clientHeight } = scrollElement
  const threshold = 50

  if (scrollHeight - scrollTop - clientHeight <= threshold && props.hasMore && !props.loading) {
    emit('load-more')
  }
}

onMounted(() => {
  const tableBody = tableRef.value?.$el.querySelector('.el-scrollbar__wrap')
  if (tableBody) {
    tableBody.addEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="relative rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <el-table
      ref="tableRef"
      :data="data"
      height="500"
      class="nextui-table"
      v-loading="loading"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<style>
:deep(.el-table) {
  --el-table-border-color: transparent !important;
  --el-table-header-bg-color: transparent !important;
  --el-table-header-text-color: #666 !important;
  --el-table-row-hover-bg-color: #f9fafb !important;
}

.dark :deep(.el-table) {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-header-text-color: #a1a1aa !important;
  --el-table-text-color: #e4e4e7 !important;
  --el-table-row-hover-bg-color: #18181b !important;
}

:deep(.el-table__inner-wrapper) {
  @apply rounded-xl overflow-hidden;
}

:deep(.el-loading-mask) {
  @apply rounded-xl;
}
</style>