import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  isPremium: boolean;
  trialEndDate: string | null;
  hasAcceptedTerms: boolean;
  isAgeVerified: boolean;
  login: () => void;
  logout: () => void;
  startTrial: () => void;
  upgradeToPremium: () => void;
  acceptTerms: () => void;
  verifyAge: () => void;
  isInTrialPeriod: () => boolean;
  daysLeftInTrial: () => number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      isPremium: false,
      trialEndDate: null,
      hasAcceptedTerms: false,
      isAgeVerified: false,

      login: () => set({ isLoggedIn: true }),
      
      logout: () => set({ 
        isLoggedIn: false,
        isPremium: false,
        trialEndDate: null
      }),
      
      startTrial: () => {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 7); // 7-day trial
        set({ 
          trialEndDate: trialEnd.toISOString()
        });
      },
      
      upgradeToPremium: () => set({ 
        isPremium: true,
        trialEndDate: null
      }),
      
      acceptTerms: () => set({
        hasAcceptedTerms: true
      }),
      
      verifyAge: () => set({
        isAgeVerified: true
      }),
      
      isInTrialPeriod: () => {
        const { trialEndDate } = get();
        if (!trialEndDate) return false;
        
        const now = new Date();
        const endDate = new Date(trialEndDate);
        return now < endDate;
      },
      
      daysLeftInTrial: () => {
        const { trialEndDate } = get();
        if (!trialEndDate) return 0;
        
        const now = new Date();
        const endDate = new Date(trialEndDate);
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
      }
    }),
    {
      name: 'success-bookie-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);