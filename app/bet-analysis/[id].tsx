import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { TrendingUp, Calendar, Users, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { games } from '@/mocks/games';
import { useBetStore } from '@/hooks/use-bet-store';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function BetAnalysisScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { savedBets, saveBet, removeBet } = useBetStore();
  const [stake, setStake] = useState('');
  
  const game = games.find(g => g.id === id);
  const isSaved = savedBets.some(bet => bet.gameId === id);
  
  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }

  const handleSaveBet = () => {
    if (isSaved) {
      const savedBet = savedBets.find(bet => bet.gameId === id);
      if (savedBet) {
        removeBet(savedBet.id);
      }
    } else {
      const potentialWin = stake ? (parseFloat(stake) * 1.91).toFixed(2) : undefined;
      
      saveBet({
        gameId: game.id,
        teamName: game.homeTeam,
        betType: game.betType,
        odds: game.odds,
        stake: stake || undefined,
        potentialWin: potentialWin || undefined,
        notes: `${game.insight}`,
      });
      
      Alert.alert(
        "Bet Saved!",
        "This bet has been added to your saved bets.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Bet Analysis",
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
          <View style={styles.matchup}>
            <Text style={styles.teams}>{game.awayTeam} @ {game.homeTeam}</Text>
            <View style={styles.gameInfo}>
              <Calendar size={16} color={Colors.textSecondary} />
              <Text style={styles.gameDate}>{new Date(game.date).toLocaleDateString()}</Text>
            </View>
          </View>
          
          <View style={styles.valueContainer}>
            <TrendingUp size={20} color={Colors.secondary} />
            <Text style={styles.valueRating}>{game.valueRating}% Value</Text>
          </View>
        </View>
        
        <View style={styles.betCard}>
          <View style={styles.betHeader}>
            <Text style={styles.betType}>{game.betType}</Text>
            <Text style={styles.confidence}>{game.confidence} Confidence</Text>
          </View>
          
          <View style={styles.oddsContainer}>
            <Text style={styles.oddsLabel}>Recommended Odds</Text>
            <Text style={styles.odds}>{game.odds}</Text>
          </View>
          
          <Text style={styles.insight}>{game.insight}</Text>
        </View>
        
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>
          
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <Users size={20} color={Colors.secondary} />
              <Text style={styles.analysisTitle}>Team Performance</Text>
            </View>
            <Text style={styles.analysisText}>
              {game.homeTeam} has been performing exceptionally well at home this season, 
              with a 73% win rate in their last 15 home games. Their offensive efficiency 
              has improved significantly, averaging 112 points per game over the last month.
            </Text>
          </View>
          
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <TrendingUp size={20} color={Colors.secondary} />
              <Text style={styles.analysisTitle}>Historical Trends</Text>
            </View>
            <Text style={styles.analysisText}>
              In the last 10 meetings between these teams, the home team has covered 
              the spread 70% of the time. Additionally, games between these teams tend 
              to be high-scoring, with 8 of the last 10 going over the total.
            </Text>
          </View>
          
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <Calendar size={20} color={Colors.secondary} />
              <Text style={styles.analysisTitle}>Recent Form</Text>
            </View>
            <Text style={styles.analysisText}>
              {game.homeTeam} is coming off a strong 3-game winning streak, while {game.awayTeam} 
              has struggled on the road recently, losing 4 of their last 6 away games. 
              The momentum clearly favors the home team in this matchup.
            </Text>
          </View>
        </View>
        
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.saveButton, isSaved && styles.savedButton]}
            onPress={handleSaveBet}
          >
            {isSaved ? (
              <BookmarkCheck size={20} color="#FFFFFF" />
            ) : (
              <Bookmark size={20} color="#000000" />
            )}
            <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
              {isSaved ? 'Saved' : 'Save Bet'}
            </Text>
          </TouchableOpacity>
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
  matchup: {
    marginBottom: 12,
  },
  teams: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.highlight,
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  valueRating: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    marginLeft: 6,
  },
  betCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  betType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    backgroundColor: Colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  confidence: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  oddsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  oddsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  odds: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
  },
  insight: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    textAlign: 'center',
  },
  analysisSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  analysisCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  analysisText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  actionSection: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: Colors.success,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  savedButtonText: {
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger,
    textAlign: 'center',
    marginTop: 32,
  },
});