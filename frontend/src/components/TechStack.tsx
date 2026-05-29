import type { LocalizedContent } from "../data/content";

type TechStackProps = {
  groups: LocalizedContent["techStack"];
};

export function TechStack({ groups }: TechStackProps) {
  return (
    <div className="stack-grid">
      {groups.map((group) => {
        const Icon = group.icon;

        return (
          <article className="stack-card interactive-card" data-reveal key={group.group}>
            <div className="stack-card__heading">
              <span aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{group.group}</h3>
            </div>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
