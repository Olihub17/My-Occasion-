export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    appName: 'مناسبتي',
    nav: {
      home: 'الرئيسية',
      marketplace: 'السوق',
      planner: 'المخطط',
      vendorDashboard: 'الموردين',
    },
    home: {
      tagline: 'بوابتك لمناسبة استثنائية',
      heroTitle: 'نخطّط لتفاصيل',
      heroTitleItalic: 'أجمل لحظاتك',
      heroDesc: 'اكتشف أفضل الموردين، أدر ميزانيتك، وشارك خططك بكل سهولة. "مناسبتي" تضع فن التنظيم بين يديك.',
      startBtn: 'ابدأ التخطيط الآن',
      browseBtn: 'تصفح الموردين',
      stats: [
        { title: "موردين موثوقين", desc: "اختر من بين نخبة المصورين والقاعات المعتمدة." },
        { title: "جدول زمني ذكي", desc: "خطة زمنية مخصصة لمناسبتك تذكرك بكل خطوة." },
        { title: "إدارة الـ RSVP", desc: "تتبع حضور ضيوفك تلقائياً عبر الرسائل الذكية." },
      ]
    },
    marketplace: {
      title: 'اكتشف الموردين',
      desc: 'نخبة المبدعين جاهزون لجعل مناسبتك لا تُنسى.',
      searchPlaceholder: 'ابحث عن مورد...',
      filter: 'تصفية',
      requestQuote: 'طلب عرض سعر',
    },
    planner: {
      title: 'مركز التخطيط',
      desc: 'تحكم في كل تفصيلة من مناسبتك بذكاء واحترافية.',
      budget: 'الميزانية',
      spent: 'الإجمالي المستهلك',
      paid: 'مدفوع',
      pending: 'قيد الانتظار',
      addItem: 'إضافة بند',
      tasks: 'المهام القادمة',
      viewAll: 'عرض الكل',
      guests: 'إدارة المدعوين',
      guestsDesc: 'أرسل دعواتك وتابع الحضور تلقائياً.',
      sendInv: 'إرسال دعوة',
    },
    vendor: {
      title: 'لوحة تحكم الشركاء',
      desc: 'أدوات احترافية لتوسيع نطاق أعمالك في عالم المناسبات.',
      addService: 'إضافة خدمة جديدة',
      stats: {
        sales: 'إجمالي المبيعات',
        bookings: 'طلبات الحجز',
        messages: 'الرسائل',
        views: 'المشاهدات',
      },
      inquiries: 'استفسارات حديثة',
      schedule: 'مواعيد العمل القادمة',
    },
    profile: {
      title: 'الملف الشخصي',
      welcome: 'أهلاً بك',
      signIn: 'تسجيل الدخول عبر Google',
      signOut: 'تسجيل الخروج',
      stats: 'إحصائياتك',
      events: 'المناسبات المنظمة',
      saved: 'الموردين المفضلين',
    },
    common: {
      currency: 'ريال',
      switchLang: 'English',
    }
  },
  en: {
    appName: 'My Occasion',
    nav: {
      home: 'Home',
      marketplace: 'Marketplace',
      planner: 'Planner',
      vendorDashboard: 'Vendors',
    },
    home: {
      tagline: 'YOUR GATEWAY TO AN EXTRAORDINARY EVENT',
      heroTitle: 'Planning the details of',
      heroTitleItalic: 'Your Best Moments',
      heroDesc: 'Discover the best vendors, manage your budget, and share your plans with ease. "My Occasion" puts the art of organizing in your hands.',
      startBtn: 'Start Planning Now',
      browseBtn: 'Browse Vendors',
      stats: [
        { title: "Trusted Vendors", desc: "Choose from a selection of elite photographers and venues." },
        { title: "Smart Timeline", desc: "A personalized timeline for your event to remind you of every step." },
        { title: "RSVP Management", desc: "Track guest attendance automatically via smart messaging." },
      ]
    },
    marketplace: {
      title: 'Discover Vendors',
      desc: 'Top creators are ready to make your event unforgettable.',
      searchPlaceholder: 'Search for a vendor...',
      filter: 'Filter',
      requestQuote: 'Request Quote',
    },
    planner: {
      title: 'Planning Center',
      desc: 'Control every detail of your event with intelligence and professionalism.',
      budget: 'Budget',
      spent: 'Total Spent',
      paid: 'Paid',
      pending: 'Pending',
      addItem: 'Add Item',
      tasks: 'Upcoming Tasks',
      viewAll: 'View All',
      guests: 'Guest Management',
      guestsDesc: 'Send your invitations and track attendance automatically.',
      sendInv: 'Send Invite',
    },
    vendor: {
      title: 'Partner Dashboard',
      desc: 'Professional tools to expand your business in the events world.',
      addService: 'Add New Service',
      stats: {
        sales: 'Total Sales',
        bookings: 'Booking Requests',
        messages: 'Messages',
        views: 'Views',
      },
      inquiries: 'Recent Inquiries',
      schedule: 'Upcoming Schedule',
    },
    profile: {
      title: 'Profile',
      welcome: 'Welcome',
      signIn: 'Sign in with Google',
      signOut: 'Sign Out',
      stats: 'Your Stats',
      events: 'Events Managed',
      saved: 'Favorite Vendors',
    },
    common: {
      currency: 'SAR',
      switchLang: 'العربية',
    }
  }
};
