import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function CreateAgentPage() {
  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  return (
    <div className="page">
      <Navbar onHomeClick={goHome} />
      <main className="placeholder">
        <p className="eyebrow">Coming next</p>
        <h1>Create Your Agent</h1>
        <p>
          This is a placeholder for the agent creation flow. The form and
          settings will live here in the next step.
        </p>
        <a className="btn btn-ghost" href="/" onClick={goHome}>
          Back to home
        </a>
      </main>
      <Footer />
    </div>
  )
}

export default CreateAgentPage
