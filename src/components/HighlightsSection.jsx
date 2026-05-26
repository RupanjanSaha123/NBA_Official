import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

export default function HighlightsSection() {
  const carouselRef = useRef(null);

  const highlights = [
    {
      id: 1,
      tag: 'Q4 BUZZER BEATER',
      time: '02:45',
      title: 'The Gravity-Defying Finish',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA61IjCBAd9JS4o-53YKQY2UUh-tSkPYKycQr0PUxmrcbgYP6A9Ln0lc6WA1oCj5q7IusYB9XIXmTZAgfYvkLASx2puQZinEE8snnHOlTpQyLdfRGOwelJuxCrGwXHYOcLwPTtPEW0dj5vEIseXjdojmsCLs9jhrehMsqT6kPSEzlmISmDQWtqRb5GsJRy-MLhxMcrdCvcCH28yshq6zah5JVXdYJ7FO8rKzenSbaHq0Y65G7g3fhfgtBagf9TDYjZwa2HUGECZxr8'
    },
    {
      id: 2,
      tag: 'DEFENSIVE MASTERCLASS',
      time: '01:12',
      title: 'Unbreakable Wall',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACHKegrGumoVhdGQBTzyO7XRUKgiC9v33OCOdyUc61Xrf_YOSw1Q_1OTPxWRdAsf8dt9Xmw1sQpfx-9NPxyD-WwNwC6A0oDVJwJIFc3EBMBAH4HN9DtlHKtZVfJ76V_c8dK02BzvbcJofxK-j4dbpjVqbf0HWd8U15_DG1IW_PgjRrGzW5DyQG1Eb-H3FWBwHkpCfE0hxd6RChyhPz86V8wtjzqOqLyBqBllKuCkbmy-4mQ1ry5wh8FKF6fswofRvOBNS5I4n9kRg'
    },
    {
      id: 3,
      tag: 'CROWD ERUPTION',
      time: '00:45',
      title: 'The Arena Shakes',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB10aLlnfhCMSkLTstqr-fZniIUrIqvYrcqLqbeER95mu071TLFcJ2GmLzMfmGtOQs0FqzkbSeOXmblSXhERowpfrvKATqlmXXahing9qztyd0MfRTKuE37ZWjT2xk8GsEx0NZzgMAgrZVOcanxGZFY9k2Lbfd7alYZOMa8gJoLu2hhAqxB71USxnDKcp_QywZYMp2JeR8EkX49prdbNzmt6yXUv3bnvWPMvhJu2t_zxi1CF9-S40MAE09-UCSRopkFOM0LvTdtDT4'
    }
  ];

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 480;
    const currentScroll = carouselRef.current.scrollLeft;
    
    carouselRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-20 overflow-hidden pl-6 md:pl-16">
      
      {/* Title block with Carousel controls */}
      <div className="flex justify-between items-end pr-6 md:pr-16 mb-8">
        <div>
          <span className="font-label-caps text-xs text-primary mb-2 inline-block">BROADCAST PLAYBACKS</span>
          <h2 className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter leading-none font-bold">
            CINEMATIC REPLAYS
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant mt-2 max-w-2xl">
            Relive the defining moments of the championship matches in crystal-clear definition, captured from impossible spectator angles.
          </p>
        </div>
        
        {/* Navigation buttons */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => handleScroll('left')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 text-on-surface transition-all duration-300 active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={() => handleScroll('right')}
            className="w-12 h-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(255,182,147,0.1)]"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pr-6 md:pr-16"
      >
        {highlights.map((item) => (
          <article 
            key={item.id}
            className="min-w-[85vw] md:min-w-[540px] aspect-video relative rounded-xl overflow-hidden group snap-center cursor-pointer border-t border-white/5 hover:border-primary/20 transition-all duration-500 bg-surface-container-highest shadow-2xl flex-shrink-0"
          >
            {/* Visual overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 holographic-glare z-20 pointer-events-none" />
            
            {/* Highlight image */}
            <img 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-700 ease-in-out group-hover:scale-[1.03]"
              src={item.img}
            />

            {/* Play Button hover reveal overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-background/60 backdrop-blur-md border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(255,182,147,0.3)]">
                <Play size={24} fill="currentColor" />
              </div>
            </div>

            {/* Metadata and Headline text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <div className="flex items-center gap-3 mb-2 select-none">
                <span className="px-2.5 py-1 rounded bg-primary/25 backdrop-blur-sm border border-primary/45 font-label-caps text-[9px] text-primary tracking-widest font-bold">
                  {item.tag}
                </span>
                <span className="font-label-mono text-[9px] text-on-surface-variant tracking-wider font-bold">
                  DURATION {item.time}
                </span>
              </div>
              <h3 className="font-headline-md text-lg md:text-xl text-on-surface font-semibold tracking-tight uppercase">
                {item.title}
              </h3>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
}
