import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function DashboardPage() {
  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goCreateAgent(event) {
    if (event) event.preventDefault()
    navigate('/create-agent')
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

  const calls = [
    {
      id: 1,
      name: 'Sarah Johnson',
      initials: 'SJ',
      time: 'Today, 10:42 AM',
      duration: '4m 18s',
      status: 'Handled',
      summary: 'Asked about tomorrow’s meeting and confirmed the timing.',
      type: 'normal',
    },
    {
      id: 2,
      name: 'David Miller',
      initials: 'DM',
      time: 'Today, 9:15 AM',
      duration: '2m 41s',
      status: 'Important',
      summary: 'Left an important message about your project discussion.',
      type: 'important',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      initials: 'PS',
      time: 'Yesterday, 6:28 PM',
      duration: '1m 56s',
      status: 'Handled',
      summary: 'Asked you to call back when you are available.',
      type: 'normal',
    },
    {
      id: 4,
      name: 'Alex Carter',
      initials: 'AC',
      time: 'Yesterday, 3:11 PM',
      duration: '0m 42s',
      status: 'Missed',
      summary: 'Call ended before the conversation could be completed.',
      type: 'missed',
    },
  ]

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
        {/* Page header */}
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
                  background: '#16a34a',
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
              Good morning
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
              Your Voca voice proxy is active and ready to handle calls for
              you.
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
              onClick={goCreateAgent}
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

        {/* Main agent card */}
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
                  boxShadow: '0 4px 10px rgba(23,32,51,0.05)',
                }}
              >
                V
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
                  Voca Assistant
                </h2>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  Warm Female · Personal voice proxy
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
                background: '#ecfdf3',
                border: '1px solid #c7f0d7',
                color: '#15803d',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#16a34a',
                }}
              />
              Accepting Calls
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

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    height: '30px',
                  }}
                >
                  {[12, 21, 16, 26, 19, 29, 14, 23, 17].map(
                    (height, index) => (
                      <span
                        key={index}
                        style={{
                          width: '4px',
                          height: `${height}px`,
                          borderRadius: '4px',
                          background:
                            index % 2 === 0 ? '#737d82' : '#babebf',
                        }}
                      />
                    )
                  )}
                </div>

                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#344054',
                  }}
                >
                  Ready to answer
                </span>
              </div>
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
                Always on
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                24 / 7
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
                Warm Female
              </strong>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '13px',
                  color: '#667085',
                }}
              >
                Natural conversational tone
              </p>
            </div>
          </div>
        </section>

        {/* Today's stats */}
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
              gap: '15px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '19px',
                color: '#111827',
              }}
            >
              Today
            </h2>

            <span
              style={{
                fontSize: '13px',
                color: '#667085',
              }}
            >
              September 19, 2026
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '14px',
            }}
          >
            {[
              ['Calls Handled', '12'],
              ['Important Calls', '3'],
              ['Missed Calls Saved', '2'],
              ['Avg. Call Duration', '3m 24s'],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(186,190,191,0.4)',
                  borderRadius: '12px',
                  padding: '19px',
                  boxShadow: '0 4px 14px rgba(16,24,40,0.035)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    color: '#667085',
                  }}
                >
                  {label}
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
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent calls */}
        <section
          style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(186,190,191,0.45)',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(16,24,40,0.045)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '22px 22px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
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
                Calls handled by your Voca agent
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

          <div>
            {calls.map((call, index) => (
              <button
                type="button"
                key={call.id}
                onClick={(event) => openCall(event, call.id)}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1.3fr 0.7fr 0.9fr 1.8fr',
                  gap: '18px',
                  alignItems: 'center',
                  padding: '18px 22px',
                  border: 'none',
                  borderBottom:
                    index === calls.length - 1
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
                      background:
                        call.type === 'important'
                          ? '#fef3c7'
                          : call.type === 'missed'
                            ? '#f3f4f6'
                            : '#eef1f3',
                      color:
                        call.type === 'important'
                          ? '#92400e'
                          : call.type === 'missed'
                            ? '#4b5563'
                            : '#5f696e',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {call.initials}
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
                      {call.name}
                    </p>

                    <p
                      style={{
                        margin: '3px 0 0',
                        fontSize: '12px',
                        color: '#667085',
                      }}
                    >
                      Incoming call
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  {call.time}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#475467',
                  }}
                >
                  {call.duration}
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
                        call.status === 'Important'
                          ? '#fff7ed'
                          : call.status === 'Missed'
                            ? '#fef2f2'
                            : '#ecfdf3',
                      color:
                        call.status === 'Important'
                          ? '#c2410c'
                          : call.status === 'Missed'
                            ? '#b91c1c'
                            : '#15803d',
                    }}
                  >
                    {call.status}
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
                    {call.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Quick actions */}
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
            onClick={goCreateAgent}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16,24,40,0.035)',
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
              Try a sample voice-agent setup before going live.
            </div>
          </button>

          <button
            type="button"
            onClick={goSettings}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16,24,40,0.035)',
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
              Update the name, greeting, voice or availability.
            </div>
          </button>

          <button
            type="button"
            onClick={goCalls}
            style={{
              textAlign: 'left',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid rgba(186,190,191,0.45)',
              background: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16,24,40,0.035)',
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
              See what Voca discussed on your behalf.
            </div>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage