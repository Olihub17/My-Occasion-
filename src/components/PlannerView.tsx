import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, DollarSign, Users, ListTodo, Plus, Sparkles } from 'lucide-react';
import { Task, Budget, Guest } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import AIBudgetAssistant from './AIBudgetAssistant';
import { BudgetRecommendation } from '../services/aiService';

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'حجز القاعة الرئيسية', status: 'completed', dueDate: '2026-05-01' },
  { id: '2', title: 'اختيار ثيم الورد', status: 'pending', dueDate: '2026-06-15' },
  { id: '3', title: 'إرسال بطاقات الدعوة', status: 'pending', dueDate: '2026-07-20' },
];

export default function PlannerView() {
  const { t, language } = useLanguage();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [budget, setBudget] = useState<Budget>({
    total: 50000,
    spent: 15000,
    items: [
      { name: language === 'ar' ? 'القاعة' : 'Venue', amount: 12000, paid: true },
      { name: language === 'ar' ? 'الكوشة' : 'Stage Decor', amount: 3000, paid: true },
      { name: language === 'ar' ? 'بوفيه طعام' : 'Catering', amount: 8000, paid: false },
    ]
  });

  const progress = (budget.spent / budget.total) * 100;

  const handleApplyAI = (recommendations: BudgetRecommendation[]) => {
    const newItems = recommendations.map(rec => ({
      name: rec.category,
      amount: rec.amount,
      paid: false
    }));
    
    setBudget({
      total: recommendations.reduce((acc, curr) => acc + curr.amount, 0),
      spent: 0,
      items: newItems
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate mb-4">{t.planner.title}</h1>
          <p className="text-slate/60 text-lg">{t.planner.desc}</p>
        </div>
        
        <button 
          onClick={() => setIsAIOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-gold font-medium hover:bg-gold/20 transition-all group"
        >
          <Sparkles size={18} className="group-hover:scale-125 transition-transform" />
          {language === 'ar' ? 'تخطيط ذكي بالميزانية' : 'Smart AI Budgeting'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Tracker */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass-card p-8 rounded-[2.5rem]"
        >
          <div className="flex items-center gap-3 mb-8 text-gold">
            <DollarSign size={24} />
            <h2 className="text-2xl font-serif text-slate">{t.planner.budget}</h2>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate/60">{t.planner.spent}</span>
              <span className="font-semibold">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-slate/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gold"
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {budget.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-white/50 border border-slate/5">
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-[10px] text-slate/40 tracking-wider uppercase">{item.paid ? t.planner.paid : t.planner.pending}</div>
                </div>
                <div className="font-serif text-gold text-sm whitespace-nowrap">{item.amount} {t.common.currency}</div>
              </div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gold/30 text-gold hover:bg-gold/5 transition-colors">
              <Plus size={18} />
              {t.planner.addItem}
            </button>
          </div>
        </motion.div>

        {/* Guest List & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tasks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[2.5rem]"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3 text-gold">
                <ListTodo size={24} />
                <h2 className="text-2xl font-serif text-slate">{t.planner.tasks}</h2>
              </div>
              <button className="text-gold text-sm font-medium hover:underline">{t.planner.viewAll}</button>
            </div>
            
            <div className="space-y-2">
              {MOCK_TASKS.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate/5 transition-colors group">
                  <button className="text-gold opacity-60 hover:opacity-100 transition-opacity">
                    {task.status === 'completed' ? <CheckCircle2 size={22} className="fill-gold/10" /> : <Circle size={22} />}
                  </button>
                  <div className="flex-1">
                    <div className={`font-medium ${task.status === 'completed' ? 'line-through text-slate/40' : 'text-slate'}`}>
                      {task.title}
                    </div>
                    <div className="text-xs text-slate/40">{task.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Invitation / Guest Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-gold/5"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  <Users size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-slate">{t.planner.guests}</h2>
                  <p className="text-slate/60">{t.planner.guestsDesc}</p>
                </div>
              </div>
              <button className="gold-button">{t.planner.sendInv}</button>
            </div>
          </motion.div>
        </div>
      </div>

      <AIBudgetAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        onApply={handleApplyAI}
      />
    </div>
  );
}
