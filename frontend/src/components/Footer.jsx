import { navigate } from '../utils/navigate'

function Footer() {
  function goCreate(event) {
    event.preventDefault()
    navigate('/create-agent')
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="logo footer-logo">Voca</p>
          <p className="footer-copy">
            An AI voice proxy that answers when you cannot, then gives you a
            useful summary of what happened.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <a href="/#how-it-works">How it Works</a>
          <a href="/#features">Features</a>
          <a href="/create-agent" onClick={goCreate}>
            Create Your Agent
          </a>
        </nav>
      </div>
      <p className="footer-note">Built for an AWS hackathon demo.</p>
    </footer>
  )
}

export default Footer
