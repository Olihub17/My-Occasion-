import { motion } from 'motion/react';
import { LayoutDashboard, Calendar, MessageSquare, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VendorDashboardView() {
  const { t } = useLanguage();
  
  const stats = [
    { label: t.vendor.stats.sales, value: `45,000 ${t.common.currency}`, icon: DollarSign, color: 'text-green-600' },
    { label: t.vendor.stats.bookings, value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: t.vendor.stats.messages, value: '5', icon: MessageSquare, color: 'text-gold' },
    { label: t.vendor.stats.views, value: '1,240', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate mb-4">{t.vendor.title}</h1>
          <p className="text-slate/60 text-lg">{t.vendor.desc}</p>
        </div>
        <button className="gold-button flex items-center gap-2">
          {t.vendor.addService}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className={`p-3 rounded-2xl bg-white mb-4 w-fit shadow-sm ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="text-slate/40 text-sm font-medium mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="glass-card p-8 rounded-[2.5rem]">
          <h2 className="text-2xl font-serif text-slate mb-6 flex items-center gap-3">
            <Users size={24} className="text-gold" />
            {t.vendor.inquiries}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-slate/5 group cursor-pointer hover:border-gold/20 transition-all">
                <div className="w-12 h-12 rounded-full bg-slate/10 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t.language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed'}</div>
                  <div className="text-sm text-slate/60">{t.language === 'ar' ? 'استفسار عن حجز قاعة لـ 200 شخص...' : 'Inquiry about hall booking for 200 people...'}</div>
                </div>
                <div className="text-xs text-slate/40">2h ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="glass-card p-8 rounded-[2.5rem]">
          <h2 className="text-2xl font-serif text-slate mb-6 flex items-center gap-3">
            <Calendar size={24} className="text-gold" />
            {t.vendor.schedule}
          </h2>
          <div className="space-y-4">
            {[
              { date: t.language === 'ar' ? '25 مايو' : '25 May', event: t.language === 'ar' ? 'حفل زفاف عائلي' : 'Family Wedding', time: t.language === 'ar' ? '8:00 مساءً' : '8:00 PM' },
              { date: t.language === 'ar' ? '2 يونيو' : '2 June', event: t.language === 'ar' ? 'تخرج جامعة نورة' : 'PNU Graduation', time: t.language === 'ar' ? '4:00 مساءً' : '4:00 PM' },
            ].map((ev, idx) => (
              <div key={idx} className="flex gap-6 items-center p-6 rounded-2xl bg-white shadow-sm border border-slate/5 border-r-4 border-r-gold ltr:border-r-0 ltr:border-l-4 ltr:border-l-gold">
                <div className="text-center min-w-[60px]">
                  <div className="text-gold font-bold text-lg">{ev.date.split(' ')[0]}</div>
                  <div className="text-xs text-slate/40 tracking-uppercase uppercase">{ev.date.split(' ')[1]}</div>
                </div>
                <div className="h-10 w-[1px] bg-slate/10" />
                <div>
                  <div className="font-bold text-slate">{ev.event}</div>
                  <div className="text-sm text-slate/60">{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
