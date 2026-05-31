import React from 'react';
import { Menu, Bell, User, Tv } from 'lucide-react';

export default function TopNavBar({ activeSection, scrollToSection, setSidebarOpen }) {
  const navItems = [
    { id: 'hero', label: 'LIVE' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'stats', label: 'STATS' },
    { id: 'players', label: 'ROSTER' },
    { id: 'trophy', label: 'TROPHY' },
    { id: 'legacy', label: 'LEGACY' },
    { id: 'highlights', label: 'HIGHLIGHTS' },
    { id: 'teams', label: 'TEAMS' }
  ];

  return (
    <nav className="bg-surface/10 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(255,182,147,0.1)] fixed top-0 w-full z-50 transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full">
        
        {/* Hamburger Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          
          <div 
            onClick={() => scrollToSection('hero')}
            className="font-display-lg text-headline-md tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary cursor-pointer hover:text-white transition-colors duration-300 uppercase select-none"
          >
            COURTSIDE ULTRA
          </div>
        </div>

        {/* Navigation Links (Desktop only, centered) */}
        <div className="hidden lg:flex items-center gap-6 font-label-caps text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-all duration-300 px-3 py-1 rounded tracking-widest relative ${
                activeSection === item.id 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(255,182,147,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollToSection('stats')}
            className="hidden sm:flex items-center gap-2 bg-primary text-on-primary font-label-caps text-[10px] tracking-wider px-6 py-2.5 rounded-full hover:bg-surface-tint transition-all duration-300 shadow-[0_0_15px_rgba(255,182,147,0.2)] active:scale-95 hover:scale-105"
          >
            <Tv size={14} className="animate-pulse" />
            WATCH LIVE
          </button>
          
          <div className="flex gap-2 text-on-surface-variant">
            <button className="hover:text-primary transition-colors duration-300 hover:bg-white/5 p-2 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container live-indicator-ripple" />
            </button>
            <button 
              onClick={() => scrollToSection('players')}
              className="hover:text-primary transition-colors duration-300 hover:bg-white/5 p-2 rounded-full"
            >
              <User size={20} />
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
