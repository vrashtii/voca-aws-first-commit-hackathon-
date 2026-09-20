import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function CreateAgentPage() {
  const [agentName, setAgentName] = useState('')
  const [greeting, setGreeting] = useState(
    'Hi, you’ve reached my AI voice assistant. How can I help you?'
  )
  const [voice, setVoice] = useState('Warm Female')
  const [available, setAvailable] = useState(true)

  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function handleCreateAgent(event) {
    event.preventDefault()

    if (!agentName.trim()) {
      alert('Please enter an agent name.')
      return
    }

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
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '70px 24px 90px',
        }}
      >
        <div style={{ maxWidth: '760px', marginBottom: '45px' }}>
          <p
            style={{
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.65,
              marginBottom: '14px',
            }}
          >
            Step 1 · Agent Setup
          </p>

          <h1
            style={{
              fontSize: 'clamp(38px, 6vw, 64px)',
              lineHeight: 1.05,
              margin: 0,
              marginBottom: '18px',
            }}
          >
            Create Your Agent
          </h1>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.68)',
              margin: 0,
            }}
          >
            Give your AI voice proxy a personality and decide how it should
            handle calls when you are unavailable.
          </p>
        </div>

        <form onSubmit={handleCreateAgent}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '24px',
            }}
          >
            <section
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '24px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <h2
                style={{
                  fontSize: '22px',
                  marginTop: 0,
                  marginBottom: '24px',
                }}
              >
                Basic information
              </h2>

              <label
                style={{
                  display: 'block',
                  marginBottom: '9px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Agent name
              </label>

              <input
                type="text"
                value={agentName}
                onChange={(event) => setAgentName(event.target.value)}
                placeholder="e.g. Voca Assistant"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  marginBottom: '24px',
                }}
              />

              <label
                style={{
                  display: 'block',
                  marginBottom: '9px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                First greeting
              </label>

              <textarea
                value={greeting}
                onChange={(event) => setGreeting(event.target.value)}
                rows="5"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  fontSize: '15px',
                  lineHeight: 1.5,
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            </section>

            <section
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '24px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <h2
                style={{
                  fontSize: '22px',
                  marginTop: 0,
                  marginBottom: '24px',
                }}
              >
                Voice settings
              </h2>

              <label
                style={{
                  display: 'block',
                  marginBottom: '9px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Voice
              </label>

              <select
                value={voice}
                onChange={(event) => setVoice(event.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: '#11111a',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  marginBottom: '28px',
                }}
              >
                <option>Warm Female</option>
                <option>Calm Male</option>
                <option>Professional Female</option>
                <option>Professional Male</option>
              </select>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '18px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div>
                  <p
                    style={{
                      margin: '0 0 5px',
                      fontWeight: '600',
                    }}
                  >
                    Accept calls
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    Let Voca answer calls when you are unavailable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAvailable(!available)}
                  style={{
                    width: '54px',
                    height: '30px',
                    borderRadius: '999px',
                    border: 'none',
                    background: available ? '#7c5cff' : '#33333d',
                    padding: '3px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: '0.2s',
                  }}
                  aria-label="Toggle call availability"
                >
                  <span
                    style={{
                      display: 'block',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      transform: available
                        ? 'translateX(24px)'
                        : 'translateX(0)',
                      transition: '0.2s',
                    }}
                  />
                </button>
              </div>
            </section>
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={goHome}
              style={{
                padding: '13px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#ffffff',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              ← Back to home
            </button>

            <button
              type="submit"
              style={{
                padding: '14px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #8b6cff, #5d45ff)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(100, 75, 255, 0.25)',
              }}
            >
              Create Agent →
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default CreateAgentPage