import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeBanner } from '@/components/Home';
import '../i18n/i18n'; // Import the i18n configuration

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFF', dark: '#FFF' }}
      headerImage={<HomeBanner />}>
      
      {/* Main content goes here */}
      <ThemedView style={styles.mainContent}>

        <ThemedText type='subtitle'>Your journey to a better career starts here.</ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    padding: 20,
  }
});


