import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { contactDetails } from "@/lib/contact-details";
import { PRIVACY_KEYWORDS, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const { links, meta: urlMeta } = pageMeta("/privacy", PRIVACY_KEYWORDS);
    return {
      links,
      meta: [
        ...urlMeta,
        { title: "Privacy Policy | NovaMind AI" },
        {
          name: "description",
          content:
            "How NovaMind AI handles the information you send us — what the contact form does, what our host logs, and what we never collect.",
        },
        // Indexable on purpose: a crawlable privacy policy is a trust signal,
        // and a noindex page listed in the sitemap would just raise a
        // "Submitted URL marked noindex" warning in Search Console.
        { property: "og:title", content: "Privacy Policy — NovaMind AI" },
        {
          property: "og:description",
          content: "What we collect, why, and how to have it removed.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }]),
          ),
        },
      ],
    };
  },
  component: Privacy,
});

const LAST_UPDATED = "20 September 2026";

/**
 * Every claim on this page is written against what the site actually does
 * today, because a policy that describes something the code does not do is
 * worse than none at all.
 *
 * Today: the contact form posts nowhere — it composes a WhatsApp message in
 * the visitor's own browser — there are no cookies, no analytics and no
 * advertising pixels, and the only third parties that see a visitor are the
 * host and Google Fonts.
 *
 * If analytics, a CRM, a mailing list or an ad pixel is ever added, this page
 * must be updated in the same change, along with the cookie notice that
 * tracking would then require.
 */
const sections = [
  {
    h: "Who we are",
    b: [
      "NovaMind AI is a remote-first web design, AI automation and software company. We work with clients worldwide and this policy covers novamindai.info and everything you send us through it.",
    ],
  },
  {
    h: "What the contact form actually does",
    b: [
      "This is the part most policies get wrong, so it is worth being precise. Our contact form does not post your details to our server. It runs in your browser, collects what you typed into a message, and hands that message to WhatsApp — which then sends it from your own WhatsApp account to our number.",
      "Two things follow from that. Until you press send inside WhatsApp, nothing reaches us at all. And once you do send it, the message travels over WhatsApp, so Meta's own privacy terms apply to it in addition to this policy.",
      "If WhatsApp is not available to you, the form also offers the same message as an email. Either way, what we receive is only what you chose to type.",
    ],
  },
  {
    h: "What we collect",
    b: [
      "Only what you send us: your name, email address, company, phone number, the service you are interested in, and your message. We use it to reply to your enquiry, prepare a quote or audit, and keep a record of the work we discussed. We do not sell it, rent it, or add you to a mailing list.",
    ],
  },
  {
    h: "What our hosting provider logs",
    b: [
      "Like every website, ours is served by a hosting provider that keeps standard server logs — IP address, browser and device type, the pages requested and the time of the request. Those logs exist for security and reliability, are used for nothing else, and are not combined with anything you type into the form.",
    ],
  },
  {
    h: "Cookies, analytics and tracking",
    b: [
      "We set no cookies. There is no Google Analytics, no advertising pixel, no session recording and no third-party tracking script on this site — which is also why you have not been asked to dismiss a cookie banner.",
      "If that ever changes, this page will say so before the change goes live, and any tracking that requires consent will not run until you give it.",
    ],
  },
  {
    h: "Third parties that see a visitor",
    b: [
      "WhatsApp (Meta) — only if you choose to send your enquiry through the form or a WhatsApp link. Your message and phone number are handled under Meta's privacy terms.",
      "Google Fonts — the site's typefaces are loaded from Google's servers, which means Google receives your IP address when the page loads. We do not send it anything else about you.",
      "Our hosting provider — processes the server logs described above on our behalf.",
    ],
  },
  {
    h: "How long we keep it",
    b: [
      "Enquiries are kept for as long as they are useful for the relationship — typically up to two years after our last contact — and then deleted. If you ask us to delete your details sooner, we will.",
    ],
  },
  {
    h: "Your rights",
    b: [
      "Wherever you are, you can ask us what we hold about you, ask for a copy, ask us to correct it, or ask us to delete it. If you are in the UK, EU or Switzerland you have these rights under the GDPR, and if you are in California you have equivalent rights under the CCPA — including the right not to be discriminated against for exercising them.",
      `To make a request, email ${contactDetails.email} and we will respond within 30 days.`,
    ],
  },
  {
    h: "Children",
    b: [
      "This site is meant for businesses and is not directed at children. We do not knowingly collect information from anyone under 16.",
    ],
  },
  {
    h: "Changes to this policy",
    b: [
      `If this policy changes, the date at the top of this page changes with it. Material changes — a new third party, a new category of data — will be described here rather than slipped in.`,
    ],
  },
];

function Privacy() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-24">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            What we collect when you get in touch, what we do with it, and how to have it removed.
            Written to describe what this site actually does — not copied from a template.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-bold">{s.h}</h2>
              {s.b.map((p) => (
                <p key={p} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="panel p-7">
            <h2 className="text-2xl font-bold">Questions about your data?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Email{" "}
              <a
                href={`mailto:${contactDetails.email}`}
                className="font-semibold text-primary hover:underline"
              >
                {contactDetails.email}
              </a>{" "}
              or message us on WhatsApp at{" "}
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                {contactDetails.phone}
              </a>
              . We answer data requests within 30 days.
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
