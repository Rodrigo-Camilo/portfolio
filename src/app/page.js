import Image from "next/image";

import { ContactPanel } from "@/components/portfolio/contact-panel";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { HeroCodeCard } from "@/components/portfolio/hero-code-card";
import { HeroParticleNetwork } from "@/components/portfolio/hero-particle-network";
import { MotionObserver } from "@/components/portfolio/motion-observer";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SkillsGrid } from "@/components/portfolio/skills-grid";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/icons";
import {
  ayraCaseStudy,
  education,
  experience,
  hubbiiCaseStudy,
  skillGroups,
  supplyDeskCaseStudy,
} from "@/data/portfolio";


const highlights = [
  //{ value: "02", label: "projetos full stack desenvolvidos" },
];


const techLoop = [
  "React JS",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Firebase",
];

const techLoopSequence = Array.from({ length: 4 }, () => techLoop).flat();

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <MotionObserver />
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <HeroParticleNetwork />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />

          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="availability" data-reveal>
                <span className="availability-dot" aria-hidden="true" />
                São Paulo, Brasil
              </div>

              <h1 id="hero-title" className="sr-only">
                Rodrigo Camilo Paixão — Desenvolvedor Full Stack
              </h1>

              <div className="hero-portrait" data-reveal style={{ "--delay": "80ms" }}>
                <Image
                  src="/perfil.png"
                  alt="Retrato profissional de Rodrigo Camilo Paixão"
                  width={480}
                  height={480}
                  priority
                  sizes="(max-width: 720px) 78vw, (max-width: 1080px) 360px, 430px"
                />
              </div>

              <p className="hero-intro" data-reveal style={{ "--delay": "160ms" }}>
                Me chamo <strong>Rodrigo Camilo Paixão</strong>, sou desenvolvedor Full Stack e estudante de tecnologia, apaixonado por resolver problemas com código e transformar ideias em projetos reais.
              </p>

              <div className="hero-actions" data-reveal style={{ "--delay": "240ms" }}>
                <a className="button button-primary" href="#projetos">
                  Ver projetos
                  <ArrowUpRightIcon />
                </a>
                <a className="button button-ghost" href="mailto:rodrigocamilo2006@gmail.com">
                  Falar comigo
                </a>
              </div>

              <div className="hero-social" data-reveal style={{ "--delay": "320ms" }}>
                <span>Encontre-me</span>
                <a
                  href="https://github.com/Rodrigo-Camilo"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub de Rodrigo Camilo"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/rodrigocpaixao"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn de Rodrigo Camilo"
                >
                  <LinkedinIcon />
                </a>
                <a href="mailto:rodrigocamilo2006@gmail.com" aria-label="Enviar e-mail">
                  <MailIcon />
                </a>
              </div>
            </div>

            <HeroCodeCard />
          </div>
          <div className="container hero-highlights" data-reveal>
            {highlights.map((item) => (
              <div className="highlight" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="tech-marquee" aria-label="Principais tecnologias">
          <div className="tech-marquee-track">
            {[...techLoopSequence, ...techLoopSequence].map((tech, index) => (
              <span key={`${tech}-${index}`} aria-hidden={index >= techLoopSequence.length}>
                {tech}
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>
        </div>

        <section className="section experience-section" id="experiencia" aria-labelledby="experiencia-title">
          <div className="container experience-layout">
            <div className="experience-intro">
              <SectionHeading
                eyebrow="01 — Experiência"
                title="Minhas experiências profissionais"
                id="experiencia-title"
              />
              <p data-reveal>
                Da infraestrutura e suporte técnico ao desenvolvimento ponta a ponta de
                aplicações em produção.
              </p>
            </div>
            <ExperienceTimeline items={experience} />
          </div>
        </section>

        <section className="section projects-section" id="projetos" aria-labelledby="projetos-title">
          <div className="container">
            <SectionHeading
              eyebrow="02 — Meus Projetos"
              title="Meus Projetos."
              id="projetos-title"
            />

            <ProjectGallery projects={[supplyDeskCaseStudy, ayraCaseStudy, hubbiiCaseStudy]} />
          </div>
        </section>

        <section className="section skills-section" id="stack" aria-labelledby="stack-title">
          <div className="container">
            <SectionHeading
              eyebrow="03 — Stack"
              title="Stack principal."
              id="stack-title"
              aside="Base técnica para construir, integrar, publicar e sustentar produtos digitais."
            />
            <SkillsGrid groups={skillGroups} />
          </div>
        </section>

        <section className="section education-section" id="formacao" aria-labelledby="formacao-title">
          <div className="container education-layout">
            <SectionHeading
              eyebrow="04 — Formação"
              title="Formação acadêmica focada em tecnologia"
              id="formacao-title"
            />
            <div className="education-list" data-reveal>
              {education.map((item) => (
                <article className="education-item" key={item.course}>
                  <div>
                    <span>{item.status}</span>
                    <h3>{item.course}</h3>
                    <p>{item.institution}</p>
                  </div>
                  <time>{item.period}</time>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactPanel />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <span className="footer-mark">RC</span>
            <p>Desenvolvido por Rodrigo Camilo.</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Rodrigo-Camilo" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRightIcon />
            </a>
            <a href="https://www.linkedin.com/in/rodrigocpaixao" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRightIcon />
            </a>
          </div>
          <a className="back-to-top" href="#inicio" aria-label="Voltar ao início">
            ↑
          </a>
        </div>
      </footer>
    </>
  );
}
