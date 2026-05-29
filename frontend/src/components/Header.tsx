import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale, NavItem } from "../data/content";

type HeaderProps = {
  navItems: NavItem[];
  ctaLabel: string;
  locale: Locale;
  languageLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  navLabel: string;
  onLocaleChange: (locale: Locale) => void;
};

export function Header({
  navItems,
  ctaLabel,
  locale,
  languageLabel,
  openMenuLabel,
  closeMenuLabel,
  navLabel,
  onLocaleChange
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#home" aria-label="Arthur Dadalian home">
        AD
      </a>
      <button
        className="site-header__menu"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label={isOpen ? closeMenuLabel : openMenuLabel}
      >
        {isOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
      <nav
        className={`site-header__nav ${isOpen ? "site-header__nav--open" : ""}`}
        id="main-navigation"
        aria-label={navLabel}
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="site-header__actions">
        <div className="language-switch" aria-label={languageLabel}>
          {(["ru", "en"] as const).map((item) => (
            <button
              className={`language-switch__button ${
                locale === item ? "language-switch__button--active" : ""
              }`}
              type="button"
              key={item}
              onClick={() => onLocaleChange(item)}
              aria-pressed={locale === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <a className="site-header__cta" href="#contact">
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
