'use client';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { VStack } from '@/components/ui/vstack';


import CenterAligned from '../../components/app-components/CenterAligned';
import JobsBreadcrumb from '../../components/app-components/JobsBreadcrumb';
import ExperienceForm, { Experience } from '../../components/app-components/ExperienceForm';


const TRANSLATION_KEY = 'userInfo.experience';

const ExperienceDetails: React.FC = () => {
  const { values } = useResponsive();
  const { t } = useTranslation();

  // State for experiences
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: '',
      jobTitle: '',
      industry: '',
      companyAddress: '',
      companyCity: '',
      companyArea: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      years: '',
      months: '',
      isCurrent: false,
    },
  ]);

  // State to track if all experiences are valid
  const [areExperiencesValid, setAreExperiencesValid] = useState(false);

  // State to track if user has no experience
  const [hasNoExperience, setHasNoExperience] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    // Check if experiences are valid before submission
    if (!areExperiencesValid) {
      Alert.alert(
        t(`${TRANSLATION_KEY}.missing_information`),
        t(`${TRANSLATION_KEY}.please_complete_all_fields`)
      );
      return;
    }

    console.log('Experience details submitted:', experiences);
    // Navigate to the preferences page
    router.push('/userDetails/prefrences');
  };

  // Handle back button
  const handleBack = () => {
    // Navigate back to education page
    router.push('/userDetails/educations');
  };

  // Handle validation change from the ExperienceForm component
  const handleValidationChange = (isValid: boolean) => {
    setAreExperiencesValid(isValid);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <JobsBreadcrumb currentStep='experience' />
      <Box style={styles.container}>
        {/* Experience Form Component */}
        <CenterAligned>
          <ExperienceForm
            initialExperiences={experiences}
            onExperiencesChange={setExperiences}
            onValidationChange={handleValidationChange}
            initialHasNoExperience={hasNoExperience}
            onHasNoExperienceChange={setHasNoExperience}
          />
        </CenterAligned>

        {/* Navigation Buttons */}
        <VStack style={styles.buttonContainer} space='md'>
          <GradientButton
            width='100%'
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text={t('common.back')}
            colors={['#888', '#666']}
            onPress={handleBack}
          />

          <GradientButton
            width='100%'
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text={t('common.next')}
            onPress={handleSubmit}
          />
        </VStack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 16,
    maxWidth: 520,
    width: '90%',
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});

export default ExperienceDetails;
