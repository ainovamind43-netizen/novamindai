import { Link } from "@tanstack/react-router";
import { Mail, Phone, Clock, Zap } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="font-display text-lg font-bold">
            NovaMind <span className="text-primary">AI</span>
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            One partner, twelve growth engines. Websites, AI agents, SEO, paid media,
            apps and custom software — end-to-end execution for brands worldwide.
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
                href={contactDetails.phoneHref}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {contactDetails.phone}
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
