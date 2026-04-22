import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronRight, Loader2, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getBudgetBreakdown, BudgetRecommendation } from '../services/aiService';

interface AIBudgetAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (recommendations: BudgetRecommendation[]) => void;
}

export default function AIBudgetAssistant({ isOpen, onClose, onApply }: AIBudgetAssistantProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    guests: '',
    budget: '',
  });
  const [result, setResult] = useState<BudgetRecommendation[] | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const breakdown = await getBudgetBreakdown(
        formData.type,
        parseInt(formData.guests),
        parseInt(formData.budget),
        language
      );
      setResult(breakdown);
      setStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      onClose();
      // Reset
      setStep(1);
      setResult(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-ivory rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 pb-0 flex justify-between items-center">
              <div className="flex items-center gap-3 text-gold">
                <Sparkles size={24} />
                <h2 className="text-2xl font-serif text-slate">
                  {language === 'ar' ? 'المساعد الذكي للميزانية' : 'Smart Budget Assistant'}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate/5 rounded-full transition-colors"
              >
                <X size={20} className="text-slate/40" />
              </button>
            </div>

            <div className="p-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <p className="text-slate/60">
                    {language === 'ar' 
                      ? 'أخبرنا بتفاصيل مناسبتك وسيقوم الذكاء الاصطناعي بتوزيع ميزانيتك باحترافية.' 
                      : 'Tell us about your event and AI will professionally distribute your budget.'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate/60">
                        {language === 'ar' ? 'نوع المناسبة' : 'Event Type'}
                      </label>
                      <input 
                        type="text"
                        placeholder={language === 'ar' ? 'مثل: حفل زفاف' : 'e.g. Wedding'}
                        className="w-full elegant-input px-0"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate/60">
                        {language === 'ar' ? 'عدد الضيوف' : 'Guest Count'}
                      </label>
                      <input 
                        type="number"
                        placeholder="200"
                        className="w-full elegant-input px-0"
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate/60">
                      {language === 'ar' ? 'الميزانية الكلية' : 'Total Budget'}
                    </label>
                    <div className="relative">
                      <DollarSign className={`absolute top-1/2 -translate-y-1/2 text-gold ${language === 'ar' ? 'left-0' : 'right-0'}`} size={20} />
                      <input 
                        type="number"
                        placeholder="50,000"
                        className="w-full elegant-input px-0 ltr:pr-8 rtl:pl-8"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading || !formData.type || !formData.budget}
                    onClick={handleSubmit}
                    className="gold-button w-full flex items-center justify-center gap-2 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        {language === 'ar' ? 'إنشاء التوزيع المقترح' : 'Generate Suggested Breakdown'}
                        <ChevronRight size={20} className={`transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-serif">
                      {language === 'ar' ? 'التوزيع المقترح' : 'Suggested Breakdown'}
                    </h3>
                    <div className="text-gold font-bold text-2xl">
                      {formData.budget} {t.common.currency}
                    </div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {result?.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-2xl bg-white border border-slate/5 border-r-4 border-r-gold ltr:border-r-0 ltr:border-l-4 ltr:border-l-gold"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-slate">{item.category}</span>
                          <span className="text-gold font-serif">{item.amount} {t.common.currency}</span>
                        </div>
                        <p className="text-sm text-slate/60 mb-3">{item.description}</p>
                        <div className="w-full h-1.5 bg-slate/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gold/30" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={handleApply}
                      className="gold-button flex-1"
                    >
                      {language === 'ar' ? 'تطبيق التوزيع' : 'Apply Breakdown'}
                    </button>
                    <button 
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full border border-slate/10 hover:bg-white transition-colors"
                    >
                      {language === 'ar' ? 'تعديل البيانات' : 'Edit Input'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
