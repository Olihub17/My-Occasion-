import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeViewProps {
  onStartPlanning: () => void;
}

export default function HomeView({ onStartPlanning }: HomeViewProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory z-10" />
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover"
            alt="Wedding Background"
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-gold mb-6 tracking-[0.2em] uppercase text-xs font-semibold"
          >
            <Sparkles size={16} />
            {t.home.tagline}
            <Sparkles size={16} />
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-8xl font-serif text-slate leading-tight mb-8"
          >
            {t.home.heroTitle} <br />
            <span className="italic text-gold">{t.home.heroTitleItalic}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg text-slate/70 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {t.home.heroDesc}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStartPlanning}
              className="gold-button flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              {t.home.startBtn}
              {language === 'ar' ? (
                <ArrowRight size={20} className="group-hover:translate-x-[-4px] transition-transform rotate-180" />
              ) : (
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>
            <button className="px-8 py-3 rounded-full border border-slate/10 hover:bg-white transition-colors w-full sm:w-auto">
              {t.home.browseBtn}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-30">
        {[
          { icon: Star, ...t.home.stats[0] },
          { icon: Clock, ...t.home.stats[1] },
          { icon: CheckCircle, ...t.home.stats[2] },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="glass-card p-8 rounded-3xl"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6">
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-slate/60 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
