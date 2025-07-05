import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { GradientText } from '../components/GradientText';
import { Colors } from '../constants/Colors';

SplashScreen.preventAutoHideAsync();

function CustomSplashScreen() {
  return (
    <View style={splashStyles.container}>
      <GradientText style={splashStyles.title}>CinemaVerse</GradientText>
      <Text style={splashStyles.tagline}>Your Gateway to Movie Magic</Text>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={splashStyles.line}
      />
    </View>
  );
}

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      setTimeout(() => setAppReady(true), 1000);
    }
  }, [fontsLoaded, fontError]);

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: 'Poppins_700Bold' },
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Detail' }} />
      </Stack>
    </Animated.View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: Colors.muted,
    marginTop: 8,
  },
  line: {
    height: 3,
    width: 80,
    borderRadius: 2,
    marginTop: 16,
  },
});