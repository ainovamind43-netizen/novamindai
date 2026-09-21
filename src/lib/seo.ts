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
  "digital agency",
  "web design agency",
  "web development company",
  "AI automation agency",
  "AI agent development company",
  "SEO agency",
  "SEO services",
  "digital marketing agency",
  "ERP software company",
  "POS software company",
  "custom software development company",
  "software house in Pakistan",
  "software company in Dubai",
  "web development company in Pakistan",
  "Android app development company",
  "Google Ads agency",
  "Meta Ads agency",
] as const;

export const SERVICES_KEYWORDS = [
  "website design and development services",
  "AI automation services",
  "AI chatbot development",
  "SEO services company",
  "ERP software development",
  "retail POS software",
  "custom software development services",
  "digital marketing services",
  "Android app development services",
  "Google Ads management",
  "Meta Ads management",
  "SaaS development company",
] as const;

export const ABOUT_KEYWORDS = [
  "about NovaMind AI",
  "web design and software company",
  "software house in Pakistan",
  "IT company in Dubai",
  "digital agency since 2021",
  "custom software development team",
] as const;

export const CONTACT_KEYWORDS = [
  "contact web design agency",
  "hire web developer",
  "hire SEO expert",
  "free SEO audit",
  "free website audit",
  "get a quote for website design",
  "hire AI automation developer",
  "ERP software consultant",
  "software company in Dubai contact",
  "IT company in Pakistan contact",
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
  alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  slogan: "Precision growth you can stand behind.",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.svg`,
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
    name: "Usman Zafar",
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
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;
