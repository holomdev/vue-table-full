export interface Billing {
  id: number
  userId: number
  userName: string
  amount: number
  status: 'pendiente' | 'pagado' | 'vencido' | 'cancelado'
  dueDate: Date
  paidAt?: Date
}

export interface SearchFilters {
  userName: string
}