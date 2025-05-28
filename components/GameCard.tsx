import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { TrendingUp, Clock } from 'lucide-react-native';
import { Game } from '@/mocks/games';
import Colors from '@/constants/colors';

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export default function GameCard({ game, onPress }: GameCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return Colors.success;
    if (confidence >= 60) return Colors.warning;
    return Colors.danger;
  };

  const topPrediction = game.predictions[0];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.teams}>
          <Text style={styles.teamText}>{game.awayTeam} @ {game.homeTeam}</Text>
          <View style={styles.timeContainer}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.timeText}>{game.time}</Text>
          </View>
        </View>
        <Text style={styles.league}>{game.league}</Text>
      </View>

      {topPrediction && (
        <View style={styles.predictionContainer}>
          <View style={styles.predictionHeader}>
            <TrendingUp size={16} color={Colors.secondary} />
            <Text style={styles.predictionTitle}>Top Pick</Text>
            <View style={[
              styles.confidenceBadge,
              { backgroundColor: getConfidenceColor(topPrediction.confidence) }
            ]}>
              <Text style={styles.confidenceText}>{topPrediction.confidence}%</Text>
            </View>
          </View>
          <Text style={styles.predictionText}>{topPrediction.type}: {topPrediction.description}</Text>
          <Text style={styles.oddsText}>Odds: {topPrediction.odds}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teams: {
    flex: 1,
  },
  teamText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  league: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  predictionContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 6,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  predictionText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  oddsText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});