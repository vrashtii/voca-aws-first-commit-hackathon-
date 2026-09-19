import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { navigate } from '../utils/navigate'

function LoginPage() {
  function goHome(event) {
    event.preventDefault()
    navigate('/')
  }

  function handleLogin(event) {
    event.preventDefault()
    navigate('/dashboard')
  }

  function goRegister(event) {
    event.preventDefault()
    navigate('/register')
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
              Welcome back
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: '38px',
                lineHeight: 1.1,
                color: '#172033',
              }}
            >
              Sign in to Voca
            </h1>

            <p
              style={{
                margin: '10px 0 0',
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#667085',
              }}
            >
              Manage your AI voice agent and review your calls.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
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

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#344054',
                }}
              >
                Password
              </label>

              <a
                href="/login"
                onClick={(event) => event.preventDefault()}
                style={{
                  color: '#737d82',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Forgot password?
              </a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
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
              Sign In
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '22px 0',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: '#e5e7eb',
                }}
              />

              <span
                style={{
                  fontSize: '12px',
                  color: '#98a2b3',
                }}
              >
                or
              </span>

              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: '#e5e7eb',
                }}
              />
            </div>

            <button
              type="button"
              style={{
                width: '100%',
                minHeight: '44px',
                border: '1px solid #d0d5dd',
                borderRadius: '9px',
                background: '#ffffff',
                color: '#344054',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Continue with Google
            </button>

            <p
              style={{
                margin: '22px 0 0',
                textAlign: 'center',
                fontSize: '13px',
                color: '#667085',
              }}
            >
              Don't have an account?{' '}
              <a
                href="/register"
                onClick={goRegister}
                style={{
                  color: '#5f696e',
                  fontWeight: '700',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Create one
              </a>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage