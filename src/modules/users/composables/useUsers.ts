import { ref, computed } from 'vue'
import { faker } from '@faker-js/faker'
import type { User, SearchFilters } from '../types'
import { STATUS_OPTIONS, WORKER_TYPE_OPTIONS, DATE_FILTER_OPTIONS } from '../constants'

export function useUsers() {
  const users = ref<User[]>([])
  const searchFilters = ref<SearchFilters>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const visibleCount = ref(25)
  const previousVisibleCount = ref(25)
  const loading = ref(false)
  const selectedStatus = ref('todos')
  const selectedWorkerType = ref('todos')
  const selectedDateFilter = ref('todos')

  const generateRandomDate = () => {
    const now = new Date()
    const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
    return faker.date.between({ from: sixMonthsAgo, to: now })
  }

  const generateUsers = () => {
    const generatedUsers: User[] = []
    for (let i = 0; i < 1000; i++) {
      generatedUsers.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        status: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
        workerType: WORKER_TYPE_OPTIONS[Math.floor(Math.random() * WORKER_TYPE_OPTIONS.length)],
        createdAt: generateRandomDate(),
        avatar: faker.image.avatar()
      })
    }
    users.value = generatedUsers
  }

  const isWithinDays = (date: Date, days: number) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= days
  }

  const filteredUsers = computed(() => {
    let filtered = users.value

    if (searchFilters.value.firstName) {
      const query = searchFilters.value.firstName.toLowerCase()
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(query)
      )
    }

    if (searchFilters.value.lastName) {
      const query = searchFilters.value.lastName.toLowerCase()
      filtered = filtered.filter(user => 
        user.lastName.toLowerCase().includes(query)
      )
    }

    if (searchFilters.value.email) {
      const query = searchFilters.value.email.toLowerCase()
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(query)
      )
    }

    if (searchFilters.value.phone) {
      const query = searchFilters.value.phone.toLowerCase()
      filtered = filtered.filter(user => 
        user.phone.toLowerCase().includes(query)
      )
    }

    if (selectedStatus.value !== 'todos') {
      filtered = filtered.filter(user => user.status === selectedStatus.value)
    }

    if (selectedWorkerType.value !== 'todos') {
      filtered = filtered.filter(user => user.workerType === selectedWorkerType.value)
    }

    if (selectedDateFilter.value !== 'todos') {
      const days = {
        'ultimos7dias': 7,
        'ultimos30dias': 30,
        'ultimos60dias': 60
      }[selectedDateFilter.value]

      filtered = filtered.filter(user => isWithinDays(user.createdAt, days))
    }

    return filtered
  })

  const displayedUsers = computed(() => {
    return filteredUsers.value.slice(0, visibleCount.value)
  })

  const loadMore = async () => {
    if (visibleCount.value < filteredUsers.value.length && !loading.value) {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      visibleCount.value += 25
      previousVisibleCount.value = visibleCount.value
      loading.value = false
    }
  }

  const hasMore = computed(() => {
    return visibleCount.value < filteredUsers.value.length
  })

  const applyFilters = () => {
    const filteredLength = filteredUsers.value.length
    if (filteredLength <= previousVisibleCount.value) {
      visibleCount.value = filteredLength
    } else {
      visibleCount.value = previousVisibleCount.value
    }
  }

  return {
    users,
    searchFilters,
    selectedStatus,
    selectedWorkerType,
    selectedDateFilter,
    filteredUsers,
    displayedUsers,
    hasMore,
    loading,
    generateUsers,
    loadMore,
    applyFilters
  }
}