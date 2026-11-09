export type Link = { label: string; href: string; accessibleName?: string };
export type Figure = { src: string; width: number; height: number; alt: string; caption: string };
export type Project = {
  id: string;
  code: string;
  title: string;
  role: "Frontend" | "Backend" | "Full stack";
  about: string;
  meta: string;
  intro: string;
  bullets: string[];
  stack: string[];
  label?: string;
  figures: Figure[];
  illustration?: boolean;
};
export type SmallProject = { title: string; meta: string; body: string; stack: string[] };
export type Job = {
  company: string;
  location: string;
  period: string;
  roles: string[];
  summary: string;
};
export type SkillGroup = { name: string; items: string[] };
export type Entry = { when: string; title: string; detail: string };

export const site = {
  url: "https://muhammad-moiz-dev.vercel.app",
  title: "Muhammad Moiz: Frontend Engineer (React, TypeScript)",
  description:
    "Frontend engineer building fintech, payroll and AI products with React and TypeScript. 6+ years, open to roles in the UK, UAE and Europe.",
  repo: "https://github.com/Muhammad-Moiz/portfolio",
};

export const profile = {
  name: "Muhammad Moiz",
  role: "Frontend Engineer · React · TypeScript",
  summary:
    "6+ years building fintech, payroll and AI products for teams in the US, UK and Middle East. Principal Software Engineer at Techlogix, with an MS in Data Science. Open to roles in the UK, UAE and Europe.",
  facts: [
    "6+ years in production",
    "500+ users on the Word add-in",
    "100+ UI components shipped",
    "US · UK · Middle East clients",
  ],
  location: "Based in Karachi, Pakistan.",
  relocation: "Open to relocating to the UK, UAE, Portugal or Spain.",
  email: "muhammadmoiz2221@gmail.com",
  actions: [
    { label: "Download CV", accessibleName: "Download CV (PDF)", href: "/cv.pdf" },
    { label: "Email", href: "mailto:muhammadmoiz2221@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-moiz-516a0113a" },
    { label: "GitHub", href: "https://github.com/Muhammad-Moiz" },
  ] satisfies Link[],
};

export const nav: Link[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "awarded",
    code: "AWARDED",
    title: "Awarded AI",
    role: "Frontend",
    about: "AI proposal assistant inside Microsoft Word",
    meta: "AI proposal assistant in Microsoft Word · Procurement Sciences (US) · Frontend",
    intro:
      "Proposal teams bidding on US government contracts write in Word. The add-in brings the AI into Word itself: chat, drafting, and a review that scores each paragraph against the RFP.",
    bullets: [
      "Shipped the React + TypeScript add-in used by 500+ B2B users, delivering AI-powered writing suggestions inside the document",
      "Review flow adds a scored Word comment to every paragraph, with suggestions (shown below)",
      "Added PostHog product analytics to measure engagement",
    ],
    stack: ["React", "TypeScript", "Office.js", "Tailwind CSS", "Storybook", "Jest"],
    figures: [
      {
        src: "/work/awarded-review.jpg",
        width: 1600,
        height: 842,
        alt: "Microsoft Word with a sample proposal open. Each paragraph has a comment from the add-in, and the add-in panel on the right shows feedback cards scored 86 and 58 with suggestions.",
        caption: "Review: scored comments on each paragraph. Real Word, sample document.",
      },
      {
        src: "/work/awarded-chat.jpg",
        width: 1600,
        height: 842,
        alt: "Microsoft Word with the add-in chat panel open, showing an AI answer that rewrites the proposal's executive summary.",
        caption: "Chat: the assistant rewrites a section. Real Word, sample answer.",
      },
    ],
  },
  {
    id: "atlas",
    code: "ATLAS",
    title: "Atlas HXM",
    role: "Frontend",
    about: "Global payroll platform · UI kit · access control",
    meta: "Global payroll & workforce platform · Frontend",
    intro:
      "Companies use Atlas to hire and pay people in any country. I worked on the shared UI kit every team builds with, and on the access-control layer.",
    bullets: [
      "Built and maintain a Storybook design system of 100+ reusable React and TypeScript components, cutting feature development time by about 20%",
      "Built the frontend Identity and Access Management (IAM) module from scratch: authentication, authorisation and RBAC with SSO via Azure AD, Okta and Keycloak",
      "Micro-frontend architecture with Webpack Module Federation, so teams deploy independently",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Storybook",
      "Tailwind CSS",
      "Module Federation",
    ],
    figures: [
      {
        src: "/work/atlas-ui-kit.jpg",
        width: 1600,
        height: 1000,
        alt: "Components from the Atlas UI kit: a top navigation bar, an employee payroll table with countries and currencies, a payroll calendar, a task list, a time tracker and a payroll progress stepper.",
        caption: "Components from the Atlas UI kit, rendered from its Storybook.",
      },
    ],
  },
  {
    id: "uae-payments",
    code: "UAE-PAY",
    title: "UAE Payments Platform",
    role: "Backend",
    about: "UAE exchange house: wage protection & remittance",
    meta: "Payments platform for a UAE exchange house · Backend",
    intro:
      "A platform for a UAE exchange house: paying salaries under the Wage Protection System (WPS), loading payroll cards and processing inward remittances at high transaction volumes.",
    bullets: [
      "Features for WPS payroll, payroll cards and inward remittance",
      "Spring Boot services and Kafka event streaming",
    ],
    stack: ["Java", "Spring Boot", "Kafka"],
    label: "illustration",
    figures: [],
    illustration: true,
  },
  {
    id: "foxtons",
    code: "FOXTONS",
    title: "Foxtons",
    role: "Frontend",
    about: "High-traffic UK property portal",
    meta: "UK property portal · Frontend",
    intro:
      "Front-end work on a high-traffic London property site: responsive search and listing pages, forms with validation, and page-speed improvements.",
    bullets: [],
    stack: ["React", "Redux Toolkit", "Jest", "React Testing Library"],
    figures: [
      {
        src: "/work/foxtons.jpg",
        width: 1280,
        height: 800,
        alt: "The Foxtons property search page showing London results, a map with price markers, and listing cards.",
        caption: "The live site today; it may have changed since my work on it.",
      },
    ],
  },
  {
    id: "vertosa",
    code: "VERTOSA",
    title: "Vertosa",
    role: "Full stack",
    about: "US business platform & integrations",
    meta: "US business platform · Full stack",
    intro:
      "React interface and Node.js APIs connecting the business to its CRM, document-signing and file tools.",
    bullets: [
      "HubSpot, PandaDoc and Google Drive integrations",
      "JWT and OAuth 2.0 sign-in; Docker and Jenkins CI/CD",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    figures: [
      {
        src: "/work/vertosa.jpg",
        width: 1280,
        height: 800,
        alt: 'The Vertosa homepage with the headline "The standard in infusion" over a photo of oranges.',
        caption: "The live site today.",
      },
    ],
  },
];

export const smallProjects: SmallProject[] = [
  {
    title: "Property Ways",
    meta: "Property platform · Backend",
    body: "REST API for listings and user accounts, with JWT and Passport sign-in and email through SendGrid.",
    stack: ["Node.js", "Express", "PostgreSQL", "Sequelize"],
  },
  {
    title: "Earlier client work",
    meta: "Full stack",
    body: "Responsive web apps built with Vue.js and Node.js, including a Square payment gateway integration for a live ticketing product.",
    stack: ["Vue.js", "Node.js", "Square"],
  },
];

export const experience: Job[] = [
  {
    company: "Techlogix",
    location: "Karachi",
    period: "Aug 2022 – Present",
    roles: [
      "Principal Software Engineer (Jul 2025 – Present)",
      "Senior Software Engineer (Aug 2022 – Jul 2025)",
    ],
    summary: "Awarded AI Word add-in · Atlas UI kit and IAM · UAE payments platform",
  },
  {
    company: "Creative Chaos",
    location: "Karachi",
    period: "Mar 2021 – Jul 2022",
    roles: ["Software Engineer"],
    summary:
      "React and TypeScript UIs and Node.js / Express REST APIs for client products; HubSpot, PandaDoc and Google Drive integrations",
  },
  {
    company: "Cygnis Media",
    location: "Karachi",
    period: "Sep 2020 – Mar 2021",
    roles: ["Full Stack Engineer"],
    summary: "Responsive web apps with Vue.js and Node.js; Square payments",
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Frontend",
    items: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "React Query",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Webpack (Module Federation)",
      "Micro-frontends",
      "Storybook",
      "ShadCN UI",
    ],
  },
  { name: "Testing", items: ["Jest", "React Testing Library", "Cypress", "Playwright", "TDD"] },
  {
    name: "Design & delivery",
    items: [
      "Figma",
      "Wireframes and mockups",
      "Prototyping",
      "Design systems",
      "Visual guidelines",
      "Agile",
      "Jira",
      "Confluence",
    ],
  },
  {
    name: "Backend & tools",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "REST APIs",
      "Java (Spring Boot)",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "Jenkins CI/CD",
      "Git",
      "PostHog",
    ],
  },
];

export const education: Entry[] = [
  { when: "2023–2025", title: "MS Data Science", detail: "FAST-NUCES · CGPA 3.23/4.00" },
  { when: "2016–2020", title: "BS Computer Science", detail: "FAST-NUCES" },
  {
    when: "Recognition",
    title: "3× Achiever of the Month (AOTM)",
    detail: "Techlogix, for engineering excellence",
  },
  { when: "Course", title: "Advanced React Component Patterns", detail: "Udemy" },
];
