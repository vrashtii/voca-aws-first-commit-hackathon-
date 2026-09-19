import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

const API_BASE = 'http://127.0.0.1:8000'

const PURPOSES = [
  {
    id: 'delivery',
    title: 'Delivery & Orders',
    description: 'Handle delivery and order-related calls.',
  },
  {
    id: 'job',
    title: 'Job / Internship',
    description: 'Handle recruiters and professional calls.',
  },
  {
    id: 'personal',
    title: 'Personal / General',
    description: 'Screen calls and take messages.',
  },
  {
    id: 'receptionist',
    title: 'Receptionist',
    description: 'Handle calls for a business.',
  },
  {
    id: 'order_taking',
    title: 'Order Taking',
    description: 'Collect customer orders and menu information.',
  },
  {
    id: 'appointment',
    title: 'Appointments',
    description: 'Handle appointment-related conversations.',
  },
  {
    id: 'customer_support',
    title: 'Customer Support',
    description: 'Handle routine customer support calls.',
  },
  {
    id: 'custom',
    title: 'Custom',
    description: 'Configure a custom purpose for your agent.',
  },
]

function CreateAgentPage() {
  const [agentName, setAgentName] = useState('')
  const [userName, setUserName] = useState('')

  const [greeting, setGreeting] = useState(
    'Hi, you’ve reached my AI voice assistant. How can I help you?'
  )

  const [voice, setVoice] = useState('Warm Female')
  const [available, setAvailable] = useState(true)

  const [selectedPurposes, setSelectedPurposes] = useState([])

  const [profileData, setProfileData] = useState({
    delivery: {
      location: '',
      instructions: '',
    },

    job: {
      resume: '',
      skills: '',
      roles: '',
    },

    personal: {
      call_handling: 'Take messages',
    },

    receptionist: {
      business_name: '',
      business_hours: '',
      services: '',
    },

    order_taking: {
      business_name: '',
      menu: '',
    },

    appointment: {
      business_name: '',
      appointment_information: '',
    },

    customer_support: {
      business_name: '',
      services: '',
      support_information: '',
    },

    custom: {
      description: '',
    },
  })

  const [creating, setCreating] = useState(false)

  function goHome(event) {
    if (event) event.preventDefault()
    navigate('/')
  }

  function togglePurpose(purposeId) {
    setSelectedPurposes((current) => {
      if (current.includes(purposeId)) {
        return current.filter((purpose) => purpose !== purposeId)
      }

      return [...current, purposeId]
    })
  }

  function updateProfile(purpose, field, value) {
    setProfileData((current) => ({
      ...current,
      [purpose]: {
        ...current[purpose],
        [field]: value,
      },
    }))
  }

  function splitCommaSeparated(value) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  function buildProfileData() {
    const result = {}

    selectedPurposes.forEach((purpose) => {
      const data = profileData[purpose]

      if (!data) {
        return
      }

      if (purpose === 'job') {
        result.job = {
          resume: data.resume.trim(),
          details: {
            skills: splitCommaSeparated(data.skills),
            roles: splitCommaSeparated(data.roles),
          },
        }

        return
      }

      result[purpose] = {
        ...data,
      }
    })

    return result
  }

  async function handleCreateAgent(event) {
    event.preventDefault()

    if (!agentName.trim()) {
      alert('Please enter an agent name.')
      return
    }

    if (!userName.trim()) {
      alert('Please enter your name.')
      return
    }

    if (selectedPurposes.length === 0) {
      alert('Please select at least one purpose for your agent.')
      return
    }

    setCreating(true)

    try {
      const payload = {
        agent_name: agentName.trim(),
        user_name: userName.trim(),
        purposes: selectedPurposes,
        profile_data: buildProfileData(),
      }

      const response = await fetch(`${API_BASE}/api/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to create agent.')
      }

      const result = await response.json()

      /*
       * The current backend stores agent status separately.
       * Enable the agent if the user left "Accept calls" enabled.
       */
      if (result.agent_id) {
        try {
          await fetch(`${API_BASE}/api/agents/${result.agent_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: available ? 'enabled' : 'disabled',
            }),
          })
        } catch (statusError) {
          console.warn('Agent created, but status update failed:', statusError)
        }

        /*
         * Save the created agent id locally so the dashboard
         * can use the actual backend agent later.
         */
        localStorage.setItem(
          'voca_agent_id',
          String(result.agent_id)
        )

        localStorage.setItem(
          'voca_agent_settings',
          JSON.stringify({
            greeting,
            voice,
            available,
          })
        )
      }

      alert('Voca agent created successfully!')

      navigate('/agent-ready')
    } catch (error) {
      console.error('Create agent error:', error)

      alert(
        'Could not create the agent. Make sure the FastAPI backend is running.'
      )
    } finally {
      setCreating(false)
    }
  }

  function renderPurposeForm(purpose) {
    if (!selectedPurposes.includes(purpose)) {
      return null
    }

    if (purpose === 'delivery') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Delivery Information</h2>

          <Field
            label="Location / Address"
            value={profileData.delivery.location}
            onChange={(value) =>
              updateProfile('delivery', 'location', value)
            }
            placeholder="e.g. Main Gate, Building A"
          />

          <Field
            label="Delivery instructions"
            value={profileData.delivery.instructions}
            onChange={(value) =>
              updateProfile('delivery', 'instructions', value)
            }
            placeholder="e.g. Call when you arrive"
            textarea
          />
        </section>
      )
    }

    if (purpose === 'job') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Professional Profile</h2>

          <Field
            label="Resume / Professional summary"
            value={profileData.job.resume}
            onChange={(value) =>
              updateProfile('job', 'resume', value)
            }
            placeholder="Paste a short resume/profile summary"
            textarea
          />

          <Field
            label="Skills"
            value={profileData.job.skills}
            onChange={(value) =>
              updateProfile('job', 'skills', value)
            }
            placeholder="e.g. C++, DSA, JavaScript"
          />

          <Field
            label="Preferred roles"
            value={profileData.job.roles}
            onChange={(value) =>
              updateProfile('job', 'roles', value)
            }
            placeholder="e.g. Software Engineer Intern"
          />
        </section>
      )
    }

    if (purpose === 'personal') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Personal Call Handling</h2>

          <p style={helperTextStyle}>
            Choose how Voca should handle routine personal calls.
          </p>

          <select
            value={profileData.personal.call_handling}
            onChange={(event) =>
              updateProfile(
                'personal',
                'call_handling',
                event.target.value
              )
            }
            style={inputStyle}
          >
            <option>Take messages</option>
            <option>Screen unknown calls</option>
            <option>Handle routine calls</option>
          </select>
        </section>
      )
    }

    if (purpose === 'receptionist') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Receptionist Information</h2>

          <Field
            label="Business name"
            value={profileData.receptionist.business_name}
            onChange={(value) =>
              updateProfile(
                'receptionist',
                'business_name',
                value
              )
            }
            placeholder="e.g. Voca Technologies"
          />

          <Field
            label="Business hours"
            value={profileData.receptionist.business_hours}
            onChange={(value) =>
              updateProfile(
                'receptionist',
                'business_hours',
                value
              )
            }
            placeholder="e.g. Mon-Fri, 9 AM - 6 PM"
          />

          <Field
            label="Services"
            value={profileData.receptionist.services}
            onChange={(value) =>
              updateProfile(
                'receptionist',
                'services',
                value
              )
            }
            placeholder="e.g. Sales, Support, Appointments"
            textarea
          />
        </section>
      )
    }

    if (purpose === 'order_taking') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Order Taking Information</h2>

          <Field
            label="Business name"
            value={profileData.order_taking.business_name}
            onChange={(value) =>
              updateProfile(
                'order_taking',
                'business_name',
                value
              )
            }
            placeholder="e.g. Voca Cafe"
          />

          <Field
            label="Menu / Order information"
            value={profileData.order_taking.menu}
            onChange={(value) =>
              updateProfile(
                'order_taking',
                'menu',
                value
              )
            }
            placeholder="Enter menu items and relevant information"
            textarea
          />
        </section>
      )
    }

    if (purpose === 'appointment') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Appointment Information</h2>

          <Field
            label="Business / Service name"
            value={profileData.appointment.business_name}
            onChange={(value) =>
              updateProfile(
                'appointment',
                'business_name',
                value
              )
            }
            placeholder="e.g. Dental Clinic"
          />

          <Field
            label="Appointment information"
            value={
              profileData.appointment.appointment_information
            }
            onChange={(value) =>
              updateProfile(
                'appointment',
                'appointment_information',
                value
              )
            }
            placeholder="Add available appointment information"
            textarea
          />
        </section>
      )
    }

    if (purpose === 'customer_support') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Customer Support Information</h2>

          <Field
            label="Business name"
            value={profileData.customer_support.business_name}
            onChange={(value) =>
              updateProfile(
                'customer_support',
                'business_name',
                value
              )
            }
            placeholder="e.g. Voca Support"
          />

          <Field
            label="Services"
            value={profileData.customer_support.services}
            onChange={(value) =>
              updateProfile(
                'customer_support',
                'services',
                value
              )
            }
            placeholder="e.g. Orders, Returns, Technical Support"
          />

          <Field
            label="Support information"
            value={
              profileData.customer_support.support_information
            }
            onChange={(value) =>
              updateProfile(
                'customer_support',
                'support_information',
                value
              )
            }
            placeholder="Information Voca can use while handling calls"
            textarea
          />
        </section>
      )
    }

    if (purpose === 'custom') {
      return (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Custom Agent Purpose</h2>

          <Field
            label="Describe what Voca should handle"
            value={profileData.custom.description}
            onChange={(value) =>
              updateProfile(
                'custom',
                'description',
                value
              )
            }
            placeholder="Describe the type of calls and information Voca should handle"
            textarea
          />
        </section>
      )
    }

    return null
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
        <div style={{ maxWidth: '800px', marginBottom: '45px' }}>
          <p style={eyebrowStyle}>
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

          <p style={descriptionStyle}>
            Build a personal AI voice proxy that knows what it
            is allowed to handle and uses your configured
            information during calls.
          </p>
        </div>

        <form onSubmit={handleCreateAgent}>
          {/* BASIC INFORMATION */}

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              Basic information
            </h2>

            <Field
              label="Agent name"
              value={agentName}
              onChange={setAgentName}
              placeholder="e.g. Voca Assistant"
            />

            <Field
              label="Your name"
              value={userName}
              onChange={setUserName}
              placeholder="e.g. Vrashti"
            />
          </section>

          {/* PURPOSE SELECTION */}

          <section style={{ ...sectionStyle, marginTop: '24px' }}>
            <h2 style={sectionTitleStyle}>
              What should your agent handle?
            </h2>

            <p style={helperTextStyle}>
              Select one or more purposes. Voca can be
              multipurpose.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {PURPOSES.map((purpose) => {
                const selected = selectedPurposes.includes(
                  purpose.id
                )

                return (
                  <button
                    key={purpose.id}
                    type="button"
                    onClick={() =>
                      togglePurpose(purpose.id)
                    }
                    style={{
                      textAlign: 'left',
                      padding: '18px',
                      borderRadius: '16px',
                      border: selected
                        ? '1px solid #8b6cff'
                        : '1px solid rgba(255,255,255,0.10)',
                      background: selected
                        ? 'rgba(124,92,255,0.16)'
                        : 'rgba(255,255,255,0.035)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: '0.2s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '8px',
                      }}
                    >
                      <strong>{purpose.title}</strong>

                      {selected && (
                        <span
                          style={{
                            color: '#a995ff',
                            fontWeight: '700',
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      {purpose.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* PURPOSE-SPECIFIC FORMS */}

          {selectedPurposes.map((purpose) => (
            <div key={purpose}>
              {renderPurposeForm(purpose)}
            </div>
          ))}

          {/* VOICE SETTINGS */}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '24px',
            }}
          >
            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                Voice settings
              </h2>

              <label style={labelStyle}>
                Voice
              </label>

              <select
                value={voice}
                onChange={(event) =>
                  setVoice(event.target.value)
                }
                style={inputStyle}
              >
                <option>Warm Female</option>
                <option>Calm Male</option>
                <option>Professional Female</option>
                <option>Professional Male</option>
              </select>
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                Call handling
              </h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '18px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border:
                    '1px solid rgba(255,255,255,0.07)',
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
                    Let Voca answer calls when enabled.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setAvailable(!available)
                  }
                  style={{
                    width: '54px',
                    height: '30px',
                    borderRadius: '999px',
                    border: 'none',
                    background: available
                      ? '#7c5cff'
                      : '#33333d',
                    padding: '3px',
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

          {/* GREETING */}

          <section
            style={{
              ...sectionStyle,
              marginTop: '24px',
            }}
          >
            <h2 style={sectionTitleStyle}>
              First greeting
            </h2>

            <p style={helperTextStyle}>
              This is saved locally for the current frontend
              demo. The current backend does not yet persist
              greeting or voice settings.
            </p>

            <textarea
              value={greeting}
              onChange={(event) =>
                setGreeting(event.target.value)
              }
              rows="4"
              style={textareaStyle}
            />
          </section>

          {/* BUTTONS */}

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
              style={secondaryButtonStyle}
            >
              ← Back to home
            </button>

            <button
              type="submit"
              disabled={creating}
              style={{
                ...primaryButtonStyle,
                opacity: creating ? 0.6 : 1,
                cursor: creating
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              {creating
                ? 'Creating...'
                : 'Create Agent →'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

/* -------------------------------------------------------
   Reusable field component
------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows="4"
          style={textareaStyle}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------
   Shared styles
------------------------------------------------------- */

const sectionStyle = {
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '24px',
  padding: '28px',
  backdropFilter: 'blur(12px)',
}

const sectionTitleStyle = {
  fontSize: '22px',
  marginTop: 0,
  marginBottom: '20px',
}

const labelStyle = {
  display: 'block',
  marginBottom: '9px',
  fontSize: '14px',
  fontWeight: '600',
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#ffffff',
  fontSize: '15px',
  outline: 'none',
  marginBottom: '4px',
}

const textareaStyle = {
  ...inputStyle,
  lineHeight: 1.5,
  resize: 'vertical',
}

const helperTextStyle = {
  margin: '0 0 20px',
  fontSize: '14px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.55)',
}

const eyebrowStyle = {
  fontSize: '13px',
  fontWeight: '700',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  opacity: 0.65,
  marginBottom: '14px',
}

const descriptionStyle = {
  fontSize: '18px',
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.68)',
  margin: 0,
}

const secondaryButtonStyle = {
  padding: '13px 20px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent',
  color: '#ffffff',
  fontSize: '15px',
  cursor: 'pointer',
}

const primaryButtonStyle = {
  padding: '14px 24px',
  borderRadius: '12px',
  border: 'none',
  background:
    'linear-gradient(135deg, #8b6cff, #5d45ff)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '700',
  boxShadow:
    '0 12px 30px rgba(100, 75, 255, 0.25)',
}

export default CreateAgentPage