import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function CallsPage() {
  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function goDashboard(event) {
    if (event) event.preventDefault()
    navigate('/dashboard')
  }

  function openCall(event, id) {
    event.preventDefault()
    navigate(`/calls/${id}`)
  }

  const calls = [
    {
      id: 1,
      name: 'Sarah Johnson',
      number: '+91 98765 43210',
      initials: 'SJ',
      date: 'Today',
      time: '10:42 AM',
      duration: '4m 18s',
      status: 'Handled',
      summary: 'Asked about tomorrow’s meeting and confirmed the timing.',
    },
    {
      id: 2,
      name: 'David Miller',
      number: '+91 98211 78342',
      initials: 'DM',
      date: 'Today',
      time: '9:15 AM',
      duration: '2m 41s',
      status: 'Important',
      summary: 'Left an important message about your project discussion.',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      number: '+91 99123 45678',
      initials: 'PS',
      date: 'Yesterday',
      time: '6:28 PM',
      duration: '1m 56s',
      status: 'Handled',
      summary: 'Asked you to call back when you are available.',
    },
    {
      id: 4,
      name: 'Alex Carter',
      number: '+91 99876 12345',
      initials: 'AC',
      date: 'Yesterday',
      time: '3:11 PM',
      duration: '42s',
      status: 'Missed',
      summary: 'Call ended before the conversation could be completed.',
    },
  ]

  return (
    <div className="page">
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '40px 24px 60px',
        }}
      >
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
            <button
              type="button"
              onClick={goDashboard}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                marginBottom: '12px',
                color: '#6b7280',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              ← Back to Dashboard
            </button>

            <h1
              style={{
                margin: 0,
                fontSize: '38px',
                lineHeight: 1.1,
                color: '#172033',
              }}
            >
              Calls
            </h1>

            <p
              style={{
                margin: '9px 0 0',
                color: '#667085',
                fontSize: '16px',
              }}
            >
              Review calls handled by your Voca voice agent.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '18px',
            marginBottom: '20px',
            background: '#ffffff',
            border: '1px solid #e3e7ee',
            borderRadius: '12px',
            boxShadow: '0 3px 12px rgba(16, 24, 40, 0.035)',
          }}
        >
          <input
            type="text"
            placeholder="Search calls..."
            style={{
              flex: '1 1 240px',
              minHeight: '42px',
              padding: '0 13px',
              borderRadius: '8px',
              border: '1px solid #d0d5dd',
              background: '#ffffff',
              color: '#172033',
              outline: 'none',
              fontSize: '14px',
            }}
          />

          <select
            style={{
              minHeight: '42px',
              padding: '0 13px',
              borderRadius: '8px',
              border: '1px solid #d0d5dd',
              background: '#ffffff',
              color: '#344054',
              fontSize: '14px',
            }}
          >
            <option>All statuses</option>
            <option>Handled</option>
            <option>Important</option>
            <option>Missed</option>
          </select>

          <select
            style={{
              minHeight: '42px',
              padding: '0 13px',
              borderRadius: '8px',
              border: '1px solid #d0d5dd',
              background: '#ffffff',
              color: '#344054',
              fontSize: '14px',
            }}
          >
            <option>All dates</option>
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
          </select>
        </section>

        {/* Calls list */}
        <section
          style={{
            background: '#ffffff',
            border: '1px solid #e3e7ee',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(16, 24, 40, 0.035)',
          }}
        >
          <div
            style={{
              padding: '20px 22px',
              borderBottom: '1px solid #eaecf0',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '19px',
                color: '#111827',
              }}
            >
              All Calls
            </h2>

            <p
              style={{
                margin: '5px 0 0',
                fontSize: '13px',
                color: '#667085',
              }}
            >
              {calls.length} recent calls
            </p>
          </div>

          {calls.map((call, index) => (
            <div
              key={call.id}
              style={{
                padding: '20px 22px',
                borderBottom:
                  index === calls.length - 1
                    ? 'none'
                    : '1px solid #f0f2f5',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >
                {/* Caller */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    minWidth: '220px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eef1f3',
                      color: '#5f696e',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    {call.initials}
                  </div>

                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '700',
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
                      {call.number}
                    </p>
                  </div>
                </div>

                {/* Date/time */}
                <div
                  style={{
                    minWidth: '130px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      color: '#344054',
                      fontWeight: '600',
                    }}
                  >
                    {call.date}
                  </p>

                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: '12px',
                      color: '#667085',
                    }}
                  >
                    {call.time}
                  </p>
                </div>

                {/* Duration */}
                <div
                  style={{
                    minWidth: '75px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#667085',
                    }}
                  >
                    Duration
                  </p>

                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: '13px',
                      color: '#344054',
                      fontWeight: '600',
                    }}
                  >
                    {call.duration}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '6px 10px',
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

                {/* View */}
                <a
  href={`/calls/${call.id}`}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '9px 13px',
    borderRadius: '8px',
    border: '1px solid #d0d5dd',
    background: '#ffffff',
    color: '#344054',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
  }}
>
  View Details →
</a>
              </div>

              {/* Summary */}
              <div
                style={{
                  marginTop: '15px',
                  padding: '13px 15px',
                  borderRadius: '9px',
                  background: '#f8fafc',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: 1.55,
                    color: '#667085',
                  }}
                >
                  <strong style={{ color: '#344054' }}>AI Summary: </strong>
                  {call.summary}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default CallsPage