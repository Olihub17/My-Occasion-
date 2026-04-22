import { motion } from 'motion/react';
import { LogOut, User as UserIcon, Calendar, Heart, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, logOut, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileView() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        // Save user to Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 rounded-[3rem] max-w-md w-full"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
            <UserIcon size={40} />
          </div>
          <h1 className="text-3xl font-serif text-slate mb-4">{t.profile.title}</h1>
          <p className="text-slate/60 mb-8">{language === 'ar' ? 'قم بتسجيل الدخول لحفظ تقدمك وإدارة مناسباتك من أي مكان.' : 'Sign in to save your progress and manage your events from anywhere.'}</p>
          <button 
            onClick={handleSignIn}
            className="gold-button w-full flex items-center justify-center gap-3"
          >
            <Shield size={20} />
            {t.profile.signIn}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 rounded-[3rem] overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-gold/20 overflow-hidden">
              <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold text-white p-2 rounded-full shadow-lg">
              <Shield size={16} />
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-serif text-slate mb-2">{t.profile.welcome}, {user.displayName}</h1>
            <p className="text-slate/40">{user.email}</p>
            <button 
              onClick={logOut}
              className="mt-6 text-sm text-red-500 hover:text-red-600 flex items-center gap-2 font-medium"
            >
              <LogOut size={16} />
              {t.profile.signOut}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white shadow-sm border border-slate/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold/10 text-gold rounded-2xl">
                <Calendar size={24} />
              </div>
              <div className="text-lg font-serif">{t.profile.events}</div>
            </div>
            <div className="text-4xl font-bold text-slate">1</div>
          </div>
          
          <div className="p-6 rounded-3xl bg-white shadow-sm border border-slate/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose/10 text-rose-500 rounded-2xl">
                <Heart size={24} />
              </div>
              <div className="text-lg font-serif">{t.profile.saved}</div>
            </div>
            <div className="text-4xl font-bold text-slate">12</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
