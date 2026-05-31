import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Play } from 'lucide-react';

export default function HeroSection({ scrollToSection }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Scroll-linked transformations for million-dollar fade & parallax
  const { scrollY } = useScroll();
  const heroTextOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroTextY = useTransform(scrollY, [0, 450], [0, -60]);
  const heroTextScale = useTransform(scrollY, [0, 450], [1, 0.94]);

  // Million-dollar scroll travel: ball leaves its box, shrinks, spins, and rolls down the page!
  const ballScrollY = useTransform(scrollY, [0, 1500], [0, 1600]); 
  const ballScrollScale = useTransform(scrollY, [0, 1500], [1, 0.35]); 
  const ballScrollRotate = useTransform(scrollY, [0, 1500], [0, 720]); 
  const ballScrollOpacity = useTransform(scrollY, [0, 400, 1500], [1, 1, 0]); 

  // Entrance animations for premium website start
  const badgeVariants = {
    hidden: { opacity: 0, y: -25, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 14, delay: 0.25 } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 55, rotateX: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.45 } 
    }
  };

  const descVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: "easeOut", delay: 0.65 } 
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.85 } 
    }
  };

  const quickStatsVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.55, ease: "easeOut", delay: 1.05 } 
    }
  };

  const ballEntranceVariants = {
    hidden: { scale: 0.25, rotate: -60, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 13, delay: 0.35 } 
    }
  };

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
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32"
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

      <div className="w-full h-full flex flex-col justify-center px-6 md:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[650px]">
          
          {/* Typography & Call-To-Action (Left column) */}
          <motion.div 
            style={{ x: textX, y: textY }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 relative"
          >
            {/* Scroll-linked animation wrapper */}
            <motion.div 
              style={{ opacity: heroTextOpacity, y: heroTextY, scale: heroTextScale }}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-8"
            >
              {/* Spotlight rim vertical line */}
              <div className="absolute -left-6 top-0 w-[2px] h-32 bg-gradient-to-b from-primary to-transparent opacity-60 blur-[1px]" />
              
              <div className="space-y-4">
                <motion.span 
                  variants={badgeVariants}
                  className="inline-block px-4 py-1.5 rounded bg-surface/30 border border-white/5 backdrop-blur-md font-label-caps text-xs text-secondary rim-light-gold"
                >
                  SEASON 2024 NOW LIVE
                </motion.span>
                
                <motion.h1 
                  variants={titleVariants}
                  style={{ transformPerspective: 1200 }}
                  className="font-display-lg text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.02] drop-shadow-2xl"
                >
                  ENTER THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-primary to-secondary glow-text-orange font-black">
                    NBA UNIVERSE
                  </span>
                </motion.h1>
                
                <motion.p 
                  variants={descVariants}
                  className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xl"
                >
                  Experience the game through next-gen analytics, live tracking dashboard, and holographic rosters. Step onto the courtside in ultra-premium detail.
                </motion.p>
              </div>

              <motion.div 
                variants={ctaVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
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
              </motion.div>

              {/* Quick Stats snippet banner */}
              <motion.div 
                variants={quickStatsVariants}
                className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5 w-full max-w-md"
              >
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive 3D center object (Right column) */}
          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 relative min-h-[400px]">
            {/* Ambient circle glow behind ball */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-primary-container/10 to-secondary/5 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
            
            {/* 3D Container (Stays fixed in layout) */}
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[420px] aspect-square group cursor-pointer z-30"
            >
              {/* Traveling Scrollable Basketball Wrapper (Moves on scroll) */}
              <motion.div
                style={{ 
                  opacity: ballScrollOpacity, 
                  scale: ballScrollScale, 
                  y: ballScrollY,
                  rotate: ballScrollRotate
                }}
                className="absolute inset-0 z-10 select-none pointer-events-none"
              >
                {/* The Basketball Centerpiece */}
              <motion.div
                variants={ballEntranceVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full h-full rounded-full shadow-[0_0_80px_rgba(255,107,0,0.25)] border border-primary/20 overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-[#330a00]" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.4),transparent_25%)] mix-blend-screen" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_65%,rgba(255,182,147,0.18),transparent_25%)]" />
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  <div className="absolute inset-x-16 top-1/3 h-1 rounded-full bg-black/20" />
                  <div className="absolute inset-y-16 left-1/3 w-1 rounded-full bg-black/20" />
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                </div>
              </motion.div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay z-20 pointer-events-none" />
              </motion.div>

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

        {/* Modern Sleek Scroll Down Indicator */}
        <div className="flex justify-center pt-8 md:pt-16">
          <button 
            onClick={() => scrollToSection('stats')}
            className="flex flex-col items-center group relative text-on-surface-variant hover:text-primary transition-all duration-300"
          >
            {/* Animated glowing vertical line */}
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/10 via-primary/40 to-transparent relative overflow-hidden group-hover:h-16 transition-all duration-500">
              <motion.div 
                animate={{ y: [-48, 48] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-primary to-transparent"
              />
            </div>
            
            <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase mt-3 transition-all duration-300 group-hover:tracking-[0.35em] group-hover:text-primary font-semibold opacity-70 group-hover:opacity-100 select-none">
              SCROLL DOWN
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
