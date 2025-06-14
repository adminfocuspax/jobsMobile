import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeBanner } from '@/components/Home';
import '../i18n/i18n'; // Import the i18n configuration
import CompleteProfile from '../components/CompleteProfile';

export default function HomeScreen() {
  return (      
      <ThemedView style={styles.mainContent}>
        {/* <ThemedText type='subtitle'>Your journey to a better career starts here.</ThemedText> */}

      </ThemedView>
      
  );
}

const styles = StyleSheet.create({
  mainContent: {
    margin: 0,
    padding: 0,
  }
});


