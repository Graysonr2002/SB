import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function AchievementsRedirect() {
  const router = useRouter();
  
  // Redirect to the achievements screen
  React.useEffect(() => {
    router.replace('/achievements');
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Redirecting to achievements...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});