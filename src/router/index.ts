import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/users/UsersView.vue'
import BillingView from '@/views/billing/BillingView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/billing',
      name: 'billing',
      component: BillingView
    }
  ]
})

export default router