import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { X, TrendingUp, Target, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { getBetInsight } from '@/mocks/predictions';
import { useBetStore } from '@/hooks/use-bet-store';
import Colors from '@/constants/colors';

interface BetPayload {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  betType: string;
  description: string;
  odds: string;
  confidence: number;
}

interface BetInsightModalProps {
  betPayload: BetPayload | null;
  visible: boolean;
  onClose: () => void;
}

export default function BetInsightModal({ betPayload, visible, onClose }: BetInsightModalProps) {
  const { savedBets, addBet, removeBet } = useBetStore();
  const [isSaving, setIsSaving] = useState(false);

  if (!betPayload) return null;

  const insight = getBetInsight(betPayload.gameId);
  const isAlreadySaved = savedBets.some(bet => 
    bet.gameId === betPayload.gameId && bet.betType === betPayload.betType
  );

  const handleSaveBet = async () => {
    if (isAlreadySaved) {
      const existingBet = savedBets.find(bet => 
        bet.gameId === betPayload.gameId && bet.betType === betPayload.betType
      );
      if (existingBet) {
        removeBet(existingBet.id);
      }
    } else {
      setIsSaving(true);
      
      const newBet = {
        gameId: betPayload.gameId,
        teamName: `${betPayload.awayTeam} @ ${betPayload.homeTeam}`,
        betType: betPayload.betType,
        odds: betPayload.odds,
        title: insight?.title || `${betPayload.betType} Bet`,
        description: insight?.description || betPayload.description,
        confidence: betPayload.confidence,
        type: betPayload.betType,
      };
      
      addBet(newBet);
      
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return Colors.success;
    if (confidence >= 60) return Colors.warning;
    return Colors.danger;
  };

  const formatBulletPoints = (points: string[]) => {
    return points.map((point: string, index: number) => (
      <View key={index} style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{point}</Text>
      </View>
    ));
  };

  const formatSentences = (text: string) => {
    return text.split('.').filter((sentence: string) => sentence.trim()).map((sentence: string, index: number) => (
      <View key={index} style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{sentence.trim()}.</Text>
      </View>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bet Analysis</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
          {/* Game Info */}
          <View style={styles.gameSection}>
            <Text style={styles.gameTitle}>
              {betPayload.awayTeam} @ {betPayload.homeTeam}
            </Text>
            <View style={styles.betTypeContainer}>
              <Text style={styles.betType}>{betPayload.betType}</Text>
              <View style={[
                styles.confidenceBadge,
                { backgroundColor: getConfidenceColor(betPayload.confidence) }
              ]}>
                <Text style={styles.confidenceText}>
                  {betPayload.confidence}% Confidence
                </Text>
              </View>
            </View>
          </View>

          {insight && (
            <>
              {/* Analysis Overview */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <TrendingUp size={20} color={Colors.secondary} />
                  <Text style={styles.sectionTitle}>Analysis Overview</Text>
                </View>
                <Text style={styles.description}>{insight.description}</Text>
                
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Our Model</Text>
                    <Text style={styles.statValue}>{Math.round(insight.probability * 100)}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Implied Odds</Text>
                    <Text style={styles.statValue}>{Math.round(insight.impliedProbability * 100)}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Value Gap</Text>
                    <Text style={[styles.statValue, { color: Colors.success }]}>
                      +{Math.round(insight.valueGap * 100)}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Supporting Statistics */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Target size={20} color={Colors.secondary} />
                  <Text style={styles.sectionTitle}>Key Statistics</Text>
                </View>
                <View style={styles.bulletContainer}>
                  {formatBulletPoints(insight.supportingStats)}
                </View>
              </View>

              {/* Historical Trend */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historical Trend</Text>
                <View style={styles.bulletContainer}>
                  {formatSentences(insight.historicalTrend)}
                </View>
              </View>

              {/* Recommendation */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Recommendation</Text>
                <View style={styles.recommendationBox}>
                  <Text style={styles.recommendationText}>{insight.recommendation}</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.saveButton, isAlreadySaved && styles.savedButton]} 
            onPress={handleSaveBet}
            disabled={isSaving}
          >
            {isAlreadySaved ? (
              <BookmarkCheck size={20} color="#FFFFFF" />
            ) : (
              <Bookmark size={20} color="#FFFFFF" />
            )}
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Saving...' : isAlreadySaved ? 'Saved' : 'Save Bet'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  gameSection: {
    marginBottom: 24,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  betTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betType: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  bulletContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: Colors.secondary,
    marginRight: 8,
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  bulletText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  actionButtons: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedButton: {
    backgroundColor: Colors.success,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});