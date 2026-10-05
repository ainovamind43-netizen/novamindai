import { contactDetails } from "./contact-details";

/**
 * The apex domain 308-redirects to www (see the redirect on novamindai.info),
 * so every absolute URL we emit — canonical, og:url, the sitemap — has to use
 * the www host. Emitting the apex would point Google at a redirect rather than
 * at the page itself.
 */
export const SITE_URL = "https://www.novamindai.info";

export const SITE_NAME = "NovaMind AI";

/**
 * One sentence, keyword-first, and the same string Google is most likely to
 * use as the site's snippet. It carries the three things buyers actually
 * search for — what we do (web design, AI automation, SEO), what we build
 * (websites, AI agents, ERP, POS, custom software) and who we serve.
 */
export const SITE_DESCRIPTION =
  "NovaMind AI is a web design, AI automation and SEO agency. We build websites, AI agents, ERP, POS and custom software for clients in the US, UK, UAE, Saudi Arabia and Pakistan.";

/** Used as a schema.org alternateName and in the og:title fallback. */
export const SITE_TAGLINE = "Web Design, AI Automation & SEO Agency";

/** Social preview image. 1600x900 sits close enough to the 1.91:1 that
 *  Facebook, LinkedIn and X crop to. Replace with a purpose-built 1200x630. */
export const OG_IMAGE = `${SITE_URL}/og.jpg`;
export const OG_IMAGE_WIDTH = "1600";
export const OG_IMAGE_HEIGHT = "900";
export const OG_IMAGE_ALT =
  "NovaMind AI — web design, AI automation, SEO and custom business software";

/** oklch(0.16 0.022 105) — the --background token in src/styles.css. */
export const THEME_COLOR = "#0f0e04";

/** oklch(0.98 0.006 95) — the same token under `:root.light` in styles.css.
 *  Kept as a literal because the head is server-rendered: the light value has
 *  to be correct before any script has had a chance to read the DOM. */
export const THEME_COLOR_LIGHT = "#faf8f4";

/**
 * Keyword banks, one per page.
 *
 * Be clear about what these do. The `keywords` meta tag is ignored outright by
 * Google and read only weakly by Bing and Yandex, so on its own it ranks
 * nothing — it is here because it is free and harmless at this length. What
 * actually earns the ranking is that every term below also appears in the
 * page's title, its headings, its body copy or its structured data. Keep the
 * two in sync: a bank that drifts away from the visible copy is a liability,
 * not an asset, and more than ~20 terms starts reading as spam to Bing.
 *
 * Order matters for nothing but readability — put the terms a buyer would
 * type first.
 */
export const HOME_KEYWORDS = [
  "novamind",
  "novamindai",
  "novamindai.info",
  "nova",
  "nova website",
  "novamind website",
  "NovaMind AI",
  "NovaMindAI",
  "NovaMind AI Pakistan",
  "NovaMind AI Karachi",
  "NovaMindAI Pakistan",
  "NovaMind AI Agency",
  "NovaMind AI Solutions",
  "NovaMind AI Automation",
  "erp system",
  "best erp system",
  "erp system software",
  "custom erp system development",
  "erp system for business",
  "cloud erp system",
  "erp system in pakistan",
  "erp system in dubai",
  "enterprise erp systems",
  "erp pos software systems",
  "AI automation services",
  "AI automation agency",
  "AI agent development",
  "AI agents development",
  "AI chatbot development",
  "business automation services",
  "AI workflow automation",
  "custom AI solutions",
  "AI software development",
  "AI integration services",
  "custom software development",
  "web application development",
  "AI-powered business solutions",
  "AI automation agency in Pakistan",
  "AI automation company in Pakistan",
  "AI development company in Pakistan",
  "AI agent developer Pakistan",
  "AI chatbot development Pakistan",
  "software development company Pakistan",
  "web development company Pakistan",
  "AI automation agency Karachi",
  "AI development company Karachi",
  "software development company Karachi",
  "web design agency",
  "hire web developers",
  "AI automation company",
  "SEO services",
  "custom software house",
  "ERP software development",
  "POS system development",
  "mobile app development",
  "best software house in Pakistan",
  "top IT company in Dubai",
  "dedicated software development team",
  "outsource web development",
  "hire React Next.js developers",
  "Python AI automation",
  "B2B digital agency",
  "software company Lahore Karachi Islamabad",
  "IT consulting Saudi Arabia Qatar",
] as const;

export const SERVICES_KEYWORDS = [
  "erp system",
  "erp system software",
  "custom erp system",
  "enterprise erp system",
  "cloud erp software",
  "hire full stack developers",
  "React development company",
  "Next.js development services",
  "ecommerce website builders",
  "Shopify experts for hire",
  "enterprise AI automation",
  "custom AI agent building",
  "LLM integration services",
  "technical SEO audit",
  "local SEO for businesses",
  "bespoke ERP solutions",
  "cloud based POS software",
  "inventory management systems",
  "Android iOS app development",
  "SaaS product engineering",
  "Google Meta Ads management",
  "lead generation for agencies",
  "API integration and development",
] as const;

export const ABOUT_KEYWORDS = [
  "NovaMind AI portfolio",
  "software engineering team",
  "web design experts",
  "AI researchers and developers",
  "tech agency Pakistan Dubai",
  "Alishba NovaMind AI",
  "custom software case studies",
  "digital transformation agency",
] as const;

export const CONTACT_KEYWORDS = [
  "hire NovaMind AI developers",
  "get a free project quote",
  "software development pricing",
  "hire AI automation experts",
  "book a tech consultation",
  "contact software house Lahore",
  "contact IT company Dubai",
  "request a free SEO audit",
] as const;

export const REVIEWS_KEYWORDS = [
  "NovaMind AI client testimonials",
  "web design agency success stories",
  "AI automation project results",
  "verified software house reviews",
  "software company ratings Pakistan Dubai",
] as const;

export const BLOG_KEYWORDS = [
  "hire web design agency",
  "hire AI automation agency",
  "hire custom software developers",
  "custom ERP software development company",
  "retail POS software development Dubai",
  "AI chatbot development company USA UK",
  "hire full stack web developers",
  "best software house in Pakistan",
  "software company in Dubai UAE",
  "SEO agency for B2B and SaaS",
  "custom web application development services",
  "enterprise workflow automation consultants",
  "hire mobile app development company",
  "e-commerce website development agency",
  "top digital agency for custom software",
  "autonomous AI agents for business guide",
  "how to outsource software development safely",
  "benefits of custom ERP for small business",
] as const;

export const PRIVACY_KEYWORDS = ["NovaMind AI privacy policy", "how we handle your data"] as const;

/**
 * Canonical link + og:url + keywords for a single page. Canonical and og:url
 * must both be absolute and on the www host. A canonical pointing at the wrong
 * path is worse than no canonical at all — it tells Google to drop the page it
 * appears on — so each route passes its own literal path rather than deriving
 * one from the router.
 */
export function pageMeta(pathname: string, keywords: readonly string[] = []) {
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { property: "og:url", content: url },
      { name: "keywords", content: keywords.join(", ") },
    ],
  };
}

/**
 * The countries the site already claims as its market, in the order the home
 * page lists them. Feeds schema.org `areaServed`, which is how Google works
 * out that "software company in Dubai" is a query this site answers — the
 * single highest-value thing structured data can do for a location-agnostic
 * agency.
 */
export const AREAS_SERVED = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Germany",
  "Netherlands",
  "Singapore",
  "Pakistan",
  "India",
  "South Africa",
] as const;

/** The disciplines the team can be trusted to write about — schema.org
 *  `knowsAbout`, which feeds Google's entity understanding of the brand. */
const KNOWS_ABOUT = [
  "Web design",
  "Web development",
  "Artificial intelligence",
  "AI agents",
  "Chatbot development",
  "Business process automation",
  "Search engine optimization",
  "Technical SEO",
  "Link building",
  "Digital marketing",
  "Paid advertising",
  "Google Ads",
  "Meta Ads",
  "Enterprise resource planning",
  "Point of sale software",
  "Custom software development",
  "Android app development",
  "SaaS development",
  "Next.js development",
  "React development",
  "B2B lead generation",
  "E-commerce development",
  "Custom API integration",
  "Workflow automation",
];

/**
 * Organization markup, emitted on every page so Google can tie the site, the
 * contact details and the brand together into one entity.
 *
 * Deliberately an Organization and not a LocalBusiness: LocalBusiness requires
 * a postal address, and we have not been given one — inventing one would make
 * the markup invalid rather than more useful. The address is what would unlock
 * Google's local pack and Maps; until there is a real one to publish, the
 * geo-targeting has to come from `areaServed` and the visible copy instead.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: [
    "NovaMind",
    "NovaMindAI",
    "Nova",
    "novamindai.info",
    "Nova Website",
    `${SITE_NAME} — ${SITE_TAGLINE}`,
  ],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  slogan: "Precision growth you can stand behind.",
  logo: {
    "@type": "ImageObject",
    // The 512px render of the monogram. Google's guidance for Organization.logo
    // is a minimum of 112x112; this is the largest raster we generate, so it is
    // the one that survives whatever size the knowledge panel asks for.
    url: `${SITE_URL}/icon-512.png`,
  },
  image: OG_IMAGE,
  email: contactDetails.email,
  telephone: `+${contactDetails.whatsapp}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactDetails.email,
      telephone: `+${contactDetails.whatsapp}`,
      availableLanguage: ["en", "ur"],
      areaServed: AREAS_SERVED.map((name) => ({ "@type": "Country", name })),
    },
  ],
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "Country", name })),
  knowsAbout: KNOWS_ABOUT,
  founder: {
    "@type": "Person",
    name: "Alishba",
    jobTitle: "Founder",
  },
  foundingDate: "2021",
};

/**
 * WebSite markup — a separate entity from the Organization, linked back to it
 * by @id. Google uses the pair to resolve "novamindai.info" to the brand when
 * someone searches the name rather than a service.
 *
 * No SearchAction: that property tells Google the site has an internal search
 * endpoint, and there isn't one. Declaring a URL that does not exist is worse
 * than declaring nothing.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["NovaMind", "NovaMindAI", "Nova", "novamindai.info", "Nova Website"],
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

/**
 * BreadcrumbList for a subpage. `trail` excludes Home, which is prepended
 * here so every caller cannot forget it.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * FAQPage markup for the question blocks the pages already render.
 *
 * Worth knowing: Google narrowed FAQ *rich results* in 2023 to government and
 * health sites, so these may not show as expandable answers on google.com.
 * They are still worth emitting — Bing and several AI answer engines read
 * them, and the markup reinforces which queries the page answers. The visible
 * Q&A is doing the ranking work; this only describes it.
 */
export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The route -> page list the sitemap and any internal link audit should agree on. */
export const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  // /reviews is out of this list while the feature is unlinked and its database
  // is not connected. A sitemap entry is a request to index a page, and asking
  // Google to index a form that cannot save is worse than not asking at all.
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;
