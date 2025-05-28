import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LOGO_URL, LOGO_URL_ALT } from '@/constants/images';

interface LogoComponentProps {
  width?: number;
  height?: number;
  style?: any;
}

export default function LogoComponent({ width = 120, height = 60, style }: LogoComponentProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: LOGO_URL }}
        style={[styles.logo, { width, height }]}
        resizeMode="contain"
        onError={() => {
          // Fallback to alternative logo if main one fails
          console.log('Main logo failed, using fallback');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: 8,
  },
});