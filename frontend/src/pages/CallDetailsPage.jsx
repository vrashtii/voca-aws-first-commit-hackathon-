import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function CallDetailsPage() {
  function goHome(event) {
    event.preventDefault()
    navigate('/')
  }

  function goCalls(event) {
    event.preventDefault()
    navigate('/calls')
  }

  return (
    <div className="page">
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '42px 24px 70px',
        }}
      >
        {/* Back */}
        <button
          type="button"
          onClick={goCalls}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            marginBottom: '18px',
            color: '#667085',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ← Back to Calls
        </button>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#737d82',
              }}
            >
              Call Details
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 5vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#172033',
              }}
            >
              Sarah Johnson
            </h1>

            <p
              style={{
                margin: '9px 0 0',
                color: '#667085',
                fontSize: '14px',
              }}
            >
              +91 98765 43210 · Today, 10:42 AM
            </p>
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 12px',
              borderRadius: '999px',
              background: '#ecfdf3',
              border: '1px solid #c7f0d7',
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
            Call handled
          </span>
        </div>

        {/* Call overview */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '14px',
            marginBottom: '22px',
          }}
        >
          {[
            ['Call Duration', '4m 18s'],
            ['Handled By', 'Voca Assistant'],
            ['Call Type', 'Incoming'],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                padding: '18px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.74)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(186,190,191,0.45)',
                boxShadow: '0 6px 18px rgba(23,32,51,0.04)',
              }}
            >
              <p
                style={{
                  margin: '0 0 7px',
                  fontSize: '12px',
                  color: '#667085',
                }}
              >
                {label}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#172033',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)',
            gap: '22px',
            alignItems: 'start',
          }}
        >
          {/* LEFT */}
          <div>
            {/* AI Summary */}
            <section
              style={{
                padding: '24px',
                marginBottom: '22px',
                borderRadius: '16px',
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.88), rgba(242,244,245,0.74))',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(186,190,191,0.5)',
                boxShadow: '0 10px 28px rgba(23,32,51,0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'linear-gradient(145deg, #ffffff, #e3e6e7)',
                    border: '1px solid rgba(115,125,130,0.24)',
                    color: '#5f696e',
                    fontWeight: '800',
                  }}
                >
                  V
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      color: '#172033',
                    }}
                  >
                    AI Call Summary
                  </h2>

                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: '12px',
                      color: '#667085',
                    }}
                  >
                    Summary generated by Voca
                  </p>
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: '#475467',
                }}
              >
                Sarah called to confirm tomorrow’s meeting. Voca confirmed
                the meeting time and noted that Sarah will send the final
                agenda before the meeting.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '18px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(186,190,191,0.13)',
                  color: '#59666c',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                <span>◉</span>
                Voca successfully handled this conversation.
              </div>
            </section>

            {/* Key Points */}
            <section
              style={{
                padding: '24px',
                marginBottom: '22px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                boxShadow: '0 6px 18px rgba(23,32,51,0.04)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 18px',
                  fontSize: '20px',
                  color: '#172033',
                }}
              >
                Key Points
              </h2>

              <div style={{ display: 'grid', gap: '13px' }}>
                {[
                  'Meeting is scheduled for tomorrow at 11:00 AM.',
                  'Sarah will send the final agenda before the meeting.',
                  'No additional action is required right now.',
                ].map((point) => (
                  <div
                    key={point}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '11px',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        flexShrink: 0,
                        marginTop: '7px',
                        borderRadius: '50%',
                        background: '#737d82',
                      }}
                    />

                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: '#475467',
                      }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Conversation */}
            <section
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                boxShadow: '0 6px 18px rgba(23,32,51,0.04)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 5px',
                  fontSize: '20px',
                  color: '#172033',
                }}
              >
                Conversation
              </h2>

              <p
                style={{
                  margin: '0 0 22px',
                  fontSize: '12px',
                  color: '#667085',
                }}
              >
                Transcript from the call
              </p>

              <div style={{ display: 'grid', gap: '18px' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '7px',
                    }}
                  >
                    <strong
                      style={{
                        fontSize: '13px',
                        color: '#344054',
                      }}
                    >
                      Sarah Johnson
                    </strong>

                    <span
                      style={{
                        fontSize: '11px',
                        color: '#98a2b3',
                      }}
                    >
                      10:42:11 AM
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#f8fafc',
                      border: '1px solid #eef1f4',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#475467',
                    }}
                  >
                    Hi, I wanted to confirm what time we are meeting tomorrow.
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '7px',
                    }}
                  >
                    <strong
                      style={{
                        fontSize: '13px',
                        color: '#344054',
                      }}
                    >
                      Voca Assistant
                    </strong>

                    <span
                      style={{
                        fontSize: '11px',
                        color: '#98a2b3',
                      }}
                    >
                      10:42:18 AM
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#f1f3f4',
                      border: '1px solid #e6e9eb',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#475467',
                    }}
                  >
                    You are meeting tomorrow at 11:00 AM. Is there anything
                    else I can help you with?
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '7px',
                    }}
                  >
                    <strong
                      style={{
                        fontSize: '13px',
                        color: '#344054',
                      }}
                    >
                      Sarah Johnson
                    </strong>

                    <span
                      style={{
                        fontSize: '11px',
                        color: '#98a2b3',
                      }}
                    >
                      10:44:02 AM
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#f8fafc',
                      border: '1px solid #eef1f4',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#475467',
                    }}
                  >
                    Perfect. I’ll send the final agenda before then. Thanks!
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside>
            {/* Call Actions */}
            <section
              style={{
                padding: '22px',
                marginBottom: '22px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.76)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(186,190,191,0.45)',
                boxShadow: '0 8px 22px rgba(23,32,51,0.045)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 16px',
                  fontSize: '18px',
                  color: '#172033',
                }}
              >
                Actions
              </h2>

              <div style={{ display: 'grid', gap: '10px' }}>
                <button
                  type="button"
                  style={{
                    minHeight: '42px',
                    borderRadius: '9px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Mark as Important
                </button>

                <button
                  type="button"
                  style={{
                    minHeight: '42px',
                    borderRadius: '9px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Add Note
                </button>

                <button
                  type="button"
                  style={{
                    minHeight: '42px',
                    borderRadius: '9px',
                    border: 'none',
                    background: '#5f696e',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Call Back
                </button>
              </div>
            </section>

            {/* Follow-up */}
            <section
              style={{
                padding: '22px',
                marginBottom: '22px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                boxShadow: '0 6px 18px rgba(23,32,51,0.04)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 10px',
                  fontSize: '18px',
                  color: '#172033',
                }}
              >
                Follow-up
              </h2>

              <div
                style={{
                  padding: '13px 14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #eef1f4',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: '#667085',
                  }}
                >
                  Sarah will send the meeting agenda before tomorrow’s
                  meeting.
                </p>
              </div>
            </section>

            {/* Voice Activity */}
            <section
              style={{
                padding: '22px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                boxShadow: '0 6px 18px rgba(23,32,51,0.04)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 5px',
                  fontSize: '18px',
                  color: '#172033',
                }}
              >
                Voice Activity
              </h2>

              <p
                style={{
                  margin: '0 0 18px',
                  fontSize: '12px',
                  color: '#667085',
                }}
              >
                Audio activity during the call
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  height: '58px',
                  padding: '0 4px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #eef1f4',
                }}
              >
                {[18, 28, 21, 39, 25, 45, 31, 23, 35, 20, 30, 24].map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{
                        width: '4px',
                        height: `${height}px`,
                        borderRadius: '999px',
                        background:
                          index % 3 === 0 ? '#737d82' : '#babebf',
                      }}
                    />
                  )
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  fontSize: '11px',
                  color: '#98a2b3',
                }}
              >
                <span>Start</span>
                <span>4m 18s</span>
                <span>End</span>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CallDetailsPage