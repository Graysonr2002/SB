import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedBet {
  id: string;
  gameId: string;
  teamName: string;
  betType: string;
  odds: string;
  stake?: string;
  potentialWin?: string;
  notes?: string;
  createdAt: string;
  title: string;
  description: string;
  confidence: number;
  type: string;
}

interface BetState {
  savedBets: SavedBet[];
  addBet: (bet: Omit<SavedBet, 'id' | 'createdAt'>) => void;
  removeBet: (betId: string) => void;
  updateBet: (betId: string, updates: Partial<SavedBet>) => void;
  clearAllBets: () => void;
}

export const useBetStore = create<BetState>()(
  persist(
    (set, get) => ({
      savedBets: [],
      
      addBet: (bet) => {
        const newBet: SavedBet = {
          ...bet,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          savedBets: [...state.savedBets, newBet],
        }));
      },
      
      removeBet: (betId) => {
        set((state) => ({
          savedBets: state.savedBets.filter((bet) => bet.id !== betId),
        }));
      },
      
      updateBet: (betId, updates) => {
        set((state) => ({
          savedBets: state.savedBets.map((bet) =>
            bet.id === betId ? { ...bet, ...updates } : bet
          ),
        }));
      },
      
      clearAllBets: () => {
        set({ savedBets: [] });
      },
    }),
    {
      name: 'bet-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);