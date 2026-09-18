import { useState } from 'react'
import { navigate } from '../utils/navigate'

function Navbar({ onHomeClick }) {
  const [open, setOpen] = useState(false)

  function goHome(event) {
    event.preventDefault()
    setOpen(false)
    if (onHomeClick) {
      onHomeClick()
      return
    }
    navigate('/')
  }

  function goCreate(event) {
    event.preventDefault()
    setOpen(false)
    navigate('/create-agent')
  }

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="/" onClick={goHome}>
          <span className="logo-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Voca
        </a>

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
          <a href="/#how-it-works" onClick={closeMenu}>
            How it Works
          </a>
          <a href="/#features" onClick={closeMenu}>
            Features
          </a>
          <a className="btn btn-primary" href="/create-agent" onClick={goCreate}>
            Create Your Agent
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
