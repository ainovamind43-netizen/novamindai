import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, Phone, ExternalLink, Clock, Zap } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";
import { services } from "@/lib/services-data";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

const QUICK_PROMPTS = [
  { label: "What services do you offer?", query: "services" },
  { label: "How much does a website cost?", query: "pricing" },
  { label: "ERP & POS Software", query: "erp" },
  { label: "AI Agents & Chatbots", query: "ai" },
  { label: "Contact via WhatsApp", query: "whatsapp" },
];

export function CustomerSupportAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Hello! 👋 Welcome to NovaMind AI. I'm your 24/7 AI Support Agent. How can I help you today with web design, mobile apps, SEO, AI automation, ERP, or POS systems?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
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

      if (lower.includes("service") || lower.includes("offer") || lower.includes("what do you do")) {
        const list = services.map((s) => `• *${s.title}* (${s.cat}): ${s.body.slice(0, 80)}...`).join("\n");
        botResponse = `NovaMind AI provides end-to-end digital engineering and growth services:\n\n${list}\n\nWould you like to discuss a specific project? You can reach us on WhatsApp at ${contactDetails.phone}.`;
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("quote")) {
        botResponse = `We quote based on your exact project scope and requirements rather than publishing one-size-fits-all fake prices. You receive a transparent, fixed quote and timeline after a quick discovery call. Would you like to book a free audit or message us on WhatsApp (${contactDetails.phone})?`;
      } else if (lower.includes("erp") || lower.includes("pos") || lower.includes("inventory") || lower.includes("retail")) {
        botResponse = `Yes! We build custom ERP platforms (finance, inventory, HR, payroll, procurement) and offline-first POS software for single and multi-branch retail and hospitality businesses.`;
      } else if (lower.includes("ai") || lower.includes("chatbot") || lower.includes("automation") || lower.includes("agent")) {
        botResponse = `We build custom AI agents, automated workflows, and intelligent chatbots trained on your business data around the clock to qualify leads, handle support, and automate operations.`;
      } else if (lower.includes("whatsapp") || lower.includes("contact") || lower.includes("call") || lower.includes("phone") || lower.includes("email")) {
        botResponse = `You can reach us instantly via WhatsApp at ${contactDetails.phone} or email us at ${contactDetails.email}. Our support hours are ${contactDetails.hours} (${contactDetails.response} response time).`;
      } else if (lower.includes("seo") || lower.includes("rank") || lower.includes("google")) {
        botResponse = `Our technical SEO and content strategy services help you rank higher on Google, drive organic traffic, and secure profitable B2B leads.`;
      } else {
        botResponse = `Thanks for asking! We specialize in custom web development, mobile apps, AI automation, ERP, POS, and SEO. For immediate assistance with your project, you can chat with our team on WhatsApp at ${contactDetails.phone} or email ${contactDetails.email}.`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
          aria-label="Open Customer Support Chat"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
          </span>
          <Bot className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span className="text-sm font-semibold tracking-wide">Support Agent</span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[540px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-inner">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500"></span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  NovaMind Support <Sparkles className="h-3.5 w-3.5 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online • 24/7 AI Agent
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-secondary-foreground border border-border/60 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  <span
                    className={`mt-1.5 block text-[10px] ${
                      m.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    } text-right`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground border border-border/60 rounded-bl-none">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-border/60 bg-secondary/20 p-2.5">
            <p className="text-[11px] font-medium text-muted-foreground px-1 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.query}
                  onClick={() => handleSend(qp.label)}
                  className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-xs"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Action Bar */}
          <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2 text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {contactDetails.hours}
            </span>
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <Phone className="h-3 w-3" /> WhatsApp Live Chat <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about web design, ERP, AI, pricing..."
              className="flex-1 rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
