import { provide, inject } from 'vue'
import { useModal } from '@/composables/useModal'
import type { Billing } from '../types'

const BillingModalsKey = Symbol('BillingModals')

export function createBillingModals() {
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleSave = (data: Partial<Billing>) => {
    console.log('Saving billing:', data)
    // Aquí iría la lógica para guardar los cambios
  }

  const handleConfirmDelete = (id: number) => {
    console.log('Deleting billing:', id)
    // Aquí iría la lógica para eliminar
  }

  const modals = {
    viewModal,
    editModal,
    deleteModal,
    handleSave,
    handleConfirmDelete
  }

  provide(BillingModalsKey, modals)

  return modals
}

export function useBillingModals() {
  const modals = inject(BillingModalsKey)
  if (!modals) {
    throw new Error('BillingModals not provided')
  }
  return modals
}