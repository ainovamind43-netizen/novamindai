import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  Bot,
  Sparkles,
  Phone,
  ExternalLink,
  Clock,
  RotateCcw,
  Minimize2,
  ChevronDown,
} from "lucide-react";
import { contactDetails } from "@/lib/contact-details";
import { services } from "@/lib/services-data";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "🚀 Services", query: "services" },
  { label: "💰 Pricing & Quote", query: "pricing" },
  { label: "📦 ERP & POS Systems", query: "erp" },
  { label: "🤖 AI Agents & Bots", query: "ai" },
  { label: "💬 WhatsApp Chat", query: "whatsapp" },
  { label: "📈 SEO Services", query: "seo" },
];

const INITIAL_MESSAGE: Message = {
  id: "welcome-1",
  sender: "bot",
  text: `Hello! 👋 Welcome to NovaMind AI.\nI'm Nova, your 24/7 AI Support Agent. How can I assist you with Web Design, Mobile Apps, SEO, AI Automation, ERP, or POS systems today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

export function CustomerSupportAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on non-touch devices
      if (window.innerWidth > 640) {
        inputRef.current?.focus();
      }
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lower = queryText.toLowerCase();

      if (
        lower.includes("service") ||
        lower.includes("offer") ||
        lower.includes("kya") ||
        lower.includes("what do you do")
      ) {
        const list = services
          .map((s) => `• ${s.title} (${s.cat})`)
          .slice(0, 5)
          .join("\n");
        botResponse = `NovaMind AI provides end-to-end digital engineering and growth services:\n\n${list}\n• Plus Custom Apps, ERP & POS.\n\nWould you like to discuss your specific requirements or speak on WhatsApp?`;
      } else if (
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("rate") ||
        lower.includes("budget") ||
        lower.includes("quote")
      ) {
        botResponse = `We provide custom, transparent project quotes based on your exact requirements rather than flat generic pricing. Every quote includes detailed milestones, timelines, and post-launch support. Would you like to get a quote on WhatsApp (${contactDetails.phone})?`;
      } else if (
        lower.includes("erp") ||
        lower.includes("pos") ||
        lower.includes("inventory") ||
        lower.includes("retail")
      ) {
        botResponse = `Yes! We develop bespoke ERP platforms (finance, inventory, HR, payroll) and modern offline-first POS systems designed for single and multi-branch retail & hospitality businesses.`;
      } else if (
        lower.includes("ai") ||
        lower.includes("bot") ||
        lower.includes("agent") ||
        lower.includes("automation")
      ) {
        botResponse = `We build tailored AI agents, workflow automations, and smart customer support bots trained directly on your business knowledge to automate operations and drive sales 24/7.`;
      } else if (
        lower.includes("whatsapp") ||
        lower.includes("contact") ||
        lower.includes("phone") ||
        lower.includes("call") ||
        lower.includes("email")
      ) {
        botResponse = `You can reach our team directly via:\n📱 WhatsApp: ${contactDetails.phone}\n✉️ Email: ${contactDetails.email}\n⏰ Working hours: ${contactDetails.hours} (${contactDetails.response} response).`;
      } else if (
        lower.includes("seo") ||
        lower.includes("rank") ||
        lower.includes("traffic") ||
        lower.includes("google")
      ) {
        botResponse = `Our full-funnel SEO services cover technical audits, high-intent keyword ranking, site speed optimization, and link building to drive organic B2B conversions.`;
      } else if (lower.includes("hi") || lower.includes("hello") || lower.includes("salam")) {
        botResponse = `Hello there! How can we assist your business today? Feel free to ask about our web design, AI automations, ERP systems, or pricing.`;
      } else {
        botResponse = `Thank you for reaching out! We build high-performance websites, AI agents, mobile apps, ERP, and POS systems. For instant consultation, connect with our lead developers on WhatsApp at ${contactDetails.phone}.`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="z-50 font-sans pointer-events-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 sm:gap-3 rounded-full bg-primary px-4 py-3 sm:px-5 sm:py-3.5 text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Open 24/7 AI Customer Support Chat"
          >
            {/* Pulsing Status Dot */}
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500"></span>
            </span>

            <Bot className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Support <span className="hidden xs:inline">Agent</span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Window Modal / Sheet */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-32px)] z-50 flex flex-col justify-end pointer-events-auto">
          {/* Backdrop on mobile */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden -z-10 transition-opacity"
            aria-hidden="true"
          />

          <div className="flex flex-col w-full h-[90dvh] sm:h-[580px] sm:max-h-[85vh] overflow-hidden rounded-t-3xl sm:rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-2xl transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-3 sm:py-3.5 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-inner">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500"></span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                    Nova Support <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    Online • NovaMind AI 24/7
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  title="Restart conversation"
                  aria-label="Restart conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <span className="sm:hidden">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                  <span className="hidden sm:inline">
                    <X className="h-5 w-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3.5 bg-background/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[82%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-xs"
                        : "bg-secondary text-secondary-foreground border border-border/70 rounded-bl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line break-words">{m.text}</p>
                    <span
                      className={`mt-1 block text-[9px] sm:text-[10px] ${
                        m.sender === "user"
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground"
                      } text-right`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-3.5 py-2.5 text-secondary-foreground border border-border/70 rounded-bl-xs shadow-xs">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="border-t border-border/60 bg-secondary/30 p-2 sm:p-2.5 shrink-0">
              <div className="flex items-center justify-between px-1 mb-1.5">
                <p className="text-[10px] sm:text-[11px] font-medium text-muted-foreground">
                  Popular topics:
                </p>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.query}
                    onClick={() => handleSend(qp.label)}
                    className="whitespace-nowrap shrink-0 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] sm:text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-2xs active:scale-95"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct Action Bar */}
            <div className="flex items-center justify-between border-t border-border bg-secondary/50 px-3 sm:px-4 py-2 text-[11px] sm:text-xs shrink-0">
              <span className="text-muted-foreground flex items-center gap-1 truncate mr-2">
                <Clock className="h-3 w-3 shrink-0" />
                <span className="truncate">{contactDetails.hours}</span>
              </span>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                <Phone className="h-3 w-3" /> WhatsApp Live <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            {/* Input Form with Mobile Viewport Safety */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-border bg-card p-2.5 sm:p-3 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Web, AI, ERP, POS, Pricing..."
                /* Note: text-base on mobile prevents iOS Safari from automatically zooming in */
                className="flex-1 rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-base sm:text-xs text-foreground outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
