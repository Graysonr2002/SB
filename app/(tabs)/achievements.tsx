import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Trophy, Star, Target, Calendar } from 'lucide-react-native';
import { useAchievementStore } from '@/hooks/use-achievement-store';
import AchievementCard from '@/components/achievements/AchievementCard';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function AchievementsScreen() {
  const { achievements, stats } = useAchievementStore();
  
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);
  const completionPercentage = Math.round((unlockedAchievements.length / achievements.length) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: LOGO_URL }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          Track your progress and unlock rewards as you use Success Bookie
        </Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Trophy size={24} color={Colors.secondary} />
          <Text style={styles.statNumber}>{unlockedAchievements.length}</Text>
          <Text style={styles.statLabel}>Unlocked</Text>
        </View>
        
        <View style={styles.statItem}>
          <Star size={24} color={Colors.secondary} />
          <Text style={styles.statNumber}>{stats.totalPoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        
        <View style={styles.statItem}>
          <Target size={24} color={Colors.secondary} />
          <Text style={styles.statNumber}>{completionPercentage}%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Calendar size={20} color={Colors.secondary} />
          <Text style={styles.progressTitle}>Your Progress</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Days Active</Text>
          <Text style={styles.progressValue}>{stats.daysActive}</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Bets Saved</Text>
          <Text style={styles.progressValue}>{stats.betsSaved}</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Insights Viewed</Text>
          <Text style={styles.progressValue}>{stats.insightsViewed}</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Login Streak</Text>
          <Text style={styles.progressValue}>{stats.loginStreak} days</Text>
        </View>
      </View>

      {/* Achievement Categories */}
      <View style={styles.categorySection}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>All ({achievements.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Unlocked ({unlockedAchievements.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Locked ({lockedAchievements.length})</Text>
        </TouchableOpacity>
      </View>

      {/* Achievements List */}
      <View style={styles.achievementsSection}>
        {achievements.map(achievement => (
          <AchievementCard 
            key={achievement.id} 
            achievement={achievement}
            onPress={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.25,
    maxWidth: 200,
    maxHeight: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressLabel: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  categorySection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  achievementsSection: {
    gap: 12,
  },
});