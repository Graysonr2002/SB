import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, Image } from 'react-native';
import { Home, BarChart3, Bookmark, Trophy, Menu, Wallet } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { LOGO_URL } from '@/constants/images';

export default function TabLayout() {
  const TabIcon = ({ icon: Icon, focused }: { icon: any; focused: boolean }) => (
    <Icon 
      size={24} 
      color={focused ? Colors.primary : Colors.textSecondary} 
    />
  );

  const LogoIcon = ({ focused }: { focused: boolean }) => (
    <Image
      source={{ uri: LOGO_URL }}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? Colors.primary : Colors.textSecondary,
      }}
      resizeMode="contain"
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <LogoIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="prop-parlays"
        options={{
          title: 'Prop Parlays',
          tabBarIcon: ({ focused }) => <TabIcon icon={BarChart3} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="my-bets"
        options={{
          title: 'My Bets',
          tabBarIcon: ({ focused }) => <TabIcon icon={Bookmark} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ focused }) => <TabIcon icon={Trophy} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => <TabIcon icon={Menu} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ focused }) => <TabIcon icon={Wallet} focused={focused} />,
        }}
      />
    </Tabs>
  );
}