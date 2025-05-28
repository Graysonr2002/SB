import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Filter } from 'lucide-react-native';
import { propParlays } from '@/mocks/prop-parlays';
import PropParlayCard from '@/components/PropParlayCard';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function PropParlaysScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredParlays = activeFilter === 'all' 
    ? propParlays 
    : propParlays.filter(parlay => parlay.sport.toLowerCase() === activeFilter);

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
        <Text style={styles.title}>Player Prop Parlays</Text>
        <Text style={styles.subtitle}>
          AI-generated prop combinations with the highest success probability
        </Text>
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeader}>
          <Filter size={20} color={Colors.secondary} />
          <Text style={styles.filterTitle}>Filter by Sport</Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
          <View style={styles.filterContainer}>
            {['all', 'nba', 'nfl', 'mlb'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.activeFilterButton
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text 
                  style={[
                    styles.filterButtonText,
                    activeFilter === filter && styles.activeFilterButtonText
                  ]}
                >
                  {filter === 'all' ? 'All Sports' : filter.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Parlays List */}
      <View style={styles.parlaysSection}>
        {filteredParlays.length > 0 ? (
          filteredParlays.map(parlay => (
            <PropParlayCard key={parlay.id} parlay={parlay} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Filter size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyTitle}>No parlays found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your filters to see more parlays.
            </Text>
          </View>
        )}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  filterSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  filterScrollView: {
    marginHorizontal: -4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  parlaysSection: {
    gap: 16,
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
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});