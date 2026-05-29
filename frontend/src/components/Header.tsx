import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../data/content";

export function Header() {
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
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
      <nav
        className={`site-header__nav ${isOpen ? "site-header__nav--open" : ""}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="site-header__cta" href="#contact">
        Contact
      </a>
    </header>
  );
}
