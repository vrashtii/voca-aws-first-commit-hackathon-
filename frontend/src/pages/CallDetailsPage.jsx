import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function CallDetailsPage() {
  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goCalls(event) {
    if (event) event.preventDefault()
    navigate('/calls')
  }

  return (
    <div className="page">
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '40px 24px 70px',
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
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#667085',
              }}
            >
              Call Details
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: '38px',
                lineHeight: 1.1,
                color: '#172033',
              }}
            >
              Sarah Johnson
            </h1>

            <p
              style={{
                margin: '8px 0 0',
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
              padding: '7px 11px',
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
            Handled
          </span>
        </div>

        {/* Call overview */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
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
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '12px',
                boxShadow: '0 3px 12px rgba(16, 24, 40, 0.03)',
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

        {/* Main content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '22px',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div>
            {/* AI Summary */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '22px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#eef1f3',
                    color: '#5f696e',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  V
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '19px',
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
                    Generated by Voca after the call
                  </p>
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#475467',
                }}
              >
                Sarah called to confirm tomorrow’s meeting. Voca confirmed
                the meeting time and noted that Sarah will send the final
                agenda before the meeting.
              </p>
            </section>

            {/* Key points */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '22px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 18px',
                  fontSize: '19px',
                  color: '#172033',
                }}
              >
                Key Points
              </h2>

              <div
                style={{
                  display: 'grid',
                  gap: '12px',
                }}
              >
                {[
                  'Meeting is scheduled for tomorrow.',
                  'Sarah will send the final agenda.',
                  'No additional action is required before the meeting.',
                ].map((point) => (
                  <div
                    key={point}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        marginTop: '7px',
                        width: '6px',
                        height: '6px',
                        flexShrink: 0,
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

            {/* Transcript */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 5px',
                  fontSize: '19px',
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

              <div
                style={{
                  display: 'grid',
                  gap: '18px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
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
                      padding: '13px 15px',
                      background: '#f8fafc',
                      borderRadius: '10px',
                      fontSize: '14px',
                      lineHeight: 1.55,
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
                      marginBottom: '6px',
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
                      padding: '13px 15px',
                      background: '#f1f3f4',
                      borderRadius: '10px',
                      fontSize: '14px',
                      lineHeight: 1.55,
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
                      marginBottom: '6px',
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
                      padding: '13px 15px',
                      background: '#f8fafc',
                      borderRadius: '10px',
                      fontSize: '14px',
                      lineHeight: 1.55,
                      color: '#475467',
                    }}
                  >
                    Perfect. I’ll send the final agenda before then. Thanks!
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <aside>
            {/* Action panel */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '22px',
                marginBottom: '22px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
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

              <div
                style={{
                  display: 'grid',
                  gap: '10px',
                }}
              >
                <button
                  type="button"
                  style={{
                    width: '100%',
                    minHeight: '42px',
                    borderRadius: '8px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Mark as Important
                </button>

                <button
                  type="button"
                  style={{
                    width: '100%',
                    minHeight: '42px',
                    borderRadius: '8px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Add Note
                </button>

                <button
                  type="button"
                  style={{
                    width: '100%',
                    minHeight: '42px',
                    borderRadius: '8px',
                    border: '1px solid #d0d5dd',
                    background: '#ffffff',
                    color: '#344054',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Call Back
                </button>
              </div>
            </section>

            {/* Follow-up */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '22px',
                marginBottom: '22px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
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
            </section>

            {/* Voice Activity */}
            <section
              style={{
                background: '#ffffff',
                border: '1px solid #e3e7ee',
                borderRadius: '14px',
                padding: '22px',
                boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 6px',
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
                Call activity overview
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  height: '58px',
                  marginBottom: '15px',
                }}
              >
                {[18, 29, 21, 39, 25, 45, 30, 22, 34, 19, 31, 24].map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{
                        width: '5px',
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
                  fontSize: '11px',
                  color: '#98a2b3',
                }}
              >
                <span>Started</span>
                <span>4m 18s</span>
                <span>Ended</span>
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