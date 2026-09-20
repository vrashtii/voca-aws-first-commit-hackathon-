import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VoiceVisual from '../components/VoiceVisual'
import { navigate } from '../utils/navigate'

const steps = [
  {
    number: '01',
    title: 'Create your AI agent',
    text: 'Set a name, voice style, and a few rules so Voca sounds like you and knows what to say.',
  },
  {
    number: '02',
    title: 'Let Voca handle your calls',
    text: 'When you are unavailable, your agent picks up, listens carefully, and keeps the conversation moving.',
  },
  {
    number: '03',
    title: 'Get a clear call summary',
    text: 'After the call, you receive a short recap with who called, why it mattered, and what to do next.',
  },
]

const features = [
  {
    title: 'AI Voice Agent',
    text: 'A personal voice proxy that speaks naturally, stays on-brand, and represents you on the line.',
  },
  {
    title: 'Call Handling',
    text: 'Voca answers when you cannot, gathers context, and keeps important conversations from dropping.',
  },
  {
    title: 'Smart Call Summaries',
    text: 'Every call becomes a clear brief: intent, key details, and follow-ups you can act on later.',
  },
  {
    title: 'User Control',
    text: 'You decide when the agent is active, what it can share, and how it should handle sensitive calls.',
  },
]

function LandingPage() {
  function goCreate(event) {
    event.preventDefault()
    navigate('/create-agent')
  }

  function goLogin(event) {
    event.preventDefault()
    navigate('/login')
  }

  return (
    <div className="page">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">AI Voice Proxy</p>

            <h1>Your AI Voice Proxy</h1>

            <p className="hero-kicker">
              Never miss a call that matters.
            </p>

            <p className="hero-text">
              Voca gives you a personal AI voice agent that handles important
              calls when you are unavailable — then sends you a useful summary
              so you can catch up in seconds.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="/create-agent"
                onClick={goCreate}
              >
                Create Your Agent
              </a>

              <a
                className="btn btn-ghost"
                href="#how-it-works"
              >
                See How It Works
              </a>

              <a
                className="btn btn-ghost"
                href="/login"
                onClick={goLogin}
              >
                Sign In
              </a>
            </div>
          </div>

          <VoiceVisual />
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section">
          <div className="section-head">
            <p className="eyebrow">How it works</p>

            <h2>
              Three steps from missed call to clear recap
            </h2>
          </div>

          <div className="steps">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">
                  {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section">
          <div className="section-head">
            <p className="eyebrow">Features</p>

            <h2>
              Built for calls you cannot afford to miss
            </h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article
                className="feature-card"
                key={feature.title}
              >
                <h3>{feature.title}</h3>

                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta">
          <p className="eyebrow">Get started</p>

          <h2>Your calls shouldn&apos;t wait for you.</h2>

          <p>
            Create an agent now and let Voca cover the line until you are back.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <a
              className="btn btn-primary"
              href="/create-agent"
              onClick={goCreate}
            >
              Create Your Agent
            </a>

            <a
              className="btn btn-ghost"
              href="/login"
              onClick={goLogin}
            >
              Sign In
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage