import { useState, useMemo } from 'react'
import ServiceCard from './ServiceCard'
import ServiceForm from './ServiceForm'
import CategoryFilter from './CategoryFilter'
import SearchBar from './SearchBar'
import { WebService } from '../types'
import './Dashboard.css'

interface DashboardProps {
  services: WebService[]
  onUpdate: (services: WebService[]) => void
}

const Dashboard = ({ services, onUpdate }: DashboardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingService, setEditingService] = useState<WebService | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => {
    const cats = new Set(services.map(s => s.category))
    return Array.from(cats).sort()
  }, [services])

  const filteredServices = useMemo(() => {
    let filtered = services

    if (selectedCategory !== '전체') {
      filtered = filtered.filter(s => s.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.url.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }, [services, selectedCategory, searchQuery])

  const handleAdd = () => {
    setEditingService(null)
    setIsFormOpen(true)
  }

  const handleEdit = (service: WebService) => {
    setEditingService(service)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = services.filter(s => s.id !== id)
      onUpdate(updated)
    }
  }

  const handleSave = (service: WebService) => {
    if (editingService) {
      // 수정
      const updated = services.map(s =>
        s.id === editingService.id
          ? { ...service, id: editingService.id, updatedAt: new Date().toISOString() }
          : s
      )
      onUpdate(updated)
    } else {
      // 추가
      const newService: WebService = {
        ...service,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      onUpdate([...services, newService])
    }
    setIsFormOpen(false)
    setEditingService(null)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingService(null)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌐 웹 서비스 대시보드</h1>
        <p className="subtitle">자주 사용하는 웹 서비스를 한눈에 관리하세요</p>
      </header>

      <div className="dashboard-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <button className="btn-add" onClick={handleAdd}>
          + 서비스 추가
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="services-grid">
        {filteredServices.length === 0 ? (
          <div className="empty-state">
            <p>표시할 서비스가 없습니다.</p>
            <p className="empty-hint">새 서비스를 추가해보세요!</p>
          </div>
        ) : (
          filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() => handleEdit(service)}
              onDelete={() => handleDelete(service.id)}
            />
          ))
        )}
      </div>

      {isFormOpen && (
        <ServiceForm
          service={editingService}
          categories={categories}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default Dashboard

