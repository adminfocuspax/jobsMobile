'use client';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import JobsBreadcrumb from '../components/JobsBreadcrumb';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import CenterAligned from '../components/CenterAligned';
import { JobPreference, SUPERMARKET_JOB_PREFERENCES } from '@/constants/supermarketJobOptions';
import JobPreferencesSelector from '../components/JobPreferencesSelector';

const TRANSLATION_KEY = 'userInfo.preferences';

const Preferences: React.FC = () => {
  const { values } = useResponsive();
  const { t } = useTranslation();
  const [selectedPreferences, setSelectedPreferences] = useState<JobPreference[]>([]);

  // Handle selection changes from the JobPreferencesSelector
  const handleSelectionChange = (preferences: JobPreference[]) => {
    setSelectedPreferences(preferences);
    console.log('Selected preferences:', preferences);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Job preferences submitted:', selectedPreferences);
    // Navigate to the next page
    router.push('/(tabs)');
  };

  // Handle back button
  const handleBack = () => {
    router.push('/userDetails/experience');
  };

  return (
    <View style={{ flex: 1 }}>
      <Box
        style={styles.scrollContainer}
      >
        <JobsBreadcrumb currentStep="preferences" />
        
        <Box style={styles.container}>
          <VStack space="xl" style={styles.content}>
            <Heading size="xl" style={styles.heading}>
              {t(`${TRANSLATION_KEY}.title`, 'Job Preferences')}
            </Heading>

            <Text style={styles.encouragementText}>
              {t(
                `${TRANSLATION_KEY}.encouragement`,
                'Select the job roles you are interested in. This helps us find the best matches for you.'
              )}
            </Text>

            <JobPreferencesSelector
              preferences={SUPERMARKET_JOB_PREFERENCES}
              onSelectionChange={handleSelectionChange}
              maxSelections={5}
            />
          </VStack>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <CenterAligned style={styles.buttonContainer}>
      <VStack space="md" style={styles.buttonRow}>
            <GradientButton
              width={"100%"}
              padding={values.buttonPadding}
              fontSize={values.fontSize}
              text="Back"
              colors={["#888", "#666"]}
              onPress={handleBack}
            />

            <GradientButton
              width={"100%"}
              padding={values.buttonPadding}
              fontSize={values.fontSize}
              text="Next"
              onPress={handleSubmit}
              disabled={selectedPreferences.length === 0}
            />
          </VStack>
      </CenterAligned>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  content: {
    width: '100%',
    paddingBottom: 250, // Space for the fixed button container
  },
  heading: {
    textAlign: 'center',
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonContainer:{
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:30,
    left: 0,
    right: 0,
    elevation: 0,
  },
  buttonRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default Preferences;
