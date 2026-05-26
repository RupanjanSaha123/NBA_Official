import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, ShieldAlert, Award, Star } from 'lucide-react';

export default function PlayersSection() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    {
      id: 1,
      number: '00',
      firstName: 'MARCUS',
      lastName: 'VAUGHN',
      position: 'POINT GUARD',
      rating: 98,
      stats: { PPG: '32.4', APG: '11.2', RPG: '6.8' },
      tag: 'SEASON MVP',
      color: 'text-primary',
      borderColor: 'border-primary/20',
      bgGlow: 'from-primary/10',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVFRZGBw45xeEN4qS4U9WWloVJ6AaX1i_0DrN5hAtp-FUfA0EgcsmYhhKdH3m71GNeWWeJSE5tAK3qtIPVPy7FD5_KagIMBOTzGLXss60s4KShl9FWYjRbBK6ScXtUvTeW8XmJ78HYt4IXFCH8UGouEQu1CNTKlZ0Qo3HyKrBKxKAbIjkbO778Mvt6Zuxren1JO-OVNA-65_ru9RVbV8-70vb9gEKQsoHQfYs48DU0juKC1-q6k96hIV8aOKzUeoqeM9SSn8k7ryI'
    },
    {
      id: 2,
      number: '12',
      firstName: 'ELIAS',
      lastName: 'TRENT',
      position: 'SHOOTING GUARD',
      rating: 95,
      stats: { PPG: '28.1', APG: '4.2', RPG: '3.5' },
      tag: 'ALL-STAR',
      color: 'text-secondary',
      borderColor: 'border-secondary/20',
      bgGlow: 'from-secondary/10',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkF_8_NJyssSySMx18T1XMNGz6gPGKIkMVOi-d6RTVAwmcabhOgS7aPe5nKRfN78ilDJXEPo8eSBGHi9bTO_8rnX-Dtljvq_yvmqyIr-yMgtJyogqSIq5ltvpnAzxkAiN6H5M5rrftt7vrAB42DYqrOIm-AdRweLWFBi-eD4UDTxTCsbrnxV-QPghN16MDt7cTy2jFeR23o3NEJEoCG70pjkLdu98YmGG-g38BDw1AjzicMuUAXmTGhb49HoIi4THG-DSLlNvuLZo'
    },
    {
      id: 3,
      number: '24',
      firstName: 'DARIUS',
      lastName: 'KANE',
      position: 'POWER FORWARD',
      rating: 94,
      stats: { PPG: '21.3', APG: '2.5', RPG: '12.4' },
      tag: 'DPOY CANDIDATE',
      color: 'text-tertiary',
      borderColor: 'border-tertiary/20',
      bgGlow: 'from-tertiary/10',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8GBrlkLw1kzG6yP1XelRurKxIdxD6gSDfqD_Y2JBuiDhebnkUxS4Xs54TY6tanvVOfeJuIdUMEeeQ55gapzqgqCyAKVnKjXNDqjDTO4f29igETLKEO5UaUtd8BYVl-16h8DNoXBT6bmC7oa15oa65VDTTUt79ecTVThv8H1wLkdpnNTpyXV5rJC-2GtKlCgQhMePvADkBzNPt1EbF5YXvXtwfSQqx4d7mUXBNdlS8AreJMbpg8h1yzoEhPxaKPkFt3hq0mQoChdQ'
    }
  ];

  // Mouse hover 3D tilt handler
  const handleMouseMove = (e, playerId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates to -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    // Set rot angles (e.g. max 15 deg)
    const rotX = -yc * 18;
    const rotY = xc * 18;
    
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section className="py-20 flex flex-col gap-12 w-full px-6 md:px-16">
      
      {/* Header and Filter Option */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="font-label-caps text-xs text-primary mb-2 inline-block">LEAGUE ROTATION</span>
          <h2 className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
            FRANCHISE <span className="text-primary">ELITE</span>
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant mt-2 max-w-xl">
            Hover over player profiles to reveal dynamic stats matrices, isolated directly from active broadcasting streams.
          </p>
        </div>
      </div>

      {/* Roster grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {players.map((player) => (
          <div
            key={player.id}
            onMouseMove={(e) => handleMouseMove(e, player.id)}
            onMouseLeave={handleMouseLeave}
            className={`group relative rounded-xl overflow-hidden bg-surface-container-high border ${player.borderColor} shadow-2xl h-[520px] flex flex-col justify-end transition-all duration-300 ease-out cursor-pointer`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Dark gradient base overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10 pointer-events-none" />
            
            {/* Holographic sweep overlay */}
            <div className="absolute inset-0 holographic-glare z-20 pointer-events-none" />
            
            {/* Ambient player glow */}
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${player.bgGlow} to-transparent blur-3xl -z-10 rounded-full group-hover:scale-125 transition-transform duration-500`} />
            
            {/* Player Cutout image */}
            <img 
              alt={player.lastName}
              className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out z-0"
              src={player.img}
            />

            {/* Glowing rim top line */}
            <div className={`absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-current ${player.color} to-transparent opacity-60 z-30`} />

            {/* Visual Jersey Number backdrop */}
            <div 
              style={{ transform: 'translateZ(20px)' }}
              className="font-display-lg text-8xl text-surface-container-highest/25 absolute top-12 -left-2 z-10 select-none tracking-tighter font-extrabold"
            >
              {player.number}
            </div>

            {/* Info details panel */}
            <div 
              style={{ transform: 'translateZ(40px)' }}
              className="relative z-30 p-6 w-full select-none"
            >
              <div className="flex justify-between items-end">
                <div>
                  <span className={`font-label-caps text-[9px] ${player.color} tracking-widest font-bold`}>
                    {player.position}
                  </span>
                  <h3 className="font-display-lg text-2xl text-on-surface uppercase tracking-tight font-bold mt-1">
                    {player.firstName} <br />
                    <span className="text-primary">{player.lastName}</span>
                  </h3>
                </div>
                
                {/* Rating badge */}
                <div className="text-right">
                  <div className="font-display-lg text-4xl text-on-surface font-extrabold leading-none tracking-tighter">
                    {player.rating}
                  </div>
                  <div className="font-label-caps text-[8px] text-on-surface-variant tracking-wider mt-1">OVR RATING</div>
                </div>
              </div>

              {/* Stats drawer (reveals on card hover) */}
              <div className="h-0 opacity-0 group-hover:h-[68px] group-hover:opacity-100 group-hover:mt-6 pt-4 border-t border-white/10 flex justify-between transition-all duration-500 ease-out">
                {Object.entries(player.stats).map(([statName, val]) => (
                  <div key={statName}>
                    <div className="font-label-mono text-[9px] text-on-surface-variant">{statName}</div>
                    <div className="font-headline-md text-base text-on-surface font-bold mt-0.5">{val}</div>
                  </div>
                ))}
                
                {/* Visual HUD action icon */}
                <div className="self-end pb-1">
                  <span className={`p-2 bg-white/5 rounded-full border border-white/5 text-on-surface-variant hover:text-white transition-colors duration-200 inline-block`}>
                    <Activity size={14} />
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
