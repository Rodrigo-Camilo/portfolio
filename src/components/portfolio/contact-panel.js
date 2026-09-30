import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";

export function ContactPanel() {
  return (
    <section className="contact-section" id="contato" aria-labelledby="contato-title">
      <div className="contact-grid" aria-hidden="true" />
      <div className="container contact-inner" data-reveal>
        <div>
          <p className="eyebrow">05 — Contato</p>
          <h2 id="contato-title">Precisa entrar em contato comigo?</h2>
        </div>
        <div className="contact-copy">
          <p>
            Estou disponível para novas oportunidades.
          </p>
          <a className="contact-email" href="mailto:rodrigocamilo2006@gmail.com">
            <MailIcon size={24} />
            <span>rodrigocamilo2006@gmail.com</span>
            <ArrowUpRightIcon size={24} />
          </a>
          <div className="contact-location"><MapPinIcon size={18} /> São Paulo, SP</div>
        </div>
      </div>
    </section>
  );
}
