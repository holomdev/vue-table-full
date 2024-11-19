import { ref, watch } from 'vue'

export function useDebounce<T>(source: any, delay = 300) {
  const debouncedValue = ref({ ...source.value })
  let timeout: NodeJS.Timeout

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = { ...newValue }
    }, delay)
  }, { deep: true })

  return debouncedValue
}