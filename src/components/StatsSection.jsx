import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tv, Sparkles, TrendingUp, ChevronRight, Activity } from 'lucide-react';

export default function StatsSection() {
  const [activeTab, setActiveTab] = useState('momentum'); // momentum | stats | play-by-play
  const [timeLeft, setTimeLeft] = useState(134); // 2:14 in seconds
  const [isPlaying, setIsPlaying] = useState(true);
  const [lalScore, setLalScore] = useState(112);
  const [bosScore, setBosScore] = useState(108);

  // Scoreboard ticking timer loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        
        // Randomly simulate scores increasing occasionally!
        if (Math.random() > 0.88) {
          if (Math.random() > 0.5) {
            setLalScore(s => s + (Math.random() > 0.6 ? 3 : 2));
          } else {
            setBosScore(s => s + (Math.random() > 0.6 ? 3 : 2));
          }
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const resetClock = () => {
    setTimeLeft(134);
    setLalScore(112);
    setBosScore(108);
    setIsPlaying(true);
  };

  const bgImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjTpDU-fAz5xfMNFdxt1eoNcjNA_V5MOTkRJQyG8aXEPF8WmfTmTi32fRDf1eKQvvmrMXTW3FwsXnPgtKXIDQwAnX7Mo9Ex2HbhR5OkKKRgyZcvY28v39DdzmnkjNrzeKU5fRyBBmt8oLQRxYy1gW0My_7PvVxhhp2juncJ8PgVXMHtQusK3c0wkEh8B0pAude8H645LQAneBra1PXoHrsaXejg9tZpGuexXSKXX6-eRI8qzDaGbrPCoAZ9tjpvGdwLAQnoxRlEg";

  return (
    <section className="py-20 flex flex-col gap-8 w-full px-6 md:px-16">
      
      {/* Dynamic Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-2xl text-on-surface flex items-center gap-3 font-semibold uppercase tracking-tight">
          <span className="w-2 h-6 bg-primary rounded-full" />
          Live Arena Dashboard
        </h3>
        
        <button 
          onClick={resetClock}
          className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group"
        >
          RESET MATCH SIMULATOR 
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Scoreboard Banner card */}
      <div 
        className="relative w-full rounded-2xl overflow-hidden glass-panel rim-light-orange p-1 bg-cover bg-center transition-all duration-500 shadow-2xl"
        style={{ backgroundImage: `url(${bgImgUrl})`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(19, 19, 19, 0.85)' }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-8 md:p-12 gap-8">
          
          {/* Home Team (Lakers - LAL) */}
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel flex items-center justify-center border border-secondary/20 shadow-[0_0_30px_rgba(233,195,73,0.1)] hover:border-secondary/60 hover:shadow-[0_0_35px_rgba(233,195,73,0.3)] transition-all duration-300 relative"
            >
              <span className="font-display-lg text-4xl md:text-5xl text-secondary font-extrabold tracking-tighter glow-text-gold">LAL</span>
            </motion.div>
            <div className="text-center">
              <h2 className="font-headline-md text-lg text-on-surface tracking-wide group-hover:text-secondary transition-colors duration-300 font-bold">LAKERS</h2>
              <p className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase mt-0.5">HOME (3-2)</p>
            </div>
          </div>

          {/* Clock, Live Score and Indicators */}
          <div className="flex flex-col items-center justify-center text-center">
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 mb-3 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full cursor-pointer hover:bg-primary/20 transition-all select-none"
            >
              <span className={`w-2 h-2 rounded-full bg-primary ${isPlaying ? 'live-indicator-ripple' : ''}`} />
              <span className="font-label-caps text-[10px] text-primary tracking-widest font-bold">
                {isPlaying ? 'LIVE - Q4' : 'PAUSED - Q4'}
              </span>
            </div>
            
            <div className="flex items-center gap-6 md:gap-12 select-none">
              <span className="font-display-lg text-6xl md:text-8xl leading-none text-on-surface font-extrabold tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {lalScore}
              </span>
              <span className="font-headline-xl text-3xl text-outline-variant">-</span>
              <span className="font-display-lg text-6xl md:text-8xl leading-none text-on-surface font-extrabold tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {bosScore}
              </span>
            </div>
            
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-6 glass-panel px-6 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,218,243,0.1)] hover:border-tertiary/50 transition-colors cursor-pointer select-none"
            >
              <span className="font-label-mono text-lg text-tertiary font-bold tracking-widest">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Away Team (Celtics - BOS) */}
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 relative"
            >
              <span className="font-display-lg text-4xl md:text-5xl text-emerald-400 font-extrabold tracking-tighter">BOS</span>
            </motion.div>
            <div className="text-center">
              <h2 className="font-headline-md text-lg text-on-surface tracking-wide group-hover:text-emerald-400 transition-colors duration-300 font-bold">CELTICS</h2>
              <p className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase mt-0.5">AWAY (2-3)</p>
            </div>
          </div>

        </div>

        {/* Scoreboard Bottom Stats Row */}
        <div className="relative z-10 border-t border-white/5 bg-black/45 backdrop-blur-md px-6 md:px-8 py-3.5 flex overflow-x-auto custom-scrollbar justify-between items-center font-label-caps text-[10px] text-on-surface-variant gap-8">
          <div className="flex gap-8 flex-shrink-0">
            <span>FG%: <strong className="text-on-surface font-bold">48.5</strong></span>
            <span>3PT%: <strong className="text-on-surface font-bold">35.2</strong></span>
            <span>TIMEOUTS: <strong className="text-secondary font-bold">1</strong></span>
          </div>
          
          <div className="flex gap-1.5 items-center flex-shrink-0">
            <Tv size={12} className="text-primary" />
            <span className="tracking-widest">NETWORK: ABC</span>
          </div>
          
          <div className="flex gap-8 flex-shrink-0">
            <span>FG%: <strong className="text-on-surface font-bold">46.1</strong></span>
            <span>3PT%: <strong className="text-on-surface font-bold">38.9</strong></span>
            <span>TIMEOUTS: <strong className="text-emerald-400 font-bold">2</strong></span>
          </div>
        </div>

      </div>

      {/* Bento Grid Stats Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        
        {/* Navigation tabs inside widget */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl flex flex-col justify-between min-h-[360px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-6 font-label-caps text-xs">
              <button 
                onClick={() => setActiveTab('momentum')}
                className={`py-2 px-1 relative transition-colors ${activeTab === 'momentum' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                TEAM MOMENTUM
                {activeTab === 'momentum' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(255,182,147,0.8)]" />}
              </button>
              
              <button 
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 relative transition-colors ${activeTab === 'stats' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                ARENA STATS
                {activeTab === 'stats' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(255,182,147,0.8)]" />}
              </button>
            </div>
            
            <span className="flex items-center gap-1.5 font-label-mono text-[9px] text-tertiary">
              <Activity size={10} className="animate-pulse" />
              LIVE DATA STREAM
            </span>
          </div>

          {/* Render Tab Content */}
          <div className="flex-1 flex flex-col justify-center">
            
            {activeTab === 'momentum' && (
              <div className="space-y-6">
                <p className="font-body-lg text-xs text-on-surface-variant mb-4">
                  Match performance index over elapsed quarters. Higher peaks signify scoring bursts.
                </p>
                
                {/* SVG Momentum Chart */}
                <div className="relative w-full h-32 bg-surface-container-high/40 rounded border border-white/5 p-1">
                  <svg viewBox="0 0 600 120" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="lakersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e9c349" stopOpacity="0.45"/>
                        <stop offset="100%" stopColor="#e9c349" stopOpacity="0.0"/>
                      </linearGradient>
                      <linearGradient id="celticsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Grid Lines */}
                    <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="150" y1="0" x2="150" y2="120" stroke="rgba(255,255,255,0.04)" />
                    <line x1="300" y1="0" x2="300" y2="120" stroke="rgba(255,255,255,0.04)" />
                    <line x1="450" y1="0" x2="450" y2="120" stroke="rgba(255,255,255,0.04)" />
                    
                    {/* Lakers momentum Area path */}
                    <path
                      d="M 0 60 Q 40 20 80 40 T 160 30 T 240 80 T 320 20 T 400 45 T 480 30 T 560 10 L 600 25 L 600 60 Z"
                      fill="url(#lakersGrad)"
                      stroke="#e9c349"
                      strokeWidth="2"
                    />
                    
                    {/* Celtics momentum Area path */}
                    <path
                      d="M 0 60 Q 30 80 60 70 T 120 90 T 180 50 T 260 75 T 340 95 T 420 50 T 500 85 T 560 65 L 600 80 L 600 60 Z"
                      fill="url(#celticsGrad)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    
                    {/* Ticking Time cursor line */}
                    <line x1="510" y1="0" x2="510" y2="120" stroke="#ffb693" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
                    <circle cx="510" cy="52" r="3" fill="#ffb693" />
                  </svg>
                </div>
                
                <div className="flex justify-between font-label-mono text-[9px] text-on-surface-variant tracking-wider">
                  <span>Q1 (0-12m)</span>
                  <span>Q2 (12-24m)</span>
                  <span>Q3 (24-36m)</span>
                  <span className="text-primary font-bold">Q4 (LIVE - 09:46 remaining)</span>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
                {/* Lakers Team stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <span className="w-1.5 h-3 bg-secondary rounded-full" />
                    <h4 className="font-label-caps text-xs text-secondary font-bold">LAKERS MATRIX</h4>
                  </div>
                  <div className="space-y-3 font-label-mono text-[10px] text-on-surface-variant">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>FAST BREAK POINTS (18)</span>
                        <span className="text-on-surface">75%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[75%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>PAINT SHOOTING (32/44)</span>
                        <span className="text-on-surface">72%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[72%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>FREE THROWS (15/18)</span>
                        <span className="text-on-surface">83%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[83%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Celtics Team stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-full" />
                    <h4 className="font-label-caps text-xs text-emerald-400 font-bold">CELTICS MATRIX</h4>
                  </div>
                  <div className="space-y-3 font-label-mono text-[10px] text-on-surface-variant">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>FAST BREAK POINTS (12)</span>
                        <span className="text-on-surface">50%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[50%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>PAINT SHOOTING (24/38)</span>
                        <span className="text-on-surface">63%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[63%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>FREE THROWS (22/24)</span>
                        <span className="text-on-surface">91%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[91%] rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Live Broadcast Feed HUD Widget (Right column) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 blur-2xl rounded-full pointer-events-none" />
          
          <div className="space-y-4">
            <span className="font-label-caps text-[9px] text-tertiary px-2 py-0.5 bg-tertiary/10 border border-tertiary/20 rounded-full tracking-widest inline-block font-bold">
              BROADCAST LOG
            </span>
            
            <h4 className="font-headline-md text-base text-on-surface font-semibold tracking-tight uppercase">Live Commentary</h4>
            
            <div className="space-y-4 overflow-y-auto max-h-[200px] custom-scrollbar font-body-md text-xs text-on-surface-variant pr-1">
              <div className="border-l border-primary/40 pl-3 py-0.5">
                <span className="font-label-mono text-[9px] text-primary font-bold">Q4 02:14</span>
                <p className="mt-0.5 text-on-surface">Lakers call timeout. Play stops as LeBron drives to the basket.</p>
              </div>
              <div className="border-l border-white/10 pl-3 py-0.5">
                <span className="font-label-mono text-[9px] text-on-surface-variant">Q4 02:35</span>
                <p className="mt-0.5">Tatum sinks a step-back three! Celtics trail by 4 points.</p>
              </div>
              <div className="border-l border-white/10 pl-3 py-0.5">
                <span className="font-label-mono text-[9px] text-on-surface-variant">Q4 03:02</span>
                <p className="mt-0.5">Davis block on Jaylen Brown in the paint. Loose ball recovered by Lakers.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-label-mono">
            <span className="text-on-surface-variant">ABC DIRECT FEED</span>
            <span className="text-primary animate-pulse font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              FEED ONLINE
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
