<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    required: true
  },
  variants: {
    type: Object,
    default: () => ({
      activo: 'success',
      inactivo: 'danger',
      pausado: 'warning',
      vacacionando: 'primary',
      pendiente: 'warning',
      pagado: 'success',
      vencido: 'danger',
      cancelado: 'default'
    })
  }
})

const getStatusClass = (status: string) => {
  if (!status) return ''
  
  const variant = props.variants[status] || 'default'
  const classes = {
    success: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
  return `nextui-badge ${classes[variant]}`
}

const capitalizeStatus = (status: string) => {
  if (!status) return ''
  return status.charAt(0).toUpperCase() + status.slice(1)
}
</script>

<template>
  <span v-if="status" :class="getStatusClass(status)">
    {{ capitalizeStatus(status) }}
  </span>
  <span v-else class="nextui-badge bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
    -
  </span>
</template>