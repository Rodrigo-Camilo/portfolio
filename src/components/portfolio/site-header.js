"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const navigation = [
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#stack", label: "Stack" },
  { href: "#formacao", label: "Formação" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Rodrigo Camilo — início">
          <span className="brand-mark">RC</span>
          <span className="brand-name">Rodrigo Camilo</span>
        </a>

        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="#contato" onClick={() => setOpen(false)}>
            Contato
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}
