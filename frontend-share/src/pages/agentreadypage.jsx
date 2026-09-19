import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function AgentReadyPage() {
  const agentId = localStorage.getItem('voca_agent_id')

  let settings = {}

  try {
    settings = JSON.parse(
      localStorage.getItem('voca_agent_settings') || '{}'
    )
  } catch {
    settings = {}
  }

  function goTestAgent(event) {
    if (event) event.preventDefault()

    if (!agentId) {
      alert('No Voca agent found. Please create your agent first.')
      navigate('/create-agent')
      return
    }

    navigate('/test-agent')
  }

  function goDashboard(event) {
    if (event) event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(81, 62, 255, 0.18), transparent 35%), #050509',
        color: '#ffffff',
      }}
    >
      <Navbar />

      <main
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
        }}
      >
        <section
          style={{
            width: '100%',
            maxWidth: '700px',
            textAlign: 'center',
            padding: '55px 35px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#7c5cff',
              fontSize: '32px',
            }}
          >
            ✓
          </div>

          <p
            style={{
              margin: '0 0 10px',
              color: '#a995ff',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Agent Ready
          </p>

          <h1
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(38px, 6vw, 58px)',
              lineHeight: 1.05,
            }}
          >
            Your Voca agent is ready.
          </h1>

          <p
            style={{
              margin: '0 auto',
              maxWidth: '560px',
              color: 'rgba(255,255,255,0.62)',
              fontSize: '16px',
              lineHeight: 1.7,
            }}
          >
            Your agent has been created successfully. Test a real
            conversation with your configured profile before continuing
            to your dashboard.
          </p>

          {settings.voice && (
            <p
              style={{
                marginTop: '22px',
                color: 'rgba(255,255,255,0.45)',
                fontSize: '14px',
              }}
            >
              Voice preference: {settings.voice}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '32px',
            }}
          >
            <button
              type="button"
              onClick={goTestAgent}
              style={{
                padding: '14px 24px',
                borderRadius: '10px',
                border: 'none',
                background: '#7c5cff',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Test Your Agent →
            </button>

            <button
              type="button"
              onClick={goDashboard}
              style={{
                padding: '14px 24px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'transparent',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AgentReadyPage