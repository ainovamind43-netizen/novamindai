import { Link } from "@tanstack/react-router";
import { Mail, Clock, Zap, MessageCircle } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-lg font-bold">
              NovaMind <span className="text-primary">AI</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            One partner, twelve growth engines. Websites, AI agents, SEO, paid media, apps and
            custom software — end-to-end execution for brands worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {contactDetails.email}
              </a>
            </li>
            <li>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                WhatsApp
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {contactDetails.hours}
            </li>
            <li className="inline-flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              Response {contactDetails.response.toLowerCase()}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NovaMind AI. All rights reserved.
      </div>
    </footer>
  );
}
