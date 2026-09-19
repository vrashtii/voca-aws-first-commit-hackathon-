import { useEffect, useState } from 'react'

import LandingPage from './pages/LandingPage'
import CreateAgentPage from './pages/CreateAgentPage'
import DashboardPage from './pages/DashboardPage'
import CallsPage from './pages/CallsPage'
import CallDetailsPage from './pages/CallDetailsPage'
import AgentSettingsPage from './pages/AgentSettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  if (path === '/create-agent') {
    return <CreateAgentPage />
  }

  if (path === '/dashboard') {
    return <DashboardPage />
  }

  if (path === '/calls') {
    return <CallsPage />
  }

  if (path.startsWith('/calls/')) {
    return <CallDetailsPage />
  }
  if (path === '/settings') {
    return <AgentSettingsPage />
  }
  if (path === '/login') {
    return <LoginPage />
  }

  if (path === '/register') {
    return <RegisterPage />
  }

  return <LandingPage />
}

export default App