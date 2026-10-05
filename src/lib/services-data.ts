export interface Service {
  cat: string;
  title: string;
  metric: string;
  body: string;
  points: string[];
}

export const services: Service[] = [
  {
    cat: "Web",
    title: "Website Design & Development",
    metric: "Conversion-first",
    body: "Custom website design and development — ecommerce stores, corporate sites and landing pages built on Shopify, WordPress or React. Strategy, design, build, and ongoing CRO handled end-to-end.",
    points: ["Ecommerce Stores", "Shopify & WordPress", "UX & UI Design", "Core Web Vitals"],
  },
  {
    cat: "Intelligence",
    title: "AI Automation & Agents",
    metric: "24/7 autonomous",
    body: "AI automation services for growing businesses: custom AI agents, chatbots, and workflow automation that save hours and unlock new revenue streams.",
    points: ["AI Agents", "Workflow Automation", "Chatbots", "Data Pipelines"],
  },
  {
    cat: "Growth",
    title: "SEO Services",
    metric: "Top of Google",
    body: "Search engine optimization services that rank you higher and convert more — technical SEO, content strategy, link building, and analytics that move the needle.",
    points: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
  },
  {
    cat: "Enterprise",
    title: "ERP & Business Systems",
    metric: "Delivered to production",
    body: "Custom ERP platforms covering finance, inventory, HR and procurement — built around your workflow, then handed over with training and support.",
    points: ["Finance & Inventory", "HR & Payroll", "Procurement", "Live Reporting"],
  },
  {
    cat: "Retail",
    title: "POS Software",
    metric: "Single & multi-branch",
    body: "Point-of-sale systems for retail and hospitality — fast billing, live reporting, inventory sync, and offline-first reliability across every branch.",
    points: ["Multi-Branch", "Live Reporting", "Inventory Sync", "Offline Mode"],
  },
  {
    cat: "Engineering",
    title: "Custom Software Development",
    metric: "Enterprise-grade",
    body: "Bespoke platforms, SaaS products, dashboards, and API integrations — engineered to scale with your operations and documented for your team.",
    points: ["SaaS Platforms", "Dashboards", "API Integrations", "Legacy Migration"],
  },
  {
    cat: "Paid Media",
    title: "Google & Meta Ads",
    metric: "Profitable ROAS",
    body: "Full-funnel paid media and PPC management on Google and Meta — creative, campaigns, tracking, and optimization for profitable, scalable ROAS.",
    points: ["Google Ads", "Meta Ads", "Creative Production", "Tracking & Analytics"],
  },
  {
    cat: "Mobile",
    title: "Mobile App Development",
    metric: "Play Store ready",
    body: "Android and iOS app development — from MVP to store launch, with clean architecture and stunning UX.",
    points: ["Native Kotlin", "React Native", "Play Store Launch", "Backend + APIs"],
  },
];
