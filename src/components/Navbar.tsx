import { motion } from 'motion/react';
import { ShoppingBag, Calendar, LayoutDashboard, User, Heart, Globe } from 'lucide-react';
import { View } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage();

  const links = [
    { id: 'home', label: t.nav.home, icon: Heart },
    { id: 'marketplace', label: t.nav.marketplace, icon: ShoppingBag },
    { id: 'planner', label: t.nav.planner, icon: Calendar },
    { id: 'vendor-dashboard', label: t.nav.vendorDashboard, icon: LayoutDashboard },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:top-6 md:bottom-auto w-[95%] max-w-3xl z-50">
      <div className="glass-card rounded-full px-4 md:px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl">
        <div className="flex gap-1 md:gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            
            return (
              <button
                key={link.id}
                onClick={() => onViewChange(link.id as View)}
                className={`flex flex-col md:flex-row items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all duration-500 relative
                  ${isActive ? 'text-gold' : 'text-slate/60 hover:text-slate'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-gold/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} className={isActive ? 'scale-110' : ''} />
                <span className="hidden sm:inline text-xs md:text-sm font-medium">{link.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-2 border-r border-slate/10 pr-2 mr-2 ltr:border-r-0 ltr:border-l ltr:pr-0 ltr:pl-2 ltr:mr-0 ltr:ml-2 rtl:border-r rtl:pr-2 rtl:mr-2">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gold/5 text-slate/60 hover:text-gold transition-colors flex items-center gap-1"
          >
            <Globe size={18} />
            <span className="text-xs font-semibold">{t.common.switchLang}</span>
          </button>
          
          <button 
            onClick={() => onViewChange('profile')}
            className="p-2 rounded-full hover:bg-slate/5 transition-colors"
          >
            <User size={18} className="text-slate/60" />
          </button>
        </div>
      </div>
    </nav>
  );
}
