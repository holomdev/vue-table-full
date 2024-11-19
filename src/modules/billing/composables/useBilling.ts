import { ref, computed } from 'vue'
import { faker } from '@faker-js/faker'
import type { Billing, SearchFilters } from '../types'
import { STATUS_OPTIONS } from '../constants'

export function useBilling() {
  const billings = ref<Billing[]>([])
  const searchFilters = ref<SearchFilters>({
    userName: ''
  })
  const visibleCount = ref(25)
  const previousVisibleCount = ref(25)
  const loading = ref(false)
  const selectedStatus = ref('todos')
  const selectedMonth = ref('all')

  const generateRandomDate = () => {
    const now = new Date()
    const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
    return faker.date.between({ from: sixMonthsAgo, to: now })
  }

  const generateBillings = () => {
    const generatedBillings: Billing[] = []
    for (let i = 0; i < 200; i++) {
      const dueDate = generateRandomDate()
      const status = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)]
      
      generatedBillings.push({
        id: i + 1,
        userId: faker.number.int({ min: 1, max: 100 }),
        userName: faker.person.fullName(),
        amount: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
        status,
        dueDate,
        paidAt: status === 'pagado' ? new Date(dueDate.getTime() + Math.random() * 86400000) : undefined
      })
    }
    billings.value = generatedBillings
  }

  const filteredBillings = computed(() => {
    let filtered = billings.value

    if (searchFilters.value.userName) {
      const query = searchFilters.value.userName.toLowerCase()
      filtered = filtered.filter(billing => 
        billing.userName.toLowerCase().includes(query)
      )
    }

    if (selectedStatus.value !== 'todos') {
      filtered = filtered.filter(billing => billing.status === selectedStatus.value)
    }

    if (selectedMonth.value !== 'all') {
      filtered = filtered.filter(billing => 
        billing.dueDate.getMonth() + 1 === parseInt(selectedMonth.value)
      )
    }

    return filtered
  })

  const displayedBillings = computed(() => {
    return filteredBillings.value.slice(0, visibleCount.value)
  })

  const loadMore = async () => {
    if (visibleCount.value < filteredBillings.value.length && !loading.value) {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      visibleCount.value += 25
      previousVisibleCount.value = visibleCount.value
      loading.value = false
    }
  }

  const hasMore = computed(() => {
    return visibleCount.value < filteredBillings.value.length
  })

  const applyFilters = () => {
    const filteredLength = filteredBillings.value.length
    if (filteredLength <= previousVisibleCount.value) {
      visibleCount.value = filteredLength
    } else {
      visibleCount.value = previousVisibleCount.value
    }
  }

  return {
    billings,
    searchFilters,
    selectedStatus,
    selectedMonth,
    filteredBillings,
    displayedBillings,
    hasMore,
    loading,
    generateBillings,
    loadMore,
    applyFilters
  }
}