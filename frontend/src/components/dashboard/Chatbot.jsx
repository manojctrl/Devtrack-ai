import { useState, useEffect, useRef } from "react";
import {
  IconMessageChatbot,
  IconX,
  IconSparkles,
  IconLoader3,
  IconArrowUp,
} from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

const Chatbot = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello ${user?.firstName || "Developer"}! I am your DevTrack AI Assistant. I have analyzed your profile and GitHub metrics. Ask me anything about career guidance, learning roadmaps, resume feedback, or technical queries!`,
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:start", () => {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "", time: new Date() },
      ]);
    });

    socket.on("chat:chunk", (data) => {
      setMessages((prev) => {
        const updated = [...prev];
        if (
          updated.length > 0 &&
          updated[updated.length - 1].sender === "bot"
        ) {
          updated[updated.length - 1].text = data.text;
        }
        return updated;
      });
    });

    socket.on("chat:end", () => {
      setIsTyping(false);
    });

    socket.on("chat:error", (data) => {
      setMessages((prev) => {
        const updated = [...prev];
        const errorMessage = {
          sender: "bot",
          text: data.message || "An error occurred during chat processing.",
          time: new Date(),
        };
        if (
          updated.length > 0 &&
          updated[updated.length - 1].sender === "bot" &&
          updated[updated.length - 1].text === ""
        ) {
          updated[updated.length - 1] = errorMessage;
        } else {
          updated.push(errorMessage);
        }
        return updated;
      });
      setLoading(false);
      setIsTyping(false);
    });

    return () => {
      socket.off("chat:start");
      socket.off("chat:chunk");
      socket.off("chat:end");
      socket.off("chat:error");
    };
  }, [socket]);

  if (!isOpen) return null;

  const handleSend = async (e, textOverride) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || inputText;
    if (!textToSend.trim() || loading || isTyping) return;

    const userMessage = {
      sender: "user",
      text: textToSend,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textOverride) setInputText("");
    setLoading(true);
    setIsTyping(true);

    if (socket) {
      const chatHistory = [...messages, userMessage].slice(-10);
      socket.emit("chat:message", { messages: chatHistory });
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Connection is currently offline. Please wait or reload.",
          time: new Date(),
        },
      ]);
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes devChatFadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes devChatBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes devChatSlideIn {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        .devtrack-chat-wrap {
          animation: devChatFadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .devtrack-msg-animate {
          animation: devChatSlideIn 0.2s ease both;
        }
        .devtrack-dot {
          animation: devChatBlink 1.2s ease-in-out infinite;
        }
        .devtrack-dot:nth-child(2) { animation-delay: 0.2s; }
        .devtrack-dot:nth-child(3) { animation-delay: 0.4s; }
        .devtrack-messages::-webkit-scrollbar { width: 3px; }
        .devtrack-messages::-webkit-scrollbar-track { background: transparent; }
        .devtrack-messages::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .devtrack-chip:hover {
          border-color: rgba(99,102,241,0.45) !important;
          color: #e2e8f0 !important;
          background: #1a2542 !important;
        }
        .devtrack-send:hover { background: #6366f1 !important; }
        .devtrack-close:hover { background: rgba(255,255,255,0.12) !important; color: #fff !important; }
      `}</style>

      <div
        className="devtrack-chat-wrap"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "384px",
          height: "560px",
          background: "#0e1322",
          border: "1px solid #1e2640",
          borderRadius: "28px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 999,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "14px 16px",
            background: "linear-gradient(135deg, #4338ca 0%, #5b21b6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconMessageChatbot size={22} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  letterSpacing: "0.01em",
                }}
              >
                DevTrack Assistant
                <span
                  style={{
                    background: "#10b981",
                    color: "#064e3b",
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    padding: "2px 6px",
                    borderRadius: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  AI Live
                </span>
              </div>
              <div style={{ fontSize: "10px", color: "#a5b4fc", marginTop: "1px" }}>
                Your Technical Career Coach
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="devtrack-close"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "10px",
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.65)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <IconX size={17} />
          </button>
        </div>

        {/* ── Messages ── */}
        <div
          className="devtrack-messages"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((msg, index) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={index}
                className="devtrack-msg-animate"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "9px",
                  maxWidth: "87%",
                  marginLeft: isBot ? 0 : "auto",
                  flexDirection: isBot ? "row" : "row-reverse",
                }}
              >
                {isBot && (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "10px",
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.28)",
                      color: "#818cf8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconSparkles size={13} />
                  </div>
                )}
                <div
                  style={{
                    padding: "10px 13px",
                    borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    fontSize: "11.5px",
                    lineHeight: "1.65",
                    whiteSpace: "pre-line",
                    ...(isBot
                      ? {
                          background: "#151d30",
                          border: "1px solid #1d2744",
                          color: "#cbd5e1",
                        }
                      : {
                          background: "#4338ca",
                          border: "1px solid #6366f1",
                          color: "#fff",
                        }),
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Suggested chips — shown only initially */}
          {messages.length === 1 && !loading && (
            <div style={{ marginTop: "4px" }}>
              <p
                style={{
                  fontSize: "9px",
                  color: "#475569",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingLeft: "37px",
                }}
              >
                Suggested Prompts
              </p>
              {[
                {
                  label: "💡 What should I learn next?",
                  text: "What skills or technologies should I learn next based on my profile?",
                },
                {
                  label: "📄 Review my resume readiness",
                  text: "How can I improve my resume template and details to get more callbacks?",
                },
                {
                  label: "🚀 Explain my developer metrics",
                  text: "Give me an analysis of my current GitHub developer level and contribution metrics.",
                },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="devtrack-chip"
                  onClick={() => handleSend(null, chip.text)}
                  style={{
                    display: "block",
                    width: "calc(100% - 37px)",
                    marginLeft: "37px",
                    padding: "9px 12px",
                    marginBottom: "7px",
                    background: "#131b2e",
                    border: "1px solid #1a2542",
                    borderRadius: "12px",
                    color: "#94a3b8",
                    fontSize: "11px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "9px",
                maxWidth: "87%",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "10px",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.28)",
                  color: "#818cf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconLoader3 size={13} style={{ animation: "spin 0.8s linear infinite" }} />
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  background: "#151d30",
                  border: "1px solid #1d2744",
                  borderRadius: "4px 16px 16px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="devtrack-dot"
                    style={{
                      display: "block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#818cf8",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <form
          onSubmit={handleSend}
          style={{
            padding: "10px 12px",
            background: "#0a0f1c",
            borderTop: "1px solid #111827",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me about coding, stack tips or resume..."
            style={{
              flex: 1,
              padding: "9px 15px",
              borderRadius: "16px",
              background: "#0f172a",
              border: "1px solid #1e293b",
              color: "#e2e8f0",
              fontSize: "11.5px",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading || isTyping}
            className="devtrack-send"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background: "#4338ca",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              opacity: !inputText.trim() || loading || isTyping ? 0.4 : 1,
              transition: "background 0.15s, opacity 0.15s",
            }}
          >
            <IconArrowUp size={16} />
          </button>
        </form>

        {/* Inline keyframes for spinner */}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
};

export default Chatbot;