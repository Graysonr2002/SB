import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { User, Zap, Info, BookOpen, Settings, CreditCard } from 'lucide-react-native';
import { useAuthStore } from '@/hooks/use-auth-store';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function MenuScreen() {
  const { isPremium } = useAuthStore();

  const handleUpgrade = () => {
    router.push('/payments');
  };

  const handleHowItWorks = () => {
    router.push('/how-it-works');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleTerms = () => {
    router.push('/terms');
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

      {/* Account Section */}
      {!isPremium && (
        <View style={styles.upgradeSection}>
          <User size={24} color={Colors.secondary} />
          <Text style={styles.upgradeTitle}>Free Account</Text>
          <Text style={styles.upgradeDescription}>
            Upgrade to premium for unlimited access to all betting insights.
          </Text>
          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
            <Zap size={20} color="#FFFFFF" />
            <Text style={styles.upgradeButtonText}>Get Premium</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Learn Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleHowItWorks}>
          <Info size={24} color={Colors.secondary} />
          <Text style={styles.menuItemText}>How Success Bookie Works</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
          <BookOpen size={24} color={Colors.secondary} />
          <Text style={styles.menuItemText}>Bet Types Explained</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <Settings size={24} color={Colors.secondary} />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleUpgrade}>
          <CreditCard size={24} color={Colors.secondary} />
          <Text style={styles.menuItemText}>Billing & Payments</Text>
        </TouchableOpacity>
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
  upgradeSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  upgradeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  upgradeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  menuItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
});