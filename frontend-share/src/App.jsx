import { useEffect, useState } from 'react'

import LandingPage from './pages/LandingPage'
import CreateAgentPage from './pages/CreateAgentPage'
import AgentReadyPage from './pages/agentreadypage'
import TestAgentPage from "./pages/testagentpages";
import DashboardPage from './pages/DashboardPage'
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

  if (path === '/agent-ready') {
    return <AgentReadyPage />
  }

  if (path === '/test-agent') {
    return <TestAgentPage />
  }

  if (path === '/dashboard') {
    return <DashboardPage />
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