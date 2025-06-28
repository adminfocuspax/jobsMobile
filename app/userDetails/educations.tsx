'use client';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelperText,
} from '@/components/ui/form-control';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router, useNavigation } from 'expo-router';
import { EDUCATION_LEVELS, DEGREE_OPTIONS } from '@/constants/educationOptions';
import JobsBreadcrumb from '../../components/app-components/JobsBreadcrumb';
import CenterAligned from '../../components/app-components/CenterAligned';


const TRANSLATION_KEY = 'userInfo.education';

const EducationDetails: React.FC = () => {
  // State for form fields
  const { values, primaryColor, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const styles = createStyles({ primaryColor, isDesktop });
  const [educationLevel, setEducationLevel] = useState('');
  const [degree, setDegree] = useState('');
  const [showDegreeOptions, setShowDegreeOptions] = useState(false);
  const [filteredDegrees, setFilteredDegrees] = useState(DEGREE_OPTIONS);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  // Filter degree options based on input
  const handleDegreeInputChange = (text: string) => {
    setDegree(text);
    if (text.trim() === '') {
      setFilteredDegrees(DEGREE_OPTIONS);
    } else {
      const filtered = DEGREE_OPTIONS.filter(
        option =>
          option.label.toLowerCase().includes(text.toLowerCase()) ||
          option.value.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDegrees(filtered);
    }
    setShowDegreeOptions(true);
  };

  // Select a degree from the suggestions
  const selectDegree = (selectedDegree: string) => {
    setDegree(selectedDegree);
    setShowDegreeOptions(false);
    setIsFullScreenMode(false);
  };

  // Handle focus on degree input
  const handleDegreeFocus = () => {
    setShowDegreeOptions(true);
    setIsFullScreenMode(true);
  };

  // Handle closing the full screen mode
  const handleCloseFullScreen = () => {
    setIsFullScreenMode(false);
    setShowDegreeOptions(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Education details submitted:', { educationLevel, degree });
    // Navigate to the experience page
    router.push('/userDetails/experience');
  };

  // Handle back button
  const handleBack = () => {
    // Navigate back to userInfo within the stack
    router.push('/userDetails/userInfo');
  };

  // Close suggestions when clicking outside
  const handleOutsidePress = () => {
    if (showDegreeOptions && !isFullScreenMode) {
      setShowDegreeOptions(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
        scrollEnabled
        showsVerticalScrollIndicator
      >
        <Pressable onPress={handleOutsidePress} style={{ flex: 1 }}>
          <JobsBreadcrumb currentStep='education' />
          <CenterAligned maxWidth={isDesktop ? 520 : 420}>
            <Box style={styles.container}>
              <VStack space='xl' style={styles.content}>
                <Heading size='xl' style={styles.heading}>
                  {t(`${TRANSLATION_KEY}.education_details`)}
                </Heading>

                <Text style={styles.encouragementText}>
                  {t(`${TRANSLATION_KEY}.education_encouragement`)}
                </Text>

                {/* Education Level Selection */}
                <FormControl size='md'>
                  <FormControlLabel>
                    <FormControlLabelText>
                      {t(`${TRANSLATION_KEY}.education_level`)}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <FormControlHelperText>
                    {t(`${TRANSLATION_KEY}.highest_level_edu`)}
                  </FormControlHelperText>

                  <VStack space='sm' style={styles.educationOptionsContainer}>
                    <HStack style={styles.optionsRow}>
                      {EDUCATION_LEVELS.slice(0, 2).map(option => (
                        <Button
                          key={option.id}
                          variant='outline'
                          action={
                            educationLevel === option.value
                              ? 'primary'
                              : 'secondary'
                          }
                          style={[
                            styles.educationOption,
                            educationLevel === option.value &&
                            styles.selectedOption,
                          ]}
                          onPress={() => setEducationLevel(option.value)}
                        >
                          <ButtonText>
                            {t(`${TRANSLATION_KEY}.${option.value}`)}
                          </ButtonText>
                        </Button>
                      ))}
                    </HStack>

                    <HStack style={styles.optionsRow}>
                      {EDUCATION_LEVELS.slice(2, 4).map(option => (
                        <Button
                          key={option.id}
                          variant='outline'
                          action={
                            educationLevel === option.value
                              ? 'primary'
                              : 'secondary'
                          }
                          style={[
                            styles.educationOption,
                            educationLevel === option.value &&
                            styles.selectedOption,
                          ]}
                          onPress={() => setEducationLevel(option.value)}
                        >
                          <ButtonText>
                            {t(`${TRANSLATION_KEY}.${option.value}`)}
                          </ButtonText>
                        </Button>
                      ))}
                    </HStack>
                    <HStack style={styles.optionsRow}>
                      {EDUCATION_LEVELS.slice(4, 5).map(option => (
                        <Button
                          key={option.id}
                          variant='outline'
                          action={
                            educationLevel === option.value
                              ? 'primary'
                              : 'secondary'
                          }
                          style={[
                            styles.educationOption,
                            educationLevel === option.value &&
                            styles.selectedOption,
                          ]}
                          onPress={() => setEducationLevel(option.value)}
                        >
                          <ButtonText>
                            {t(`${TRANSLATION_KEY}.${option.value}`)}
                          </ButtonText>
                        </Button>
                      ))}
                    </HStack>
                  </VStack>
                </FormControl>

                {/* Degree Input with Suggestions */}
                {(educationLevel === 'graduation' ||
                  educationLevel === 'post_graduate') && (
                    <FormControl size='md'>
                      <FormControlLabel>
                        <FormControlLabelText>
                          {t(`${TRANSLATION_KEY}.degree_optional`)}
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          placeholder='Enter your degree (e.g., B.Tech, MBA)'
                          value={degree}
                          onChangeText={handleDegreeInputChange}
                          onFocus={handleDegreeFocus}
                        />
                      </Input>
                      <FormControlHelperText>
                        {t(`${TRANSLATION_KEY}.specify_degree`)}
                      </FormControlHelperText>
                    </FormControl>
                  )}

                {/* Full Screen Degree Selection */}
                {isFullScreenMode && (
                  <Box style={styles.fullScreenOverlay}>
                    <Box style={styles.fullScreenContent}>
                      <HStack style={styles.fullScreenHeader}>
                        <Text style={styles.fullScreenTitle}>
                          Select Your Degree
                        </Text>
                        <Pressable
                          onPress={handleCloseFullScreen}
                          style={styles.closeButton}
                        >
                          <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                      </HStack>

                      <Input style={styles.fullScreenSearchInput}>
                        <InputField
                          placeholder='Search for your degree'
                          value={degree}
                          onChangeText={handleDegreeInputChange}
                          autoFocus
                          onSubmitEditing={() => {
                            if (filteredDegrees.length > 0) {
                              // Select the first matching degree when Enter is pressed
                              selectDegree(filteredDegrees[0].value);
                            }
                          }}
                          returnKeyType='done'
                        />
                      </Input>

                      <ScrollView
                        style={styles.fullScreenScrollView}
                        keyboardShouldPersistTaps='handled'
                        scrollEnabled
                        showsVerticalScrollIndicator
                        contentContainerStyle={{ paddingBottom: 20 }}
                      >
                        {filteredDegrees.length > 0 ? (
                          filteredDegrees.map(option => (
                            <Pressable
                              key={option.id}
                              style={styles.fullScreenItem}
                              onPress={() => selectDegree(option.value)}
                            >
                              <Text style={styles.fullScreenItemText}>
                                {option.label}
                              </Text>
                            </Pressable>
                          ))
                        ) : (
                          <Pressable
                            key={degree}
                            style={styles.fullScreenItem}
                            onPress={() => selectDegree(degree)}
                          >
                            <Text style={styles.fullScreenItemText}>
                              {degree}
                            </Text>
                          </Pressable>
                        )}
                      </ScrollView>
                    </Box>
                  </Box>
                )}
              </VStack>
            </Box>
          </CenterAligned>
        </Pressable>
        {/* Navigation Buttons - Fixed at bottom */}
        <Box style={styles.buttonContainer}>
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
              disabled={!educationLevel}
            />
          </VStack>
        </Box>
      </ScrollView>
    </View>
  );
};

const createStyles = ({ primaryColor, isDesktop }: { primaryColor: string, isDesktop: boolean }) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 24,
      paddingBottom: 100, // Add extra padding at the bottom for the fixed button container
      minHeight: '100%',
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-between',
    },
    container: {
      backgroundColor: '#FFFFFF',
      minHeight: '100%',
      padding: 16,
      width: '100%',
    },
    content: {
      paddingBottom: 20,
      width: '100%',
    },
    heading: {
      marginBottom: 8,
      textAlign: 'center',
    },
    encouragementText: {
      color: '#666',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
    },
    educationOptionsContainer: {
      marginTop: 12,
      width: '100%',
    },
    optionsRow: {
      justifyContent: 'space-between',
      width: '100%',
    },
    educationOption: {
      borderColor: '#ccc',
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      height: 70,
      justifyContent: 'center',
      marginHorizontal: 4,
      minHeight: 70,
    },
    selectedOption: {
      borderColor: primaryColor,
      borderWidth: 2,
    },
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      elevation: 0,
      justifyContent: 'center',
      position: 'absolute',
      paddingVertical: 16,
      bottom: 40,
      width: '100%',
    },
    buttonRow: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      marginHorizontal: 'auto',
      maxWidth: 520,
      paddingHorizontal: 16,
      width: '90%',
    },
    // Full screen styles
    fullScreenOverlay: {
      backgroundColor: '#FFFFFF',
      bottom: 0,
      elevation: 5,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 2000,
    },
    fullScreenContent: {
      flex: 1,
      height: '100%',
      padding: 16,
    },
    fullScreenHeader: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    fullScreenTitle: {
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      color: '#666',
      fontSize: 20,
    },
    fullScreenSearchInput: {
      borderColor: '#ddd',
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 16,
    },
    fullScreenScrollView: {
      flex: 1,
      height: '100%',
    },
    fullScreenItem: {
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    fullScreenItemText: {
      color: '#333',
      fontSize: 16,
    },
    noResultsText: {
      color: '#666',
      fontSize: 16,
      padding: 20,
      textAlign: 'center',
    },
  });

export default EducationDetails;
