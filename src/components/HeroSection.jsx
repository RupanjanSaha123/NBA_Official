import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Play } from 'lucide-react';

export default function HeroSection({ scrollToSection }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // State for image source fallback
  const [ballImgSrc, setBallImgSrc] = useState('/Assets/basketball.png');
  const [imageError, setImageError] = useState(false);
  
  const fallbackBallUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD5OXGQxISPImuPPr8XYMJBVzsArLubdRuK8mZ--UvSfGOscHewtV8V5cuLQ2Aeow1A48ZvwMRmkXWefvH3PZIzlTESyEShe2_ahJPCOrPVlDKwnHIMHKmA3JSKMotkGSVvlqb5T88O22T8764hgYowTRi-rcnmR7Wun7Q9K92hTZ5EhFsP176gmjIny9RSvgCxN8jLmnmzxDDsIxHZKP71ISCcAtKBaiJNd8BHff6M7sEey8CycQwEXPxTo_d6YpZhOvnQwpA92_I";

  // Mouse positions for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Parallax for background card and typography
  const textX = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  const textY = useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);

    // Dynamic mouse reflection on glass panels
    const panels = document.querySelectorAll('.glass-panel');
    panels.forEach(panel => {
      const panelRect = panel.getBoundingClientRect();
      const px = e.clientX - panelRect.left;
      const py = e.clientY - panelRect.top;
      panel.style.setProperty('--mouse-x', `${px}px`);
      panel.style.setProperty('--mouse-y', `${py}px`);
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Particle simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Spark {
      constructor() {
        this.reset();
      }

      reset() {
        // Generate sparks near the center (around the basketball)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Random angle & radius around ball
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 120 + 20;

        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        
        // Speed vectors
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = -Math.random() * 2.2 - 0.5; // rising float
        
        this.size = Math.random() * 2.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 150 + 50;
        this.maxLife = this.life;
        
        // Gold or Orange spark tint
        this.color = Math.random() > 0.4 ? '#ffb693' : '#e9c349';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.alpha = (this.life / this.maxLife) * 0.6;
        
        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize sparks
    const sparkCount = 45;
    const sparks = Array.from({ length: sparkCount }, () => new Spark());

    // Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparks.forEach(spark => {
        spark.update();
        spark.draw();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Background Graphic Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/80 to-background pointer-events-none" />
      
      {/* Ambient spotlights and particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="spotlight-blue left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2" />
        <div className="spotlight-orange right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2" />
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full h-full flex flex-col justify-center relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[650px]">
          
          {/* Typography & Call-To-Action (Left column) */}
          <motion.div 
            style={{ x: textX, y: textY }}
            className="lg:col-span-6 flex flex-col justify-center space-y-8 order-2 lg:order-1 relative"
          >
            {/* Spotlight rim vertical line */}
            <div className="absolute -left-6 top-0 w-[2px] h-32 bg-gradient-to-b from-primary to-transparent opacity-60 blur-[1px]" />
            
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded bg-surface/30 border border-white/5 backdrop-blur-md font-label-caps text-xs text-secondary rim-light-gold">
                SEASON 2024 NOW LIVE
              </span>
              
              <h1 className="font-display-lg text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.05] drop-shadow-2xl">
                ENTER THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-primary to-secondary glow-text-orange">
                  NBA UNIVERSE
                </span>
              </h1>
              
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xl">
                Experience the game through next-gen analytics, live tracking dashboard, and holographic rosters. Step onto the courtside in ultra-premium detail.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('stats')}
                className="bg-primary-container hover:bg-primary text-black font-label-caps text-xs tracking-wider px-8 py-4 rounded hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.4)] flex items-center justify-center gap-2"
              >
                <Play size={14} fill="black" />
                WATCH LIVE
              </button>
              
              <button 
                onClick={() => scrollToSection('players')}
                className="glass-button-ghost text-secondary font-label-caps text-xs tracking-wider px-8 py-4 rounded hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                EXPLORE TEAMS
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Quick Stats snippet banner */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5 w-full max-w-md">
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">ACTIVE GAMES</p>
                <p className="font-headline-md text-2xl text-primary font-bold">04</p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">TOP SCORER</p>
                <p className="font-headline-md text-2xl text-secondary font-bold">38 <span className="text-xs font-light">PTS</span></p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">LIVE CLIPS</p>
                <p className="font-headline-md text-2xl text-tertiary font-bold">142</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive 3D center object (Right column) */}
          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 relative min-h-[400px]">
            {/* Ambient circle glow behind ball */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-primary-container/10 to-secondary/5 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
            
            {/* 3D Container */}
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[420px] aspect-square group cursor-pointer"
            >
              {/* The Basketball Centerpiece */}
              <img 
                alt="3D Basketball Centerpiece" 
                className="w-full h-full object-cover rounded-full shadow-[0_0_80px_rgba(255,107,0,0.25)] border border-primary/20 transition-all duration-300 relative z-10 select-none pointer-events-none"
                src={ballImgSrc}
                onError={() => {
                  if (!imageError) {
                    setImageError(true);
                    setBallImgSrc(fallbackBallUrl);
                  }
                }}
              />
              
              {/* Soft reflecting specular light overlay on the ball */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay z-20 pointer-events-none" />

              {/* Floating Widget 1 (Right side) */}
              <motion.div 
                className="absolute -right-6 top-1/4 glass-panel p-4 rounded-xl shadow-2xl z-30 flex items-center gap-3 float-element border border-white/5"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 218, 243, 0.4)' }}
              >
                <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center border border-tertiary/30">
                  <Flame size={16} className="text-tertiary animate-pulse" />
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant leading-none">HOT STREAK</p>
                  <p className="font-headline-md text-base text-on-surface font-bold mt-1">LAL W4</p>
                </div>
              </motion.div>

              {/* Floating Widget 2 (Left side) */}
              <motion.div 
                className="absolute -left-10 bottom-1/4 glass-panel p-4 rounded-xl shadow-2xl z-30 flex items-center gap-3 float-element-reverse border border-white/5"
                whileHover={{ scale: 1.05, borderColor: 'rgba(233, 195, 73, 0.4)' }}
              >
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/30">
                  <Trophy size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant leading-none">FINALS RATING</p>
                  <p className="font-headline-md text-base text-secondary font-bold mt-1">98.5 OVR</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pt-8 md:pt-16">
          <button 
            onClick={() => scrollToSection('stats')}
            className="flex flex-col items-center gap-2 group text-on-surface-variant hover:text-primary transition-colors duration-300"
          >
            <span className="font-label-caps text-[10px] tracking-widest uppercase">Scroll to Arena</span>
            <div className="w-[18px] h-[30px] rounded-full border-2 border-white/20 flex justify-center p-1 group-hover:border-primary transition-colors">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-primary"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
