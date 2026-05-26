import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Crown, Calendar, Sparkles, BookOpen, Star, X, ChevronRight } from 'lucide-react';

export default function LegacySection() {
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedLegend, setSelectedLegend] = useState(null);

  const eras = [
    { id: 'all', label: 'ALL ERAS' },
    { id: '80s', label: '80S SHOWTIME' },
    { id: '90s', label: '90S DYNASTIES' },
    { id: '00s', label: '00S ICONS' },
    { id: '10s', label: '10S CHAMPIONS' }
  ];

  const legends = [
    {
      id: 'mj',
      name: 'Michael Jordan',
      nickname: 'THE G.O.A.T.',
      team: 'Chicago Bulls',
      era: '90s',
      years: '1984 - 2003',
      jersey: '23',
      careerStats: { PPG: '30.1', RPG: '6.2', APG: '5.3', BPG: '0.8' },
      accolades: [
        '6x NBA Champion',
        '6x Finals MVP',
        '5x Regular Season MVP',
        '10x NBA Scoring Leader',
        '14x All-Star',
        'Hall of Fame (2009)'
      ],
      description: 'Widely considered the greatest basketball player of all time. Jordan dominated the 90s with two separate championship three-peats, redefining global sports marketing and broadcast aesthetics with his gravity-defying playstyle.',
      signaturePlay: 'The Last Shot (1998 Finals Game 6 vs Utah Jazz)',
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'kobe',
      name: 'Kobe Bryant',
      nickname: 'THE BLACK MAMBA',
      team: 'Los Angeles Lakers',
      era: '00s',
      years: '1996 - 2016',
      jersey: '24',
      careerStats: { PPG: '25.0', RPG: '5.2', APG: '4.7', SPG: '1.4' },
      accolades: [
        '5x NBA Champion',
        '2x Finals MVP',
        '1x Regular Season MVP',
        '18x All-Star',
        '4x All-Star Game MVP',
        'Hall of Fame (2020)'
      ],
      description: 'Known for his legendary "Mamba Mentality," Kobe spent his entire 20-year career with the Lakers. He was a ferocious scorer, elite defender, and the closest successor to Michael Jordan in playstyle and intensity.',
      signaturePlay: '81-Point Game vs Toronto Raptors (2006)',
      img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'lebron',
      name: 'LeBron James',
      nickname: 'THE KING',
      team: 'LA Lakers / Miami Heat',
      era: '10s',
      years: '2003 - Present',
      jersey: '23',
      careerStats: { PPG: '27.1', RPG: '7.5', APG: '7.4', SPG: '1.5' },
      accolades: [
        '4x NBA Champion',
        '4x Finals MVP',
        '4x Regular Season MVP',
        'NBA All-Time Leading Scorer',
        '20x All-Star Selection',
        '20x All-NBA Selection'
      ],
      description: 'A combination of size, speed, and basketball intellect. LeBron has dominated three decades, carrying franchises to ten Finals appearances and establishing himself as the ultimate statistical marvel in league history.',
      signaturePlay: 'The Block - Game 7 Finals vs Golden State (2016)',
      img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'shaq',
      name: "Shaquille O'Neal",
      nickname: 'THE DIESEL',
      team: 'LA Lakers / Orlando Magic',
      era: '00s',
      years: '1992 - 2011',
      jersey: '34',
      careerStats: { PPG: '23.7', RPG: '10.9', APG: '2.5', BPG: '2.3' },
      accolades: [
        '4x NBA Champion',
        '3x Finals MVP',
        '1x Regular Season MVP',
        '15x All-Star Selection',
        '2x Scoring Champion',
        'Hall of Fame (2016)'
      ],
      description: 'The most physically dominant force in modern NBA history. Shaq anchors the early 2000s Lakers dynasty with three consecutive Finals MVPs, literally shattering backboards and defensive gameplans alike.',
      signaturePlay: 'Alley-Oop from Kobe Bryant (2000 WCF Game 7 vs Blazers)',
      img: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'magic',
      name: 'Magic Johnson',
      nickname: 'SHOWTIME',
      team: 'Los Angeles Lakers',
      era: '80s',
      years: '1979 - 1996',
      jersey: '32',
      careerStats: { PPG: '19.5', RPG: '7.2', APG: '11.2', SPG: '1.9' },
      accolades: [
        '5x NBA Champion',
        '3x Finals MVP',
        '3x Regular Season MVP',
        '9x All-NBA First Team',
        '12x All-Star Selection',
        'Hall of Fame (2002)'
      ],
      description: 'The standard for playmaking. Magic led the fast-paced "Showtime" Lakers of the 80s, creating flashy, high-stakes broadcast drama and winning a Finals MVP in his rookie year starting at center.',
      signaturePlay: 'Baby Hook in the paint vs Celtics (1987 Finals Game 4)',
      img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'kareem',
      name: 'Kareem Abdul-Jabbar',
      nickname: 'THE CAPTAIN',
      team: 'Bucks / LA Lakers',
      era: '80s',
      years: '1969 - 1989',
      jersey: '33',
      careerStats: { PPG: '24.6', RPG: '11.2', APG: '3.6', BPG: '2.6' },
      accolades: [
        '6x NBA Champion',
        '2x Finals MVP',
        '6x Regular Season MVP',
        '19x All-Star Selection',
        'All-Time MVP Record Holder',
        'Hall of Fame (1995)'
      ],
      description: 'A master of durability and accuracy. Kareem dominated over two decades with his unblockable "Skyhook" shot, retiring as the league\'s leading scorer and capturing an unmatched 6 MVP trophies.',
      signaturePlay: 'The Skyhook shot',
      img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const filteredLegends = selectedEra === 'all'
    ? legends
    : legends.filter(legend => legend.era === selectedEra);

  // Card 3D hover tilt logic
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    const rotX = -yc * 15;
    const rotY = xc * 15;
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
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <span className="font-label-caps text-xs text-secondary mb-2 inline-block flex items-center gap-1.5">
            <Crown size={14} className="text-secondary" />
            HISTORIC GALLERY
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
            NBA <span className="text-secondary">LEGENDS</span> & LEGACIES
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant mt-2 max-w-xl">
            Explore the historical icons, dynasties, and career-defining plays that built the foundations of professional basketball.
          </p>
        </div>
        
        {/* Era Filters */}
        <div className="flex flex-wrap gap-2 font-label-caps text-[10px]">
          {eras.map(era => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-4 py-2 rounded tracking-widest border transition-all duration-300 ${
                selectedEra === era.id
                  ? 'bg-secondary text-black border-secondary font-bold shadow-[0_0_15px_rgba(233,195,73,0.25)]'
                  : 'bg-transparent border-white/10 text-on-surface-variant hover:text-white hover:border-white/20'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Legends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLegends.map((legend) => (
          <motion.div
            key={legend.id}
            layoutId={`card-${legend.id}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedLegend(legend)}
            className="group relative rounded-xl overflow-hidden bg-surface-container-low border border-white/5 shadow-xl h-[420px] flex flex-col justify-end transition-all duration-300 ease-out cursor-pointer rim-light-gold"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Visual gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 holographic-glare z-20 pointer-events-none" />
            
            {/* Background image */}
            <img
              alt={legend.name}
              className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-luminosity opacity-40 group-hover:scale-[1.04] group-hover:opacity-60 transition-all duration-700 ease-out z-0"
              src={legend.img}
            />

            {/* Jersey number */}
            <div className="absolute top-6 left-6 font-display-lg text-6xl text-white/5 group-hover:text-white/10 transition-colors select-none font-extrabold tracking-tighter">
              #{legend.jersey}
            </div>

            {/* Accolade floating crown icon */}
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-secondary z-20 group-hover:scale-110 transition-transform">
              <Crown size={16} />
            </div>

            {/* Content Details */}
            <div className="relative z-30 p-6 select-none" style={{ transform: 'translateZ(30px)' }}>
              <span className="font-label-caps text-[9px] text-secondary tracking-widest font-bold">
                {legend.nickname}
              </span>
              <h3 className="font-display-lg text-2xl text-on-surface uppercase font-bold mt-1 tracking-tight">
                {legend.name}
              </h3>
              
              <div className="mt-4 flex gap-4 font-label-mono text-[9px] text-on-surface-variant border-t border-white/10 pt-4">
                <span>{legend.team}</span>
                <span>•</span>
                <span>{legend.years}</span>
              </div>
              
              {/* Highlight accolade snippets */}
              <div className="mt-3 overflow-hidden h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between text-[10px] text-secondary">
                <span className="flex items-center gap-1.5">
                  <Award size={12} />
                  {legend.accolades[0]}
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant">
                  Accolades
                  <ChevronRight size={10} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Gallery Accolade Modal */}
      <AnimatePresence>
        {selectedLegend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLegend(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Content Panel */}
            <motion.div
              layoutId={`card-${selectedLegend.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest border border-secondary/25 rounded-2xl overflow-hidden z-10 shadow-2xl flex flex-col md:flex-row h-[600px] md:h-[480px] rim-light-gold"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedLegend(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black text-on-surface-variant hover:text-white border border-white/10 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Poster Column */}
              <div className="w-full md:w-2/5 relative h-48 md:h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-black/60 z-10" />
                <img
                  alt={selectedLegend.name}
                  className="w-full h-full object-cover filter mix-blend-luminosity opacity-60"
                  src={selectedLegend.img}
                />
                
                {/* Big jersey number */}
                <div className="absolute bottom-6 left-6 z-20 font-display-lg text-7xl text-secondary font-black tracking-tighter">
                  #{selectedLegend.jersey}
                </div>
              </div>

              {/* Statistics & Bio Column */}
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar h-[350px] md:h-full">
                
                {/* Bio Header */}
                <div>
                  <span className="font-label-caps text-[9px] text-secondary tracking-widest font-bold flex items-center gap-1">
                    <Sparkles size={10} className="text-secondary animate-pulse" />
                    {selectedLegend.nickname}
                  </span>
                  
                  <h3 className="font-display-lg text-2xl text-on-surface uppercase font-bold tracking-tight mt-1">
                    {selectedLegend.name}
                  </h3>
                  
                  <div className="mt-1 flex gap-2 font-label-mono text-[9px] text-on-surface-variant">
                    <span>{selectedLegend.team}</span>
                    <span>•</span>
                    <span>{selectedLegend.years}</span>
                  </div>
                  
                  <p className="mt-4 font-body-lg text-xs text-on-surface-variant leading-relaxed">
                    {selectedLegend.description}
                  </p>

                  {/* Career Stats Grid */}
                  <div className="mt-6">
                    <h4 className="font-label-caps text-[10px] text-secondary tracking-wider font-bold mb-3 flex items-center gap-1.5">
                      <Star size={10} />
                      CAREER STATISTICS
                    </h4>
                    <div className="grid grid-cols-4 gap-2 bg-white/5 border border-white/5 rounded p-3 text-center">
                      {Object.entries(selectedLegend.careerStats).map(([sName, val]) => (
                        <div key={sName}>
                          <div className="font-label-mono text-[8px] text-on-surface-variant">{sName}</div>
                          <div className="font-headline-md text-sm text-on-surface font-bold mt-0.5">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accolades checklist & play */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-center">
                    <div>
                      <h4 className="font-label-caps text-[9px] text-on-surface-variant tracking-wider font-bold uppercase mb-2">Signature Sequence</h4>
                      <p className="font-body-lg text-xs text-white font-medium flex items-center gap-1.5">
                        <BookOpen size={12} className="text-secondary" />
                        {selectedLegend.signaturePlay}
                      </p>
                    </div>
                    
                    <ul className="hidden">
                      {selectedLegend.accolades.map((acc, i) => (
                        <li key={i}>{acc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
