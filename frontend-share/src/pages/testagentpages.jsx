import { useEffect, useRef, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function TestAgentPage() {
  const [agent, setAgent] = useState(null);
  const [callState, setCallState] = useState("incoming");
  const [sessionId, setSessionId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const sessionIdRef = useRef(null);
  const callActiveRef = useRef(false);
  const processingRef = useRef(false);
  const restartListeningRef = useRef(null);

  const agentId = localStorage.getItem("voca_agent_id");

  // ==================================================
  // LOAD AGENT
  // ==================================================

  useEffect(() => {
    if (!agentId) {
      setError(
        "No Voca agent found. Please create an agent first."
      );
      return;
    }

    async function loadAgent() {
      try {
        const response = await fetch(
          `${API_BASE}/api/agents/${agentId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load agent");
        }

        const data = await response.json();
        setAgent(data);
      } catch (err) {
        console.error(err);
        setError("Could not connect to Voca backend.");
      }
    }

    loadAgent();
  }, [agentId]);

  // ==================================================
  // CLEANUP
  // ==================================================

  useEffect(() => {
    return () => {
      callActiveRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Already stopped.
        }
      }

      window.speechSynthesis.cancel();
      clearTimeout(restartListeningRef.current);
    };
  }, []);

  // ==================================================
  // SPEAK WITH BROWSER VOICE
  // ==================================================

  const speakVoca = (text, afterSpeech) => {
    if (!text) {
      if (afterSpeech) {
        afterSpeech();
      }
      return;
    }

    if (!("speechSynthesis" in window)) {
      setError(
        "Your browser does not support voice output."
      );

      if (afterSpeech) {
        afterSpeech();
      }

      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);

      if (
        callActiveRef.current &&
        afterSpeech
      ) {
        afterSpeech();
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);

      if (
        callActiveRef.current &&
        afterSpeech
      ) {
        afterSpeech();
      }
    };

    window.speechSynthesis.speak(
      utterance
    );
  };

  // ==================================================
  // START MICROPHONE
  // ==================================================

  const startListening = () => {
    if (!callActiveRef.current) {
      return;
    }

    // Do not start microphone while Voca is processing
    // or speaking.
    if (processingRef.current || isSpeaking) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Speech recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    // Stop an old recognition instance.
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore.
      }
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = async (
      event
    ) => {
      const transcript =
        event.results[0][0].transcript.trim();

      setIsListening(false);
      processingRef.current = true;

      if (!transcript) {
        processingRef.current = false;

        if (callActiveRef.current) {
          setTimeout(
            startListening,
            500
          );
        }

        return;
      }

      console.log(
        "Caller said:",
        transcript
      );

      // Show caller message.
      setMessages((previous) => [
        ...previous,
        {
          speaker: "caller",
          text: transcript,
        },
      ]);

      await sendCallerMessage(
        transcript
      );

      processingRef.current = false;
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
        return;
      }

      if (
        event.error === "no-speech"
      ) {
        if (callActiveRef.current) {
          setTimeout(
            startListening,
            700
          );
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      // If recognition stopped unexpectedly while the call
      // is still active, allow it to restart.
      if (
        callActiveRef.current &&
        !processingRef.current &&
        !isSpeaking
      ) {
        clearTimeout(restartListeningRef.current);

        restartListeningRef.current = setTimeout(() => {
          if (
            callActiveRef.current &&
            !processingRef.current
          ) {
            startListening();
          }
        }, 500);
      }
    };

    recognitionRef.current =
      recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error(
        "Could not start recognition:",
        err
      );
    }
  };

  // ==================================================
  // SEND CALLER MESSAGE TO VOCA
  // ==================================================

  const sendCallerMessage = async (
    callerMessage
  ) => {
    const currentSession =
      sessionIdRef.current;

    if (!currentSession) {
      setError(
        "No active Voca call session."
      );
      return;
    }

    try {
      setCallState("thinking");

      const response = await fetch(
        `${API_BASE}/api/calls/${currentSession}/message?caller_message=${encodeURIComponent(
          callerMessage
        )}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        let message =
          "Voca could not process your message.";

        try {
          const errorData =
            await response.json();

          if (
            typeof errorData.detail ===
            "string"
          ) {
            message =
              errorData.detail;
          }
        } catch {
          // Keep default.
        }

        throw new Error(message);
      }

      const data =
        await response.json();

      const vocaText =
        data.response ||
        "Sorry, I could not respond.";

      console.log(
        "Voca replied:",
        vocaText
      );

      // Add Voca response to conversation.
      setMessages((previous) => [
        ...previous,
        {
          speaker: "voca",
          text: vocaText,
        },
      ]);

      if (!callActiveRef.current) {
        return;
      }

      setCallState("voca");

      // Voca speaks.
      speakVoca(
        vocaText,
        () => {
          if (
            callActiveRef.current
          ) {
            setCallState("voca");

            // Start listening after Voca
            // finishes speaking.
            setTimeout(
              startListening,
              500
            );
          }
        }
      );
    } catch (err) {
      console.error(
        "Voca message error:",
        err
      );

      setCallState("voca");

      setError(
        err.message ||
          "Voca could not process the message."
      );

      if (callActiveRef.current) {
        setTimeout(
          startListening,
          1000
        );
      }
    }
  };

  // ==================================================
  // DECLINE
  // ==================================================

  const declineCall = () => {
    callActiveRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore.
      }
    }

    window.speechSynthesis.cancel();
    clearTimeout(restartListeningRef.current);
    processingRef.current = false;

    setCallState("declined");
  };

  // ==================================================
  // ANSWER MYSELF
  // ==================================================

  const answerMyself = () => {
    setCallState("self");
    setError("");
  };

  // ==================================================
  // LET VOCA ANSWER
  // ==================================================

  const letVocaAnswer = async () => {
    try {
      setError("");

      setCallState("connecting");

      const response = await fetch(
        `${API_BASE}/api/calls/start?agent_id=${Number(
          agentId
        )}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        let message =
          "Could not start Voca call.";

        try {
          const errorData =
            await response.json();

          if (
            typeof errorData.detail ===
            "string"
          ) {
            message =
              errorData.detail;
          } else if (
            errorData.detail
          ) {
            message = JSON.stringify(
              errorData.detail
            );
          }
        } catch {
          // Keep default.
        }

        throw new Error(message);
      }

      const data =
        await response.json();

      console.log(
        "Voca session started:",
        data
      );

      setSessionId(
        data.session_id
      );

      sessionIdRef.current =
        data.session_id;

      callActiveRef.current =
        true;

      setCallState("voca");

      // Store Voca's greeting.
      const intro =
        data.response ||
        "Hi, I'm Voca, an AI assistant. How can I help you today?";

      setMessages([
        {
          speaker: "voca",
          text: intro,
        },
      ]);

      // Voca speaks first.
      speakVoca(
        intro,
        () => {
          if (
            callActiveRef.current
          ) {
            setTimeout(
              startListening,
              500
            );
          }
        }
      );
    } catch (err) {
      console.error(
        "Could not start Voca call:",
        err
      );

      callActiveRef.current =
        false;

      setCallState("incoming");

      setError(
        err.message ||
          "Could not start Voca call."
      );
    }
  };

  // ==================================================
  // END CALL
  // ==================================================

  const endCall = async () => {
    callActiveRef.current =
      false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore.
      }
    }

    window.speechSynthesis.cancel();
    clearTimeout(restartListeningRef.current);
    processingRef.current = false;

    try {
      const currentSession =
        sessionIdRef.current;

      if (currentSession) {
        const response = await fetch(
          `${API_BASE}/api/calls/${currentSession}/end`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          let message =
            "Could not end Voca call.";

          try {
            const errorData =
              await response.json();

            if (
              typeof errorData.detail ===
              "string"
            ) {
              message =
                errorData.detail;
            }
          } catch {
            // Keep default.
          }

          throw new Error(message);
        }

        const data =
          await response.json();

        console.log(
          "Call ended:",
          data
        );
      }

      setSessionId(null);

      sessionIdRef.current = null;

      setIsListening(false);

      setIsSpeaking(false);

      setCallState("ended");
    } catch (err) {
      console.error(
        "Could not end call:",
        err
      );

      setError(
        err.message ||
          "Could not end the call."
      );

      setCallState("ended");
    }
  };

  // ==================================================
  // RESET
  // ==================================================

  const resetCall = () => {
    callActiveRef.current =
      false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore.
      }
    }

    window.speechSynthesis.cancel();
    clearTimeout(restartListeningRef.current);
    processingRef.current = false;

    setCallState("incoming");

    setSessionId(null);

    sessionIdRef.current = null;

    setMessages([]);

    setIsListening(false);

    setIsSpeaking(false);

    setError("");
  };

  // ==================================================
  // BACK
  // ==================================================

  const goBack = () => {
    window.history.back();
  };

  // ==================================================
  // ERROR SCREEN
  // ==================================================

  if (error && !agent) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "500px",
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Voca</h2>

          <p>{error}</p>

          <button
            onClick={goBack}
            style={{
              marginTop: "15px",
              padding: "12px 22px",
              border: "none",
              borderRadius: "10px",
              background: "#111827",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          height: "76px",
          background: "#11131c",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "white",
              borderRadius: "10px",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              color: "#11131c",
            }}
          >
            ◉
          </div>

          Voca
        </div>

        <button
          onClick={goBack}
          style={{
            background:
              "transparent",
            color: "white",
            border:
              "1px solid #666",
            borderRadius: "10px",
            padding:
              "10px 18px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </header>

      {/* MAIN */}

      <main
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding:
            "55px 20px",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "35px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing:
                "2px",
              color: "#667085",
            }}
          >
            CALL SIMULATION
          </div>

          <h1
            style={{
              fontSize: "46px",
              margin:
                "12px 0",
              color:
                "#111827",
            }}
          >
            Test Your Agent
          </h1>

          <p
            style={{
              color:
                "#667085",
              fontSize:
                "18px",
            }}
          >
            Experience how Voca
            handles an incoming
            call.
          </p>
        </div>

        {/* CALL CARD */}

        <div
          style={{
            background:
              "white",
            borderRadius:
              "28px",
            boxShadow:
              "0 15px 45px rgba(0,0,0,0.10)",
            overflow:
              "hidden",
          }}
        >
          {/* CALL HEADER */}

          <div
            style={{
              textAlign:
                "center",
              padding:
                "45px 30px 30px",
            }}
          >
            <div
              style={{
                width: "105px",
                height: "105px",
                borderRadius:
                  "50%",
                background:
                  callState ===
                  "voca"
                    ? "#eef2ff"
                    : "#eef1f5",
                margin:
                  "0 auto 20px",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontSize:
                  "42px",
              }}
            >
              {callState ===
              "voca"
                ? "🤖"
                : "👤"}
            </div>

            <div
              style={{
                fontSize:
                  "14px",
                color:
                  "#667085",
                marginBottom:
                  "8px",
              }}
            >
              {callState ===
                "incoming" &&
                "Incoming call"}

              {callState ===
                "connecting" &&
                "Connecting to Voca..."}

              {callState ===
                "self" &&
                "You are answering"}

              {callState ===
                "voca" &&
                "Voca is answering"}

              {callState ===
                "declined" &&
                "Call declined"}

              {callState ===
                "ended" &&
                "Call ended"}
            </div>

            <h2
              style={{
                fontSize:
                  "30px",
                margin:
                  "5px 0",
                color:
                  "#111827",
              }}
            >
              {callState ===
              "voca"
                ? agent?.agent_name ||
                  "Voca"
                : "Unknown Caller"}
            </h2>

            <p
              style={{
                color:
                  "#667085",
                margin:
                  "8px 0",
              }}
            >
              +91 ••••• •••••
            </p>

            {callState ===
              "incoming" && (
              <div
                style={{
                  marginTop:
                    "20px",
                  color:
                    "#16a34a",
                  fontWeight:
                    "600",
                }}
              >
                📞 Calling...
              </div>
            )}

            {callState ===
              "connecting" && (
              <div
                style={{
                  marginTop:
                    "20px",
                  color:
                    "#d97706",
                  fontWeight:
                    "600",
                }}
              >
                ⏳ Connecting...
              </div>
            )}

            {callState ===
              "voca" && (
              <div
                style={{
                  marginTop:
                    "20px",
                  color:
                    "#16a34a",
                  fontWeight:
                    "600",
                }}
              >
                ● Voca is handling
                this call
              </div>
            )}
          </div>

          {/* CONVERSATION */}

          {(callState ===
            "voca" ||
            callState ===
              "thinking") &&
            messages.length >
              0 && (
              <div
                style={{
                  maxHeight:
                    "360px",
                  overflowY:
                    "auto",
                  padding:
                    "20px 30px",
                  background:
                    "#fafbfc",
                  borderTop:
                    "1px solid #eee",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <div
                      key={index}
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          message.speaker ===
                          "caller"
                            ? "flex-end"
                            : "flex-start",
                        marginBottom:
                          "14px",
                      }}
                    >
                      <div
                        style={{
                          maxWidth:
                            "72%",
                          padding:
                            "13px 17px",
                          borderRadius:
                            "16px",
                          background:
                            message.speaker ===
                            "caller"
                              ? "#626b70"
                              : "white",
                          color:
                            message.speaker ===
                            "caller"
                              ? "white"
                              : "#111827",
                          boxShadow:
                            message.speaker ===
                            "voca"
                              ? "0 2px 8px rgba(0,0,0,0.06)"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            fontWeight:
                              "700",
                            opacity:
                              "0.65",
                            marginBottom:
                              "5px",
                          }}
                        >
                          {message.speaker ===
                          "caller"
                            ? "You"
                            : "Voca"}
                        </div>

                        <div
                          style={{
                            lineHeight:
                              "1.5",
                          }}
                        >
                          {
                            message.text
                          }
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          {/* VOICE STATUS */}

          {callState ===
            "voca" && (
            <div
              style={{
                textAlign:
                  "center",
                padding:
                  "25px 20px",
              }}
            >
              {isSpeaking && (
                <>
                  <div
                    style={{
                      fontSize:
                        "32px",
                      marginBottom:
                        "8px",
                    }}
                  >
                    🔊
                  </div>

                  <div
                    style={{
                      fontWeight:
                        "700",
                      color:
                        "#111827",
                    }}
                  >
                    Voca is speaking...
                  </div>
                </>
              )}

              {isListening && (
                <>
                  <div
                    style={{
                      fontSize:
                        "32px",
                      marginBottom:
                        "8px",
                    }}
                  >
                    🎙️
                  </div>

                  <div
                    style={{
                      fontWeight:
                        "700",
                      color:
                        "#16a34a",
                    }}
                  >
                    Listening to you...
                  </div>
                </>
              )}

              {!isListening &&
                !isSpeaking && (
                  <div
                    style={{
                      color:
                        "#667085",
                    }}
                  >
                    Preparing voice...
                  </div>
                )}

              {error && (
                <div
                  style={{
                    marginTop:
                      "15px",
                    padding:
                      "12px",
                    borderRadius:
                      "10px",
                    background:
                      "#fef2f2",
                    color:
                      "#dc2626",
                    fontSize:
                      "14px",
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          )}

          {/* CONTROLS */}

          <div
            style={{
              padding:
                "30px",
                borderTop:
                  "1px solid #eee",
            }}
          >
            {/* INCOMING */}

            {callState ===
              "incoming" && (
              <>
                <p
                  style={{
                    textAlign:
                      "center",
                    color:
                      "#667085",
                    marginBottom:
                      "25px",
                  }}
                >
                  Choose how you want
                  to handle this call
                </p>

                <div
                  style={{
                    display:
                      "grid",
                    gap:
                      "14px",
                  }}
                >
                  <button
                    onClick={
                      answerMyself
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "17px",
                      border:
                        "1px solid #d0d5dd",
                      borderRadius:
                        "14px",
                      background:
                        "white",
                      color:
                        "#111827",
                      fontSize:
                        "16px",
                      fontWeight:
                        "700",
                      cursor:
                        "pointer",
                    }}
                  >
                    📱 Answer Myself
                  </button>

                  <button
                    onClick={
                      letVocaAnswer
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "17px",
                      border:
                        "none",
                      borderRadius:
                        "14px",
                      background:
                        "#111827",
                      color:
                        "white",
                      fontSize:
                        "16px",
                      fontWeight:
                        "700",
                      cursor:
                        "pointer",
                    }}
                  >
                    🤖 Let Voca Answer
                  </button>

                  <button
                    onClick={
                      declineCall
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "17px",
                      border:
                        "none",
                      borderRadius:
                        "14px",
                      background:
                        "#ef4444",
                      color:
                        "white",
                      fontSize:
                        "16px",
                      fontWeight:
                        "700",
                      cursor:
                        "pointer",
                    }}
                  >
                    🔴 Decline
                  </button>
                </div>
              </>
            )}

            {/* CONNECTING */}

            {callState ===
              "connecting" && (
              <div
                style={{
                  textAlign:
                    "center",
                  padding:
                    "20px",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "40px",
                  }}
                >
                  🤖
                </div>

                <h3>
                  Connecting Voca...
                </h3>

                <p
                  style={{
                    color:
                      "#667085",
                  }}
                >
                  Starting the AI
                  assistant.
                </p>
              </div>
            )}

            {/* SELF */}

            {callState ===
              "self" && (
              <div
                style={{
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "40px",
                  }}
                >
                  📞
                </div>

                <h3>
                  Call Connected
                </h3>

                <p
                  style={{
                    color:
                      "#667085",
                  }}
                >
                  You are handling
                  the call yourself.
                </p>

                <button
                  onClick={
                    endCall
                  }
                  style={{
                    marginTop:
                      "20px",
                    padding:
                      "16px 40px",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    background:
                      "#ef4444",
                    color:
                      "white",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  🔴 End Call
                </button>
              </div>
            )}

            {/* VOCA ACTIVE */}

            {callState ===
              "voca" && (
              <div
                style={{
                  textAlign:
                    "center",
                }}
              >
                <button
                  onClick={
                    endCall
                  }
                  style={{
                    padding:
                      "16px 45px",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    background:
                      "#ef4444",
                    color:
                      "white",
                    fontWeight:
                      "700",
                    fontSize:
                      "15px",
                    cursor:
                      "pointer",
                  }}
                >
                  🔴 End Call
                </button>
              </div>
            )}

            {/* DECLINED */}

            {callState ===
              "declined" && (
              <div
                style={{
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "45px",
                  }}
                >
                  📵
                </div>

                <h3>
                  Call Declined
                </h3>

                <p
                  style={{
                    color:
                      "#667085",
                  }}
                >
                  The incoming call
                  was declined.
                </p>

                <button
                  onClick={
                    resetCall
                  }
                  style={{
                    padding:
                      "14px 28px",
                    border:
                      "none",
                    borderRadius:
                      "12px",
                    background:
                      "#111827",
                    color:
                      "white",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Simulate Another
                  Call
                </button>
              </div>
            )}

            {/* ENDED */}

            {callState ===
              "ended" && (
              <div
                style={{
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "45px",
                  }}
                >
                  📞
                </div>

                <h3>
                  Call Ended
                </h3>

                <p
                  style={{
                    color:
                      "#667085",
                  }}
                >
                  The call has been
                  saved to your call
                  history.
                </p>

                <button
                  onClick={
                    resetCall
                  }
                  style={{
                    padding:
                      "14px 28px",
                    border:
                      "none",
                    borderRadius:
                      "12px",
                    background:
                      "#111827",
                    color:
                      "white",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Simulate Another
                  Call
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestAgentPage;