import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { TrendingUp, Users, Zap } from 'lucide-react-native';
import { PropParlay } from '@/mocks/prop-parlays';
import Colors from '@/constants/colors';

interface PropParlayCardProps {
  parlay: PropParlay;
}

export default function PropParlayCard({ parlay }: PropParlayCardProps) {
  const getSportColor = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'nba':
        return '#FF6B35';
      case 'nfl':
        return '#013369';
      case 'mlb':
        return '#041E42';
      default:
        return Colors.secondary;
    }
  };

  const getSportLabel = (sport: string) => {
    return sport.toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.sportBadge, { backgroundColor: getSportColor(parlay.sport) }]}>
          <Text style={styles.sportText}>{getSportLabel(parlay.sport)}</Text>
        </View>
        <View style={styles.successRate}>
          <Zap size={14} color={Colors.secondary} />
          <Text style={styles.successRateText}>{parlay.successRate}% Success Rate</Text>
        </View>
      </View>

      <Text style={styles.title}>{parlay.name}</Text>

      <View style={styles.legsContainer}>
        {parlay.legs.map((leg, index) => (
          <View key={index} style={styles.legCard}>
            <View style={styles.legHeader}>
              <Image 
                source={{ uri: leg.playerImage }} 
                style={styles.playerImage}
              />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{leg.playerName}</Text>
                <Text style={styles.teamName}>{leg.team}</Text>
              </View>
              <View style={styles.propInfo}>
                <Text style={styles.propType}>{leg.propType}</Text>
                <Text style={styles.propLine}>{leg.line} {leg.type}</Text>
                <Text style={styles.hitRate}>{leg.hitRate}% Hit Rate</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.oddsContainer}>
          <Text style={styles.oddsLabel}>Total Odds</Text>
          <Text style={styles.odds}>{parlay.totalOdds}</Text>
        </View>
        
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>{parlay.insight}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sportText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  successRate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successRateText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  legsContainer: {
    marginBottom: 16,
  },
  legCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  legHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  teamName: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  propInfo: {
    alignItems: 'flex-end',
  },
  propType: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  propLine: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  hitRate: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  oddsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  oddsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  odds: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  insightContainer: {
    backgroundColor: Colors.highlight,
    borderRadius: 8,
    padding: 12,
  },
  insightText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});