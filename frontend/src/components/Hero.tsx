import { ArrowDown, Mail, Sparkles } from "lucide-react";
import type { LocalizedContent } from "../data/content";

type HeroProps = {
  content: LocalizedContent["hero"];
};

export function Hero({ content }: HeroProps) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/hero-workspace.png"
        alt={content.imageAlt}
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          {content.eyebrow}
        </p>
        <h1 id="hero-title">{content.title}</h1>
        <p className="hero__role">{content.role}</p>
        <p className="hero__text">{content.text}</p>
        <div className="hero__actions" aria-label={content.actionsLabel}>
          <a className="button button--primary" href="#contact">
            <Mail size={18} aria-hidden="true" />
            {content.primaryAction}
          </a>
          <a className="button button--ghost" href="#about">
            <ArrowDown size={18} aria-hidden="true" />
            {content.secondaryAction}
          </a>
        </div>
      </div>
    </section>
  );
}
