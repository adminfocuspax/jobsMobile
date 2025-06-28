import React, { useState } from 'react';
import { View, StyleSheet, Platform, Pressable, ScrollView, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { ThemedText } from '@/components/ThemedText';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { useResponsive } from '@/context/ResponsiveContext';
import { Bell, CheckCheck } from "lucide-react-native";
import JobCategorySelector, {
  JobCategoryInterface,
} from './JobCategorySelector';
import { RecommendedJobs } from '../RecommendedJobs';
import JobCard from '../JobsCard/JobCard';
import { JobInterface, sampleJobs } from '../constant';
import CenterAligned from '../CenterAligned';

const JobCategory: React.FC = () => {
  const { primaryColor, successColor } = useResponsive();
  const styles = createStyles(primaryColor, successColor);
  const [selectedCategory, setSelectedCategory] =
    useState<JobCategoryInterface | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleCategorySelect = (category: JobCategoryInterface | null) => {
    setSelectedCategory(category);
  };


  const handleViewDetails = (job: JobInterface) => {
    console.log('View details for:', job.title);
    // Add navigation or modal logic here
  };

  const handleApply = (job: JobInterface) => {
    console.log('Apply to:', job.title);
    // Add application logic here
  };

  const handleToggleFavorite = (job: JobInterface) => {
    console.log('Toggle favorite for:', job.title);
    // Add favorite toggle logic here
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    console.log(`${isSubscribed ? 'Unsubscribed from' : 'Subscribed to'} ${selectedCategory?.label} jobs`);
    // Add subscription logic here
  };

  const renderJobItem = ({ item, index }: { item: JobInterface; index: number }) => (
    <JobCard
      job={item}
      isFavorite={false}
      onViewDetails={handleViewDetails}
      onApply={handleApply}
      onToggleFavorite={handleToggleFavorite}
    />
  );


  // For mobile/tablet: use original View structure (parent handles scrolling)
  return (
    <View style={styles.container}>
      <VStack space='lg' style={styles.content}>
        {/* <ThemedText type="subtitle">Select jobs category</ThemedText> */}

        <JobCategorySelector
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <CenterAligned style={styles.scrollContent}>
          {selectedCategory && (
            <VStack space='md'>
              {/* <HStack space='md' style={styles.selectedRow}> */}
              <ThemedText
                type='subtitle'
                style={styles.selectedText}
                numberOfLines={2}
                ellipsizeMode="tail"
                selectable={false}
              >
                Top {selectedCategory.label} Jobs
              </ThemedText>
              <ThemedText
                type='small'
                style={styles.selectedTextDescription}
                numberOfLines={3}
                ellipsizeMode="tail"
                selectable={false}
              >
                {selectedCategory.description || ''}
              </ThemedText>

              {/* <Pressable
              style={[styles.subscribeButton, isSubscribed && styles.subscribeButtonActive]}
              onPress={handleSubscribe}
            >
              <HStack space='xs' style={styles.subscribeContent}>

                {isSubscribed && (<CheckCheck
                  size={14}
                  color={'#FFF'}
                />)}

                {!isSubscribed && (<Bell
                  size={14}
                  color={'#FFF'}
                />)}
                <Text numberOfLines={2} style={{ ...styles.subscribeText, ...(isSubscribed && styles.subscribeTextActive) }}>
                  {isSubscribed ? 'Subscribed to' : 'Subscribe to'} {selectedCategory.label}  jobs
                </Text>
              </HStack>
            </Pressable> */}
              {/* </HStack> */}
            </VStack>
          )}

          {/* {!selectedCategory && (
          <View style={styles.noSelection}>
            <Text style={styles.noSelectionText}>No category selected</Text>
          </View>
        )} */}


          <FlatList
            data={sampleJobs.slice(0, 4)}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

        </CenterAligned>

      </VStack>
    </View>
  );
};

const createStyles = (primaryColor: string, successColor: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    scrollContent: {
      width: '100%',
      flexGrow: 1,
      paddingBottom: 20,
    },
    content: {
      padding: 0,
    },
    noSelection: {
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 16,
    },
    noSelectionText: {
      color: '#999999',
      fontSize: 14,
      fontStyle: 'italic',
    },
    selectedInfo: {
      backgroundColor: '#F0F8FF',
      borderColor: primaryColor,
      borderRadius: 8,
      borderWidth: 1,
      color: '#333333',
      padding: 16,
      height: 200
    },
    selectedRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedText: {
      flex: 1,

      ...(Platform.OS !== 'web' && { lineHeight: 36 })
    },
    selectedTextDescription: {
      flex: 1,
      minHeight: 52,
    },
    selectedTitle: {
      color: primaryColor,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'left',
    },
    selectedValue: {
      color: '#666666',
      fontSize: 12,
      fontStyle: 'italic',
    },
    subscribeButton: {
      backgroundColor: primaryColor,
      borderColor: primaryColor,
      borderWidth: 0,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 6,
      alignSelf: 'flex-start',
    },
    subscribeButtonActive: {
      backgroundColor: successColor,
      borderColor: successColor,
    },
    subscribeContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    subscribeText: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: '500',
    },
    subscribeTextActive: {
      color: '#FFF',
    },
  });

export default JobCategory;
