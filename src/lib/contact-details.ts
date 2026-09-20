export const contactDetails = {
  email: "info@novamindai.com",
  // Display only — there is deliberately no `tel:` link anywhere on the site.
  // Contact runs through WhatsApp, so a click-to-call would ring a line nobody
  // answers. WhatsApp uses the same number in international format.
  phone: "03158454839",
  whatsapp: "923158454839",
  whatsappHref: "https://wa.me/923158454839",
  hours: "Mon — Fri, 9am to 6pm",
  response: "Within 24 hours",
} as const;
