export type View = 'home' | 'marketplace' | 'planner' | 'vendor-dashboard' | 'profile';

export interface Vendor {
  id: string;
  name: string;
  category: 'caterer' | 'decorator' | 'photographer' | 'venue' | 'planner';
  rating: number;
  priceRange: string;
  image: string;
  location: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export interface Budget {
  total: number;
  spent: number;
  items: {
    name: string;
    amount: number;
    paid: boolean;
  }[];
}

export interface Guest {
  id: string;
  name: string;
  rsvpStatus: 'invited' | 'confirmed' | 'declined';
  plusOne: boolean;
}
