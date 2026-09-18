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
    title: "Website Design & Build",
    metric: "Conversion-first",
    body: "Custom websites and landing pages designed to convert — strategy, design, build, and ongoing CRO handled end-to-end.",
    points: ["UX & UI Design", "React & Next.js", "Landing Pages", "Core Web Vitals"],
  },
  {
    cat: "Intelligence",
    title: "AI Automation",
    metric: "24/7 autonomous",
    body: "Custom AI agents, chatbots, and workflow automations that save hours and unlock new revenue streams across your business.",
    points: ["AI Agents", "Workflow Automation", "Chatbots", "Data Pipelines"],
  },
  {
    cat: "Growth",
    title: "SEO Expert",
    metric: "Top of Google",
    body: "Rank higher, convert more. Technical SEO, content strategy, link building, and analytics that move the needle.",
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
    title: "Meta & Google Ads",
    metric: "Profitable ROAS",
    body: "Full-funnel paid media on Meta and Google — creative, campaigns, tracking, and optimization for profitable, scalable ROAS.",
    points: ["Meta Ads", "Google Ads", "Creative Production", "Tracking & Analytics"],
  },
  {
    cat: "Mobile",
    title: "Android App Development",
    metric: "Play Store ready",
    body: "Native and cross-platform Android apps — from MVP to Play Store launch, with clean architecture and stunning UX.",
    points: ["Native Kotlin", "React Native", "Play Store Launch", "Backend + APIs"],
  },
];
