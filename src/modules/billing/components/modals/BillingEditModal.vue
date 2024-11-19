<script setup lang="ts">
import { computed } from 'vue'
import { ElDialog, ElSelect, ElOption } from 'element-plus'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import type { Billing } from '../../types'
import { STATUS_OPTIONS } from '../../constants'

const props = defineProps<{
  modelValue: boolean
  billing: Billing | null
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const initialValues = computed(() => {
  if (props.billing) {
    return {
      userId: props.billing.userId.toString(),
      userName: props.billing.userName,
      amount: props.billing.amount.toString(),
      status: props.billing.status,
      dueDate: new Date(props.billing.dueDate).toISOString().split('T')[0]
    }
  }
  return {
    userId: '',
    userName: '',
    amount: '',
    status: 'pendiente',
    dueDate: new Date().toISOString().split('T')[0]
  }
})

const title = computed(() => 
  props.billing ? 'Editar Cobro' : 'Nuevo Cobro'
)

const schema = yup.object({
  userId: yup.string()
    .required('El ID de usuario es requerido')
    .matches(/^\d+$/, 'Debe ser un número')
    .test('positive', 'El ID debe ser mayor a 0', value => parseInt(value) > 0),
  userName: yup.string()
    .required('El nombre de usuario es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  amount: yup.string()
    .required('El monto es requerido')
    .matches(/^\d*\.?\d*$/, 'Debe ser un número válido')
    .test('positive', 'El monto debe ser mayor a 0', value => parseFloat(value) > 0),
  status: yup.string()
    .required('El estado es requerido')
    .oneOf(STATUS_OPTIONS, 'Estado inválido'),
  dueDate: yup.string()
    .required('La fecha de vencimiento es requerida')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValues.value
})

const onSubmit = handleSubmit((values) => {
  emit('save', { 
    id: props.billing?.id, 
    ...values,
    userId: parseInt(values.userId),
    amount: parseFloat(values.amount),
    dueDate: new Date(values.dueDate)
  })
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
    :title="title"
    width="400px"
    class="billing-modal"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
  >
    <Form
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="onSubmit"
      v-slot="{ errors, isSubmitting, setFieldValue }"
      class="space-y-4"
    >
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          ID Usuario
        </label>
        <Field
          name="userId"
          type="text"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.userId }"
        />
        <ErrorMessage name="userId" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nombre Usuario
        </label>
        <Field
          name="userName"
          type="text"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.userName }"
        />
        <ErrorMessage name="userName" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Monto
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Field
            name="amount"
            type="text"
            class="nextui-input w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
            :class="{ 'border-danger-500': errors.amount }"
          />
        </div>
        <ErrorMessage name="amount" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Estado
        </label>
        <Field name="status" v-slot="{ field }">
          <el-select
            v-model="field.value"
            class="w-full"
            :class="{ 'is-invalid': errors.status }"
            @change="value => setFieldValue('status', value)"
          >
            <el-option
              v-for="status in STATUS_OPTIONS"
              :key="status"
              :value="status"
              :label="status.charAt(0).toUpperCase() + status.slice(1)"
            />
          </el-select>
        </Field>
        <ErrorMessage name="status" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Fecha Vencimiento
        </label>
        <Field
          name="dueDate"
          type="date"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.dueDate }"
        />
        <ErrorMessage name="dueDate" class="text-xs text-danger-500" />
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <button
          type="button"
          class="nextui-button nextui-button-secondary px-4 py-2"
          @click="emit('update:modelValue', false)"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="nextui-button nextui-button-primary px-4 py-2"
          :disabled="isSubmitting"
        >
          Guardar
        </button>
      </div>
    </Form>
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
  @apply px-6 py-4 border-b border-gray-200 dark:border-gray-800;
}

.billing-modal :deep(.el-dialog__body) {
  @apply p-6;
}

.billing-modal :deep(.el-dialog__title) {
  @apply text-lg font-medium dark:text-gray-100;
}

.billing-modal :deep(.el-dialog__headerbtn) {
  @apply top-4 right-4;
}

.billing-modal :deep(.el-dialog__close) {
  @apply text-gray-400 hover:text-primary-500;
}

.billing-modal :deep(.el-select) {
  width: 100%;
}

.billing-modal :deep(.el-select .el-input__wrapper) {
  @apply bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg shadow-none;
  box-shadow: none !important;
}

.billing-modal :deep(.el-select .el-input__wrapper.is-focus) {
  @apply border-primary-400 ring-2 ring-primary-400 ring-opacity-50;
}

.dark .billing-modal :deep(.el-select .el-input__wrapper) {
  @apply bg-gray-900;
}

.dark .billing-modal :deep(.el-select-dropdown__item) {
  @apply text-gray-300;
}

.dark .billing-modal :deep(.el-select-dropdown__item.hover) {
  @apply bg-gray-800;
}

.dark .billing-modal :deep(.el-select-dropdown__item.selected) {
  @apply text-primary-400;
}

.dark .billing-modal :deep(.el-select-dropdown) {
  @apply bg-gray-900 border-gray-700;
}

.billing-modal input:focus,
.billing-modal select:focus {
  @apply border-primary-400 ring-2 ring-primary-400 ring-opacity-50 !important;
}
</style>