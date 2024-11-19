import { ref } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  return {
    isDark,
    toggleDarkMode
  }
}