import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Star, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function PaymentsScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const handleStartTrial = () => {
    // Handle trial start
    console.log('Starting 7-day free trial');
  };

  const handleSubscribe = () => {
    // Handle subscription
    console.log(`Subscribing to ${selectedPlan} plan`);
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

      <View style={styles.header}>
        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.subtitle}>
          Unlock the full potential of Success Bookie with unlimited access to all features
        </Text>
      </View>

      {/* Free Trial Section */}
      <View style={styles.trialSection}>
        <Star size={24} color={Colors.secondary} />
        <Text style={styles.trialTitle}>Start Your Free Trial</Text>
        <Text style={styles.trialDescription}>
          Try all premium features free for 7 days. No credit card required.
        </Text>
        <TouchableOpacity style={styles.trialButton} onPress={handleStartTrial}>
          <Text style={styles.trialButtonText}>Start 7-Day Free Trial</Text>
        </TouchableOpacity>
      </View>

      {/* Plan Selection */}
      <View style={styles.planSection}>
        <Text style={styles.planTitle}>Choose Your Plan</Text>
        
        {/* Monthly Plan */}
        <TouchableOpacity 
          style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('monthly')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Monthly</Text>
            {selectedPlan === 'monthly' && (
              <View style={styles.checkmark}>
                <Check size={16} color="#FFFFFF" />
              </View>
            )}
          </View>
          <Text style={styles.planPrice}>$4.99/month</Text>
          <Text style={styles.planDescription}>Perfect for trying out premium features</Text>
        </TouchableOpacity>

        {/* Annual Plan */}
        <TouchableOpacity 
          style={[styles.planCard, selectedPlan === 'annual' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('annual')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Annual</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Most Popular</Text>
            </View>
            {selectedPlan === 'annual' && (
              <View style={styles.checkmark}>
                <Check size={16} color="#FFFFFF" />
              </View>
            )}
          </View>
          <Text style={styles.planPrice}>$49.99/year</Text>
          <Text style={styles.planDescription}>Save $10 compared to monthly billing</Text>
        </TouchableOpacity>
      </View>

      {/* Features List */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Premium Features Include:</Text>
        
        <View style={styles.feature}>
          <Check size={20} color={Colors.success} />
          <Text style={styles.featureText}>Unlimited betting insights</Text>
        </View>
        
        <View style={styles.feature}>
          <Check size={20} color={Colors.success} />
          <Text style={styles.featureText}>AI-powered predictions</Text>
        </View>
        
        <View style={styles.feature}>
          <Check size={20} color={Colors.success} />
          <Text style={styles.featureText}>Advanced analytics</Text>
        </View>
        
        <View style={styles.feature}>
          <Check size={20} color={Colors.success} />
          <Text style={styles.featureText}>Priority customer support</Text>
        </View>
      </View>

      {/* Subscribe Button */}
      <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
        <Text style={styles.subscribeButtonText}>
          Subscribe {selectedPlan === 'monthly' ? '$4.99/mo' : '$49.99/yr'}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  trialSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  trialTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  trialDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  trialButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  trialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  planSection: {
    marginBottom: 24,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  planCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  selectedPlan: {
    borderColor: Colors.secondary,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  popularBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  checkmark: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  planDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  featuresSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});