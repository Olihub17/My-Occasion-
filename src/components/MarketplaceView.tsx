import { motion } from 'motion/react';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { Vendor } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'قصر الفرح للاحتفالات',
    category: 'venue',
    rating: 4.8,
    priceRange: 'SAR',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000',
    location: 'الرياض، حي النرجس',
    description: 'قاعة فاخرة بتصميم عصري وخدمات فندقية متكاملة.'
  },
  {
    id: '2',
    name: 'عدسة الذكريات',
    category: 'photographer',
    rating: 4.9,
    priceRange: 'SAR',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=2000',
    location: 'جدة، حي الشاطئ',
    description: 'توثيق أجمل لحظاتكم بأسلوب سينمائي مبتكر.'
  },
  {
    id: '3',
    name: 'كوشة الأحلام',
    category: 'decorator',
    rating: 4.7,
    priceRange: 'SAR',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=2000',
    location: 'الدمام، حي الفيصلية',
    description: 'تصميم وتنفيذ أرقى الكوش وتنسيقات الورد الطبيعي.'
  }
];

export default function MarketplaceView() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate mb-4">{t.marketplace.title}</h1>
          <p className="text-slate/60 text-lg">{t.marketplace.desc}</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate/40 group-focus-within:text-gold transition-colors`} size={20} />
            <input 
              type="text" 
              placeholder={t.marketplace.searchPlaceholder}
              className={`w-full sm:w-80 ${language === 'ar' ? 'pr-12' : 'pl-12'} py-3 rounded-full bg-white border border-slate/10 outline-none focus:border-gold transition-all`}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate/10 hover:bg-white transition-colors">
            <Filter size={18} />
            {t.marketplace.filter}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_VENDORS.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6">
              <img 
                src={vendor.image} 
                alt={vendor.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'} px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1`}>
                <Star size={14} className="text-gold fill-gold" />
                {vendor.rating}
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <button className="gold-button w-full">{t.marketplace.requestQuote}</button>
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-slate group-hover:text-gold transition-colors">{language === 'en' && vendor.id === '1' ? 'Wedding Palace' : vendor.name}</h3>
                <span className="text-gold font-medium">{vendor.priceRange}</span>
              </div>
              <div className="flex items-center gap-1 text-slate/40 text-sm mb-3">
                <MapPin size={14} />
                {vendor.location}
              </div>
              <p className="text-slate/60 text-sm line-clamp-2">{vendor.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
