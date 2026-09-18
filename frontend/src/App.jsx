import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import CreateAgentPage from './pages/CreateAgentPage'
import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path === '/create-agent') {
    return <CreateAgentPage />
  }

  return <LandingPage />
}

export default App
