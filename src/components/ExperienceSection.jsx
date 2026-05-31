import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Sparkles, LayoutGrid, ShieldCheck, Activity } from 'lucide-react';

const features = [
  {
    title: 'Immersive Court Overlay',
    description: 'Augmented live game metrics projected directly onto the court. Track playflow, shot arcs, and defensive coverage in real time.',
    icon: Globe2,
    accent: 'from-primary to-secondary'
  },
  {
    title: 'Holographic Roster View',
    description: '3D player profiles, performance analytics, and next-play predictions layered in a premium holographic dashboard.',
    icon: Sparkles,
    accent: 'from-secondary to-tertiary'
  },
  {
    title: 'Instant Highlight Engine',
    description: 'Auto-generated cinematic replay clips keyed to the most electrifying moments and momentum-changing plays.',
    icon: LayoutGrid,
    accent: 'from-tertiary to-primary'
  },
  {
    title: 'VIP Arena Access',
    description: 'Exclusive courtside feeds, concierge alerts, and premium experience settings for the ultimate NBA immersion.',
    icon: ShieldCheck,
    accent: 'from-primary-container to-secondary'
  }
];

export default function ExperienceSection() {
  return (
    <section className="py-24 flex flex-col gap-10 w-full px-6 md:px-16 bg-black/10 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <span className="font-label-caps text-xs text-primary tracking-[0.35em] uppercase mb-3 inline-block">
          COURTSIDE ECOSYSTEM
        </span>
        <h2 className="font-display-lg text-4xl md:text-5xl uppercase tracking-tighter leading-tight font-bold">
          Next-level immersive sports technology
        </h2>
        <p className="font-body-lg text-sm md:text-base text-on-surface-variant mt-4 max-w-3xl mx-auto leading-relaxed">
          Discover how premium visual storytelling, live analytics, and seamless broadcast-grade features come together to create a rich, expansive NBA experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-[2rem] p-8 overflow-hidden border border-white/10 bg-surface-container-high shadow-2xl hover:border-primary/30 hover:shadow-[0_0_45px_rgba(255,107,0,0.12)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-70 pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-start gap-4">
                <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${feature.accent} text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,182,147,0.18)]`}>
                  <Icon size={24} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-headline-md text-xl text-on-surface font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 font-label-mono text-[10px] uppercase tracking-[0.28em] text-primary font-bold">
                <Activity size={12} />
                PREMIUM ACCESS
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
