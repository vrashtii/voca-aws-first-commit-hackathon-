import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function RegisterPage() {
  function goHome(event) {
    event.preventDefault()
    navigate('/')
  }

  function handleRegister(event) {
    event.preventDefault()
    navigate('/create-agent')
  }

  function goLogin(event) {
    event.preventDefault()
    navigate('/login')
  }

  return (
    <div
      className="page"
      style={{
        background: '#f7f8fa',
        minHeight: '100vh',
      }}
    >
      <Navbar onHomeClick={goHome} />

      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '64px 24px 80px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '430px',
          }}
        >
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
              Get started
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: '38px',
                lineHeight: 1.1,
                color: '#172033',
              }}
            >
              Create your Voca account
            </h1>

            <p
              style={{
                margin: '10px 0 0',
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#667085',
              }}
            >
              Set up your personal AI voice proxy in just a few steps.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            style={{
              background: 'rgba(255,255,255,0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(186,190,191,0.45)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 10px 28px rgba(23,32,51,0.06)',
            }}
          >
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#344054',
              }}
            >
              Full name
            </label>

            <input
              type="text"
              placeholder="Your name"
              required
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '0 13px',
                marginBottom: '18px',
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
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '0 13px',
                marginBottom: '18px',
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
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              required
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '0 13px',
                marginBottom: '22px',
                borderRadius: '9px',
                border: '1px solid #d0d5dd',
                background: '#ffffff',
                color: '#172033',
                fontSize: '14px',
                outline: 'none',
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                minHeight: '44px',
                border: 'none',
                borderRadius: '9px',
                background: '#5f696e',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 5px 14px rgba(95,105,110,0.18)',
              }}
            >
              Create Account
            </button>

            <p
              style={{
                margin: '22px 0 0',
                textAlign: 'center',
                fontSize: '13px',
                color: '#667085',
              }}
            >
              Already have an account?{' '}
              <button
                type="button"
                onClick={goLogin}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  color: '#5f696e',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterPage