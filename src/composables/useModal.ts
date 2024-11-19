import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const data = ref<any>(null)

  const open = (payload: any = null) => {
    data.value = payload
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    // Clean up data after modal closes
    setTimeout(() => {
      data.value = null
    }, 300)
  }

  return {
    isOpen,
    data,
    open,
    close
  }
}