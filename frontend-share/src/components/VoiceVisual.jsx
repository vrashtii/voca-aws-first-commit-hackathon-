function VoiceVisual() {
  const waveform = [22, 38, 58, 34, 72, 45, 28, 54, 78, 42, 25, 60, 36, 70, 48, 30, 55, 40, 68, 35, 52, 26]

  return (
    <div
      className="voice-visual"
      aria-hidden="true"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(100%, 560px)',
          minHeight: '390px',
          padding: '34px',
          borderRadius: '28px',
          border: '1px solid rgba(115, 125, 130, 0.22)',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.90), rgba(242,244,245,0.72))',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow:
            '0 24px 60px rgba(23,32,51,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
          overflow: 'hidden',
        }}
      >
        {/* Soft background glow */}
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            top: '-130px',
            right: '-80px',
            background: 'rgba(186,190,191,0.20)',
            filter: 'blur(40px)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            bottom: '-120px',
            left: '-90px',
            background: 'rgba(186,190,191,0.14)',
            filter: 'blur(35px)',
          }}
        />

        {/* Top status */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '34px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              color: '#4f5b61',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#16a34a',
                boxShadow: '0 0 0 5px rgba(22,163,74,0.10)',
              }}
            />
            Voca is handling the call
          </div>

          <span
            style={{
              padding: '6px 10px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(186,190,191,0.45)',
              color: '#737d82',
              fontSize: '11px',
              fontWeight: '700',
            }}
          >
            LIVE
          </span>
        </div>

        {/* Caller */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(145deg, #ffffff, rgba(186,190,191,0.38))',
              border: '1px solid rgba(115,125,130,0.26)',
              color: '#5f696e',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 6px 18px rgba(23,32,51,0.06)',
            }}
          >
            SJ
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: '#7a858c',
                marginBottom: '3px',
              }}
            >
              Incoming call
            </p>

            <h3
              style={{
                margin: 0,
                color: '#172033',
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '-0.02em',
              }}
            >
              Sarah Johnson
            </h3>

            <p
              style={{
                margin: '3px 0 0',
                color: '#667085',
                fontSize: '12px',
              }}
            >
              +91 98765 43210
            </p>
          </div>
        </div>

        {/* Voice visual */}
        <div
          style={{
            position: 'relative',
            minHeight: '105px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '4px -5px 26px',
          }}
        >
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              background: 'rgba(115,125,130,0.16)',
            }}
          />

          {/* Waveform */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '0 10px',
            }}
          >
            {waveform.map((height, index) => (
              <span
                key={index}
                style={{
                  width: '4px',
                  height: `${height}px`,
                  borderRadius: '999px',
                  background:
                    index % 3 === 0
                      ? '#667278'
                      : index % 2 === 0
                        ? '#8b9498'
                        : '#b7babb',
                  opacity: 0.95,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom information */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '13px',
              background: 'rgba(255,255,255,0.68)',
              border: '1px solid rgba(186,190,191,0.35)',
            }}
          >
            <p
              style={{
                margin: '0 0 4px',
                fontSize: '11px',
                color: '#7a858c',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Status
            </p>

            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              Listening
            </p>
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '13px',
              background: 'rgba(255,255,255,0.68)',
              border: '1px solid rgba(186,190,191,0.35)',
            }}
          >
            <p
              style={{
                margin: '0 0 4px',
                fontSize: '11px',
                color: '#7a858c',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Call duration
            </p>

            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '700',
                color: '#344054',
              }}
            >
              00:42
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceVisual 