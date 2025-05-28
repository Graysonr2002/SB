import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { Zap, TrendingUp, BarChart, BookOpen } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function HowItWorksScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "How Success Bookie Works",
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
          <Text style={styles.title}>How Success Bookie Works</Text>
          <Text style={styles.subtitle}>
            Our AI-powered platform helps you find value in sports betting markets
          </Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=600&auto=format&fit=crop" }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart size={24} color={Colors.secondary} />
            <Text style={styles.sectionTitle}>Data-Driven Analysis</Text>
          </View>
          <Text style={styles.sectionText}>
            Success Bookie analyzes thousands of data points from historical games, player performance, and team statistics to identify patterns and trends that may not be fully accounted for in the betting markets.
          </Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={Colors.secondary} />
            <Text style={styles.sectionTitle}>Value Bet Detection</Text>
          </View>
          <Text style={styles.sectionText}>
            Our algorithms compare our calculated probabilities with the implied probabilities from sportsbook odds. When we find a significant gap, we flag it as a potential value bet.
          </Text>
          
          <View style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>Example:</Text>
            <Text style={styles.exampleText}>
              If our model calculates that Team A has a 60% chance to win, but the sportsbook odds imply only a 50% chance, that 10% gap represents potential value.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={Colors.secondary} />
            <Text style={styles.sectionTitle}>Confidence Ratings</Text>
          </View>
          <Text style={styles.sectionText}>
            Not all value bets are created equal. We assign confidence ratings (High, Medium, Low) based on:
          </Text>
          
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>The size of the value gap</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>The consistency of historical patterns</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Sample size of supporting data</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Recent performance trends</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color={Colors.secondary} />
            <Text style={styles.sectionTitle}>Transparency</Text>
          </View>
          <Text style={styles.sectionText}>
            Unlike other betting tools, we show you exactly why we are recommending a bet. Every insight includes supporting statistics, historical trends, and clear explanations of our reasoning.
          </Text>
        </View>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Important Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Success Bookie provides analysis and insights to help inform your betting decisions, but we cannot guarantee results. Always bet responsibly and within your means. Sports betting involves risk and should be approached as entertainment, not as a source of income.
          </Text>
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
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    maxWidth: 160,
    maxHeight: 160,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  section: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  exampleCard: {
    backgroundColor: Colors.highlight,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  exampleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  bulletPoints: {
    marginTop: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginTop: 7,
    marginRight: 8,
  },
  bulletText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  disclaimer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});