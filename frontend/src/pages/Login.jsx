import React, { useState, useEffect, useRef } from 'react';
import mountainBg from '../assets/mountain-bg.jpg';
import logoBadge from '../assets/loglens-logo.png';
import LoginForm from '../components/LoginForm';
import './Login.css';

const SLIDES = [
  {
    titleLine1: 'Your productivity journey',
    titleLine2: 'starts here.',
    description:
      'Analyze logs, detect anomalies, and resolve incidents faster with AI-powered insights. Turn your daily grind into a smarter, more connected workflow.',
  },
  {
    titleLine1: 'Autonomous root cause',
    titleLine2: 'pinpointed in seconds.',
    description:
      'Correlate millions of trace logs in real-time. Uncover subtle regressions before they degrade production SLAs.',
  },
  {
    titleLine1: 'Collaborative incident response',
    titleLine2: 'for modern teams.',
    description:
      'Connect engineering, DevOps, and SREs in synchronized incident realms with contextual AI triage.',
  },
];

export default function Login() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 28;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * ((canvas.height || 800) * 0.55), // sky region
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      const maxDistance = 90;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }


      particles.forEach((p, idx) => {
        const pulse = Math.sin(t + idx) * 0.25 + 0.75;
        const currentAlpha = p.alpha * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${currentAlpha * 0.3})`;
        ctx.fill();

        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 245, 255, ${currentAlpha})`;
        ctx.fill();

    
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height * 0.55;
        if (p.y > canvas.height * 0.55) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="login-page-container">
      
      <section className="login-left-section">
      
        <div
          className="left-section-bg"
          style={{ backgroundImage: `url(${mountainBg})` }}
        />

      
        <div className="left-section-overlay" />

        
        <canvas ref={canvasRef} className="left-section-canvas" />

    
        <header className="brand-header">
          <div className="brand-badge-container">
            <img src={logoBadge} alt="LogLens Logo" className="brand-logo-img" />
          </div>
          <div className="brand-info">
            <div className="brand-title">
              <span className="brand-title-log">Log</span>
              <span className="brand-title-lens">Lens</span>
            </div>
            <div className="brand-subtitle">
              AI INCIDENT INTELLIGENCE FOR DEVELOPERS
            </div>
          </div>
        </header>

      
        <div className="left-bottom-content">
          <h1 className="hero-headline">
            {slide.titleLine1}
            <br />
            <span className="hero-headline-highlight">{slide.titleLine2}</span>
          </h1>

          <p className="hero-description">{slide.description}</p>

          
          <div className="slide-indicators">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`indicator ${index === currentSlide ? 'indicator-pill active' : 'indicator-dot'}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="login-right-section">
        <div className="login-form-wrapper">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
