"use client";

import { useEffect } from "react";

export function MotionObserver() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!hero || reduceMotion || !hasFinePointer) return undefined;

    let frame = 0;
    let normalizedX = 0;
    let normalizedY = 0;

    const renderPointer = () => {
      frame = 0;
      hero.style.setProperty("--grid-x", `${normalizedX * -18}px`);
      hero.style.setProperty("--grid-y", `${normalizedY * -14}px`);
      hero.style.setProperty("--orb-one-x", `${normalizedX * 30}px`);
      hero.style.setProperty("--orb-one-y", `${normalizedY * 24}px`);
      hero.style.setProperty("--orb-two-x", `${normalizedX * -20}px`);
      hero.style.setProperty("--orb-two-y", `${normalizedY * -16}px`);
    };

    const queueRender = () => {
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const onPointerMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      const localX = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width);
      const localY = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height);

      normalizedX = localX / bounds.width - 0.5;
      normalizedY = localY / bounds.height - 0.5;
      queueRender();
    };

    const onPointerLeave = () => {
      normalizedX = 0;
      normalizedY = 0;
      queueRender();
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toString());
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
