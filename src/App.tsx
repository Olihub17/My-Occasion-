/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { View } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import MarketplaceView from './components/MarketplaceView';
import PlannerView from './components/PlannerView';
import VendorDashboardView from './components/VendorDashboardView';
import ProfileView from './components/ProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HomeView onStartPlanning={() => setCurrentView('planner')} />
          </motion.div>
        );
      case 'marketplace':
        return (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <MarketplaceView />
          </motion.div>
        );
      case 'planner':
        return (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <PlannerView />
          </motion.div>
        );
      case 'vendor-dashboard':
        return (
          <motion.div
            key="vendor-dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <VendorDashboardView />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <ProfileView />
          </motion.div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-screen font-serif text-2xl text-slate/40">
            قريباً...
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <main>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {/* Background Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-20 w-96 h-96 bg-gold/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] -right-20 w-[500px] h-[500px] bg-rose/10 blur-[120px] rounded-full" />
      </div>

      <footer className="py-12 bg-slate text-ivory text-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif">مناسبتي</div>
          <div className="text-ivory/40 text-sm">
            © 2026 مناسبتي. جميع الحقوق محفوظة لشركة فخامة التقنية.
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <a href="#" className="hover:text-gold transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-gold transition-colors">سياسة الخصوصية</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

