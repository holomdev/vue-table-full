export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'activo' | 'inactivo' | 'pausado' | 'vacacionando'
  workerType: 'empleado' | 'empleador'
  createdAt: Date
  avatar: string
}

export interface SearchFilters {
  firstName: string
  lastName: string
  email: string
  phone: string
}