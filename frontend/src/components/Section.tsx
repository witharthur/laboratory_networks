import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "light" | "muted" | "dark";
};

export function Section({ id, eyebrow, title, intro, children, tone = "light" }: SectionProps) {
  return (
    <section className={`section section--${tone}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="section__inner">
        <div className="section__header" data-reveal>
          {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
          <h2 id={`${id}-title`}>{title}</h2>
          {intro ? <p className="section__intro">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
