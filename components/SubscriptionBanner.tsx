import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function SubscriptionBanner() {
  const handleUpgradePress = () => {
    router.push('/payments');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Premium Features</Text>
      <Text style={styles.description}>
        Get unlimited access to all betting insights and predictions
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleUpgradePress}>
        <Text style={styles.buttonText}>Subscribe $4.99/mo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.trialButton} onPress={handleUpgradePress}>
        <Text style={styles.trialButtonText}>Start 7-Day Trial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  trialButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  trialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});