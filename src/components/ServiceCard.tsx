import { WebService } from '../types'
import './ServiceCard.css'

interface ServiceCardProps {
  service: WebService
  onEdit: () => void
  onDelete: () => void
}

const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  const handleClick = () => {
    window.open(service.url, '_blank')
  }

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch {
      return '/vite.svg'
    }
  }

  return (
    <div className="service-card">
      <div className="card-header">
        <div className="card-icon">
          <img
            src={getFaviconUrl(service.url)}
            alt={service.name}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = '/vite.svg'
            }}
          />
        </div>
        <div className="card-actions">
          <button className="btn-icon" onClick={onEdit} title="수정">
            ✏️
          </button>
          <button className="btn-icon" onClick={onDelete} title="삭제">
            🗑️
          </button>
        </div>
      </div>

      <div className="card-body" onClick={handleClick}>
        <h3 className="card-title">{service.name}</h3>
        {service.description && (
          <p className="card-description">{service.description}</p>
        )}
        <p className="card-url">{service.url}</p>
        <span className="card-category">{service.category}</span>
      </div>
    </div>
  )
}

export default ServiceCard

