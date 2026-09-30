"use client";

import { useEffect, useRef } from "react";

const CONNECTION_DISTANCE = 138;
const POINTER_RADIUS = 190;
const ACTIVATION_RADIUS = 44;
const MAX_TRAIL_CONNECTIONS = 12;
const CONNECTION_REVEAL_DURATION = 260;
const CONNECTION_FADE_DURATION = 2400;
const NODE_FADE_DURATION = 1800;

function createParticle(width, height, id) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.08 + Math.random() * 0.12;

  return {
    id,
    x: Math.random() * width,
    y: Math.random() * height,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    offsetX: 0,
    offsetY: 0,
    forceX: 0,
    forceY: 0,
    radius: 1 + Math.random() * 1.15,
    selectedAt: 0,
    pulse: 0,
  };
}

export function HeroParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest(".hero");
    const context = canvas?.getContext("2d");

    if (!canvas || !hero || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: 0, y: 0, active: false };
    let particles = [];
    let trailConnections = [];
    let activeParticle = null;
    let hoveredParticle = null;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, hero.offsetHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = hasFinePointer
        ? Math.min(58, Math.max(28, Math.round((width * height) / 24500)))
        : Math.min(22, Math.max(16, Math.round((width * height) / 32000)));
      particles = Array.from(
        { length: particleCount },
        (_, index) => createParticle(width, height, index),
      );
      trailConnections = [];
      activeParticle = null;
      hoveredParticle = null;
      canvas.dataset.connections = "0";
      canvas.dataset.activeNode = "";

      if (reduceMotion || !hasFinePointer) drawFrame(0, false);
    };

    const getRenderedPosition = (particle) => ({
      x: particle.x + particle.offsetX,
      y: particle.y + particle.offsetY,
    });

    const updateParticle = (particle, timeScale) => {
      particle.x += particle.velocityX * timeScale;
      particle.y += particle.velocityY * timeScale;

      const margin = 16;
      if (particle.x < -margin) particle.x = width + margin;
      if (particle.x > width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = height + margin;
      if (particle.y > height + margin) particle.y = -margin;

      if (pointer.active) {
        const rendered = getRenderedPosition(particle);
        const deltaX = rendered.x - pointer.x;
        const deltaY = rendered.y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0 && distance < POINTER_RADIUS) {
          const pressure = 1 - distance / POINTER_RADIUS;
          particle.forceX += (deltaX / distance) * pressure * 0.2;
          particle.forceY += (deltaY / distance) * pressure * 0.2;
        }
      }

      particle.forceX *= 0.88;
      particle.forceY *= 0.88;
      particle.offsetX = (particle.offsetX + particle.forceX * timeScale) * 0.965;
      particle.offsetY = (particle.offsetY + particle.forceY * timeScale) * 0.965;
      particle.pulse = Math.max(0, particle.pulse - 0.035 * timeScale);
    };

    const drawConnection = (first, second) => {
      const firstPosition = getRenderedPosition(first);
      const secondPosition = getRenderedPosition(second);
      const deltaX = firstPosition.x - secondPosition.x;
      const deltaY = firstPosition.y - secondPosition.y;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance >= CONNECTION_DISTANCE) return;

      const firstPointerDistance = pointer.active
        ? Math.hypot(firstPosition.x - pointer.x, firstPosition.y - pointer.y)
        : Infinity;
      const secondPointerDistance = pointer.active
        ? Math.hypot(secondPosition.x - pointer.x, secondPosition.y - pointer.y)
        : Infinity;
      const nearPointer = Math.min(firstPointerDistance, secondPointerDistance) < POINTER_RADIUS;
      const opacity = (1 - distance / CONNECTION_DISTANCE) * (nearPointer ? 0.075 : 0.018);

      context.beginPath();
      context.moveTo(firstPosition.x, firstPosition.y);
      context.lineTo(secondPosition.x, secondPosition.y);
      context.strokeStyle = `rgba(142, 166, 255, ${opacity})`;
      context.lineWidth = nearPointer ? 0.48 : 0.32;
      context.stroke();
    };

    const drawPointerPreview = () => {
      if (!pointer.active || !activeParticle) return;

      const start = getRenderedPosition(activeParticle);
      const distance = Math.hypot(pointer.x - start.x, pointer.y - start.y);
      const opacity = Math.min(distance / 180, 1) * 0.11;

      context.save();
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(pointer.x, pointer.y);
      context.setLineDash([3, 10]);
      context.strokeStyle = `rgba(142, 166, 255, ${opacity})`;
      context.lineWidth = 0.55;
      context.stroke();
      context.restore();
    };

    const drawTrailConnections = (currentTime) => {
      trailConnections = trailConnections.filter(
        (connection) => currentTime - connection.createdAt < CONNECTION_FADE_DURATION,
      );
      canvas.dataset.connections = String(trailConnections.length);

      trailConnections.forEach((connection, index) => {
        const start = getRenderedPosition(connection.from);
        const target = getRenderedPosition(connection.to);
        const age = currentTime - connection.createdAt;
        const progress = Math.min(
          Math.max(age / CONNECTION_REVEAL_DURATION, 0),
          1,
        );
        const fadeProgress = Math.max(0, 1 - age / CONNECTION_FADE_DURATION);
        const newerConnections = trailConnections.length - 1 - index;
        const recencyOpacity = 0.55 ** newerConnections;
        const opacity = 0.3 * fadeProgress ** 1.35 * recencyOpacity;
        const easedProgress = 1 - (1 - progress) ** 3;
        const endX = start.x + (target.x - start.x) * easedProgress;
        const endY = start.y + (target.y - start.y) * easedProgress;

        context.save();
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(endX, endY);
        context.strokeStyle = `rgba(142, 166, 255, ${opacity})`;
        context.lineWidth = 0.82;
        context.shadowColor = `rgba(142, 166, 255, ${opacity * 0.45})`;
        context.shadowBlur = 2;
        context.stroke();
        context.restore();
      });
    };

    const drawParticle = (particle, currentTime) => {
      const position = getRenderedPosition(particle);
      const pointerDistance = pointer.active
        ? Math.hypot(position.x - pointer.x, position.y - pointer.y)
        : Infinity;
      const isNearPointer = pointerDistance < POINTER_RADIUS;
      const isHovered = particle === hoveredParticle;
      const selectedAge = currentTime - particle.selectedAt;
      const selectionOpacity = particle.selectedAt
        ? Math.max(0, 1 - selectedAge / NODE_FADE_DURATION)
        : 0;
      const isSelected = selectionOpacity > 0;

      context.beginPath();
      context.arc(
        position.x,
        position.y,
        particle.radius + (isNearPointer ? 0.55 : 0) + (isSelected ? 0.55 : 0),
        0,
        Math.PI * 2,
      );
      context.fillStyle = isSelected
        ? `rgba(210, 219, 255, ${0.46 + selectionOpacity * 0.34})`
        : isNearPointer
          ? "rgba(184, 199, 255, 0.7)"
          : "rgba(142, 166, 255, 0.29)";
      context.shadowColor = "rgba(142, 166, 255, 0.46)";
      context.shadowBlur = isSelected || isNearPointer ? 7 : 3;
      context.fill();
      context.shadowBlur = 0;

      if (isHovered || particle.pulse > 0) {
        context.beginPath();
        context.arc(
          position.x,
          position.y,
          particle.radius + 5 + (1 - particle.pulse) * 3,
          0,
          Math.PI * 2,
        );
        context.strokeStyle = `rgba(142, 166, 255, ${isHovered ? 0.46 : particle.pulse * 0.34})`;
        context.lineWidth = 0.75;
        context.stroke();
      }
    };

    function drawFrame(timeScale, update = true) {
      const currentTime = performance.now();
      context.clearRect(0, 0, width, height);

      if (update) {
        particles.forEach((particle) => updateParticle(particle, timeScale));
      }

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          drawConnection(particles[firstIndex], particles[secondIndex]);
        }
      }

      drawPointerPreview();
      drawTrailConnections(currentTime);
      particles.forEach((particle) => drawParticle(particle, currentTime));
    }

    const activateNearestParticle = () => {
      let nearestParticle = null;
      let nearestDistance = ACTIVATION_RADIUS;

      particles.forEach((particle) => {
        const position = getRenderedPosition(particle);
        const distance = Math.hypot(position.x - pointer.x, position.y - pointer.y);

        if (distance < nearestDistance) {
          nearestParticle = particle;
          nearestDistance = distance;
        }
      });

      hoveredParticle = nearestParticle;
      if (!nearestParticle || nearestParticle === activeParticle) return;

      nearestParticle.selectedAt = performance.now();
      nearestParticle.pulse = 1;

      if (activeParticle) {
        trailConnections.push({
          from: activeParticle,
          to: nearestParticle,
          createdAt: performance.now(),
        });

        if (trailConnections.length > MAX_TRAIL_CONNECTIONS) {
          trailConnections.shift();
        }
      }

      activeParticle = nearestParticle;
      canvas.dataset.connections = String(trailConnections.length);
      canvas.dataset.activeNode = String(nearestParticle.id);
    };

    const animate = (currentTime) => {
      const timeScale = Math.min((currentTime - lastTime) / 16.67, 2);
      lastTime = currentTime;
      drawFrame(timeScale);

      if (isVisible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const startAnimation = () => {
      if (reduceMotion || !hasFinePointer || animationFrame || !isVisible || document.hidden) return;
      lastTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event) => {
      if (!hasFinePointer || reduceMotion) return;
      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      activateNearestParticle();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      activeParticle = null;
      hoveredParticle = null;
      canvas.dataset.activeNode = "";
    };

    const onVisibilityChange = () => {
      if (document.hidden && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        startAnimation();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startAnimation();
      },
      { rootMargin: "100px" },
    );

    resizeObserver.observe(hero);
    visibilityObserver.observe(hero);
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    startAnimation();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particle-network" aria-hidden="true" />;
}
