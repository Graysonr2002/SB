import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function TermsScreen() {
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

  const handleAccept = () => {
    if (isAgeConfirmed) {
      router.replace('/(tabs)');
    }
  };

  const handleDecline = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'terms',
          headerStyle: {
            backgroundColor: Colors.card,
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: LOGO_URL }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Terms & Conditions</Text>
        
        <View style={styles.warningBanner}>
          <AlertTriangle size={24} color={Colors.warning} />
          <Text style={styles.warningText}>
            You must be 21 years or older to use Success Bookie
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. ACCEPTANCE OF TERMS</Text>
          <Text style={styles.sectionText}>
            By accessing or using the Success Bookie application ("App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, you may not use the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. AGE RESTRICTION</Text>
          <Text style={styles.sectionText}>
            You must be 21 years of age or older to use this App. By using the App, you represent and warrant that you are at least 21 years old and have the legal capacity to enter into these Terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. NATURE OF SERVICE</Text>
          <Text style={styles.sectionText}>
            Success Bookie provides sports betting insights, analysis, and educational content. We do not facilitate actual betting or gambling. All betting decisions are made solely by you, and you are responsible for compliance with local laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. DISCLAIMER</Text>
          <Text style={styles.sectionText}>
            The information provided in this App is for educational and entertainment purposes only. Past performance does not guarantee future results. Betting involves risk, and you should never bet more than you can afford to lose.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. RESPONSIBLE GAMBLING</Text>
          <Text style={styles.sectionText}>
            We encourage responsible gambling practices. If you believe you have a gambling problem, please seek help from appropriate organizations such as the National Council on Problem Gambling.
          </Text>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isAgeConfirmed && styles.checkboxChecked]}
            onPress={() => setIsAgeConfirmed(!isAgeConfirmed)}
          >
            {isAgeConfirmed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I confirm I am 21 years or older
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.acceptButton,
              !isAgeConfirmed && styles.disabledButton
            ]}
            onPress={handleAccept}
            disabled={!isAgeConfirmed}
          >
            <Text style={[
              styles.acceptButtonText,
              !isAgeConfirmed && styles.disabledButtonText
            ]}>
              Accept & Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.declineButton}
            onPress={handleDecline}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
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
    marginBottom: 24,
  },
  logo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    maxWidth: 120,
    maxHeight: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.highlight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  warningText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.warning,
    marginLeft: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  sectionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  buttonContainer: {
    gap: 12,
  },
  acceptButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.lightGray,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  disabledButtonText: {
    color: Colors.textSecondary,
  },
  declineButton: {
    borderWidth: 2,
    borderColor: Colors.danger,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  declineButtonText: {
    color: Colors.danger,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
});