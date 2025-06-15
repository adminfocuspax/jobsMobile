import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import '../i18n/i18n'; // Import the i18n configuration
import JobCategory from '../components/JobCategory';
import CenterAligned from '../components/CenterAligned';

export default function HomeScreen() {
  return (
    <CenterAligned>
      <ThemedView style={styles.mainContent}>
        {/* <ThemedText type='subtitle'>Your journey to a better career starts here....</ThemedText> */}
        {/* <RecommendedJobs/> */}
        <JobCategory />
      </ThemedView>
    </CenterAligned>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
  },
});
