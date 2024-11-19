<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import BaseNavigation from './BaseNavigation.vue'
import { Moon, Sunny } from '@element-plus/icons-vue'

const { isDark, toggleDarkMode } = useTheme()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="flex-shrink-0">
              <img class="h-8 w-auto" src="@/assets/logo.svg" alt="Tableable" />
            </router-link>
            <div class="hidden md:block">
              <BaseNavigation />
            </div>
          </div>
          <div class="flex items-center">
            <button 
              class="nextui-button nextui-button-secondary !p-2"
              @click="toggleDarkMode"
            >
              <el-icon v-if="isDark"><Moon /></el-icon>
              <el-icon v-else><Sunny /></el-icon>
            </button>
          </div>
        </div>
        <div class="md:hidden py-2">
          <BaseNavigation />
        </div>
      </div>
    </header>

    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>