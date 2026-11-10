// Single source of truth for everything the site says. Every number here comes from Esheet's
// resume or a project repo's measured results (see PROJECTS.md). Never add an unmeasured claim.

export const ME = {
  name: "Esheet Vivek",
  role: "Design engineer",
  location: "Noida, India",
  tz: "Asia/Kolkata",
  email: "esheet259@gmail.com",
  phone: "+91 80768 56412",
  linkedin: "https://linkedin.com/in/EsheetVivek",
  github: "https://github.com/EsheetVivek",
  roles: ["Associate PM", "Design Engineer", "Product / UI-UX", "Frontend"],
  intro:
    "I'm a design engineer with 3+ years on enterprise, procurement and analytics products. I find where users get stuck, design the clearer path, and build it so it stays fast and secure under real load.",
  availability: "Open to remote roles · IST, overlaps US & EU",
};

export const STATS = [
  { v: "3+ yrs", l: "product engineering" },
  { v: "50k+", l: "users on interfaces I built" },
  { v: "−15%", l: "support tickets after a redesign" },
  { v: "~30%", l: "faster UI delivery via shared components" },
];

export const TICKETRUSH = {
  url: "https://ticketrush-ten.vercel.app",
  repo: "https://github.com/EsheetVivek/TicketRush",
  design: "https://github.com/EsheetVivek/TicketRush/blob/main/docs/02-SYSTEM-DESIGN.md",
  results: "https://github.com/EsheetVivek/TicketRush/tree/main/docs/results",
  status: "Live · all 8 milestones done",
  live_results: "https://ticketrush-ten.vercel.app/results",
  pitch:
    "A ticket drop is the worst five minutes for any checkout: thousands arrive together, two people click the same seat, and the payment provider times out mid-charge. I designed and built TicketRush around those failures.",
  role: "Product scope, system design, UI, and the full stack: Next.js, Postgres, Auth.js, payments, tests and CI.",
  stack: ["Next.js", "TypeScript", "Postgres", "Drizzle", "Auth.js", "Stripe test mode", "Vitest", "GitHub Actions"],
  metrics: [
    { v: "0", l: "seats sold twice across three 10,000-user load tests, with the payment gateway failing on purpose" },
    { v: "0", l: "buyers charged without a ticket; the reconciler settled 51 of 51 deliberately lost payment webhooks" },
    { v: "581 ms", l: "p95 page time for 10,000 people browsing at once, 0% errors, 651,764 requests (one 4-vCPU runner)" },
    { v: "12 / 12", l: "attacks failed safely against the production build: forged sessions, CSRF, tampered prices, other people's orders, forged webhooks, floods" },
    { v: "224 → 1.3 ms", l: "per database query in production after finding and fixing a server/database region mismatch" },
    { v: "12 → 2", l: "database round trips to hold seats, after collapsing the path into one atomic SQL statement" },
  ],

  failures: [
    { t: "Two buyers, one seat", d: "All-or-nothing holds, plus a unique (event, seat) rule as the final word." },
    { t: "Gateway times out", d: "Idempotency keys mean retries return the same payment. No double charges." },
    { t: "Webhook never arrives", d: "A reconciler runs every 5 minutes and issues tickets or refunds." },
    { t: "Someone skips the line", d: "The waiting room is enforced on the server, not in the page." },
    { t: "Thousands arrive at once", d: "A fair waiting room meters buyers in; an organizer box office starts each drop and watches it live." },
  ],
  next: "Published miss: with 3,000 buyers arriving in the same second on shared 4-CPU hardware, checkout p95 was 5.2 s against a 500 ms goal (492 ms with 300 buyers). Next: cache session lookups and admit from the line in smaller steps.",
};

export interface CaseStudy {
  id: string; org: string; when: string; title: string; role: string;
  problem: string; did: string; tags: string[]; outcome: { v: string; l: string }[];
}

export const WORK: CaseStudy[] = [
  {
    id: "procurengine", org: "AgileAptSolutions · ProcurEngine", when: "2024",
    title: "Rebuilding a procurement product people kept calling support about",
    role: "UI Developer · flows, React rebuild, API contracts",
    problem: "A legacy jQuery product with slow pages and procurement flows that broke on mobile. The same steps kept generating tickets.",
    did: "Rebuilt 20+ pages in React, reworked core flows end to end for mobile, and shipped 5 new modules from shared Swagger contracts. We fixed the ticket-heavy steps first instead of rebuilding page by page.",
    tags: ["React", "Swagger", "Mobile UX", "Performance"],
    outcome: [{ v: "−15%", l: "support tickets" }, { v: "~40%", l: "faster first paint" }, { v: "5", l: "modules ahead of roadmap" }],
  },
  {
    id: "accenture", org: "Accenture", when: "2025 – now",
    title: "One component system for three internal products",
    role: "Associate Software Engineer · frontend / UI · 8+ person squad",
    problem: "Three products built the same UI separately, each slightly different, each re-solving accessibility.",
    did: "Built 10+ reusable React + TypeScript libraries with accessibility and states designed in once, and cut data-fetch latency with caching and lazy-loading across 15+ APIs.",
    tags: ["Design systems", "TypeScript", "WCAG 2.1", "Caching"],
    outcome: [{ v: "~30%", l: "less UI dev time" }, { v: "50k+", l: "end users" }, { v: "−25%", l: "data-fetch latency" }],
  },
  {
    id: "samadhan", org: "Samadhan Associates", when: "2023 – 2024",
    title: "Replacing manual office workflows with 8 internal tools",
    role: "Software Engineer, full-stack · React, Laravel, Node, MySQL",
    problem: "Staff moved the same information between paper, email and spreadsheets every week.",
    did: "Mapped the workflows, built 8 modules to replace them, and designed the schema for a 5k+ record document system. Promoted to full-stack in 7 months.",
    tags: ["Workflow analysis", "MySQL schema", "Laravel"],
    outcome: [{ v: "~10 h", l: "saved per week" }, { v: "−35%", l: "document load time" }],
  },
];

export const BUILDING = [
  { name: "Resolve", status: "Next", line: "AI support drafts that can't promise refunds or policy the company won't honour.",
    points: ["Every sentence cites approved policy, or it's cut", "Commitments routed to an agent allowed to make them", "Prompt-injection attacks in the test suite"] },
  { name: "Paycheck", status: "Planned", line: "Stops fake UPI payment screenshots at the shop counter.",
    points: ["Paid only when the merchant's own provider confirms the exact bill", "Replayed QR codes and partial payments caught", "Green / amber / red verdict a cashier can trust in seconds"] },
  { name: "Lens", status: "Planned", line: "Ask your data questions without ever seeing another team's rows.",
    points: ["AI-written SQL parsed and allow-listed before it runs", "Row-level security in Postgres, not in the prompt", "Red-team suite that tries to cross tenants"] },
];

export const PROCESS = [
  { t: "Find the friction", d: "Tickets, usage data and watching people use the product show where it actually breaks." },
  { t: "Design the system", d: "The flow, the data model, the API contract and the failure cases, agreed before code." },
  { t: "Build it to hold", d: "Accessible UI, secure by default, and tested against the load and failures it will meet." },
  { t: "Measure", d: "Tickets, load times and task completion after release feed the next round." },
];

export const EXPERIENCE = [
  { when: "2025 – now", org: "Accenture", what: "Associate Software Engineer, frontend / UI." },
  { when: "May – Dec 2024", org: "AgileAptSolutions · ProcurEngine", what: "UI Developer, product UI." },
  { when: "2023 – 2024", org: "Samadhan Associates", what: "Software Engineer, full-stack. Promoted in 7 months." },
  { when: "2020 – 2024", org: "B.Tech · BIT Mesra, Noida", what: "Worked full-time alongside the final years." },
];

export const TOOLKIT = [
  { k: "Product", v: "Requirements, user stories, prioritisation, API contracts, Jira" },
  { k: "Design", v: "Figma, prototyping, design systems, information architecture, WCAG 2.1" },
  { k: "Frontend", v: "React, Next.js, TypeScript, Redux, Tailwind, MUI, Jest" },
  { k: "Backend & data", v: "Node.js, Express, REST, MySQL, MongoDB, Python, Pandas" },
];
