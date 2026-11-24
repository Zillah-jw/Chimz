import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  kind: "ember" | "petal";
}

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = width < 768 ? 18 : 30;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, idx) => {
      const isPetal = idx % 3 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: isPetal ? 0.18 + Math.random() * 0.25 : -(0.12 + Math.random() * 0.22),
        size: isPetal ? 4 + Math.random() * 4.5 : 1 + Math.random() * 1.8,
        alpha: isPetal ? 0.12 + Math.random() * 0.16 : 0.18 + Math.random() * 0.28,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        kind: isPetal ? "petal" : "ember"
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.008) * 0.12;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.kind === "petal") {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(145, 18, 40, ${p.alpha})`;
          ctx.beginPath();
          // Sculpted curved tulip petal silhouette
          ctx.moveTo(0, -p.size * 1.4);
          ctx.bezierCurveTo(
            p.size * 0.95,
            -p.size * 0.4,
            p.size * 0.75,
            p.size * 0.9,
            0,
            p.size * 1.1
          );
          ctx.bezierCurveTo(
            -p.size * 0.75,
            p.size * 0.9,
            -p.size * 0.95,
            -p.size * 0.4,
            0,
            -p.size * 1.4
          );
          ctx.fill();
          ctx.restore();
        } else {
          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          ctx.fillStyle = `rgba(212, 163, 155, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-80"
    />
  );
}
