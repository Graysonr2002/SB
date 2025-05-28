export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  points: number;
  progress?: {
    current: number;
    total: number;
  };
}

export interface UserProgress {
  daysActive: number;
  betsSaved: number;
  insightsViewed: number;
  loginStreak: number;
}

export const achievements: Achievement[] = [
  {
    id: 'first-bet',
    name: 'First Bet',
    description: 'Save your first betting insight',
    iconName: 'bookmark',
    isUnlocked: false,
    points: 10,
    progress: {
      current: 0,
      total: 1
    }
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Use the app for 7 consecutive days',
    iconName: 'sunrise',
    isUnlocked: false,
    points: 25,
    progress: {
      current: 2,
      total: 7
    }
  },
  {
    id: 'insight-seeker',
    name: 'Insight Seeker',
    description: 'View 50 betting insights',
    iconName: 'eye',
    isUnlocked: false,
    points: 50,
    progress: {
      current: 0,
      total: 50
    }
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Save 25 betting insights',
    iconName: 'archive',
    isUnlocked: false,
    points: 75,
    progress: {
      current: 0,
      total: 25
    }
  },
  {
    id: 'dedicated',
    name: 'Dedicated User',
    description: 'Use the app for 30 days',
    iconName: 'calendar',
    isUnlocked: false,
    points: 100,
    progress: {
      current: 2,
      total: 30
    }
  }
];

export const userProgress: UserProgress = {
  daysActive: 2,
  betsSaved: 0,
  insightsViewed: 0,
  loginStreak: 2
};