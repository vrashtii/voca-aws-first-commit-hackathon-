import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function AgentSettingsPage() {
  const [agentName, setAgentName] = useState('Voca Assistant')
  const [greeting, setGreeting] = useState(
    "Hi, you've reached my AI voice assistant. How can I help you?"
  )
  const [voice, setVoice] = useState('Warm Female')
  const [acceptCalls, setAcceptCalls] = useState(true)
  const [saved, setSaved] = useState(false)

  function goDashboard(event) {
    if (event) event.preventDefault()
    navigate('/dashboard')
  }

  function handleSave(event) {
    event.preventDefault()
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div
      className="page"
      style={{
        background: '#f7f8fa',
        minHeight: '100vh',
      }}
    >
      <Navbar onHomeClick={goDashboard} />

      <main
        style={{
          maxWidth: '1050px',
          margin: '0 auto',
          padding: '42px 24px 70px',
        }}
      >
        <button
          type="button"
          onClick={goDashboard}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            marginBottom: '16px',
            color: '#667085',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ← Back to Dashboard
        </button>

        <div style={{ marginBottom: '28px' }}>
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#737d82',
            }}
          >
            Agent Settings
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: '40px',
              lineHeight: 1.1,
              color: '#172033',
            }}
          >
            Manage your Voca agent
          </h1>

          <p
            style={{
              margin: '10px 0 0',
              maxWidth: '650px',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#667085',
            }}
          >
            Update your agent's identity, voice and call availability.
          </p>
        </div>

        <form onSubmit={handleSave}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            {/* Agent profile */}
            <section
              style={{
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(186,190,191,0.45)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(23,32,51,0.05)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 20px',
                  fontSize: '19px',
                  color: '#172033',
                }}
              >
                Agent Profile
              </h2>

              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#344054',
                }}
              >
                Agent name
              </label>

              <input
                value={agentName}
                onChange={(event) => setAgentName(event.target.value)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 13px',
                  marginBottom: '20px',
                  borderRadius: '9px',
                  border: '1px solid #d0d5dd',
                  background: '#ffffff',
                  color: '#172033',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />

              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#344054',
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
                  padding: '12px 13px',
                  marginBottom: '22px',
                  borderRadius: '9px',
                  border: '1px solid #d0d5dd',
                  background: '#ffffff',
                  color: '#172033',
                  fontSize: '14px',
                  lineHeight: 1.55,
                  resize: 'vertical',
                  outline: 'none',
                }}
              />

              <h2
                style={{
                  margin: '0 0 18px',
                  fontSize: '19px',
                  color: '#172033',
                }}
              >
                Voice
              </h2>

              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#344054',
                }}
              >
                Voice style
              </label>

              <select
                value={voice}
                onChange={(event) => setVoice(event.target.value)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 13px',
                  borderRadius: '9px',
                  border: '1px solid #d0d5dd',
                  background: '#ffffff',
                  color: '#172033',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option>Warm Female</option>
                <option>Calm Male</option>
                <option>Professional Female</option>
                <option>Professional Male</option>
              </select>

              <div
                style={{
                  marginTop: '18px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: '#f5f6f7',
                  border: '1px solid #e4e7e9',
                }}
              >
                <p
                  style={{
                    margin: '0 0 10px',
                    fontSize: '12px',
                    color: '#667085',
                  }}
                >
                  Voice preview
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    height: '36px',
                  }}
                >
                  {[15, 24, 18, 30, 21, 27, 16, 23, 14].map(
                    (height, index) => (
                      <span
                        key={index}
                        style={{
                          width: '5px',
                          height: `${height}px`,
                          borderRadius: '999px',
                          background:
                            index % 2 === 0 ? '#737d82' : '#babebf',
                        }}
                      />
                    )
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: '10px',
                    padding: '9px 13px',
                    borderRadius: '8px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  ▶ Play preview
                </button>
              </div>
            </section>

            {/* Availability */}
            <section
              style={{
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(186,190,191,0.45)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(23,32,51,0.05)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: '19px',
                  color: '#172033',
                }}
              >
                Call Availability
              </h2>

              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: '#667085',
                }}
              >
                Decide whether Voca should answer incoming calls for you.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e7eaed',
                }}
              >
                <div>
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#344054',
                    }}
                  >
                    Accept incoming calls
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#667085',
                    }}
                  >
                    Voca will answer when you are unavailable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAcceptCalls(!acceptCalls)}
                  style={{
                    width: '52px',
                    height: '30px',
                    padding: '3px',
                    border: 'none',
                    borderRadius: '999px',
                    background: acceptCalls ? '#737d82' : '#d0d5dd',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      transform: acceptCalls
                        ? 'translateX(22px)'
                        : 'translateX(0)',
                      transition: 'transform 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  />
                </button>
              </div>

              <div
                style={{
                  marginTop: '18px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e7eaed',
                }}
              >
                <p
                  style={{
                    margin: '0 0 5px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#344054',
                  }}
                >
                  Current schedule
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  Always on · 24 / 7
                </p>
              </div>

              <div
                style={{
                  marginTop: '18px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e7eaed',
                }}
              >
                <p
                  style={{
                    margin: '0 0 7px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#344054',
                  }}
                >
                  Agent status
                </p>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    background: '#ecfdf3',
                    color: '#15803d',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#16a34a',
                    }}
                  />
                  Active
                </span>
              </div>
            </section>
          </div>

          {/* Save bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '14px',
              marginTop: '22px',
            }}
          >
            {saved && (
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#15803d',
                }}
              >
                ✓ Changes saved
              </span>
            )}

            <button
              type="submit"
              style={{
                minHeight: '44px',
                padding: '0 20px',
                borderRadius: '9px',
                border: 'none',
                background: '#5f696e',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 5px 14px rgba(95,105,110,0.18)',
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default AgentSettingsPage