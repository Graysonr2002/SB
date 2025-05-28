import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Info, Settings, BookOpen, Share2, MessageSquare, 
  LogOut, LogIn, HelpCircle, Award, Zap
} from 'lucide-react-native';
import { useAuthStore } from '@/hooks/use-auth-store';
import Colors from '@/constants/colors';

export default function MenuScreen() {
  const router = useRouter();
  const { isLoggedIn, isPremium, isInTrialPeriod, login, logout } = useAuthStore();
  
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const menuItems = [
    {
      title: 'Learn',
      items: [
        {
          label: 'How Success Bookie Works',
          icon: <Info size={20} color={Colors.secondary} />,
          onPress: () => handleNavigation('/how-it-works'),
        },
        {
          label: 'Bet Types Explained',
          icon: <BookOpen size={20} color={Colors.secondary} />,
          onPress: () => handleNavigation('/how-it-works'),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Settings',
          icon: <Settings size={20} color={Colors.secondary} />,
          onPress: () => handleNavigation('/settings'),
        },
        {
          label: 'Achievements',
          icon: <Award size={20} color={Colors.secondary} />,
          onPress: () => handleNavigation('/achievements'),
        },
        {
          label: isLoggedIn ? 'Sign Out' : 'Sign In',
          icon: isLoggedIn 
            ? <LogOut size={20} color={Colors.secondary} />
            : <LogIn size={20} color={Colors.secondary} />,
          onPress: () => isLoggedIn ? logout() : login(),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          label: 'Contact Us',
          icon: <MessageSquare size={20} color={Colors.secondary} />,
          onPress: () => {},
        },
        {
          label: 'Help Center',
          icon: <HelpCircle size={20} color={Colors.secondary} />,
          onPress: () => {},
        },
        {
          label: 'Refer a Friend',
          icon: <Share2 size={20} color={Colors.secondary} />,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Subscription Status */}
      <View style={styles.subscriptionCard}>
        <View style={styles.subscriptionHeader}>
          <Award size={24} color={Colors.secondary} />
          <Text style={styles.subscriptionTitle}>
            {isPremium 
              ? 'Premium Member' 
              : isInTrialPeriod() 
                ? 'Trial Active' 
                : 'Free Account'}
          </Text>
        </View>
        
        <Text style={styles.subscriptionDescription}>
          {isPremium 
            ? 'You have full access to all premium features.'
            : isInTrialPeriod()
              ? `Your free trial is active. Upgrade to continue access after your trial ends.`
              : 'Upgrade to premium for unlimited access to all betting insights.'}
        </Text>
        
        {!isPremium && (
          <TouchableOpacity 
            style={styles.upgradeButton}
            onPress={() => handleNavigation('/payments')}
          >
            <Zap size={16} color="#000000" />
            <Text style={styles.upgradeButtonText}>
              {isInTrialPeriod() ? 'Upgrade Now' : 'Get Premium'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Menu Sections */}
      {menuItems.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemIcon}>
                {item.icon}
              </View>
              <Text style={styles.menuItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      
      <Text style={styles.version}>Success Bookie v1.0.0</Text>
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
  subscriptionCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemIcon: {
    width: 36,
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  version: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});