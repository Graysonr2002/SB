import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useBetStore } from '@/hooks/use-bet-store';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

const screenWidth = Dimensions.get('window').width;

export default function SettingsScreen() {
  const { isLoggedIn, isPremium, logout } = useAuthStore();
  const { savedBets } = useBetStore();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Already in dark mode
  const [oddsFormat, setOddsFormat] = useState('american');
  
  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleDarkMode = () => {
    Alert.alert(
      "Coming Soon",
      "Light mode will be available in a future update.",
      [{ text: "OK" }]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: logout,
          style: "destructive"
        }
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will remove all your saved bets and preferences. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear Data", 
          onPress: () => {
            // In a real app, you would clear all data here
            Alert.alert("Data Cleared", "All your data has been removed.");
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleOddsFormatChange = (format: string) => {
    setOddsFormat(format);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Settings",
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Account Status</Text>
              <Text style={styles.settingValue}>
                {isPremium ? 'Premium' : 'Free'}
              </Text>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Saved Bets</Text>
              <Text style={styles.settingValue}>{savedBets.length}</Text>
            </View>
            
            {isLoggedIn && (
              <TouchableOpacity 
                style={styles.button}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Odds Format</Text>
            </View>
            
            <View style={styles.oddsFormatContainer}>
              <TouchableOpacity
                style={[
                  styles.oddsFormatButton,
                  oddsFormat === 'american' && styles.activeOddsFormatButton
                ]}
                onPress={() => handleOddsFormatChange('american')}
              >
                <Text 
                  style={[
                    styles.oddsFormatText,
                    oddsFormat === 'american' && styles.activeOddsFormatText
                  ]}
                >
                  American (-110)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.oddsFormatButton,
                  oddsFormat === 'decimal' && styles.activeOddsFormatButton
                ]}
                onPress={() => handleOddsFormatChange('decimal')}
              >
                <Text 
                  style={[
                    styles.oddsFormatText,
                    oddsFormat === 'decimal' && styles.activeOddsFormatText
                  ]}
                >
                  Decimal (1.91)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.oddsFormatButton,
                  oddsFormat === 'fractional' && styles.activeOddsFormatButton
                ]}
                onPress={() => handleOddsFormatChange('fractional')}
              >
                <Text 
                  style={[
                    styles.oddsFormatText,
                    oddsFormat === 'fractional' && styles.activeOddsFormatText
                  ]}
                >
                  Fractional (10/11)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Contact Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Terms of Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkRow}>
              <Text style={styles.linkText}>Rate the App</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.dangerSection}>
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleClearData}
          >
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.version}>Success Bookie v1.0.0</Text>
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
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    maxWidth: 160,
    maxHeight: 160,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  settingValue: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: '500',
  },
  button: {
    margin: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  oddsFormatContainer: {
    padding: 16,
    gap: 8,
  },
  oddsFormatButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeOddsFormatButton: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  oddsFormatText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeOddsFormatText: {
    color: '#000000',
    fontWeight: '500',
  },
  linkRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  linkText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  dangerSection: {
    marginBottom: 24,
  },
  dangerButton: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dangerButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});