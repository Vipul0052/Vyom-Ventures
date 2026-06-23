import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseTime: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45; // Subtle luxury detail

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = 0.08 + Math.random() * 0.25;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12, // extremely slow drift
          vy: (Math.random() - 0.5) * 0.12,
          size: 0.8 + Math.random() * 1.5,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          pulseSpeed: 0.003 + Math.random() * 0.007,
          pulseTime: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Slowly update position
        p.x += p.vx;
        p.y += p.vy;

        // Pulse the opacity slightly for atmospheric shimmer
        p.pulseTime += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseTime) * 0.1;
        p.alpha = Math.max(0.02, Math.min(p.alpha, 0.4));

        // Wrap screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft golden/slate particles
        ctx.fillStyle = `rgba(179, 142, 70, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    }}>
      {/* Drifting ambient blurs (blobs) */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '45vw',
          height: '45vw',
          maxHeight: '600px',
          maxWidth: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 230, 138, 0.35) 0%, rgba(253, 230, 138, 0) 70%)',
          filter: 'blur(90px)',
          animation: 'drift1 24s ease-in-out infinite alternate',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          maxHeight: '650px',
          maxWidth: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186, 230, 253, 0.4) 0%, rgba(186, 230, 253, 0) 70%)',
          filter: 'blur(100px)',
          animation: 'drift2 28s ease-in-out infinite alternate',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '35vw',
          height: '35vw',
          maxHeight: '500px',
          maxWidth: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 207, 232, 0.3) 0%, rgba(251, 207, 232, 0) 70%)',
          filter: 'blur(80px)',
          animation: 'drift3 20s ease-in-out infinite alternate',
        }}
      />

      {/* Particle overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Keyframe animation declarations (injected via style tag) */}
      <style>{`
        @keyframes drift1 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          100% { transform: translate(50px, 40px) rotate(180deg) scale(1.1); }
        }
        @keyframes drift2 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1.15); }
          100% { transform: translate(-60px, -30px) rotate(-180deg) scale(0.9); }
        }
        @keyframes drift3 {
          0% { transform: translate(0px, 0px) scale(0.95); }
          100% { transform: translate(30px, -50px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
