'use client';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import {
  JobPreference,
  SUPERMARKET_JOB_PREFERENCES,
} from '@/constants/supermarketJobOptions';
import CenterAligned from '../../components/app-components/CenterAligned';
import JobPreferencesSelector from '../../components/app-components/JobPreferencesSelector';
import JobsBreadcrumb from '../../components/app-components/JobsBreadcrumb';
import { useThemeColor } from '../../hooks/useThemeColor';
import useNavigationGuard from '../../hooks/useNavigationGuard';


const TRANSLATION_KEY = 'userInfo.preferences';

const Preferences: React.FC = () => {
  const { values } = useResponsive();
  const backgroundColor = useThemeColor({}, 'background');
  const { safeReplace } = useNavigationGuard({ debounceTime: 1000 });

  const { t } = useTranslation();
  const [selectedPreferences, setSelectedPreferences] = useState<
    JobPreference[]
  >([]);

  // Handle selection changes from the JobPreferencesSelector
  const handleSelectionChange = (preferences: JobPreference[]) => {
    setSelectedPreferences(preferences);
    console.log('Selected preferences:', preferences);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Job preferences submitted:', selectedPreferences);
    // Navigate to the next page
    // safeReplace('/(tabs)');
    safeReplace({ pathname: '/(tabs)' });

  };

  // Handle back button
  const handleBack = () => {
    router.push('/userDetails/experience');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <Box style={styles.scrollContainer}>
        <JobsBreadcrumb currentStep='preferences' />

        <Box style={styles.container}>
          <VStack space='xl' style={styles.content}>
            <Heading size='xl' style={styles.heading}>
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
        <VStack space='md' style={styles.buttonRow}>
          <GradientButton
            width='100%'
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text='Back'
            colors={['#888', '#666']}
            onPress={handleBack}
          />

          <GradientButton
            width='100%'
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text='Next'
            onPress={handleSubmit}
            disabled={selectedPreferences.length === 0}
          />
        </VStack>
      </CenterAligned>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  buttonRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%', // Space for the fixed button container
  },
  encouragementText: {
    color: '#666',
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  heading: {
    marginBottom: 8,
    textAlign: 'center',
  },
  scrollContainer: {
    backgroundColor: '#FFFFFF',
  },
});

export default Preferences;
