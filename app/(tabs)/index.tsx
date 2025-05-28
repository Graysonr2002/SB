import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { Filter, TrendingUp, Zap } from 'lucide-react-native';
import { games } from '@/mocks/games';
import { leagues } from '@/mocks/leagues';
import GameCard from '@/components/GameCard';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import FilterToolbar, { FilterState } from '@/components/FilterToolbar';
import LeagueGrid from '@/components/LeagueGrid';
import { useAuthStore } from '@/hooks/use-auth-store';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

// Mock predictions data
const mockPredictions = [
  {
    id: '1',
    title: 'Lakers vs Warriors Over 225.5',
    description: 'Both teams averaging high scoring games this season',
    odds: '+110',
    confidence: 85,
    type: 'Over/Under'
  },
  {
    id: '2',
    title: 'Chiefs -7.5 vs Broncos',
    description: 'Chiefs dominant at home against division rivals',
    odds: '-105',
    confidence: 78,
    type: 'Spread'
  },
  {
    id: '3',
    title: 'Yankees ML vs Red Sox',
    description: 'Strong pitching matchup favors Yankees',
    odds: '-120',
    confidence: 72,
    type: 'Moneyline'
  }
];

export default function HomeScreen() {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    betType: 'all',
    valueOnly: false,
  });
  const { isPremium } = useAuthStore();
  
  const filteredGames = games.filter(game => {
    if (activeFilters.betType !== 'all') {
      // Filter by bet type if not 'all'
      return game.predictions.some(pred => 
        pred.type.toLowerCase().includes(activeFilters.betType.toLowerCase())
      );
    }
    return true;
  });

  const handleGamePress = (gameId: string) => {
    router.push(`/league/${gameId}`);
  };

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

      {/* Subscription Banner */}
      {!isPremium && <SubscriptionBanner />}

      {/* Popular Leagues */}
      <LeagueGrid leagues={leagues} />

      {/* Filter Section */}
      <FilterToolbar 
        onFilterChange={setActiveFilters}
      />

      {/* Today's Games */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={20} color={Colors.secondary} />
          <Text style={styles.sectionTitle}>Today's Games</Text>
        </View>
        
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPress={() => handleGamePress(game.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Filter size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No games found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters to see more games.
            </Text>
          </View>
        )}
      </View>

      {/* AI Predictions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Zap size={20} color={Colors.secondary} />
          <Text style={styles.sectionTitle}>AI Predictions</Text>
        </View>
        
        {mockPredictions.slice(0, 3).map((prediction) => (
          <TouchableOpacity 
            key={prediction.id} 
            style={styles.predictionCard}
            onPress={() => router.push(`/bet-analysis/${prediction.id}`)}
          >
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionTitle}>{prediction.title}</Text>
              <View style={[styles.confidenceBadge, { backgroundColor: Colors.success }]}>
                <Text style={styles.confidenceText}>{prediction.confidence}%</Text>
              </View>
            </View>
            <Text style={styles.predictionDescription}>{prediction.description}</Text>
            <View style={styles.predictionFooter}>
              <Text style={styles.predictionOdds}>Odds: {prediction.odds}</Text>
              <Text style={styles.predictionType}>{prediction.type}</Text>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.25,
    maxWidth: 200,
    maxHeight: 100,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  predictionCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  predictionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  predictionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionOdds: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  predictionType: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});