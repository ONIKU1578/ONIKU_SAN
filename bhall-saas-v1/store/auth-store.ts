import { create } from 'zustand';
import { User, Company } from '@/lib/types';

interface AuthState {
  user: User | null;
  company: Company | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  company: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, company: null }),
}));
