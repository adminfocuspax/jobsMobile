import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useResponsive } from '@/context/ResponsiveContext';
import JobCategorySelector, {
  JobCategoryInterface,
} from './JobCategorySelector';

const JobCategory: React.FC = () => {
  const { primaryColor } = useResponsive();
  const styles = createStyles(primaryColor);
  const [selectedCategory, setSelectedCategory] =
    useState<JobCategoryInterface | null>(null);

  const handleCategorySelect = (category: JobCategoryInterface | null) => {
    setSelectedCategory(category);
    console.log('Selected category in JobCategory component:', category);
  };

  console.log('selectedCategory in JobCategory component:', selectedCategory);

  return (
    <View style={styles.container}>
      <VStack space='lg' style={styles.content}>
        <Text style={styles.title}>Job Category Selector</Text>

        <JobCategorySelector
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {selectedCategory && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedTitle}>Selected Category:</Text>
            <Text style={styles.selectedText}>{selectedCategory.label}</Text>
            <Text style={styles.selectedValue}>
              Value: {selectedCategory.value}
            </Text>
            <Text style={styles.selectedValue}>
              Description: {selectedCategory.description}
            </Text>
          </View>
        )}

        {!selectedCategory && (
          <View style={styles.noSelection}>
            <Text style={styles.noSelectionText}>No category selected</Text>
          </View>
        )}
      </VStack>
    </View>
  );
};

const createStyles = (primaryColor: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    content: {
      padding: 16,
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
    },
    selectedText: {
      color: '#333333',
      fontSize: 14,
      marginBottom: 4,
    },
    selectedTitle: {
      color: primaryColor,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    selectedValue: {
      color: '#666666',
      fontSize: 12,
      fontStyle: 'italic',
    },
    title: {
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
  });

export default JobCategory;
