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

const TRANSLATION_KEY = 'userInfo.preferences';

const Preferences: React.FC = () => {
  // State for form fields
  const { values, primaryColor } = useResponsive();
  const { t } = useTranslation();
  
  // Handle form submission
  const handleSubmit = () => {
    console.log('Preferences submitted');
    // Navigate to the next page or complete the profile
    router.push('/');
  };

  // Handle back button
  const handleBack = () => {
    // Navigate back to experience page
    router.push('/userDetails/experience');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <JobsBreadcrumb currentStep="preferences" />
      <Box style={styles.container}>
        <VStack space="xl" style={styles.content}>
          <Heading size="xl" style={styles.heading}>Your Preferences</Heading>
          
          <Text style={styles.encouragementText}>
            Tell us about your job preferences to help us find the best matches for you.
          </Text>
          
          {/* Preferences content would go here */}
          <Text>Preferences form will be implemented here.</Text>
        </VStack>

        {/* Navigation Buttons */}
        <HStack style={styles.buttonContainer} space="md">
          <GradientButton
            width={values.buttonWidth / 2.2}
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text="Back"
            colors={["#888", "#666"]}
            onPress={handleBack}
          />
          
          <GradientButton
            width={values.buttonWidth / 2.2}
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text="Complete"
            onPress={handleSubmit}
          />
        </HStack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    width: '100%',
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
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
  },
});

export default Preferences;
