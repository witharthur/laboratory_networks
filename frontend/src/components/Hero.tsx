import { ArrowDown, Mail, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/hero-workspace.png"
        alt="Modern developer workspace with laptop and notebook"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          Portfolio landing page
        </p>
        <h1 id="hero-title">Arthur Dadalian</h1>
        <p className="hero__role">Frontend / Full-Stack Developer</p>
        <p className="hero__text">
          I build reliable interfaces, connect them to typed APIs, and use AI tools where they make
          real product work faster and clearer.
        </p>
        <div className="hero__actions" aria-label="Primary actions">
          <a className="button button--primary" href="#contact">
            <Mail size={18} aria-hidden="true" />
            Get in touch
          </a>
          <a className="button button--ghost" href="#about">
            <ArrowDown size={18} aria-hidden="true" />
            View profile
          </a>
        </div>
      </div>
    </section>
  );
}
