export const contactDetails = {
  // The live inbox. This is the address the contact page, the footer and the
  // Organization schema all publish, so a typo here silently loses enquiries.
  email: "ainovamind43@gmail.com",
  // Display only — there is deliberately no `tel:` link anywhere on the site.
  // Contact runs through WhatsApp, so a click-to-call would ring a line nobody
  // answers. Shown in international format because most enquiries come from
  // outside Pakistan, where a bare 03xx number reads as a local one they cannot
  // dial. `whatsapp` is the same number with the country code and no punctuation.
  phone: "+92 315 845 4839",
  whatsapp: "923158454839",
  whatsappHref: "https://wa.me/923158454839",
  hours: "Mon — Fri, 9am to 6pm",
  response: "Within 24 hours",
} as const;
