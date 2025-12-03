import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { WebService } from './types'
import './App.css'

function App() {
  const [services, setServices] = useState<WebService[]>([])

  useEffect(() => {
    // 로컬 스토리지에서 데이터 로드
    const saved = localStorage.getItem('webServices')
    if (saved) {
      try {
        setServices(JSON.parse(saved))
      } catch (e) {
        console.error('데이터 로드 실패:', e)
      }
    }
  }, [])

  const saveServices = (newServices: WebService[]) => {
    setServices(newServices)
    localStorage.setItem('webServices', JSON.stringify(newServices))
  }

  return (
    <div className="app">
      <Dashboard services={services} onUpdate={saveServices} />
    </div>
  )
}

export default App

