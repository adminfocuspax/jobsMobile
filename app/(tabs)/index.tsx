import { StyleSheet, ScrollView, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import '../../i18n/i18n'; // Import the i18n configuration
import JobCategory from '../../components/app-components/JobsCategorys/JobCategory';
import CenterAligned from '../../components/app-components/CenterAligned';

export default function HomeScreen() {


  return (
    <>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        <CenterAligned>
          <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={null}
          >
            <ThemedView style={styles.mainContent}>
              <JobCategory />
            </ThemedView>
          </ParallaxScrollView>
        </CenterAligned>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainContent: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
