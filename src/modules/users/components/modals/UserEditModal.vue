<script setup lang="ts">
import { computed } from 'vue'
import { ElDialog, ElSelect, ElOption } from 'element-plus'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import type { User } from '../../types'
import { STATUS_OPTIONS, WORKER_TYPE_OPTIONS } from '../../constants'

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const initialValues = computed(() => {
  if (props.user) {
    return {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      phone: props.user.phone,
      workerType: props.user.workerType,
      status: props.user.status
    }
  }
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    workerType: 'empleado',
    status: 'activo'
  }
})

const title = computed(() => 
  props.user ? 'Editar Usuario' : 'Nuevo Usuario'
)

const schema = yup.object({
  firstName: yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: yup.string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: yup.string()
    .required('El email es requerido')
    .email('Email inválido'),
  phone: yup.string()
    .required('El teléfono es requerido')
    .min(10, 'El teléfono debe tener al menos 10 dígitos'),
  workerType: yup.string()
    .required('El tipo es requerido')
    .oneOf(WORKER_TYPE_OPTIONS, 'Tipo inválido'),
  status: yup.string()
    .required('El estado es requerido')
    .oneOf(STATUS_OPTIONS, 'Estado inválido')
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValues.value
})

const onSubmit = handleSubmit((values) => {
  emit('save', {
    id: props.user?.id,
    ...values,
    createdAt: props.user?.createdAt || new Date(),
    avatar: props.user?.avatar || `https://i.pravatar.cc/150?u=${Math.random()}`
  })
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
    :title="title"
    width="400px"
    class="user-modal"
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
          Nombre
        </label>
        <Field
          name="firstName"
          type="text"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.firstName }"
        />
        <ErrorMessage name="firstName" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Apellido
        </label>
        <Field
          name="lastName"
          type="text"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.lastName }"
        />
        <ErrorMessage name="lastName" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <Field
          name="email"
          type="email"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.email }"
        />
        <ErrorMessage name="email" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Teléfono
        </label>
        <Field
          name="phone"
          type="tel"
          class="nextui-input w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-900 dark:border-gray-700"
          :class="{ 'border-danger-500': errors.phone }"
        />
        <ErrorMessage name="phone" class="text-xs text-danger-500" />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tipo
        </label>
        <Field name="workerType" v-slot="{ field }">
          <el-select
            v-model="field.value"
            class="w-full"
            :class="{ 'is-invalid': errors.workerType }"
            @change="value => setFieldValue('workerType', value)"
          >
            <el-option
              v-for="type in WORKER_TYPE_OPTIONS"
              :key="type"
              :value="type"
              :label="type.charAt(0).toUpperCase() + type.slice(1)"
            />
          </el-select>
        </Field>
        <ErrorMessage name="workerType" class="text-xs text-danger-500" />
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
.user-modal {
  @apply rounded-lg;
}

.dark .user-modal {
  --el-dialog-bg-color: #18181b !important;
  --el-dialog-border-color: #27272a !important;
}

.user-modal :deep(.el-dialog__header) {
  @apply px-6 py-4 border-b border-gray-200 dark:border-gray-800;
}

.user-modal :deep(.el-dialog__body) {
  @apply p-6;
}

.user-modal :deep(.el-dialog__title) {
  @apply text-lg font-medium dark:text-gray-100;
}

.user-modal :deep(.el-dialog__headerbtn) {
  @apply top-4 right-4;
}

.user-modal :deep(.el-dialog__close) {
  @apply text-gray-400 hover:text-primary-500;
}

.user-modal :deep(.el-select) {
  width: 100%;
}

.user-modal :deep(.el-select .el-input__wrapper) {
  @apply bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg shadow-none;
  box-shadow: none !important;
}

.user-modal :deep(.el-select .el-input__wrapper.is-focus) {
  @apply border-primary-400 ring-2 ring-primary-400 ring-opacity-50;
}

.dark .user-modal :deep(.el-select .el-input__wrapper) {
  @apply bg-gray-900;
}

.dark .user-modal :deep(.el-select-dropdown__item) {
  @apply text-gray-300;
}

.dark .user-modal :deep(.el-select-dropdown__item.hover) {
  @apply bg-gray-800;
}

.dark .user-modal :deep(.el-select-dropdown__item.selected) {
  @apply text-primary-400;
}

.dark .user-modal :deep(.el-select-dropdown) {
  @apply bg-gray-900 border-gray-700;
}

.user-modal input:focus,
.user-modal select:focus {
  @apply border-primary-400 ring-2 ring-primary-400 ring-opacity-50 !important;
}
</style>