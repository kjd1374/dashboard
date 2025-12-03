import { useState, useEffect } from 'react'
import { WebService } from '../types'
import './ServiceForm.css'

interface ServiceFormProps {
  service: WebService | null
  categories: string[]
  onSave: (service: Omit<WebService, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

const ServiceForm = ({ service, categories, onSave, onCancel }: ServiceFormProps) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [localCategories, setLocalCategories] = useState<string[]>(categories)

  useEffect(() => {
    setLocalCategories(categories)
  }, [categories])

  useEffect(() => {
    if (service) {
      setName(service.name)
      setUrl(service.url)
      setCategory(service.category)
      setDescription(service.description || '')
    }
  }, [service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !url.trim() || !category.trim()) {
      alert('이름, URL, 카테고리는 필수 입력 항목입니다.')
      return
    }

    // URL 유효성 검사
    try {
      new URL(url)
    } catch {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        const fixedUrl = 'https://' + url
        onSave({
          name: name.trim(),
          url: fixedUrl,
          category: category.trim(),
          description: description.trim() || undefined,
        })
      } else {
        alert('올바른 URL을 입력해주세요.')
        return
      }
      return
    }

    onSave({
      name: name.trim(),
      url: url.trim(),
      category: category.trim(),
      description: description.trim() || undefined,
    })
  }

  const handleCategoryChange = (value: string) => {
    if (value === '새 카테고리') {
      setShowNewCategory(true)
      setCategory('')
    } else {
      setCategory(value)
      setShowNewCategory(false)
      setNewCategory('')
    }
  }

  const handleNewCategorySubmit = () => {
    const trimmedCategory = newCategory.trim()
    if (trimmedCategory) {
      // 새 카테고리를 로컬 카테고리 목록에 추가
      if (!localCategories.includes(trimmedCategory)) {
        setLocalCategories([...localCategories, trimmedCategory].sort())
      }
      setCategory(trimmedCategory)
      setShowNewCategory(false)
      setNewCategory('')
    } else {
      alert('카테고리 이름을 입력해주세요.')
    }
  }

  const handleNewCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNewCategorySubmit()
    }
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{service ? '서비스 수정' : '새 서비스 추가'}</h2>
          <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="name">서비스 이름 *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: GitHub"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL *</label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            {!showNewCategory ? (
              <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required={!showNewCategory}
              >
                <option value="">선택하세요</option>
                {localCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="새 카테고리">+ 새 카테고리 추가</option>
              </select>
            ) : (
              <div className="new-category-input">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={handleNewCategoryKeyPress}
                  placeholder="카테고리 이름"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleNewCategorySubmit}
                  className="btn-small"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategory(false)
                    setNewCategory('')
                    setCategory('')
                  }}
                  className="btn-small btn-cancel"
                >
                  취소
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">설명 (선택사항)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="서비스에 대한 간단한 설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {service ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceForm

