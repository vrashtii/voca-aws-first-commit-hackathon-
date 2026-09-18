function VoiceVisual() {
  return (
    <div className="voice-visual" aria-hidden="true">
      <div className="voice-card">
        <div className="voice-card-top">
          <span className="voice-dot" />
          Live with caller
        </div>
        <p className="voice-title">Voca Agent</p>
        <p className="voice-sub">Handling a missed call</p>
        <div className="waveform">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="voice-meta">
          <span>Status: answering</span>
          <span>00:42</span>
        </div>
      </div>
    </div>
  )
}

export default VoiceVisual
