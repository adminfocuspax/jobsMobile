'use client';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import JobsBreadcrumb from './JobsBreadcrumb';
import { BreadcrumbItem } from './Breadcrumb';

const BreadcrumbExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<
    'profile' | 'preferences' | 'jobs'
  >('profile');

  const handleBreadcrumbPress = (item: BreadcrumbItem) => {
    if (item.label === 'Profile') {
      setCurrentStep('profile');
    } else if (item.label === 'Preferences') {
      setCurrentStep('preferences');
    } else if (item.label === 'See Jobs') {
      setCurrentStep('jobs');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'profile') {
      setCurrentStep('preferences');
    } else if (currentStep === 'preferences') {
      setCurrentStep('jobs');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'jobs') {
      setCurrentStep('preferences');
    } else if (currentStep === 'preferences') {
      setCurrentStep('profile');
    }
  };

  return (
    <View style={styles.container}>
      <JobsBreadcrumb
        currentStep={currentStep}
        onItemPress={handleBreadcrumbPress}
      />

      <View style={styles.content}>
        <Text size='xl' bold style={styles.title}>
          {currentStep === 'profile' && 'Complete Your Profile'}
          {currentStep === 'preferences' && 'Set Your Preferences'}
          {currentStep === 'jobs' && 'Available Jobs'}
        </Text>

        <Text style={styles.description}>
          {currentStep === 'profile' &&
            'Please fill in your personal information to continue.'}
          {currentStep === 'preferences' &&
            'Select your job preferences to find the best matches.'}
          {currentStep === 'jobs' &&
            'Browse through available job opportunities.'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {currentStep !== 'profile' && (
          <Button
            variant='outline'
            onPress={handlePreviousStep}
            style={styles.button}
          >
            <ButtonText>Previous</ButtonText>
          </Button>
        )}

        {currentStep !== 'jobs' && (
          <Button onPress={handleNextStep} style={styles.button}>
            <ButtonText>Next</ButtonText>
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
  },
  buttonContainer: {
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  description: {
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default BreadcrumbExample;
