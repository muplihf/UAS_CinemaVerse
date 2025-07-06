import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientText } from '../components/GradientText';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

function CustomSplashScreen() {
  return (
    <SafeAreaView style={splashStyles.container} edges={['top', 'bottom']}>
      <Animated.View
        entering={FadeInUp.delay(200).duration(1000)}
        style={splashStyles.titleContainer}
      >
        <GradientText style={splashStyles.title}>CinemaVerse</GradientText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(800)}
        style={splashStyles.taglineContainer}
      >
        <Text style={splashStyles.tagline}>Your Gateway to Movie Magic</Text>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={splashStyles.line}
        />
      </Animated.View>
    </SafeAreaView>
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
      setTimeout(() => setAppReady(true), 4000);
    }
  }, [fontsLoaded, fontError]);

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(800)}>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontFamily: 'Poppins_700Bold' },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      >
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
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: width > 400 ? 36 : 30,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    maxWidth: width - 40,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    height: 3,
    width: 80,
    borderRadius: 2,
  },
});
