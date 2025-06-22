import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// Import i18n configuration
import '../i18n/i18n';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { ResponsiveProvider } from '@/context/ResponsiveContext';
import { lightTheme } from '../theme/custom-theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ResponsiveProvider>
      <GluestackUIProvider mode='light'>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='login' />
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='+not-found' />
          </Stack>
          <StatusBar style='auto' backgroundColor='#000' translucent={true} />
        </ThemeProvider>
      </GluestackUIProvider>
    </ResponsiveProvider>
  );
}
