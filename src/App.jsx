import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { io } from 'socket.io-client';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import TrophyShowcase from './components/TrophyShowcase';
import StatsSection from './components/StatsSection';
import PlayersSection from './components/PlayersSection';
import TeamsSection from './components/TeamsSection';
import HighlightsSection from './components/HighlightsSection';
import LegacySection from './components/LegacySection';


export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cursorGlowRef = useRef(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://127.0.0.1:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Scroll progress for the side indicator track
  const { scrollYProgress } = useScroll();
  const sideBallY = useTransform(scrollYProgress, [0, 1], ["0%", "96%"]);
  const sideBallRotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    // Clear margins for sticky top nav
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setActiveSection(id);
  };

  // Mouse-tracking global spotlight glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
        cursorGlowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.opacity = '0';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const sections = ['hero', 'experience', 'stats', 'players', 'trophy', 'legacy', 'highlights', 'teams'];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => {
      observers.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-on-surface flex flex-col font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-white">
      
      {/* Interactive mouse following cursor glow */}
      <div 
        ref={cursorGlowRef}
        className="fixed w-[360px] h-[360px] rounded-full bg-radial from-primary/8 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] opacity-0 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255, 182, 147, 0.06) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Premium Scroll progress indicator with rotating 3D basketball */}
      <div className="fixed right-6 top-1/4 bottom-1/4 w-8 z-[9999] pointer-events-none hidden xl:flex flex-col items-center">
        {/* Track Line */}
        <div className="w-[1.5px] h-full bg-white/5 rounded-full relative">
          {/* Active Progress glow */}
          <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-tertiary rounded-full origin-top shadow-[0_0_8px_rgba(255,107,0,0.3)]"
          />
          
          {/* Scroll progress text rotated vertically */}
          <div className="absolute right-4 top-0 font-label-mono text-[8px] text-on-surface-variant tracking-[0.2em] origin-top-right rotate-90 select-none opacity-40 whitespace-nowrap">
            COURTSIDE STANDINGS
          </div>
          
          {/* Travelling rotating 3D basketball */}
          <motion.div 
            style={{ y: sideBallY, rotate: sideBallRotate }}
            className="absolute -left-[11px] w-6 h-6 rounded-full shadow-[0_0_12px_rgba(255,107,0,0.6)] border border-primary/40 bg-black overflow-hidden"
          >
            <img 
              src="/Assets/basketball.png" 
              alt="Scroll progress basketball" 
              className="w-full h-full object-cover"
            />
            {/* Shading to make the miniature ball look 3D */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.95) 100%)',
                mixBlendMode: 'multiply'
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Top Navbar */}
      <TopNavBar activeSection={activeSection} scrollToSection={scrollToSection} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-row">
        
        {/* Side Navigation bar drawer */}
        <SideNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeSection={activeSection} scrollToSection={scrollToSection} />
        
        {/* Main Content scroll window */}
        <main className="flex-1 min-w-0 flex flex-col relative min-h-screen pt-16">
          
          {/* Section 1: Hero landing page */}
          <div id="hero" className="scroll-mt-20">
            <HeroSection scrollToSection={scrollToSection} />
          </div>

          {/* Section 2: Experience overview and immersive features */}
          <div id="experience" className="scroll-mt-20 border-t border-white/5 bg-black/10">
            <ExperienceSection />
          </div>

          {/* Section 3: Scoreboard & Live stats dashboard */}
          <div id="stats" className="scroll-mt-20 border-t border-white/5 bg-black/10">
            <StatsSection socket={socket} />
          </div>

          {/* Section 3: Featured Roster Players */}
          <div id="players" className="scroll-mt-20 border-t border-white/5">
            <PlayersSection />
          </div>

          {/* Section 4: Championship Video Trophy pedestal */}
          <div id="trophy" className="scroll-mt-20">
            <TrophyShowcase />
          </div>

          {/* Section: NBA Legends Legacy history gallery */}
          <div id="legacy" className="scroll-mt-20 border-t border-white/5 bg-black/5">
            <LegacySection />
          </div>

          {/* Section 5: Highlights Carousel */}
          <div id="highlights" className="scroll-mt-20 border-t border-white/5 bg-black/10">
            <HighlightsSection />
          </div>

          {/* Section 6: Teams Grid */}
          <div id="teams" className="scroll-mt-20 border-t border-white/5">
            <TeamsSection />
          </div>

          {/* Unified Footer */}
          <footer className="w-full py-10 bg-surface-container-lowest border-t border-outline-variant mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 gap-8 w-full select-none">
              <div 
                onClick={() => scrollToSection('hero')}
                className="font-display-lg text-lg text-on-surface cursor-pointer hover:text-primary transition-colors duration-300 font-bold uppercase tracking-tight"
              >
                COURTSIDE ULTRA
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-label-mono text-[10px] text-outline">
                <a className="hover:text-on-surface hover:underline transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-on-surface hover:underline transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-on-surface hover:underline transition-colors" href="#">Cookie Settings</a>
                <a className="hover:text-on-surface hover:underline transition-colors" href="#">Support</a>
              </div>
              
              <div className="font-label-mono text-[10px] text-outline">
                © 2026 COURTSIDE ULTRA. ALL RIGHTS RESERVED.
              </div>
            </div>
          </footer>

        </main>
      </div>

    </div>
  );
}
