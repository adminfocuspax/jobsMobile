import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ResponsiveProvider } from '@/context/ResponsiveContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UserDetailsLayout() {
  const colorScheme = useColorScheme();

  return (
    <ResponsiveProvider>
      <GluestackUIProvider mode='light'>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='userInfo' />
            <Stack.Screen name='educations' />
            <Stack.Screen name='prefrences' />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </ResponsiveProvider>
  );
}
