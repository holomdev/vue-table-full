<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Usuarios', path: '/users' },
  { name: 'Facturación', path: '/billing' }
]

const isActive = (path: string) => computed(() => route.path === path)
</script>

<template>
  <nav class="flex space-x-1">
    <router-link
      v-for="item in navigation"
      :key="item.path"
      :to="item.path"
      :class="[
        'px-4 py-2 text-sm font-medium rounded-md transition-colors',
        isActive(item.path)
          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
      ]"
    >
      {{ item.name }}
    </router-link>
  </nav>
</template>