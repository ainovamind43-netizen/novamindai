import { contactDetails } from "./contact-details";

/**
 * The apex domain 308-redirects to www (see the redirect on novamindai.info),
 * so every absolute URL we emit — canonical, og:url, the sitemap — has to use
 * the www host. Emitting the apex would point Google at a redirect rather than
 * at the page itself.
 */
export const SITE_URL = "https://www.novamindai.info";

export const SITE_NAME = "NovaMind AI";

export const SITE_DESCRIPTION =
  "NovaMind AI builds websites, AI automation, SEO, paid media and custom software for brands worldwide.";

/** Social preview image. 1600x900 sits close enough to the 1.91:1 that
 *  Facebook, LinkedIn and X crop to. Replace with a purpose-built 1200x630. */
export const OG_IMAGE = `${SITE_URL}/og.jpg`;
export const OG_IMAGE_WIDTH = "1600";
export const OG_IMAGE_HEIGHT = "900";
export const OG_IMAGE_ALT =
  "NovaMind AI — websites, AI automation, SEO and custom business software";

/** oklch(0.16 0.022 105) — the --background token in src/styles.css. */
export const THEME_COLOR = "#0f0e04";

/**
 * Canonical link + og:url for a single page. Both must be absolute and on the
 * www host. A canonical pointing at the wrong path is worse than no canonical
 * at all — it tells Google to drop the page it appears on — so each route
 * passes its own literal path rather than deriving one from the router.
 */
export function pageMeta(pathname: string) {
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [{ property: "og:url", content: url }],
  };
}

/**
 * Organization markup, emitted on every page so Google can tie the site, the
 * contact details and the brand together into one entity.
 *
 * Deliberately an Organization and not a LocalBusiness: LocalBusiness requires
 * a postal address, and we have not been given one — inventing one would make
 * the markup invalid rather than more useful.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/favicon.svg`,
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
    },
  ],
  areaServed: "Worldwide",
};

/** The route -> page list the sitemap and any internal link audit should agree on. */
export const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
] as const;
