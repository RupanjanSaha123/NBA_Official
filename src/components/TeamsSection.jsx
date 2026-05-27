import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Dribbble } from 'lucide-react';

export default function TeamsSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    { id: 'lal', city: 'LOS ANGELES', name: 'LAKERS', short: 'LAL', division: 'PACIFIC', rank: '#3 West', color: 'group-hover:text-secondary', logo: '/Assets/lakers.jpg' },
    { id: 'gsw', city: 'GOLDEN STATE', name: 'WARRIORS', short: 'GSW', division: 'PACIFIC', rank: '#8 West', color: 'group-hover:text-amber-500', logo: '/Assets/warriors.jpg' },
    { id: 'bos', city: 'BOSTON', name: 'CELTICS', short: 'BOS', division: 'ATLANTIC', rank: '#1 East', color: 'group-hover:text-emerald-400', logo: '/Assets/boston Celtics.jpg' },
    { id: 'mia', city: 'MIAMI', name: 'HEAT', short: 'MIA', division: 'SOUTHEAST', rank: '#5 East', color: 'group-hover:text-red-500', logo: '/Assets/miami Heats.jpg' },
    { id: 'chi', city: 'CHICAGO', name: 'BULLS', short: 'CHI', division: 'CENTRAL', rank: '#9 East', color: 'group-hover:text-red-600', logo: '/Assets/bulls.jpg' },
    { id: 'nyk', city: 'NEW YORK', name: 'KNICKS', short: 'NYK', division: 'ATLANTIC', rank: '#2 East', color: 'group-hover:text-orange-500', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/New_York_Knicks_logo.svg' },
    { id: 'phx', city: 'PHOENIX', name: 'SUNS', short: 'PHX', division: 'PACIFIC', rank: '#6 West', color: 'group-hover:text-orange-400', logo: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg' },
    { id: 'mil', city: 'MILWAUKEE', name: 'BUCKS', short: 'MIL', division: 'CENTRAL', rank: '#3 East', color: 'group-hover:text-green-500', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Milwaukee_Bucks_logo.svg' }
  ];

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 flex flex-col gap-10 w-full px-6 md:px-16">
      
      {/* Title & Search bar Row */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <span className="font-label-caps text-xs text-primary mb-2 inline-block">FRANCHISE SEARCH</span>
          <h2 className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
            TEAM DIRECTORY
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant mt-2 max-w-xl">
            Access team rosters, division alignments, current season standings, and stats matrices.
          </p>
        </div>
        
        {/* Search Input Widget */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest/80 border border-white/10 text-on-surface pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-body-md text-sm rounded bg-transparent rim-light-orange"
            placeholder="Search teams (e.g. Lakers)..."
          />
        </div>
      </div>

      {/* Grid of Team Cards */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team, index) => (
            <motion.a
              href="#"
              key={team.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, borderColor: 'rgba(255, 182, 147, 0.4)' }}
              className="aspect-square bg-surface-container-lowest border border-white/5 rounded-xl flex flex-col items-center justify-center p-6 group transition-all duration-300 relative overflow-hidden jersey-texture shadow-lg"
            >
              {/* Card bottom shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/90 z-0 pointer-events-none" />
              
              {/* Holographic rim top glow */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

              {/* Central team logo / icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center mb-4 z-10 group-hover:scale-108 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_24px_rgba(255,182,147,0.25)] border border-white/10 overflow-hidden p-2.5">
                {team.logo ? (
                  <img 
                    src={team.logo} 
                    alt={`${team.name} Logo`} 
                    className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-300"
                  />
                ) : (
                  <Dribbble size={40} className={`text-on-surface-variant transition-colors duration-300 ${team.color}`} />
                )}
              </div>

              {/* Team Information */}
              <div className="z-10 text-center relative select-none">
                <p className="font-label-caps text-[9px] text-on-surface-variant group-hover:text-primary transition-colors tracking-widest font-bold">
                  {team.city}
                </p>
                <h3 className="font-display-lg text-lg md:text-xl text-on-surface mt-1 font-bold leading-none tracking-tight">
                  {team.name}
                </h3>
                
                {/* Division alignment & Standings snippet */}
                <div className="mt-3 flex gap-2 justify-center font-label-mono text-[9px] text-on-surface-variant border-t border-white/5 pt-2">
                  <span>{team.division}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-primary font-bold">{team.rank}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-xl border border-white/5">
          <p className="font-body-lg text-base text-on-surface-variant">No franchises match your search query.</p>
        </div>
      )}

    </section>
  );
}
