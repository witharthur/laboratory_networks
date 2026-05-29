import type { DetailItem } from "../data/content";

type DetailGridProps = {
  items: DetailItem[];
  variant?: "cards" | "timeline";
};

export function DetailGrid({ items, variant = "cards" }: DetailGridProps) {
  return (
    <div className={`detail-grid detail-grid--${variant}`}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article className="info-card interactive-card" data-reveal key={item.title}>
            {Icon ? (
              <div className="info-card__icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </div>
            ) : null}
            {item.meta ? <p className="info-card__meta">{item.meta}</p> : null}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        );
      })}
    </div>
  );
}
