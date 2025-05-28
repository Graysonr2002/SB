import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Trophy, Lock } from 'lucide-react-native';
import { Achievement } from '@/hooks/use-achievement-store';
import Colors from '@/constants/colors';

interface AchievementCardProps {
  achievement: Achievement;
  onPress?: () => void;
}

export default function AchievementCard({ achievement, onPress }: AchievementCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        {achievement.isUnlocked ? (
          <Text style={styles.emoji}>{achievement.icon}</Text>
        ) : (
          <Lock size={24} color={Colors.textSecondary} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, !achievement.isUnlocked && styles.lockedText]}>
          {achievement.name}
        </Text>
        <Text style={[styles.description, !achievement.isUnlocked && styles.lockedText]}>
          {achievement.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.pointsContainer}>
            <Trophy size={14} color={Colors.secondary} />
            <Text style={styles.points}>{achievement.points} pts</Text>
          </View>
          
          {achievement.isUnlocked && achievement.dateEarned && (
            <Text style={styles.dateEarned}>
              Earned {new Date(achievement.dateEarned).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
      
      <View style={[
        styles.statusIndicator,
        { backgroundColor: achievement.isUnlocked ? Colors.success : Colors.textSecondary }
      ]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lockedText: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  dateEarned: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});