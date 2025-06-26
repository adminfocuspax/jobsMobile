import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { sampleJobs } from './app-components/constant';
import React from 'react';
import JobCard from './app-components/JobsCard/JobCard';
import { ThemedText } from './ThemedText';

const HEADER_HEIGHT = 230;

type Props = PropsWithChildren<{
  headerImage: ReactElement | null;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  // Get screen dimensions for carousel
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Job handlers
  const handleViewDetails = (job: any) => {
    console.log('View details for:', job.title);
  };

  const handleApply = (job: any) => {
    console.log('Apply to:', job.title);
  };

  const handleToggleFavorite = (job: any) => {
    console.log('Toggle favorite for:', job.title);
  };
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  return (
    <ThemedView>
      {/* {!headerImage && (
        <ThemedText type="subtitle">Featured Jobs</ThemedText>
      )} */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        {/* {!headerImage && (
          <View style={styles.carouselContainer} >
            <Carousel
              loop
              width={screenWidth}
              height={screenHeight * 0.6}
              autoPlay={true}
              autoPlayInterval={6000}
              data={sampleJobs}
              snapEnabled={true}
              mode='vertical-stack'
              pagingEnabled={true}
              scrollAnimationDuration={1000}
              modeConfig={{
                snapDirection: 'left',
                stackInterval: 18,
              }}
              customConfig={() => ({ type: 'positive', viewCount: 5 })}
              renderItem={({ item, index }) => (
                <View style={styles.carouselItem}>
                  <JobCard
                    job={item}
                    isFavorite={false}
                    onViewDetails={handleViewDetails}
                    onApply={handleApply}
                    onToggleFavorite={handleToggleFavorite}
                    isGradient={true}
                  />
                </View>
              )}
            />

          </View>
        )} */}
        {headerImage &&
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            {headerImage}
          </Animated.View>
        }
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    height: 40,
  },
  content: {
    overflow: 'hidden',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    height: HEADER_HEIGHT + 90,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT + 20,
  },
});
