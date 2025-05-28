import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconName: string;
  category: 'threshold' | 'streak' | 'learning' | 'social' | 'feature';
  trigger: string;
  params?: Record<string, any>;
  dateEarned?: string;
  isUnlocked: boolean;
  points: number;
}

export interface UserProgress {
  loginStreak: number;
  lastLoginDate?: string;
  thresholdsCreated: number;
  postsCreated: number;
  chartsShared: number;
  quizzesCompleted: number;
  backtestsRun: number;
  feedbackSubmitted: number;
  insightsViewed: number;
  rulesBuilt: number;
  darkModeUsed: boolean;
  featuresUsedEarly: string[];
  leaguesExplored: string[];
  insightsShared: number;
  daysActive: number;
  betsSaved: number;
}

export interface UserStats {
  totalPoints: number;
  daysActive: number;
  betsSaved: number;
  insightsViewed: number;
  loginStreak: number;
}

interface AchievementStore {
  achievements: Achievement[];
  userProgress: UserProgress;
  unlockedAchievements: string[];
  pendingNotifications: Achievement[];
  stats: UserStats;
  
  // Actions
  initializeAchievements: () => void;
  updateProgress: (progressUpdate: Partial<UserProgress>) => void;
  checkAchievements: () => void;
  markAchievementSeen: (achievementId: string) => void;
  clearPendingNotifications: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'threshold_novice',
    name: 'Threshold Novice',
    description: 'Welcome aboard—your first step toward data-driven picks!',
    icon: '🎯',
    iconName: 'target',
    category: 'threshold',
    trigger: 'thresholds_created',
    params: { count: 1 },
    isUnlocked: false,
    points: 10,
  },
  {
    id: 'threshold_master',
    name: 'Threshold Master',
    description: "You're a threshold pro—50 custom conditions and counting!",
    icon: '🏆',
    iconName: 'trophy',
    category: 'threshold',
    trigger: 'thresholds_created',
    params: { count: 50 },
    isUnlocked: false,
    points: 100,
  },
  {
    id: 'insight_seeker',
    name: 'Insight Seeker',
    description: "Hungry for value bets—you've dug into 10 daily insights.",
    icon: '🔍',
    iconName: 'search',
    category: 'learning',
    trigger: 'insights_viewed',
    params: { count: 10 },
    isUnlocked: false,
    points: 25,
  },
  {
    id: 'rule_architect',
    name: 'Rule Architect',
    description: "You've mastered the builder—your first custom logic saved!",
    icon: '🏗️',
    iconName: 'layers',
    category: 'feature',
    trigger: 'rules_built',
    params: { count: 1 },
    isUnlocked: false,
    points: 30,
  },
  {
    id: 'backtest_guru',
    name: 'Backtest Guru',
    description: 'Your rules have stood the test of history—10 backtests done!',
    icon: '📊',
    iconName: 'bar-chart',
    category: 'feature',
    trigger: 'backtests_run',
    params: { count: 10 },
    isUnlocked: false,
    points: 50,
  },
  {
    id: 'charting_champion',
    name: 'Charting Champion',
    description: 'Visual storyteller—20 charts posted for the community!',
    icon: '📈',
    iconName: 'trending-up',
    category: 'social',
    trigger: 'charts_shared',
    params: { count: 20 },
    isUnlocked: false,
    points: 75,
  },
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'A week of dedication—your streak is on fire!',
    icon: '🔥',
    iconName: 'flame',
    category: 'streak',
    trigger: 'login_streak',
    params: { days: 7 },
    isUnlocked: false,
    points: 20,
  },
  {
    id: 'marathoner',
    name: 'Marathoner',
    description: 'A full month of daily insights—truly committed!',
    icon: '🏃‍♂️',
    iconName: 'activity',
    category: 'streak',
    trigger: 'login_streak',
    params: { days: 30 },
    isUnlocked: false,
    points: 100,
  },
  {
    id: 'league_explorer',
    name: 'League Explorer',
    description: "You've branched out—exploring insights across multiple sports!",
    icon: '🌍',
    iconName: 'globe',
    category: 'feature',
    trigger: 'leagues_explored',
    params: { count: 3 },
    isUnlocked: false,
    points: 40,
  },
  {
    id: 'quiz_whiz',
    name: 'Quiz Whiz',
    description: 'Knowledge is power—5 lessons conquered!',
    icon: '🧠',
    iconName: 'book-open',
    category: 'learning',
    trigger: 'quizzes_completed',
    params: { count: 5 },
    isUnlocked: false,
    points: 35,
  },
  {
    id: 'dark_mode_lover',
    name: 'Dark Mode Lover',
    description: 'Night owl approved—your eyes thank you!',
    icon: '🌙',
    iconName: 'moon',
    category: 'feature',
    trigger: 'dark_mode_used',
    params: { sessions: 3 },
    isUnlocked: false,
    points: 15,
  },
  {
    id: 'feedback_friend',
    name: 'Feedback Friend',
    description: 'You help us improve—10 pieces of feedback sent!',
    icon: '💝',
    iconName: 'thumbs-up',
    category: 'social',
    trigger: 'feedback_submitted',
    params: { count: 10 },
    isUnlocked: false,
    points: 25,
  },
  {
    id: 'insight_sharer',
    name: 'Insight Sharer',
    description: "You've gone public—thanks for spreading the word!",
    icon: '📢',
    iconName: 'share-2',
    category: 'social',
    trigger: 'insights_shared',
    params: { count: 1 },
    isUnlocked: false,
    points: 20,
  },
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'You test everything first—thanks for being on the cutting edge!',
    icon: '🚀',
    iconName: 'zap',
    category: 'feature',
    trigger: 'early_feature_use',
    params: { count: 1 },
    isUnlocked: false,
    points: 50,
  },
];

const defaultProgress: UserProgress = {
  loginStreak: 0,
  thresholdsCreated: 0,
  postsCreated: 0,
  chartsShared: 0,
  quizzesCompleted: 0,
  backtestsRun: 0,
  feedbackSubmitted: 0,
  insightsViewed: 0,
  rulesBuilt: 0,
  darkModeUsed: false,
  featuresUsedEarly: [],
  leaguesExplored: [],
  insightsShared: 0,
  daysActive: 0,
  betsSaved: 0,
};

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: defaultAchievements,
      userProgress: defaultProgress,
      unlockedAchievements: [],
      pendingNotifications: [],
      stats: {
        totalPoints: 0,
        daysActive: 0,
        betsSaved: 0,
        insightsViewed: 0,
        loginStreak: 0,
      },

      initializeAchievements: () => {
        set({ achievements: defaultAchievements });
      },

      updateProgress: (progressUpdate) => {
        set((state) => {
          const newProgress = { ...state.userProgress, ...progressUpdate };
          
          // Update login streak logic
          if (progressUpdate.lastLoginDate) {
            const today = new Date().toDateString();
            const lastLogin = state.userProgress.lastLoginDate;
            
            if (lastLogin) {
              const lastDate = new Date(lastLogin);
              const todayDate = new Date(today);
              const diffTime = todayDate.getTime() - lastDate.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays === 1) {
                newProgress.loginStreak = state.userProgress.loginStreak + 1;
              } else if (diffDays > 1) {
                newProgress.loginStreak = 1;
              }
            } else {
              newProgress.loginStreak = 1;
            }
          }

          // Calculate total points from unlocked achievements
          const totalPoints = state.achievements
            .filter(a => state.unlockedAchievements.includes(a.id))
            .reduce((sum, a) => sum + a.points, 0);
          
          // Update stats
          const newStats: UserStats = {
            totalPoints,
            daysActive: newProgress.daysActive,
            betsSaved: newProgress.betsSaved,
            insightsViewed: newProgress.insightsViewed,
            loginStreak: newProgress.loginStreak,
          };
          
          return { 
            userProgress: newProgress,
            stats: newStats
          };
        });
        
        // Check for new achievements after updating progress
        get().checkAchievements();
      },

      checkAchievements: () => {
        const { achievements, userProgress, unlockedAchievements } = get();
        const newlyUnlocked: Achievement[] = [];
        
        achievements.forEach((achievement) => {
          if (unlockedAchievements.includes(achievement.id)) return;
          
          let shouldUnlock = false;
          
          switch (achievement.trigger) {
            case 'thresholds_created':
              shouldUnlock = userProgress.thresholdsCreated >= (achievement.params?.count || 0);
              break;
            case 'insights_viewed':
              shouldUnlock = userProgress.insightsViewed >= (achievement.params?.count || 0);
              break;
            case 'rules_built':
              shouldUnlock = userProgress.rulesBuilt >= (achievement.params?.count || 0);
              break;
            case 'backtests_run':
              shouldUnlock = userProgress.backtestsRun >= (achievement.params?.count || 0);
              break;
            case 'posts_created':
              shouldUnlock = userProgress.postsCreated >= (achievement.params?.count || 0);
              break;
            case 'charts_shared':
              shouldUnlock = userProgress.chartsShared >= (achievement.params?.count || 0);
              break;
            case 'login_streak':
              shouldUnlock = userProgress.loginStreak >= (achievement.params?.days || 0);
              break;
            case 'quizzes_completed':
              shouldUnlock = userProgress.quizzesCompleted >= (achievement.params?.count || 0);
              break;
            case 'dark_mode_used':
              shouldUnlock = userProgress.darkModeUsed;
              break;
            case 'feedback_submitted':
              shouldUnlock = userProgress.feedbackSubmitted >= (achievement.params?.count || 0);
              break;
            case 'early_feature_use':
              shouldUnlock = userProgress.featuresUsedEarly.length >= (achievement.params?.count || 0);
              break;
            case 'leagues_explored':
              shouldUnlock = userProgress.leaguesExplored.length >= (achievement.params?.count || 0);
              break;
            case 'insights_shared':
              shouldUnlock = userProgress.insightsShared >= (achievement.params?.count || 0);
              break;
          }
          
          if (shouldUnlock) {
            const unlockedAchievement = {
              ...achievement,
              isUnlocked: true,
              dateEarned: new Date().toISOString(),
            };
            newlyUnlocked.push(unlockedAchievement);
          }
        });
        
        if (newlyUnlocked.length > 0) {
          set((state) => {
            const newUnlockedIds = newlyUnlocked.map(a => a.id);
            const totalPoints = state.achievements
              .filter(a => [...state.unlockedAchievements, ...newUnlockedIds].includes(a.id))
              .reduce((sum, a) => sum + a.points, 0);

            return {
              unlockedAchievements: [
                ...state.unlockedAchievements,
                ...newUnlockedIds
              ],
              pendingNotifications: [
                ...state.pendingNotifications,
                ...newlyUnlocked
              ],
              achievements: state.achievements.map(a => {
                const unlocked = newlyUnlocked.find(u => u.id === a.id);
                return unlocked || a;
              }),
              stats: {
                ...state.stats,
                totalPoints
              }
            };
          });
        }
      },

      markAchievementSeen: (achievementId) => {
        set((state) => ({
          pendingNotifications: state.pendingNotifications.filter(
            a => a.id !== achievementId
          )
        }));
      },

      clearPendingNotifications: () => {
        set({ pendingNotifications: [] });
      },
    }),
    {
      name: 'achievement-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userProgress: state.userProgress,
        unlockedAchievements: state.unlockedAchievements,
      }),
    }
  )
);