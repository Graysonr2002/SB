import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';

export interface FilterState {
  betType: string;
  valueOnly: boolean;
}

interface FilterToolbarProps {
  onFilterChange: (filters: FilterState) => void;
}

const betTypes = [
  { id: 'all', label: 'All Bets' },
  { id: 'moneyline', label: 'Moneyline' },
  { id: 'spread', label: 'Spread' },
  { id: 'total', label: 'Total' },
  { id: 'player-props', label: 'Player Props' },
];

export default function FilterToolbar({ onFilterChange }: FilterToolbarProps) {
  const [filters, setFilters] = useState<FilterState>({
    betType: 'all',
    valueOnly: false,
  });

  const handleBetTypeChange = (betType: string) => {
    const newFilters = { ...filters, betType };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleValueOnly = () => {
    const newFilters = { ...filters, valueOnly: !filters.valueOnly };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <Filter size={18} color={Colors.textSecondary} />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.betTypesContainer}
      >
        {betTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.betTypeButton,
              filters.betType === type.id && styles.activeBetTypeButton
            ]}
            onPress={() => handleBetTypeChange(type.id)}
          >
            <Text 
              style={[
                styles.betTypeText,
                filters.betType === type.id && styles.activeBetTypeText
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.valueFilterContainer}>
        <TouchableOpacity
          style={[
            styles.valueFilterButton,
            filters.valueOnly && styles.activeValueFilterButton
          ]}
          onPress={toggleValueOnly}
        >
          <Text 
            style={[
              styles.valueFilterText,
              filters.valueOnly && styles.activeValueFilterText
            ]}
          >
            Value Bets Only
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  betTypesContainer: {
    paddingVertical: 4,
    gap: 8,
  },
  betTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeBetTypeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  betTypeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeBetTypeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  valueFilterContainer: {
    marginTop: 12,
  },
  valueFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeValueFilterButton: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  valueFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeValueFilterText: {
    color: '#000000',
  },
});