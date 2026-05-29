import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AiSummaryHelper } from "./components/AiSummaryHelper";
import { ContactForm } from "./components/ContactForm";
import { DetailGrid } from "./components/DetailGrid";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { TechStack } from "./components/TechStack";
import { content, Locale } from "./data/content";
import { useScrollReveal } from "./hooks/useScrollReveal";

const contactIcons = [Mail, Phone, MapPin];
const localeStorageKey = "arthur-landing-locale";

function getInitialLocale(): Locale {
  return window.localStorage.getItem(localeStorageKey) === "en" ? "en" : "ru";
}

export function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const pageContent = content[locale];

  useScrollReveal();

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  return (
    <>
      <Header
        navItems={pageContent.navItems}
        ctaLabel={pageContent.header.cta}
        locale={locale}
        languageLabel={pageContent.header.languageLabel}
        openMenuLabel={pageContent.header.openMenu}
        closeMenuLabel={pageContent.header.closeMenu}
        navLabel={pageContent.header.navLabel}
        onLocaleChange={setLocale}
      />
      <main>
        <Hero content={pageContent.hero} />

        <Section
          id="about"
          eyebrow={pageContent.about.eyebrow}
          title={pageContent.about.title}
          intro={pageContent.about.intro}
        >
          <div className="about-layout">
            <p data-reveal>{pageContent.about.body}</p>
            <div className="about-stats" aria-label="Profile highlights">
              {pageContent.about.stats.map((item) => (
                <div data-reveal key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="stack"
          tone="muted"
          eyebrow={pageContent.sections.stack.eyebrow}
          title={pageContent.sections.stack.title}
        >
          <TechStack groups={pageContent.techStack} />
        </Section>

        <Section
          id="experience"
          eyebrow={pageContent.sections.experience.eyebrow}
          title={pageContent.sections.experience.title}
          intro={pageContent.sections.experience.intro}
        >
          <DetailGrid items={pageContent.experienceItems} />
        </Section>

        <Section
          id="directions"
          tone="muted"
          eyebrow={pageContent.sections.directions.eyebrow}
          title={pageContent.sections.directions.title}
        >
          <DetailGrid items={pageContent.directions} />
        </Section>

        <Section
          id="workflow"
          eyebrow={pageContent.sections.workflow.eyebrow}
          title={pageContent.sections.workflow.title}
        >
          <DetailGrid items={pageContent.workSteps} variant="timeline" />
        </Section>

        <Section
          id="ai"
          tone="dark"
          eyebrow={pageContent.sections.ai.eyebrow}
          title={pageContent.sections.ai.title}
          intro={pageContent.sections.ai.intro}
        >
          <DetailGrid items={pageContent.aiUsage} />
          <AiSummaryHelper content={pageContent.aiHelper} />
        </Section>

        <Section
          id="projects"
          eyebrow={pageContent.sections.projects.eyebrow}
          title={pageContent.sections.projects.title}
        >
          <DetailGrid items={pageContent.cases} />
        </Section>

        <Section
          id="contact"
          tone="muted"
          eyebrow={pageContent.sections.contact.eyebrow}
          title={pageContent.sections.contact.title}
          intro={pageContent.sections.contact.intro}
        >
          <div className="contact-layout">
            <address className="contact-list">
              {pageContent.contactLinks.map((item, index) => {
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
              <h3 id="feedback-title">{pageContent.feedbackTitle}</h3>
              <ContactForm content={pageContent.contactForm} />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
