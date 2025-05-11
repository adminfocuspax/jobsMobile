import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { Button, View, Text } from 'react-native';

export default function IndexScreen() {
  useEffect(() => {
    // Redirect to login screen after a short delay
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // This function can be used for direct navigation to user details flow
  const navigateToUserDetails = () => {
    router.push('/userDetails/userInfo');
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Optional: Add a button to directly navigate to user details */}
      {/* 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Go to Profile Setup" onPress={navigateToUserDetails} />
      </View>
      */}
    </ThemedView>
  );
}