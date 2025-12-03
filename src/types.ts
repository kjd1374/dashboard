export interface WebService {
  id: string
  name: string
  url: string
  category: string
  description?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  name: string
  color: string
}

