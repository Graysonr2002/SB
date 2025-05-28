import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { League } from '@/mocks/leagues';
import Colors from '@/constants/colors';

interface LeagueGridProps {
  leagues: League[];
}

export default function LeagueGrid({ leagues }: LeagueGridProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const itemsPerRow = width > 500 ? 4 : 3;
  const itemWidth = (width - 40) / itemsPerRow;

  const handleLeaguePress = (leagueId: string) => {
    router.push(`/league/${leagueId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Leagues</Text>
      <View style={styles.grid}>
        {leagues.map((league) => (
          <TouchableOpacity
            key={league.id}
            style={[
              styles.item,
              { width: itemWidth, height: itemWidth * 1.2 }
            ]}
            onPress={() => handleLeaguePress(league.id)}
            disabled={!league.active}
          >
            <View 
              style={[
                styles.iconContainer,
                { 
                  opacity: league.active ? 1 : 0.5,
                  backgroundColor: league.active ? Colors.card : Colors.lightGray
                }
              ]}
            >
              <Image
                source={{ uri: league.icon }}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text 
              style={[
                styles.name,
                { color: league.active ? Colors.text : Colors.textSecondary }
              ]}
            >
              {league.name}
            </Text>
            {!league.active && (
              <Text style={styles.comingSoon}>Coming Soon</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: Colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  item: {
    padding: 8,
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 8,
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  comingSoon: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  }
});