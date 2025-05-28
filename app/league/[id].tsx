import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Filter, TrendingUp } from 'lucide-react-native';
import { leagues } from '@/mocks/leagues';
import { games } from '@/mocks/games';
import GameCard from '@/components/GameCard';
import FilterToolbar from '@/components/FilterToolbar';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function LeagueScreen() {
  const { id } = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const league = leagues.find(l => l.id === id);
  const leagueGames = games.filter(game => game.league === id);
  
  const filteredGames = activeFilter === 'all' 
    ? leagueGames 
    : leagueGames.filter(game => {
        switch (activeFilter) {
          case 'high-value':
            return game.valueRating > 75;
          case 'medium-value':
            return game.valueRating >= 50 && game.valueRating <= 75;
          case 'today':
            return new Date(game.date).toDateString() === new Date().toDateString();
          default:
            return true;
        }
      });

  if (!league) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>League not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: league.name,
          headerStyle: {
            backgroundColor: Colors.card,
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: LOGO_URL }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <View style={styles.leagueInfo}>
            <Text style={styles.leagueIcon}>{league.icon}</Text>
            <View style={styles.leagueDetails}>
              <Text style={styles.leagueName}>{league.name}</Text>
              <Text style={styles.gameCount}>{leagueGames.length} games available</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TrendingUp size={16} color={Colors.secondary} />
              <Text style={styles.statLabel}>Avg Value</Text>
              <Text style={styles.statValue}>
                {Math.round(leagueGames.reduce((sum, game) => sum + game.valueRating, 0) / leagueGames.length)}%
              </Text>
            </View>
          </View>
        </View>
        
        <FilterToolbar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={[
            { id: 'all', label: 'All Games' },
            { id: 'high-value', label: 'High Value' },
            { id: 'medium-value', label: 'Medium Value' },
            { id: 'today', label: 'Today' },
          ]}
        />
        
        <View style={styles.gamesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeFilter === 'all' ? 'All Games' : 
               activeFilter === 'high-value' ? 'High Value Bets' :
               activeFilter === 'medium-value' ? 'Medium Value Bets' :
               'Today\'s Games'}
            </Text>
            <Text style={styles.gameCount}>{filteredGames.length} games</Text>
          </View>
          
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
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
      </ScrollView>
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
  logo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    maxWidth: 120,
    maxHeight: 120,
  },
  header: {
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
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  leagueIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  leagueDetails: {
    flex: 1,
  },
  leagueName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  gameCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary,
    marginTop: 2,
  },
  gamesSection: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger,
    textAlign: 'center',
    marginTop: 32,
  },
});