import { useState } from 'react'
import { navigate } from '../utils/navigate'

function Navbar({ onHomeClick }) {
  const [open, setOpen] = useState(false)

  const currentPath = window.location.pathname
  const isLanding = currentPath === '/'

  function goHome(event) {
    event.preventDefault()
    setOpen(false)

    if (onHomeClick) {
      onHomeClick(event)
      return
    }

    navigate('/')
  }

  function goDashboard(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/dashboard')
  }

  function goCalls(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/calls')
  }

  function goAgent(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/create-agent')
  }

  function goSettings(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/settings')
  }

  function goLogin(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/login')
  }

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav-inner">

        {/* Voca Logo */}
        <a className="logo" href="/" onClick={goHome}>
          <span className="logo-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>

          Voca
        </a>

        {/* Mobile menu */}
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>

          {isLanding ? (
            <>
              <a href="/#how-it-works" onClick={closeMenu}>
                How it Works
              </a>

              <a href="/#features" onClick={closeMenu}>
                Features
              </a>

              <a href="/login" onClick={goLogin}>
                Sign In
              </a>

              <a
                className="btn btn-primary"
                href="/create-agent"
                onClick={goAgent}
              >
                Create Your Agent
              </a>
            </>
          ) : (
            <>
              <a href="/dashboard" onClick={goDashboard}>
                Dashboard
              </a>

              <a href="/calls" onClick={goCalls}>
                Calls
              </a>

              <a href="/create-agent" onClick={goAgent}>
                Agent
              </a>

              <a href="/settings" onClick={goSettings}>
                Settings
              </a>
            </>
          )}

        </nav>
      </div>
    </header>
  )
}

export default Navbar 