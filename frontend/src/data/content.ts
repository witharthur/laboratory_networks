import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type DetailItem = {
  title: string;
  description: string;
  meta?: string;
  icon?: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "AI", href: "#ai" },
  { label: "Contact", href: "#contact" }
];

export const techStack = [
  {
    group: "Frontend",
    icon: Code2,
    items: ["React", "TypeScript", "Vite", "SCSS", "Accessibility", "Responsive UI"]
  },
  {
    group: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "REST API", "Validation", "Error handling", "Resend"]
  },
  {
    group: "Tools and AI",
    icon: Database,
    items: ["Git", "Vitest", "Vercel", "OpenAI API", "Prompting", "CI-ready scripts"]
  }
];

export const experienceItems: DetailItem[] = [
  {
    title: "Frontend interfaces",
    meta: "React / TypeScript",
    description:
      "Responsive interfaces with clear component boundaries, predictable state, and thoughtful loading, success, empty, and error states.",
    icon: Layers3
  },
  {
    title: "Full-stack flow",
    meta: "API / integrations",
    description:
      "Forms connected to backend endpoints, repeated server validation, safe errors, email delivery, and API responses that are easy to consume.",
    icon: Workflow
  },
  {
    title: "Production mindset",
    meta: "Quality / deployment",
    description:
      "Environment variables, typed contracts, tests, build scripts, Vercel routing, documentation, and no-secrets repository hygiene.",
    icon: ShieldCheck
  }
];

export const directions: DetailItem[] = [
  {
    title: "Frontend architecture",
    description:
      "Design systems, reusable UI primitives, maintainable styling, accessibility, and performance-focused React applications.",
    icon: Layers3
  },
  {
    title: "Backend for products",
    description:
      "Small reliable Node.js services, REST APIs, email flows, validation, provider integrations, and careful error handling.",
    icon: Server
  },
  {
    title: "AI-assisted features",
    description:
      "Useful AI helpers inside products: text generation, summarization, draft assistants, and graceful fallback behavior.",
    icon: BrainCircuit
  }
];

export const workSteps: DetailItem[] = [
  {
    title: "Clarify the task",
    description:
      "I identify the user flow, required data, edge cases, and review criteria before choosing implementation details.",
    icon: GitBranch
  },
  {
    title: "Build in small layers",
    description:
      "I separate UI, API services, validation, and business logic so each part can be reviewed and changed safely.",
    icon: Layers3
  },
  {
    title: "Verify the real flow",
    description:
      "I check type safety, build output, API responses, form behavior, responsive layout, and deployment assumptions.",
    icon: ShieldCheck
  }
];

export const aiUsage: DetailItem[] = [
  {
    title: "Fast scaffolding",
    description:
      "AI helps draft structure, component outlines, and repetitive TypeScript patterns while architecture stays deliberate.",
    icon: Sparkles
  },
  {
    title: "Review partner",
    description:
      "AI helps inspect edge cases, improve copy, compare options, and find gaps in validation or error states.",
    icon: BrainCircuit
  },
  {
    title: "Product feature",
    description:
      "This project includes an API-backed AI summary helper with a safe local fallback when no key is configured.",
    icon: Rocket
  }
];

export const cases: DetailItem[] = [
  {
    title: "Contact flow with email copies",
    meta: "Express + Resend",
    description:
      "A complete feedback form that validates data, calls the backend, sends an owner email, sends a copy to the user, and handles failures clearly.",
    icon: ShieldCheck
  },
  {
    title: "AI summary helper",
    meta: "OpenAI SDK + fallback",
    description:
      "A feature that generates a professional summary when an API key is available and returns a stable fallback otherwise.",
    icon: BrainCircuit
  },
  {
    title: "Vercel-ready monorepo",
    meta: "Vite + Express",
    description:
      "Static frontend deployment with `/api/*` routed to the backend app through Vercel serverless functions.",
    icon: Rocket
  }
];

export const contactLinks = [
  { label: "Email", value: "arthurdadalian@gmail.com", href: "mailto:arthur@example.com" },
  { label: "Phone", value: "+374 98 455 949", href: "tel:+37400000000" },
  { label: "Location", value: "Yerevan, Armenia", href: "https://maps.google.com/?q=Yerevan" }
];

export const defaultSummaryText =
  "Arthur Dadalian is a frontend/full-stack developer focused on React, TypeScript, Node.js APIs, clean UI architecture, form flows, and practical AI-assisted product features.";
