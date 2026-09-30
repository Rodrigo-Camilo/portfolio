"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./project-gallery.module.css";

function getPreferredDevice(project, demo) {
  const preferredDevice = demo.defaultDevice ?? project.defaultDevice ?? "desktop";

  if (demo.sources[preferredDevice]) return preferredDevice;
  if (demo.sources.desktop) return "desktop";
  return "mobile";
}

export function ProjectGallery({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeDemoId, setActiveDemoId] = useState(null);
  const [device, setDevice] = useState("desktop");
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const activeDemo = activeProject
    ? activeProject.demos.find((demo) => demo.id === activeDemoId) ?? activeProject.demos[0]
    : null;
  const availableDevices = activeProject && activeDemo
    ? activeProject.devices.filter((item) => Boolean(activeDemo.sources[item.id]))
    : [];
  const activeDevice = activeDemo?.sources[device] ? device : availableDevices[0]?.id;
  const supportsDeviceSwitch = availableDevices.length > 1;

  const closeProject = useCallback(() => {
    setActiveProject(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeProject();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject, closeProject]);

  const openProject = (project, trigger) => {
    const firstDemo = project.demos[0];

    lastTriggerRef.current = trigger;
    setActiveProject(project);
    setActiveDemoId(firstDemo.id);
    setDevice(getPreferredDevice(project, firstDemo));
  };

  const selectDemo = (demo) => {
    setActiveDemoId(demo.id);
    setDevice(getPreferredDevice(activeProject, demo));
  };

  return (
    <>
      <div className={styles.grid} data-reveal>
        {projects.map((project) => {
          const previewDemo = project.demos[0];
          const previewDevice = getPreferredDevice(project, previewDemo);

          return (
          <article className={styles.card} key={project.slug}>
            <button
              type="button"
              className={`${styles.preview} ${!project.banner && previewDevice === "mobile" ? styles.mobilePreview : ""}`}
              onClick={(event) => openProject(project, event.currentTarget)}
              aria-label={`Abrir detalhes do projeto ${project.name}`}
            >
              {project.banner ? (
                <Image
                  src={project.banner}
                  alt={`Banner do projeto ${project.name}`}
                  fill
                  sizes="(max-width: 620px) calc(100vw - 32px), (max-width: 920px) 50vw, 33vw"
                />
              ) : (
                <video
                  src={`${previewDemo.sources[previewDevice]}#t=0.1`}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex="-1"
                />
              )}
              <span className={styles.previewShade} aria-hidden="true" />
              <span className={styles.previewIndex}>{project.number}</span>
              <span className={styles.previewAction}>Ver projeto <i>↗</i></span>
            </button>

            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span>{project.status}</span>
                <time>{project.period}</time>
              </div>
              <h3>{project.name}</h3>
              <p className={styles.cardType}>{project.type}</p>
              <p className={styles.cardSummary}>{project.summary}</p>
              <div className={styles.cardFooter}>
                <div className={styles.tags} aria-label="Classificação do projeto">
                  {project.classification.slice(0, 3).map((label) => <span key={label}>{label}</span>)}
                </div>
                <div className={styles.cardActions}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Site ↗
                    </a>
                  )}
                  <button
                    type="button"
                    className={styles.openButton}
                    onClick={(event) => openProject(project, event.currentTarget)}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          </article>
          );
        })}
      </div>

      {activeProject && activeDemo && (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProject();
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <header className={styles.modalHeader}>
              <div>
                <span>{activeProject.number} · {activeProject.status}</span>
                <h3 id="project-dialog-title">{activeProject.name}</h3>
              </div>
              <div className={styles.modalHeaderActions}>
                <time>{activeProject.period}</time>
                {activeProject.liveUrl && (
                  <a
                    className={styles.liveProjectLink}
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Acessar site ↗
                  </a>
                )}
                <button
                  ref={closeButtonRef}
                  type="button"
                  className={styles.closeButton}
                  onClick={closeProject}
                  aria-label="Fechar projeto"
                >
                  ×
                </button>
              </div>
            </header>

            <div className={styles.modalBody}>
              <div className={styles.mediaColumn}>
                <div className={styles.toolbar}>
                  <div className={styles.tabs} role="tablist" aria-label="Áreas demonstradas">
                    {activeProject.demos.map((demo) => (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={demo.id === activeDemo.id}
                        className={demo.id === activeDemo.id ? styles.activeTab : ""}
                        onClick={() => selectDemo(demo)}
                        key={demo.id}
                      >
                        {demo.label}
                      </button>
                    ))}
                  </div>

                  {supportsDeviceSwitch && (
                    <div className={styles.deviceSwitch} aria-label="Formato do vídeo">
                      {availableDevices.map((item) => (
                        <button
                          type="button"
                          className={activeDevice === item.id ? styles.activeDevice : ""}
                          aria-pressed={activeDevice === item.id}
                          onClick={() => setDevice(item.id)}
                          key={item.id}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`${styles.videoStage} ${activeDevice === "mobile" ? styles.mobileStage : ""}`}>
                  <video
                    key={`${activeDemo.id}-${activeDevice}`}
                    className={activeDevice === "mobile" ? styles.mobileVideo : styles.desktopVideo}
                    src={activeDemo.sources[activeDevice]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label={`${activeDemo.title} — visualização ${activeDevice}`}
                  />
                </div>

                <div className={styles.caption}>
                  <strong>{activeDemo.title}</strong>
                  <p>{activeDemo.description}</p>
                </div>
              </div>

              <aside className={styles.projectInfo}>
                <p className={styles.infoLead}>{activeProject.overview}</p>

                <div className={styles.infoBlock}>
                  <span>Meu papel</span>
                  <p>{activeProject.role}</p>
                </div>

                <div className={styles.infoBlock}>
                  <span>Desafio técnico</span>
                  <p>{activeProject.decision}</p>
                </div>

                <div className={styles.infoBlock}>
                  <span>Destaques</span>
                  <ul>
                    {activeProject.highlights.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className={styles.infoBlock}>
                  <span>Tecnologias</span>
                  <div className={styles.techStack}>
                    {activeProject.technologies.map((technology) => <i key={technology}>{technology}</i>)}
                  </div>
                </div>

                <p className={styles.note}>{activeProject.note}</p>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
