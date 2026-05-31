import React from 'react';
import { LayoutDashboard, BarChart3, Newspaper, Users, Award, X, HelpCircle, LogOut, Sparkles } from 'lucide-react';

export default function SideNavBar({ sidebarOpen, setSidebarOpen, activeSection, scrollToSection }) {
  const menuItems = [
    { id: 'hero', label: 'Home', icon: LayoutDashboard },
    { id: 'experience', label: 'Experience', icon: Sparkles },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'players', label: 'Roster', icon: Users },
    { id: 'legacy', label: 'Legacy', icon: Award },
    { id: 'highlights', label: 'Highlights', icon: Newspaper },
    { id: 'teams', label: 'Teams', icon: Users },
  ];

  return (
    <>
      {/* Backdrop overlay blur (closes menu when clicked) */}
      <div 
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding Drawer Container */}
      <aside 
        className={`bg-surface-container-lowest/95 backdrop-blur-2xl border-r border-white/5 shadow-2xl fixed left-0 top-0 h-full w-64 z-50 flex flex-col py-8 px-4 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <span className="font-display-lg text-xs tracking-widest text-primary uppercase font-bold select-none">
            NAVIGATION
          </span>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-on-surface-variant hover:text-primary p-1.5 rounded-full hover:bg-white/5 transition-colors active:scale-90"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile Info */}
        <div className="mb-8 flex flex-col items-center group cursor-pointer">
          <div className="w-16 h-16 rounded-full glass-panel mb-4 overflow-hidden flex items-center justify-center border border-secondary-container relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent" />
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvqVTD_O2zMwn1nqRCPeFo3Vs0HLtPhdGFeXjz8j_U0E7c8KuCN-6lbzymmBEdV_Z9b0noN5SvwLYc9UEe2HshQ6LmueNX14qri8KWm5AJ8_sCVgRyW2FdlCIYHAMd1aoVFbbCe0wdt60YDRhv-39M6mm5LVEOlTTvTSMkeo27J3S-VDFdkZHvvr5u2VhR6ax4vyayYqv1oC0Qz94WInmheMcTNm3Ksgv_paAbsOcOkGEC9FKGLrXQ8phb9jILvO6Ol-Vec_cIopk" 
            />
          </div>
          <h3 className="font-headline-md text-sm text-primary text-center tracking-wider font-semibold">ELITE MEMBER</h3>
          <p className="font-label-caps text-[10px] text-on-surface-variant text-center mt-1">PRO PASS ACTIVE</p>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 space-y-1 font-body-md text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setSidebarOpen(false); // Auto close on click
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded transition-all duration-300 group hover:translate-x-1 ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-r-4 border-primary font-bold' 
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-label-caps text-xs tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / CTA */}
        <div className="mt-auto space-y-4">
          <button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-caps text-[10px] py-3 rounded tracking-widest hover:scale-[1.02] transition-all duration-300 font-bold shadow-[0_0_15px_rgba(233,195,73,0.15)]">
            UPGRADE TO MVP
          </button>
          
          <div className="space-y-1">
            <button className="w-full flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all rounded text-left group">
              <HelpCircle size={16} />
              <span className="font-label-caps text-[10px] tracking-wider">Help</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all rounded text-left group">
              <LogOut size={16} />
              <span className="font-label-caps text-[10px] tracking-wider">Logout</span>
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}
