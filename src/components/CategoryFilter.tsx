import './CategoryFilter.css'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selected === '전체' ? 'active' : ''}`}
        onClick={() => onSelect('전체')}
      >
        전체
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`category-btn ${selected === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter

