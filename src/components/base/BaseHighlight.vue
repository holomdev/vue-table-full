<script setup lang="ts">
import { useHighlight } from '@/composables/useHighlight'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  searchTerm: {
    type: String,
    default: ''
  }
})

const { highlightText } = useHighlight()
</script>

<template>
  <span v-html="highlightText(text, searchTerm)"></span>
</template>

<style>
.highlight {
  background-color: #fbbf24;
  color: white;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  margin: -0.125rem 0;
  display: inline-block;
}

.dark .highlight {
  background-color: #d97706;
}
</style>