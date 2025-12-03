import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="서비스 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  )
}

export default SearchBar

