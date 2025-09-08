import React, { useRef, useEffect, useCallback } from 'react';

interface ParticleBackgroundProps {
  theme: 'light' | 'dark';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, particles: any[], mousePos: { x: number, y: number }) => {
    if (!ctx || !ctx.canvas) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const particleColor = theme === 'dark' ? 'rgba(229, 231, 235, 0.5)' : 'rgba(107, 114, 128, 0.5)';
    const lineColor = theme === 'dark' ? 'rgba(229, 231, 235, 0.1)' : 'rgba(107, 114, 128, 0.1)';
    const mouseLineColor = theme === 'dark' ? 'rgba(5, 150, 105, 0.3)' : 'rgba(16, 185, 129, 0.3)';

    ctx.fillStyle = particleColor;

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Connect particles
    ctx.strokeStyle = lineColor;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.lineWidth = 1 - distance / 150;
                ctx.stroke();
            }
        }
    }

    // Connect particles to mouse
    ctx.strokeStyle = mouseLineColor;
    for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mousePos.x;
        const dy = particles[i].y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.lineWidth = 1 - distance/250;
            ctx.stroke();
        }
    }


  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let particles: any[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      draw(ctx, particles, mouseRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleBackground;