import { Mail, MapPin, Phone } from "lucide-react";
import { AiSummaryHelper } from "./components/AiSummaryHelper";
import { ContactForm } from "./components/ContactForm";
import { DetailGrid } from "./components/DetailGrid";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { TechStack } from "./components/TechStack";
import {
  aiUsage,
  cases,
  contactLinks,
  directions,
  experienceItems,
  workSteps
} from "./data/content";
import { useScrollReveal } from "./hooks/useScrollReveal";

const contactIcons = [Mail, Phone, MapPin];

export function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />

        <Section
          id="about"
          eyebrow="About me"
          title="Developer focused on useful interfaces and complete flows"
          intro="I care about the whole path from a clean screen to a working API response. Good UI should be readable, adaptive, accessible, and honest about what is happening."
        >
          <div className="about-layout">
            <p data-reveal>
              My work combines frontend craft with backend understanding: React components,
              TypeScript contracts, form validation, REST endpoints, email delivery, AI-assisted
              features, and deployment details. I like projects that are easy to inspect and easy to
              continue.
            </p>
            <div className="about-stats" aria-label="Profile highlights">
              <div data-reveal>
                <strong>React</strong>
                <span>UI foundation</span>
              </div>
              <div data-reveal>
                <strong>Node.js</strong>
                <span>API layer</span>
              </div>
              <div data-reveal>
                <strong>AI</strong>
                <span>Practical tooling</span>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="stack"
          tone="muted"
          eyebrow="Tech stack"
          title="Tools I use to ship maintainable product code"
        >
          <TechStack />
        </Section>

        <Section
          id="experience"
          eyebrow="Experience"
          title="What I bring into a team"
          intro="A project is stronger when the interface, API contract, and failure states are designed together."
        >
          <DetailGrid items={experienceItems} />
        </Section>

        <Section
          id="directions"
          tone="muted"
          eyebrow="Development directions"
          title="Where I am growing deliberately"
        >
          <DetailGrid items={directions} />
        </Section>

        <Section id="workflow" eyebrow="How I work" title="Clear steps, small decisions, visible results">
          <DetailGrid items={workSteps} variant="timeline" />
        </Section>

        <Section
          id="ai"
          tone="dark"
          eyebrow="AI tools"
          title="How I use AI tools in development"
          intro="AI is useful when it speeds up exploration, catches gaps, and stays connected to manual review."
        >
          <DetailGrid items={aiUsage} />
          <AiSummaryHelper />
        </Section>

        <Section
          id="projects"
          eyebrow="Cases / projects"
          title="Small cases that demonstrate the full stack"
        >
          <DetailGrid items={cases} />
        </Section>

        <Section
          id="contact"
          tone="muted"
          eyebrow="Contacts"
          title="Let us talk about the next interface"
          intro="Send a short note about the product, team, or workflow you want to improve."
        >
          <div className="contact-layout">
            <address className="contact-list">
              {contactLinks.map((item, index) => {
                const Icon = contactIcons[index];

                return (
                  <a
                    href={item.href}
                    key={item.label}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    data-reveal
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>
                      <strong>{item.label}</strong>
                      {item.value}
                    </span>
                  </a>
                );
              })}
            </address>

            <div className="feedback-panel" aria-labelledby="feedback-title" data-reveal>
              <h3 id="feedback-title">Feedback form</h3>
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
