import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import JobCategorySelector, { JobCategoryInterface } from './JobCategorySelector';
import { useResponsive } from '@/context/ResponsiveContext';

const JobCategory: React.FC = () => {
  const { primaryColor } = useResponsive();
  const styles = createStyles(primaryColor);
  const [selectedCategory, setSelectedCategory] = useState<JobCategoryInterface | null>(null);

  const handleCategorySelect = (category: JobCategoryInterface | null) => {
    setSelectedCategory(category);
    console.log('Selected category in JobCategory component:', category);
  };

  console.log('selectedCategory in JobCategory component:', selectedCategory);

  return (
    <View style={styles.container}>
      <VStack space="lg" style={styles.content}>
        <Text style={styles.title}>Job Category Selector</Text>
        
        <JobCategorySelector
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        {selectedCategory && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedTitle}>Selected Category:</Text>
            <Text style={styles.selectedText}>{selectedCategory.label}</Text>
            <Text style={styles.selectedValue}>Value: {selectedCategory.value}</Text>
            <Text style={styles.selectedValue}>Description: {selectedCategory.description}</Text>
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

const createStyles = (primaryColor: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  selectedInfo: {
    backgroundColor: '#F0F8FF',
    color: '#333333',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 8,
  },
  selectedText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  noSelection: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  noSelectionText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
  },
});

export default JobCategory;