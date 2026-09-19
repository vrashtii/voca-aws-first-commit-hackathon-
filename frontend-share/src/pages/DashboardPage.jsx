{/*import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

const API_BASE = 'http://127.0.0.1:8000'

function DashboardPage() {
  const [calls, setCalls] = useState([])
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const agentId = localStorage.getItem('voca_agent_id')

  useEffect(() => {
    async function loadDashboard() {
      if (!agentId) {
        setLoading(false)
        return
      }

      try {
        setError('')

        const [agentResponse, callsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/agents/${agentId}`),
          fetch(`${API_BASE}/api/calls`),
        ])

        if (agentResponse.ok) {
          const agentData = await agentResponse.json()
          setAgent(agentData)
        }

        if (!callsResponse.ok) {
          throw new Error('Could not load calls.')
        }

        const callsData = await callsResponse.json()

        const actualCalls = Array.isArray(callsData)
          ? callsData.filter(
              (call) =>
                Number(call.agent_id) === Number(agentId)
            )
          : []

        setCalls(actualCalls)
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError(
          'Could not load dashboard data. Make sure the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [agentId])

  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goCreateAgent(event) {
    if (event) event.preventDefault()
    navigate('/create-agent')
  }

  function goTestAgent(event) {
    if (event) event.preventDefault()
    navigate('/test-agent')
  }

  function goCalls(event) {
    if (event) event.preventDefault()
    navigate('/calls')
  }

  function goSettings(event) {
    if (event) event.preventDefault()
    navigate('/settings')
  }

  function openCall(event, id) {
    if (event) event.preventDefault()
    navigate(`/calls/${id}`)
  }

  const handledCalls = calls.filter(
    (call) =>
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
  )

  const failedCalls = calls.filter(
    (call) =>
      call.status === 'failed' ||
      call.status === 'Failed'
  )

  const stats = [
    {
      label: 'Calls Handled',
      value: handledCalls.length,
    },
    {
      label: 'Total Calls',
      value: calls.length,
    },
    {
      label: 'Failed Calls',
      value: failedCalls.length,
    },
    {
      label: 'Avg. Call Duration',
      value: '—',
    },
  ]

  const voiceSettings = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('voca_agent_settings') || '{}'
      )
    } catch {
      return {}
    }
  })()

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  function getCallStatus(call) {
    if (
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
    ) {
      return 'Completed'
    }

    if (
      call.status === 'failed' ||
      call.status === 'Failed'
    ) {
      return 'Failed'
    }

    if (
      call.status === 'pending' ||
      call.status === 'Pending'
    ) {
      return 'Pending'
    }

    return call.status || 'Unknown'
  }

  function getCallSummary(call) {
  if (!call?.summary) {
    return 'No summary available for this call yet.'
  }

  try {
    const summary =
      typeof call.summary === 'string'
        ? JSON.parse(call.summary)
        : call.summary

    if (summary?.information_collected?.length) {
      return summary.information_collected.join(' • ')
    }

    if (summary?.intent) {
      return `Intent: ${String(summary.intent)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())}`
    }

    if (summary?.text) {
      return summary.text
    }

    return 'Call completed successfully.'
  } catch {
    const text = String(call.summary)

    if (text.length > 180) {
      return `${text.slice(0, 180)}...`
    }

    return text
  }
}

    if (call.transcript && String(call.transcript).trim()) {
      const transcript = String(call.transcript)

      if (transcript.length > 180) {
        return `${transcript.slice(0, 180)}...`
      }

      return transcript
    }

    return 'No summary available for this call yet.'
  }

  function getInitials(call) {
    const name = call.caller_name || 'Unknown Caller'

    const parts = name.trim().split(/\s+/)

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f8fa',
        color: '#172033',
      }}
    >
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '34px 24px 60px',
        }}
      >
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#5c6b82',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              Voca Dashboard
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 5vw, 46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
              }}
            >
              Your Voca dashboard
            </h1>

            <p
              style={{
                margin: '10px 0 0',
                maxWidth: '650px',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#667085',
              }}
            >
              View your agent activity and real conversations handled
              through Voca.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={goCreateAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: '1px solid #d0d5dd',
                background: '#ffffff',
                color: '#24324a',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              + Create Agent
            </button>

            <button
              type="button"
              onClick={goTestAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: 'none',
                background: '#5f696e',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(95, 105, 110, 0.18)',
              }}
            >
              Test Your Agent
            </button>
          </div>
        </div>

        
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px 16px',
              borderRadius: '10px',
              background: '#fef3f2',
              border: '1px solid #fecdca',
              color: '#b42318',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(186, 190, 191, 0.45)',
            borderRadius: '14px',
            padding: '26px',
            marginBottom: '22px',
            boxShadow: '0 8px 24px rgba(23, 32, 51, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(186,190,191,0.35))',
                  border: '1px solid rgba(115,125,130,0.35)',
                  color: '#5f696e',
                  fontSize: '25px',
                  fontWeight: '700',
                }}
              >
                {(agent?.agent_name || 'V').charAt(0).toUpperCase()}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#667085',
                    marginBottom: '4px',
                  }}
                >
                  Your voice agent
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '23px',
                    color: '#111827',
                  }}
                >
                  {loading
                    ? 'Loading...'
                    : agent?.agent_name || 'No agent created'}
                </h2>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {agent?.user_name
                    ? `Personal voice proxy for ${agent.user_name}`
                    : 'Your personal voice proxy'}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '999px',
                background:
                  agent?.status === 'enabled'
                    ? '#ecfdf3'
                    : '#f3f4f6',
                border:
                  agent?.status === 'enabled'
                    ? '1px solid #c7f0d7'
                    : '1px solid #e5e7eb',
                color:
                  agent?.status === 'enabled'
                    ? '#15803d'
                    : '#667085',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              {agent?.status === 'enabled'
                ? 'Enabled'
                : 'Disabled'}
            </div>
          </div>

          <div
            style={{
              height: '1px',
              background: '#eaecf0',
              margin: '24px 0',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr',
              gap: '18px',
            }}
          >
            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Agent activity
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#344054',
                }}
              >
                {calls.length === 0
                  ? 'No calls yet'
                  : `${calls.length} call${
                      calls.length === 1 ? '' : 's'
                    } recorded`}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Based on saved backend call records
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Availability
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {agent?.status === 'enabled'
                  ? 'Enabled'
                  : 'Disabled'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Current agent status
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Voice
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {voiceSettings.voice || 'Not configured'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                From agent configuration
              </p>
            </div>
          </div>
        </section>

        
        <div
          style={{
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '19px',
                color: '#111827',
              }}
            >
              Activity
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '14px',
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(186,190,191,0.4)',
                  borderRadius: '12px',
                  padding: '19px',
                  boxShadow:
                    '0 4px 14px rgba(16,24,40,0.035)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {stat.label}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '26px',
                    lineHeight: 1.1,
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

       
        <section
          style={{
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(186,190,191,0.45)',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(16,24,40,0.045)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eaecf0',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '19px',
                  color: '#111827',
                }}
              >
                Recent Calls
              </h2>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Actual calls saved by the Voca backend
              </p>
            </div>

            <button
              type="button"
              onClick={goCalls}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#5f696e',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              View all calls →
            </button>
          </div>

          {loading ? (
            <div
              style={{
                padding: '40px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              Loading calls...
            </div>
          ) : calls.length === 0 ? (
            <div
              style={{
                padding: '50px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              <h3
                style={{
                  margin: '0 0 8px',
                  color: '#344054',
                }}
              >
                No calls yet
              </h3>

              <p style={{ margin: 0 }}>
                Test your Voca agent to create your first real call
                record.
              </p>
            </div>
          ) : (
            calls.slice(0, 5).map((call, index) => (
              <button
                type="button"
                key={call.call_id}
                onClick={(event) =>
                  openCall(event, call.call_id)
                }
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns:
                    '1.4fr 1.3fr 0.9fr 0.9fr 1.8fr',
                  gap: '18px',
                  alignItems: 'center',
                  padding: '18px 22px',
                  border: 'none',
                  borderBottom:
                    index === Math.min(calls.length, 5) - 1
                      ? 'none'
                      : '1px solid #f0f2f5',
                  background: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              > 
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eef1f3',
                      color: '#5f696e',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(call)}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {call.caller_name || 'Unknown Caller'}
                    </p>

                    <p
                      style={{
                        margin: '3px 0 0',
                        fontSize: '12px',
                        color: '#667085',
                      }}
                    >
                      {call.call_type || 'Test call'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  {formatDate(call.created_at)}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  —
                </div>

                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '5px 9px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background:
                        getCallStatus(call) === 'Failed'
                          ? '#fef2f2'
                          : getCallStatus(call) === 'Pending'
                            ? '#fff7ed'
                            : '#ecfdf3',
                      color:
                        getCallStatus(call) === 'Failed'
                          ? '#b91c1c'
                          : getCallStatus(call) === 'Pending'
                            ? '#c2410c'
                            : '#15803d',
                    }}
                  >
                    {getCallStatus(call)}
                  </span>
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      lineHeight: 1.45,
                      color: '#667085',
                    }}
                  >
                    {getCallSummary(call)}
                  </p>
                </div>
              </button>
            ))
          )}
        </section>

       
        <section
          style={{
            marginTop: '22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
          }}
        >
          <button
            type="button"
            onClick={goTestAgent}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Test your agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Have a real conversation with your configured agent.
            </div>
          </button>

          <button
            type="button"
            onClick={goSettings}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Edit agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Update your agent configuration.
            </div>
          </button>

          <button
            type="button"
            onClick={goCalls}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Review call summaries
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              See actual conversations saved by Voca.
            </div>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )


export default DashboardPage*/}
{/*import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

const API_BASE = 'http://127.0.0.1:8000'

function DashboardPage() {
  const [calls, setCalls] = useState([])
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const agentId = localStorage.getItem('voca_agent_id')

  useEffect(() => {
    async function loadDashboard() {
      if (!agentId) {
        setLoading(false)
        return
      }

      try {
        setError('')

        const [agentResponse, callsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/agents/${agentId}`),
          fetch(`${API_BASE}/api/calls`),
        ])

        if (agentResponse.ok) {
          const agentData = await agentResponse.json()
          setAgent(agentData)
        }

        if (!callsResponse.ok) {
          throw new Error('Could not load calls.')
        }

        const callsData = await callsResponse.json()

        const actualCalls = Array.isArray(callsData)
          ? callsData.filter(
              (call) =>
                Number(call.agent_id) === Number(agentId)
            )
          : []

        setCalls(actualCalls)
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError(
          'Could not load dashboard data. Make sure the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [agentId])

  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goCreateAgent(event) {
    if (event) event.preventDefault()
    navigate('/create-agent')
  }

  function goTestAgent(event) {
    if (event) event.preventDefault()
    navigate('/test-agent')
  }

  function goCalls(event) {
    if (event) event.preventDefault()
    navigate('/calls')
  }

  function goSettings(event) {
    if (event) event.preventDefault()
    navigate('/settings')
  }

  function openCall(event, id) {
    if (event) event.preventDefault()
    navigate(`/calls/${id}`)
  }

  const handledCalls = calls.filter(
    (call) =>
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
  )

  const failedCalls = calls.filter(
    (call) =>
      call.status === 'failed' ||
      call.status === 'Failed'
  )

  const stats = [
    {
      label: 'Calls Handled',
      value: handledCalls.length,
    },
    {
      label: 'Total Calls',
      value: calls.length,
    },
    {
      label: 'Failed Calls',
      value: failedCalls.length,
    },
    {
      label: 'Avg. Call Duration',
      value: '—',
    },
  ]

  const voiceSettings = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('voca_agent_settings') || '{}'
      )
    } catch {
      return {}
    }
  })()

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  function getCallStatus(call) {
    if (
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
    ) {
      return 'Completed'
    }

    if (
      call.status === 'failed' ||
      call.status === 'Failed'
    ) {
      return 'Failed'
    }

    if (
      call.status === 'pending' ||
      call.status === 'Pending'
    ) {
      return 'Pending'
    }

    return call.status || 'Unknown'
  }

  function getCallSummary(call) {
    if (!call?.summary) {
      return 'No summary available for this call yet.'
    }

    try {
      const summary =
        typeof call.summary === 'string'
          ? JSON.parse(call.summary)
          : call.summary

      if (summary?.information_collected?.length) {
        return summary.information_collected.join(' • ')
      }

      if (summary?.intent) {
        return `Intent: ${String(summary.intent)
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase())}`
      }

      if (summary?.text) {
        return summary.text
      }

      return 'Call completed successfully.'
    } catch {
      const text = String(call.summary)

      if (text.length > 180) {
        return `${text.slice(0, 180)}...`
      }

      return text
    }
  }

  function getInitials(call) {
    const name = call.caller_name || 'Unknown Caller'

    const parts = name.trim().split(/\s+/)

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f8fa',
        color: '#172033',
      }}
    >
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '34px 24px 60px',
        }}
      >
        {/* Header 
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#5c6b82',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              Voca Dashboard
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 5vw, 46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
              }}
            >
              Your Voca dashboard
            </h1>

            <p
              style={{
                margin: '10px 0 0',
                maxWidth: '650px',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#667085',
              }}
            >
              View your agent activity and real conversations handled
              through Voca.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={goCreateAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: '1px solid #d0d5dd',
                background: '#ffffff',
                color: '#24324a',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              + Create Agent
            </button>

            <button
              type="button"
              onClick={goTestAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: 'none',
                background: '#5f696e',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(95, 105, 110, 0.18)',
              }}
            >
              Test Your Agent
            </button>
          </div>
        </div>

        {/* Error 
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px 16px',
              borderRadius: '10px',
              background: '#fef3f2',
              border: '1px solid #fecdca',
              color: '#b42318',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        {/* Agent Card 
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(186, 190, 191, 0.45)',
            borderRadius: '14px',
            padding: '26px',
            marginBottom: '22px',
            boxShadow: '0 8px 24px rgba(23, 32, 51, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(186,190,191,0.35))',
                  border: '1px solid rgba(115,125,130,0.35)',
                  color: '#5f696e',
                  fontSize: '25px',
                  fontWeight: '700',
                }}
              >
                {(agent?.agent_name || 'V').charAt(0).toUpperCase()}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#667085',
                    marginBottom: '4px',
                  }}
                >
                  Your voice agent
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '23px',
                    color: '#111827',
                  }}
                >
                  {loading
                    ? 'Loading...'
                    : agent?.agent_name || 'No agent created'}
                </h2>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {agent?.user_name
                    ? `Personal voice proxy for ${agent.user_name}`
                    : 'Your personal voice proxy'}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '999px',
                background:
                  agent?.status === 'enabled'
                    ? '#ecfdf3'
                    : '#f3f4f6',
                border:
                  agent?.status === 'enabled'
                    ? '1px solid #c7f0d7'
                    : '1px solid #e5e7eb',
                color:
                  agent?.status === 'enabled'
                    ? '#15803d'
                    : '#667085',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              {agent?.status === 'enabled'
                ? 'Enabled'
                : 'Disabled'}
            </div>
          </div>

          <div
            style={{
              height: '1px',
              background: '#eaecf0',
              margin: '24px 0',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr',
              gap: '18px',
            }}
          >
            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Agent activity
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#344054',
                }}
              >
                {calls.length === 0
                  ? 'No calls yet'
                  : `${calls.length} call${
                      calls.length === 1 ? '' : 's'
                    } recorded`}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Based on saved backend call records
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Availability
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {agent?.status === 'enabled'
                  ? 'Enabled'
                  : 'Disabled'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Current agent status
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Voice
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {voiceSettings.voice || 'Not configured'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                From agent configuration
              </p>
            </div>
          </div>
        </section>

        {/* Stats 
        <div
          style={{
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '19px',
                color: '#111827',
              }}
            >
              Activity
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '14px',
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(186,190,191,0.4)',
                  borderRadius: '12px',
                  padding: '19px',
                  boxShadow:
                    '0 4px 14px rgba(16,24,40,0.035)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {stat.label}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '26px',
                    lineHeight: 1.1,
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Calls *
        <section
          style={{
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(186,190,191,0.45)',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(16,24,40,0.045)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eaecf0',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '19px',
                  color: '#111827',
                }}
              >
                Recent Calls
              </h2>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Actual calls saved by the Voca backend
              </p>
            </div>

            <button
              type="button"
              onClick={goCalls}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#5f696e',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              View all calls →
            </button>
          </div>

          {loading ? (
            <div
              style={{
                padding: '40px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              Loading calls...
            </div>
          ) : calls.length === 0 ? (
            <div
              style={{
                padding: '50px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              <h3
                style={{
                  margin: '0 0 8px',
                  color: '#344054',
                }}
              >
                No calls yet
              </h3>

              <p style={{ margin: 0 }}>
                Test your Voca agent to create your first real call
                record.
              </p>
            </div>
          ) : (
            calls.slice(0, 5).map((call, index) => (
              <button
                type="button"
                key={call.call_id}
                onClick={(event) =>
                  openCall(event, call.call_id)
                }
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns:
                    '1.4fr 1.3fr 0.9fr 0.9fr 1.8fr',
                  gap: '18px',
                  alignItems: 'center',
                  padding: '18px 22px',
                  border: 'none',
                  borderBottom:
                    index === Math.min(calls.length, 5) - 1
                      ? 'none'
                      : '1px solid #f0f2f5',
                  background: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              > 
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eef1f3',
                      color: '#5f696e',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(call)}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {call.caller_name || 'Unknown Caller'}
                    </p>

                    <p
                      style={{
                        margin: '3px 0 0',
                        fontSize: '12px',
                        color: '#667085',
                      }}
                    >
                      {call.call_type || 'Test call'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  {formatDate(call.created_at)}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  —
                </div>

                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '5px 9px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background:
                        getCallStatus(call) === 'Failed'
                          ? '#fef2f2'
                          : getCallStatus(call) === 'Pending'
                            ? '#fff7ed'
                            : '#ecfdf3',
                      color:
                        getCallStatus(call) === 'Failed'
                          ? '#b91c1c'
                          : getCallStatus(call) === 'Pending'
                            ? '#c2410c'
                            : '#15803d',
                    }}
                  >
                    {getCallStatus(call)}
                  </span>
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      lineHeight: 1.45,
                      color: '#667085',
                    }}
                  >
                    {getCallSummary(call)}
                  </p>
                </div>
              </button>
            ))
          )}
        </section>

        {/* Quick Actions 
        <section
          style={{
            marginTop: '22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
          }}
        >
          <button
            type="button"
            onClick={goTestAgent}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Test your agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Have a real conversation with your configured agent.
            </div>
          </button>

          <button
            type="button"
            onClick={goSettings}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Edit agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Update your agent configuration.
            </div>
          </button>

          <button
            type="button"
            onClick={goCalls}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Review call summaries
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              See actual conversations saved by Voca.
            </div>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )

}
export default DashboardPage*/}
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

const API_BASE = 'http://127.0.0.1:8000'

function DashboardPage() {
  const [calls, setCalls] = useState([])
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCallId, setSelectedCallId] = useState(null)

  const agentId = localStorage.getItem('voca_agent_id')

  useEffect(() => {
    async function loadDashboard() {
      if (!agentId) {
        setLoading(false)
        return
      }

      try {
        setError('')

        const [agentResponse, callsResponse] = await Promise.all([
          fetch(`${API_BASE}/api/agents/${agentId}`),
          fetch(`${API_BASE}/api/calls`),
        ])

        if (agentResponse.ok) {
          const agentData = await agentResponse.json()
          setAgent(agentData)
        }

        if (!callsResponse.ok) {
          throw new Error('Could not load calls.')
        }

        const callsData = await callsResponse.json()

        const actualCalls = Array.isArray(callsData)
          ? callsData.filter(
              (call) =>
                Number(call.agent_id) === Number(agentId)
            )
          : []

        setCalls(actualCalls)
      } catch (err) {
        console.error('Dashboard load error:', err)
        setError(
          'Could not load dashboard data. Make sure the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [agentId])

  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goCreateAgent(event) {
    if (event) event.preventDefault()
    navigate('/create-agent')
  }

  function goTestAgent(event) {
    if (event) event.preventDefault()
    navigate('/test-agent')
  }

  function goCalls(event) {
    if (event) event.preventDefault()
    navigate('/calls')
  }

  function goSettings(event) {
    if (event) event.preventDefault()
    navigate('/settings')
  }

  function openCall(event, id) {
    if (event) event.preventDefault()

    setSelectedCallId((currentId) =>
      currentId === id ? null : id
    )
  }

  const handledCalls = calls.filter(
    (call) =>
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
  )

  const failedCalls = calls.filter(
    (call) =>
      call.status === 'failed' ||
      call.status === 'Failed'
  )

  const stats = [
    {
      label: 'Calls Handled',
      value: handledCalls.length,
    },
    {
      label: 'Total Calls',
      value: calls.length,
    },
    {
      label: 'Failed Calls',
      value: failedCalls.length,
    },
    {
      label: 'Avg. Call Duration',
      value: '—',
    },
  ]

  const voiceSettings = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('voca_agent_settings') || '{}'
      )
    } catch {
      return {}
    }
  })()

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return date.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  function getCallStatus(call) {
    if (
      call.status === 'completed' ||
      call.status === 'Completed' ||
      call.status === 'handled' ||
      call.status === 'Handled'
    ) {
      return 'Completed'
    }

    if (
      call.status === 'failed' ||
      call.status === 'Failed'
    ) {
      return 'Failed'
    }

    if (
      call.status === 'pending' ||
      call.status === 'Pending'
    ) {
      return 'Pending'
    }

    return call.status || 'Unknown'
  }

  function getCallSummary(call) {
  if (!call?.summary) {
    return 'No summary available for this call yet.'
  }

  try {
    const summary =
      typeof call.summary === 'string'
        ? JSON.parse(call.summary)
        : call.summary

    if (summary?.information_collected?.length) {
      return summary.information_collected.join(' • ')
    }

    if (summary?.intent) {
      return `Intent: ${String(summary.intent)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())}`
    }

    if (summary?.text) {
      return summary.text
    }

    return 'Call completed successfully.'
  } catch {
    const text = String(call.summary)

    if (text.length > 180) {
      return `${text.slice(0, 180)}...`
    }

    return text
  }
}


  function getInitials(call) {
    const name = call.caller_name || 'Unknown Caller'

    const parts = name.trim().split(/\s+/)

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  const selectedCall = calls.find(
    (call) => Number(call.call_id) === Number(selectedCallId)
  )

  function getParsedSummary(call) {
    if (!call?.summary) return {}

    if (typeof call.summary === 'object') {
      return call.summary
    }

    try {
      return JSON.parse(call.summary)
    } catch {
      return { text: String(call.summary) }
    }
  }

  function formatLabel(value) {
    if (!value) return 'Not available'

    return String(value)
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  function getTranscriptMessages(transcript) {
    if (!transcript) return []

    return String(transcript)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const match = line.match(/^(Caller|Voca):\s*(.*)$/i)

        if (!match) {
          return {
            speaker: 'Conversation',
            message: line,
            index,
          }
        }

        return {
          speaker:
            match[1].toLowerCase() === 'caller'
              ? 'Caller'
              : 'Voca',
          message: match[2],
          index,
        }
      })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f8fa',
        color: '#172033',
      }}
    >
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '34px 24px 60px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#5c6b82',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              Voca Dashboard
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 5vw, 46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#111827',
              }}
            >
              Your Voca dashboard
            </h1>

            <p
              style={{
                margin: '10px 0 0',
                maxWidth: '650px',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#667085',
              }}
            >
              View your agent activity and real conversations handled
              through Voca.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={goCreateAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: '1px solid #d0d5dd',
                background: '#ffffff',
                color: '#24324a',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              + Create Agent
            </button>

            <button
              type="button"
              onClick={goTestAgent}
              style={{
                padding: '12px 17px',
                borderRadius: '8px',
                border: 'none',
                background: '#5f696e',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(95, 105, 110, 0.18)',
              }}
            >
              Test Your Agent
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px 16px',
              borderRadius: '10px',
              background: '#fef3f2',
              border: '1px solid #fecdca',
              color: '#b42318',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        {/* Agent Card */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(186, 190, 191, 0.45)',
            borderRadius: '14px',
            padding: '26px',
            marginBottom: '22px',
            boxShadow: '0 8px 24px rgba(23, 32, 51, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(186,190,191,0.35))',
                  border: '1px solid rgba(115,125,130,0.35)',
                  color: '#5f696e',
                  fontSize: '25px',
                  fontWeight: '700',
                }}
              >
                {(agent?.agent_name || 'V').charAt(0).toUpperCase()}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#667085',
                    marginBottom: '4px',
                  }}
                >
                  Your voice agent
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '23px',
                    color: '#111827',
                  }}
                >
                  {loading
                    ? 'Loading...'
                    : agent?.agent_name || 'No agent created'}
                </h2>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {agent?.user_name
                    ? `Personal voice proxy for ${agent.user_name}`
                    : 'Your personal voice proxy'}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '999px',
                background:
                  agent?.status === 'enabled'
                    ? '#ecfdf3'
                    : '#f3f4f6',
                border:
                  agent?.status === 'enabled'
                    ? '1px solid #c7f0d7'
                    : '1px solid #e5e7eb',
                color:
                  agent?.status === 'enabled'
                    ? '#15803d'
                    : '#667085',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    agent?.status === 'enabled'
                      ? '#16a34a'
                      : '#9ca3af',
                }}
              />

              {agent?.status === 'enabled'
                ? 'Enabled'
                : 'Disabled'}
            </div>
          </div>

          <div
            style={{
              height: '1px',
              background: '#eaecf0',
              margin: '24px 0',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr',
              gap: '18px',
            }}
          >
            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Agent activity
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#344054',
                }}
              >
                {calls.length === 0
                  ? 'No calls yet'
                  : `${calls.length} call${
                      calls.length === 1 ? '' : 's'
                    } recorded`}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Based on saved backend call records
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Availability
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {agent?.status === 'enabled'
                  ? 'Enabled'
                  : 'Disabled'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Current agent status
              </p>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '10px',
                background: 'rgba(248,250,252,0.82)',
                border: '1px solid #eef1f5',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: '700',
                }}
              >
                Voice
              </p>

              <strong
                style={{
                  fontSize: '17px',
                  color: '#111827',
                }}
              >
                {voiceSettings.voice || 'Not configured'}
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                From agent configuration
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div
          style={{
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '19px',
                color: '#111827',
              }}
            >
              Activity
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '14px',
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(186,190,191,0.4)',
                  borderRadius: '12px',
                  padding: '19px',
                  boxShadow:
                    '0 4px 14px rgba(16,24,40,0.035)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {stat.label}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '26px',
                    lineHeight: 1.1,
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Calls */}
        <section
          style={{
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(186,190,191,0.45)',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(16,24,40,0.045)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eaecf0',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '19px',
                  color: '#111827',
                }}
              >
                Recent Calls
              </h2>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Actual calls saved by the Voca backend
              </p>
            </div>

            <button
              type="button"
              onClick={goCalls}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#5f696e',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              View all calls →
            </button>
          </div>

          {loading ? (
            <div
              style={{
                padding: '40px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              Loading calls...
            </div>
          ) : calls.length === 0 ? (
            <div
              style={{
                padding: '50px 22px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              <h3
                style={{
                  margin: '0 0 8px',
                  color: '#344054',
                }}
              >
                No calls yet
              </h3>

              <p style={{ margin: 0 }}>
                Test your Voca agent to create your first real call
                record.
              </p>
            </div>
          ) : (
            calls.slice(0, 5).map((call, index) => (
              <button
                type="button"
                key={call.call_id}
                onClick={(event) =>
                  openCall(event, call.call_id)
                }
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns:
                    '1.4fr 1.3fr 0.9fr 0.9fr 1.8fr',
                  gap: '18px',
                  alignItems: 'center',
                  padding: '18px 22px',
                  border: 'none',
                  borderBottom:
                    index === Math.min(calls.length, 5) - 1
                      ? 'none'
                      : '1px solid #f0f2f5',
                  background: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              > 
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eef1f3',
                      color: '#5f696e',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(call)}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {call.caller_name || 'Unknown Caller'}
                    </p>

                    <p
                      style={{
                        margin: '3px 0 0',
                        fontSize: '12px',
                        color: '#667085',
                      }}
                    >
                      {call.call_type || 'Test call'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  {formatDate(call.created_at)}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  —
                </div>

                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '5px 9px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background:
                        getCallStatus(call) === 'Failed'
                          ? '#fef2f2'
                          : getCallStatus(call) === 'Pending'
                            ? '#fff7ed'
                            : '#ecfdf3',
                      color:
                        getCallStatus(call) === 'Failed'
                          ? '#b91c1c'
                          : getCallStatus(call) === 'Pending'
                            ? '#c2410c'
                            : '#15803d',
                    }}
                  >
                    {getCallStatus(call)}
                  </span>
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      lineHeight: 1.45,
                      color: '#667085',
                    }}
                  >
                    {getCallSummary(call)}
                  </p>
                </div>
              </button>
            ))
          )}
        </section>

        {/* Selected Call Review */}
        {selectedCall && (
          <section
            style={{
              marginTop: '22px',
              background: 'rgba(255,255,255,0.82)',
              border: '1px solid rgba(186,190,191,0.45)',
              borderRadius: '14px',
              padding: '26px',
              boxShadow: '0 8px 24px rgba(16,24,40,0.045)',
            }}
          >
            {(() => {
              const summary = getParsedSummary(selectedCall)
              const transcriptMessages = getTranscriptMessages(
                selectedCall.transcript
              )
              const information = Array.isArray(
                summary.information_collected
              )
                ? summary.information_collected
                : []
              const actions = Array.isArray(summary.actions_taken)
                ? summary.actions_taken
                : []

              return (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '18px',
                      flexWrap: 'wrap',
                      marginBottom: '22px',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: '0 0 5px',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          color: '#667085',
                          textTransform: 'uppercase',
                        }}
                      >
                        Call Review
                      </p>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: '24px',
                          color: '#111827',
                        }}
                      >
                        {selectedCall.caller_name || 'Unknown Caller'}
                      </h2>

                      <p
                        style={{
                          margin: '6px 0 0',
                          color: '#667085',
                          fontSize: '13px',
                        }}
                      >
                        {formatLabel(selectedCall.call_type)} ·{' '}
                        {formatDate(selectedCall.created_at)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCallId(null)}
                      style={{
                        border: '1px solid #d0d5dd',
                        background: '#ffffff',
                        color: '#344054',
                        borderRadius: '8px',
                        padding: '9px 13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Close Review
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '14px',
                      marginBottom: '20px',
                    }}
                  >
                    {[
                      ['Intent', formatLabel(summary.intent)],
                      [
                        'Status',
                        summary.status
                          ? formatLabel(summary.status)
                          : getCallStatus(selectedCall),
                      ],
                      [
                        'Actions',
                        actions.length ? String(actions.length) : 'None',
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          padding: '16px',
                          borderRadius: '10px',
                          background: '#f8fafc',
                          border: '1px solid #eef1f5',
                        }}
                      >
                        <p
                          style={{
                            margin: '0 0 6px',
                            fontSize: '12px',
                            color: '#667085',
                          }}
                        >
                          {label}
                        </p>
                        <strong
                          style={{
                            fontSize: '15px',
                            color: '#111827',
                          }}
                        >
                          {value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '18px',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        padding: '20px',
                        borderRadius: '12px',
                        background: '#ffffff',
                        border: '1px solid #eaecf0',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 12px',
                          fontSize: '17px',
                          color: '#111827',
                        }}
                      >
                        AI Call Summary
                      </h3>

                      {summary.text ? (
                        <p
                          style={{
                            margin: 0,
                            lineHeight: 1.6,
                            color: '#475467',
                          }}
                        >
                          {summary.text}
                        </p>
                      ) : summary.intent ? (
                        <p
                          style={{
                            margin: 0,
                            lineHeight: 1.6,
                            color: '#475467',
                          }}
                        >
                          Voca identified the call intent as{' '}
                          <strong>{formatLabel(summary.intent)}</strong>.
                        </p>
                      ) : (
                        <p
                          style={{
                            margin: 0,
                            lineHeight: 1.6,
                            color: '#667085',
                          }}
                        >
                          No additional AI summary was generated for this
                          call.
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        padding: '20px',
                        borderRadius: '12px',
                        background: '#ffffff',
                        border: '1px solid #eaecf0',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 12px',
                          fontSize: '17px',
                          color: '#111827',
                        }}
                      >
                        Information Collected
                      </h3>

                      {information.length ? (
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: '#475467',
                            lineHeight: 1.7,
                          }}
                        >
                          {information.map((item, index) => (
                            <li key={`${item}-${index}`}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          style={{
                            margin: 0,
                            color: '#667085',
                          }}
                        >
                          No information was recorded.
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #eaecf0',
                      marginBottom: '20px',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 12px',
                        fontSize: '17px',
                        color: '#111827',
                      }}
                    >
                      Actions Taken
                    </h3>

                    {actions.length ? (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '20px',
                          color: '#475467',
                          lineHeight: 1.7,
                        }}
                      >
                        {actions.map((item, index) => (
                          <li key={`${item}-${index}`}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          color: '#667085',
                        }}
                      >
                        No actions were recorded for this call.
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #eaecf0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                        marginBottom: '16px',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: '17px',
                            color: '#111827',
                          }}
                        >
                          Conversation Transcript
                        </h3>
                        <p
                          style={{
                            margin: '4px 0 0',
                            fontSize: '13px',
                            color: '#667085',
                          }}
                        >
                          Actual conversation saved for this call
                        </p>
                      </div>
                    </div>

                    {transcriptMessages.length ? (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        {transcriptMessages.map((item) => (
                          <div
                            key={item.index}
                            style={{
                              alignSelf:
                                item.speaker === 'Caller'
                                  ? 'flex-start'
                                  : 'flex-end',
                              maxWidth: '82%',
                            }}
                          >
                            <div
                              style={{
                                marginBottom: '5px',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#667085',
                                textAlign:
                                  item.speaker === 'Caller'
                                    ? 'left'
                                    : 'right',
                              }}
                            >
                              {item.speaker}
                            </div>

                            <div
                              style={{
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background:
                                  item.speaker === 'Caller'
                                    ? '#f8fafc'
                                    : '#eef1f3',
                                border: '1px solid #eaecf0',
                                color: '#344054',
                                lineHeight: 1.55,
                                fontSize: '14px',
                              }}
                            >
                              {item.message || '(no text)'}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          color: '#667085',
                        }}
                      >
                        No transcript is available for this call.
                      </p>
                    )}
                  </div>
                </>
              )
            })()}
          </section>
        )}

        {/* Quick Actions */}
        <section
          style={{
            marginTop: '22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
          }}
        >
          <button
            type="button"
            onClick={goTestAgent}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Test your agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Have a real conversation with your configured agent.
            </div>
          </button>

          <button
            type="button"
            onClick={goSettings}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Edit agent
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              Update your agent configuration.
            </div>
          </button>

          <button
            type="button"
            onClick={goCalls}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border:
                '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                marginBottom: '7px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Review call summaries
            </div>

            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#667085',
              }}
            >
              See actual conversations saved by Voca.
            </div>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage


