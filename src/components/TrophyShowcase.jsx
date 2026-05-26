import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function TrophyShowcase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => console.log(e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Avoid triggering play/pause toggle
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const fallbackTrophyUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Nl8uj6L7dV4EgkMCfhaes9UZlKr1CIr5jFSWefCnmIRK0VAikox-IfM_YGOKo8cHfn4UplreL6HLkZaMjwd27YbHVVym_MCMlKIHiVfgk11vdCyMRJOvq4aFKY21dF5jvDfhInev0JunMcavwSKBl4olM9d-QTS8KkOdr75fP0rZZF261PHq-XCtnEOOGcF4E5OchmcauhmXct8a1nYJadHO8dvPwFZjzjZwUF3_H7KUaLJ8J7yAKeHPvDFD2kDzZO-vywg3GEw";

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-surface-container-lowest border-y border-white/5">
      {/* Golden spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-container/5 to-surface-container-lowest pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl opacity-50 pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Narrative Content (Left column) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="font-label-caps text-xs text-secondary mb-4 flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary-container/20 rounded-full">
              <Trophy size={14} className="text-secondary" />
              ULTIMATE PRIZE
            </span>
            
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter metallic-gold-text leading-[1.1] mb-6 font-bold">
              CHAMPIONSHIP <br /> GLORY
            </h2>
            
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-md mb-8 leading-relaxed">
              The Larry O'Brien Championship Trophy represents the pinnacle of basketball legacy. Watch it gleam in pristine CGI resolution, ready to crown the next dynasty.
            </p>
            
            <button className="flex items-center gap-2 px-8 py-4 border border-secondary text-secondary rounded font-label-caps text-xs tracking-wider hover:bg-secondary/10 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(233,195,73,0.05)] font-bold">
              VIEW FINALS HISTORY
              <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Interactive Pedestal Video Centerpiece (Right column) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center relative group"
          >
            {/* Ambient gold glow under the base pedestal */}
            <div className="absolute bottom-0 w-[280px] h-[50px] bg-secondary/25 blur-3xl rounded-full pointer-events-none transition-all duration-500 group-hover:bg-secondary/40" />

            {/* Pedestal Box */}
            <div 
              onClick={togglePlay}
              className="relative w-full max-w-[360px] aspect-[3/4] bg-surface/20 rounded-t-3xl border-t border-x border-secondary/25 backdrop-blur-md flex items-end justify-center overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:border-secondary/50 rim-light-gold"
            >
              {/* Championship Video */}
              {!videoError ? (
                <video
                  ref={videoRef}
                  src="/Assets/cup vdo.mp4"
                  className="w-full h-full object-cover object-center mix-blend-screen opacity-90 transition-all duration-500 group-hover:scale-102"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onError={() => setVideoError(true)}
                />
              ) : (
                /* Fallback Image if video is not supported/found */
                <img 
                  alt="Championship Trophy Fallback" 
                  className="w-full h-full object-cover object-center mix-blend-screen opacity-90 transition-all duration-500 group-hover:scale-105"
                  src={fallbackTrophyUrl}
                />
              )}

              {/* Pedestal Shadow bottom cut off */}
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none z-10" />
              
              {/* Pedestal bottom thin golden line */}
              <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-80 shadow-[0_0_20px_#e9c349] z-20" />

              {/* Hover Interaction Overlays */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-background/60 backdrop-blur-md border border-secondary/40 flex items-center justify-center text-secondary shadow-[0_0_25px_rgba(233,195,73,0.3)]">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                </div>
              </div>

              {/* Mute/Unmute audio button (bottom right) */}
              {!videoError && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-30 p-2.5 rounded-full bg-background/50 hover:bg-background/80 text-on-surface-variant hover:text-white transition-all duration-300 border border-white/5"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
