import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';

export default function IndexScreen() {
  useEffect(() => {
    // Redirect to login screen after a short delay
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
  );
} 