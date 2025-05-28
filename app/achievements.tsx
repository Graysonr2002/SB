import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Award, X, Trophy, Target, Calendar, BookOpen, Users, Layers, TrendingUp, Zap, MessageCircle, Share2, CheckCircle2, Moon, ThumbsUp } from 'lucide-react-native';
import Colors from '@/constants/colors';
import LogoComponent from '@/components/LogoComponent';
import { achievements } from '@/mocks/achievements';

export default function AchievementsScreen() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  const handleAchievementPress = (id: string) => {
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      setSelectedAchievement(achievement);
      setModalVisible(true);
    }
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);
  
  const getFilteredAchievements = () => {
    switch (activeTab) {
      case 'unlocked':
        return unlockedAchievements;
      case 'locked':
        return lockedAchievements;
      default:
        return achievements;
    }
  };
  
  const getIconComponent = (iconName: string, size: number, color: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar size={size} color={color} />;
      case 'target':
        return <Target size={size} color={color} />;
      case 'trending-up':
        return <TrendingUp size={size} color={color} />;
      case 'users':
        return <Users size={size} color={color} />;
      case 'layers':
        return <Layers size={size} color={color} />;
      case 'book-open':
        return <BookOpen size={size} color={color} />;
      case 'zap':
        return <Zap size={size} color={color} />;
      case 'globe':
        return <Trophy size={size} color={color} />;
      case 'moon':
        return <Moon size={size} color={color} />;
      case 'thumbs-up':
        return <ThumbsUp size={size} color={color} />;
      case 'share-2':
        return <Share2 size={size} color={color} />;
      case 'message-circle':
        return <MessageCircle size={size} color={color} />;
      default:
        return <Award size={size} color={color} />;
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Achievements",
          headerStyle: {
            backgroundColor: Colors.card,
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <LogoComponent size="small" withBackground={true} aspectRatio={2.5} />
        </View>
        
        <View style={styles.header}>
          <Text style={styles.title}>Your Achievements</Text>
          <Text style={styles.subtitle}>
            Track your progress and earn badges as you use the app
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unlockedAchievements.length}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{lockedAchievements.length}</Text>
            <Text style={styles.statLabel}>Locked</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'all' && styles.activeTabText
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'unlocked' && styles.activeTab]}
            onPress={() => setActiveTab('unlocked')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'unlocked' && styles.activeTabText
              ]}
            >
              Unlocked
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'locked' && styles.activeTab]}
            onPress={() => setActiveTab('locked')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'locked' && styles.activeTabText
              ]}
            >
              Locked
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.achievementsContainer}>
          {getFilteredAchievements().map(achievement => (
            <TouchableOpacity 
              key={achievement.id}
              style={[
                styles.achievementCard,
                achievement.isUnlocked ? styles.unlockedCard : styles.lockedCard
              ]}
              onPress={() => handleAchievementPress(achievement.id)}
            >
              <View style={styles.achievementIconContainer}>
                {getIconComponent(
                  achievement.iconName, 
                  28, 
                  achievement.isUnlocked ? Colors.secondary : Colors.textSecondary
                )}
              </View>
              
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  achievement.isUnlocked ? styles.unlockedTitle : styles.lockedTitle
                ]}>
                  {achievement.name}
                </Text>
                
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                
                {!achievement.isUnlocked && achievement.progress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {achievement.progress.current}/{achievement.progress.total}
                    </Text>
                  </View>
                )}
                
                {achievement.isUnlocked && (
                  <View style={styles.completedContainer}>
                    <CheckCircle2 size={16} color={Colors.success} />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={closeModal}
            >
              <X size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            {selectedAchievement && (
              <>
                <View style={styles.modalIconContainer}>
                  {getIconComponent(
                    selectedAchievement.iconName,
                    64,
                    selectedAchievement.isUnlocked ? Colors.secondary : Colors.textSecondary
                  )}
                </View>
                
                <Text style={styles.modalTitle}>{selectedAchievement.name}</Text>
                <Text style={styles.modalDescription}>{selectedAchievement.description}</Text>
                
                {selectedAchievement.isUnlocked ? (
                  <View style={styles.unlockedContainer}>
                    <Award size={20} color={Colors.success} />
                    <Text style={styles.unlockedText}>
                      Unlocked on {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
                    </Text>
                  </View>
                ) : (
                  selectedAchievement.progress && (
                    <View style={styles.modalProgressContainer}>
                      <View style={styles.modalProgressBar}>
                        <View 
                          style={[
                            styles.modalProgressFill,
                            { width: `${(selectedAchievement.progress.current / selectedAchievement.progress.total) * 100}%` }
                          ]}
                        />
                      </View>
                      <Text style={styles.modalProgressText}>
                        {selectedAchievement.progress.current}/{selectedAchievement.progress.total} complete
                      </Text>
                    </View>
                  )
                )}
                
                {selectedAchievement.isUnlocked && (
                  <TouchableOpacity style={styles.shareButton}>
                    <Share2 size={18} color="#000000" />
                    <Text style={styles.shareButtonText}>Share Achievement</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.closeModalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
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
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-around',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.border,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontWeight: '600',
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  unlockedCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.secondary,
  },
  lockedCard: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    opacity: 0.9,
  },
  achievementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  unlockedTitle: {
    color: Colors.text,
  },
  lockedTitle: {
    color: Colors.textSecondary,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    color: Colors.success,
    marginLeft: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 340,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  modalIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  unlockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  unlockedText: {
    fontSize: 14,
    color: Colors.success,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  modalProgressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  modalProgressBar: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  modalProgressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
  modalProgressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  closeModalButton: {
    backgroundColor: Colors.card,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});