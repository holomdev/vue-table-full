import { computed } from 'vue'

export function useHighlight() {
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="highlight">$1</mark>')
  }

  return {
    highlightText
  }
}