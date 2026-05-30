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

export type Locale = "ru" | "en";

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

type TechStackGroup = {
  group: string;
  icon: LucideIcon;
  items: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type LocalizedContent = {
  header: {
    navLabel: string;
    openMenu: string;
    closeMenu: string;
    cta: string;
    languageLabel: string;
  };
  navItems: NavItem[];
  hero: {
    imageAlt: string;
    eyebrow: string;
    title: string;
    role: string;
    text: string;
    actionsLabel: string;
    primaryAction: string;
    secondaryAction: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string;
    stats: Array<{ title: string; text: string }>;
  };
  sections: {
    stack: { eyebrow: string; title: string };
    experience: { eyebrow: string; title: string; intro: string };
    directions: { eyebrow: string; title: string };
    workflow: { eyebrow: string; title: string };
    ai: { eyebrow: string; title: string; intro: string };
    projects: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string; intro: string };
  };
  techStack: TechStackGroup[];
  experienceItems: DetailItem[];
  directions: DetailItem[];
  workSteps: DetailItem[];
  aiUsage: DetailItem[];
  cases: DetailItem[];
  contactLinks: ContactLink[];
  feedbackTitle: string;
  contactForm: {
    fields: {
      name: string;
      phone: string;
      email: string;
      comment: string;
    };
    errors: {
      name: string;
      phone: string;
      email: string;
      comment: string;
      form: string;
      fallback: string;
    };
    successCopySent: string;
    submit: string;
  };
  aiHelper: {
    title: string;
    badgeReady: string;
    badgeLoading: string;
    goalLabel: string;
    goals: Record<"portfolio" | "recruiter" | "project" | "linkedin", string>;
    profileLabel: string;
    generate: string;
    reset: string;
    copy: string;
    copied: string;
    waiting: string;
    openaiReady: string;
    fallbackReady: string;
    unavailable: string;
    empty: string;
    defaultSummaryText: string;
  };
};

const contactLinksBase = [
  {
    value: "arthurdadalian@gmail.com",
    href: "mailto:arthurdadalian@gmail.com"
  },
  { value: "+374 98 455 949", href: "tel:+37498455949" },
  { value: "Yerevan, Armenia", href: "https://maps.google.com/?q=Yerevan" }
];

export const content: Record<Locale, LocalizedContent> = {
  ru: {
    header: {
      navLabel: "Основная навигация",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      cta: "Контакты",
      languageLabel: "Выбор языка"
    },
    navItems: [
      { label: "Обо мне", href: "#about" },
      { label: "Стек", href: "#stack" },
      { label: "Опыт", href: "#experience" },
      { label: "AI tools", href: "#ai" },
      { label: "Контакты", href: "#contact" }
    ],
    hero: {
      imageAlt: "Современное рабочее место разработчика с ноутбуком и блокнотом",
      eyebrow: "Portfolio landing page",
      title: "Arthur Dadalian",
      role: "Full-Stack Developer",
      text:
        "Создаю надежные интерфейсы, подключаю их к типизированным API и использую AI-инструменты там, где они реально ускоряют продуктовую разработку.",
      actionsLabel: "Главные действия",
      primaryAction: "Связаться",
      secondaryAction: "Смотреть профиль"
    },
    about: {
      eyebrow: "Обо мне",
      title: "Разработчик, который доводит интерфейс до рабочего сценария",
      intro:
        "Мне важен весь путь: от чистого экрана до понятного ответа API. Хороший UI должен быть читаемым, адаптивным, доступным и честным в состояниях.",
      body:
        "Я соединяю frontend-подход с backend-пониманием: React-компоненты, TypeScript-контракты, валидацию форм, REST endpoints, email-доставку, AI-функции и детали деплоя. Люблю проекты, которые легко проверить и продолжать развивать.",
      stats: [
        { title: "React", text: "UI foundation" },
        { title: "Node.js", text: "API layer" },
        { title: "AI", text: "Practical tooling" }
      ]
    },
    sections: {
      stack: { eyebrow: "Технологии", title: "Инструменты для поддерживаемого продукта" },
      experience: {
        eyebrow: "Опыт",
        title: "Что я приношу в команду",
        intro:
          "Проект становится сильнее, когда интерфейс, API-контракт и состояния ошибок проектируются вместе."
      },
      directions: { eyebrow: "Направления развития", title: "Где я расту осознанно" },
      workflow: { eyebrow: "Как я работаю", title: "Понятные шаги, небольшие решения, видимый результат" },
      ai: {
        eyebrow: "AI tools",
        title: "Как я использую AI-инструменты в разработке",
        intro:
          "AI полезен, когда ускоряет исследование, помогает увидеть пробелы и остается связанным с ручной проверкой."
      },
      projects: { eyebrow: "Кейсы / проекты", title: "Небольшие кейсы, показывающие full stack" },
      contact: {
        eyebrow: "Контакты",
        title: "Обсудим следующий интерфейс",
        intro: "Напишите коротко о продукте, команде или сценарии, который нужно улучшить."
      }
    },
    techStack: [
      {
        group: "Frontend",
        icon: Code2,
        items: ["React", "TypeScript", "Vite", "SCSS", "Accessibility", "Responsive UI"]
      },
      {
        group: "Backend",
        icon: Server,
        items: ["Node.js", "Express", "REST API", "Validation", "Error handling", "Nodemailer"]
      },
      {
        group: "Tools and AI",
        icon: Database,
        items: ["Git", "Vitest", "Vercel", "OpenAI API", "Prompting", "CI-ready scripts"]
      }
    ],
    experienceItems: [
      {
        title: "Frontend-интерфейсы",
        meta: "React / TypeScript",
        description:
          "Адаптивные интерфейсы с понятными границами компонентов, предсказуемым состоянием и продуманными loading, success, empty и error состояниями.",
        icon: Layers3
      },
      {
        title: "Full-stack flow",
        meta: "API / integrations",
        description:
          "Формы, подключенные к backend endpoints, повторная серверная валидация, безопасные ошибки, email-доставка и API-ответы, удобные для frontend.",
        icon: Workflow
      },
      {
        title: "Production mindset",
        meta: "Quality / deployment",
        description:
          "Переменные окружения, типизированные контракты, тесты, build scripts, Vercel routing, документация и no-secrets hygiene.",
        icon: ShieldCheck
      }
    ],
    directions: [
      {
        title: "Frontend-архитектура",
        description:
          "Design systems, reusable UI primitives, поддерживаемая стилизация, accessibility и performance-focused React applications.",
        icon: Layers3
      },
      {
        title: "Backend для продуктов",
        description:
          "Небольшие надежные Node.js services, REST APIs, email flows, validation, provider integrations и аккуратная обработка ошибок.",
        icon: Server
      },
      {
        title: "AI-assisted features",
        description:
          "Практичные AI helpers внутри продуктов: text generation, summarization, draft assistants и graceful fallback behavior.",
        icon: BrainCircuit
      }
    ],
    workSteps: [
      {
        title: "Уточнить задачу",
        description:
          "Сначала определяю user flow, нужные данные, edge cases и критерии проверки, а уже потом выбираю детали реализации.",
        icon: GitBranch
      },
      {
        title: "Собирать небольшими слоями",
        description:
          "Разделяю UI, API services, validation и business logic, чтобы каждую часть было легко проверить и изменить.",
        icon: Layers3
      },
      {
        title: "Проверить реальный сценарий",
        description:
          "Проверяю type safety, build output, API responses, form behavior, responsive layout и deployment assumptions.",
        icon: ShieldCheck
      }
    ],
    aiUsage: [
      {
        title: "Быстрый scaffolding",
        description:
          "AI помогает быстро набросать структуру, outlines компонентов и повторяющиеся TypeScript patterns, пока архитектура остается осознанной.",
        icon: Sparkles
      },
      {
        title: "Review partner",
        description:
          "AI помогает смотреть edge cases, улучшать copy, сравнивать варианты и находить пробелы в validation или error states.",
        icon: BrainCircuit
      },
      {
        title: "Product feature",
        description:
          "В проекте есть API-backed AI summary helper с безопасным fallback, когда ключ не настроен.",
        icon: Rocket
      }
    ],
    cases: [
      {
        title: "Contact flow with email copies",
        meta: "Express + SMTP email",
        description:
          "Feedback form валидирует данные, вызывает backend, отправляет owner email, отправляет copy пользователю и понятно обрабатывает ошибки.",
        icon: ShieldCheck
      },
      {
        title: "AI summary helper",
        meta: "OpenAI SDK + fallback",
        description:
          "Фича генерирует professional summary при наличии API key и возвращает стабильный fallback без ключа.",
        icon: BrainCircuit
      },
      {
        title: "Vercel-ready monorepo",
        meta: "Vite + Express",
        description:
          "Static frontend deployment с `/api/*`, routed в backend app через Vercel serverless functions.",
        icon: Rocket
      }
    ],
    contactLinks: [
      { label: "Email", ...contactLinksBase[0] },
      { label: "Телефон", ...contactLinksBase[1] },
      { label: "Локация", ...contactLinksBase[2] }
    ],
    feedbackTitle: "Форма обратной связи",
    contactForm: {
      fields: {
        name: "Имя",
        phone: "Телефон",
        email: "Email",
        comment: "Комментарий"
      },
      errors: {
        name: "Введите имя.",
        phone: "Введите корректный номер телефона.",
        email: "Введите корректный email.",
        comment: "Введите комментарий.",
        form: "Проверьте выделенные поля.",
        fallback: "Сообщение не удалось отправить. Попробуйте позже."
      },
      successCopySent:
        "Спасибо! Сообщение отправлено Arthur Dadalian. Копия отправлена на ваш email.",
      submit: "Отправить"
    },
    aiHelper: {
      title: "AI summary studio",
      badgeReady: "Готово",
      badgeLoading: "Генерация",
      goalLabel: "Цель summary",
      goals: {
        portfolio: "Portfolio",
        recruiter: "Recruiter",
        project: "Project",
        linkedin: "LinkedIn"
      },
      profileLabel: "Текст профиля",
      generate: "Сгенерировать",
      reset: "Сбросить",
      copy: "Копировать",
      copied: "Скопировано",
      waiting: "Ожидание",
      openaiReady: "Сгенерировано через OpenAI.",
      fallbackReady: "Fallback draft готов.",
      unavailable: "AI summary сейчас недоступен. Попробуйте позже.",
      empty:
        "Arthur Dadalian создает frontend и full-stack сценарии с React, TypeScript, backend APIs, email delivery и AI-assisted development.",
      defaultSummaryText:
        "Arthur Dadalian - frontend/full-stack developer, который работает с React, TypeScript, Node.js APIs, clean UI architecture, form flows и practical AI-assisted product features."
    }
  },
  en: {
    header: {
      navLabel: "Main navigation",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
      cta: "Contact",
      languageLabel: "Language"
    },
    navItems: [
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Experience", href: "#experience" },
      { label: "AI tools", href: "#ai" },
      { label: "Contact", href: "#contact" }
    ],
    hero: {
      imageAlt: "Modern developer workspace with laptop and notebook",
      eyebrow: "Portfolio landing page",
      title: "Arthur Dadalian",
      role: "Full-Stack Developer",
      text:
        "I build reliable interfaces, connect them to typed APIs, and use AI tools where they make real product work faster and clearer.",
      actionsLabel: "Primary actions",
      primaryAction: "Get in touch",
      secondaryAction: "View profile"
    },
    about: {
      eyebrow: "About me",
      title: "Developer focused on useful interfaces and complete flows",
      intro:
        "I care about the whole path from a clean screen to a working API response. Good UI should be readable, adaptive, accessible, and honest about what is happening.",
      body:
        "My work combines frontend craft with backend understanding: React components, TypeScript contracts, form validation, REST endpoints, email delivery, AI-assisted features, and deployment details. I like projects that are easy to inspect and easy to continue.",
      stats: [
        { title: "React", text: "UI foundation" },
        { title: "Node.js", text: "API layer" },
        { title: "AI", text: "Practical tooling" }
      ]
    },
    sections: {
      stack: { eyebrow: "Tech stack", title: "Tools I use to ship maintainable product code" },
      experience: {
        eyebrow: "Experience",
        title: "What I bring into a team",
        intro:
          "A project is stronger when the interface, API contract, and failure states are designed together."
      },
      directions: { eyebrow: "Development directions", title: "Where I am growing deliberately" },
      workflow: { eyebrow: "How I work", title: "Clear steps, small decisions, visible results" },
      ai: {
        eyebrow: "AI tools",
        title: "How I use AI tools in development",
        intro:
          "AI is useful when it speeds up exploration, catches gaps, and stays connected to manual review."
      },
      projects: { eyebrow: "Cases / projects", title: "Small cases that demonstrate the full stack" },
      contact: {
        eyebrow: "Contacts",
        title: "Let us talk about the next interface",
        intro: "Send a short note about the product, team, or workflow you want to improve."
      }
    },
    techStack: [
      {
        group: "Frontend",
        icon: Code2,
        items: ["React", "TypeScript", "Vite", "SCSS", "Accessibility", "Responsive UI"]
      },
      {
        group: "Backend",
        icon: Server,
        items: ["Node.js", "Express", "REST API", "Validation", "Error handling", "Nodemailer"]
      },
      {
        group: "Tools and AI",
        icon: Database,
        items: ["Git", "Vitest", "Vercel", "OpenAI API", "Prompting", "CI-ready scripts"]
      }
    ],
    experienceItems: [
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
    ],
    directions: [
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
    ],
    workSteps: [
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
    ],
    aiUsage: [
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
    ],
    cases: [
      {
        title: "Contact flow with email copies",
        meta: "Express + SMTP email",
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
    ],
    contactLinks: [
      { label: "Email", ...contactLinksBase[0] },
      { label: "Phone", ...contactLinksBase[1] },
      { label: "Location", ...contactLinksBase[2] }
    ],
    feedbackTitle: "Feedback form",
    contactForm: {
      fields: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        comment: "Comment"
      },
      errors: {
        name: "Please enter your name.",
        phone: "Please enter a valid phone number.",
        email: "Please enter a valid email address.",
        comment: "Please enter a comment.",
        form: "Please fix the highlighted fields.",
        fallback: "Message could not be sent. Please try again later."
      },
      successCopySent: "Thanks! Your message has been sent to Arthur. A copy was sent to your email.",
      submit: "Send message"
    },
    aiHelper: {
      title: "AI summary studio",
      badgeReady: "Ready",
      badgeLoading: "Generating",
      goalLabel: "Summary goal",
      goals: {
        portfolio: "Portfolio",
        recruiter: "Recruiter",
        project: "Project",
        linkedin: "LinkedIn"
      },
      profileLabel: "Profile text",
      generate: "Generate",
      reset: "Reset",
      copy: "Copy",
      copied: "Copied",
      waiting: "Waiting",
      openaiReady: "Generated with OpenAI.",
      fallbackReady: "Fallback draft ready.",
      unavailable: "AI summary is unavailable. Please try again later.",
      empty:
        "Arthur Dadalian builds frontend and full-stack flows with React, TypeScript, backend APIs, email delivery, and AI-assisted development.",
      defaultSummaryText:
        "Arthur Dadalian is a frontend/full-stack developer focused on React, TypeScript, Node.js APIs, clean UI architecture, form flows, and practical AI-assisted product features."
    }
  }
};
