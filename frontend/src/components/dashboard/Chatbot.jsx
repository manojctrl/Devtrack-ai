import { useState, useEffect, useRef } from "react";
import { 
  IconMessageChatbot, 
  IconX, 
  IconSparkles, 
  IconLoader3,
  IconArrowUp
} from "@tabler/icons-react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Chatbot = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello ${user?.firstName || "Developer"}! I am your DevTrack AI Assistant. I have analyzed your profile and GitHub metrics. Ask me anything about career guidance, learning roadmaps, resume feedback, or technical queries!`,
      time: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (e, textOverride) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: "user",
      text: textToSend,
      time: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textOverride) setInputText("");
    setLoading(true);

    try {
      // Send message history to backend
      const chatHistory = [...messages, userMessage].slice(-10); // Keep last 10 messages for context
      const res = await API.post("/ai/chat", {
        messages: chatHistory
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
          time: new Date()
        }
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I encountered an error connecting to my AI core. Please check if your GEMINI_API_KEY is configured in backend/.env.",
          time: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[540px] bg-[#101524]/90 dark:bg-[#0e1322]/95 border border-slate-250 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl z-[999] animate-fadeUp">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white flex items-center justify-between shrink-0 shadow-lg shadow-indigo-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-white shadow-inner">
            <IconMessageChatbot size={22} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide flex items-center gap-1.5">
              <span>DevTrack Assistant</span>
              <span className="p-0.5 rounded bg-emerald-500 text-[8px] uppercase font-bold tracking-widest text-emerald-950">AI Live</span>
            </div>
            <div className="text-[10px] text-indigo-200">Your Technical Career Coach</div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-xl transition text-white/80 hover:text-white cursor-pointer"
        >
          <IconX size={18} />
        </button>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs scrollbar-thin scrollbar-thumb-slate-850">
        {messages.map((msg, index) => {
          const isBot = msg.sender === "bot";
          return (
            <div 
              key={index}
              className={`flex items-start gap-2.5 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
            >
              {isBot && (
                <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <IconSparkles size={14} />
                </div>
              )}
              <div 
                className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm border ${
                  isBot 
                    ? "bg-[#181f34] border-[#1d2744] text-slate-200 rounded-tl-none" 
                    : "bg-indigo-600 border-indigo-500 text-white rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        {messages.length === 1 && !loading && (
          <div className="pl-9 pr-4 py-2 space-y-2">
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Suggested Prompts</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "💡 What should I learn next?", text: "What skills or technologies should I learn next based on my profile?" },
                { label: "📄 Review my resume readiness", text: "How can I improve my resume template and details to get more callbacks?" },
                { label: "🚀 Explain my developer metrics", text: "Give me an analysis of my current GitHub developer level and contribution metrics." }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(null, chip.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#131b2e] border border-[#1a2542] hover:border-indigo-500/40 text-slate-350 hover:text-white text-[11px] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-indigo-500/5"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {loading && (
          <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <IconLoader3 size={14} className="animate-spin" />
            </div>
            <div className="p-3 bg-[#181f34] border border-[#1d2744] rounded-2xl rounded-tl-none text-slate-400 italic">
              AI is brainstorming...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleSend}
        className="p-3 bg-[#0c101b] border-t border-slate-900 flex items-center gap-2 shrink-0"
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask me about coding, stack tips or resume..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500/60 focus:outline-none placeholder-slate-500 transition-colors"
        />
        <button 
          type="submit"
          disabled={!inputText.trim() || loading}
          className="w-9 h-9 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/15 transition cursor-pointer shrink-0"
        >
          <IconArrowUp size={16} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
