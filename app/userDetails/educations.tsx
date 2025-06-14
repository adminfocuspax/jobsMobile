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
import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelperText } from '@/components/ui/form-control';
import JobsBreadcrumb from '../components/JobsBreadcrumb';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router, useNavigation } from 'expo-router';
import { EDUCATION_LEVELS, DEGREE_OPTIONS } from '@/constants/educationOptions';
import CenterAligned from '../components/CenterAligned';
const TRANSLATION_KEY = 'userInfo.education';

const EducationDetails: React.FC = () => {
  // State for form fields
  const { values, primaryColor } = useResponsive();
  const { t } = useTranslation();
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
      const filtered = DEGREE_OPTIONS.filter(option =>
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
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        <Pressable onPress={handleOutsidePress} style={{ flex: 1 }}>
          <JobsBreadcrumb currentStep="education" />
          <CenterAligned >
          <Box style={styles.container}>
            <VStack space="xl" style={styles.content}>
              <Heading size="xl" style={styles.heading}>{t(`${TRANSLATION_KEY}.education_details`)}</Heading>

              <Text style={styles.encouragementText}>
                {t(`${TRANSLATION_KEY}.education_encouragement`)}
              </Text>

              {/* Education Level Selection */}
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>{t(`${TRANSLATION_KEY}.education_level`)}</FormControlLabelText>
                </FormControlLabel>
                <FormControlHelperText>
                  {t(`${TRANSLATION_KEY}.highest_level_edu`)}
                </FormControlHelperText>

                <VStack space="sm" style={styles.educationOptionsContainer}>
                  <HStack style={styles.optionsRow}>
                    {EDUCATION_LEVELS.slice(0, 2).map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        action={educationLevel === option.value ? 'primary' : 'secondary'}
                        style={[
                          styles.educationOption,
                          educationLevel === option.value && styles.selectedOption
                        ]}
                        onPress={() => setEducationLevel(option.value)}
                      >
                        <ButtonText>{t(`${TRANSLATION_KEY}.${option.value}`)}</ButtonText>
                      </Button>
                    ))}
                  </HStack>

                  <HStack style={styles.optionsRow}>
                    {EDUCATION_LEVELS.slice(2, 4).map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        action={educationLevel === option.value ? 'primary' : 'secondary'}
                        style={[
                          styles.educationOption,
                          educationLevel === option.value && styles.selectedOption
                        ]}
                        onPress={() => setEducationLevel(option.value)}
                      >
                        <ButtonText>{t(`${TRANSLATION_KEY}.${option.value}`)}</ButtonText>
                      </Button>
                    ))}
                  </HStack>
                  <HStack style={styles.optionsRow}>
                    {EDUCATION_LEVELS.slice(4, 5).map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        action={educationLevel === option.value ? 'primary' : 'secondary'}
                        style={[
                          styles.educationOption,
                          educationLevel === option.value && styles.selectedOption
                        ]}
                        onPress={() => setEducationLevel(option.value)}
                      >
                         <ButtonText>{t(`${TRANSLATION_KEY}.${option.value}`)}</ButtonText>
                      </Button>
                    ))}
                  </HStack>
                </VStack>
              </FormControl>

              {/* Degree Input with Suggestions */}
              {(educationLevel === 'graduation' || (educationLevel === 'post_graduate')) && (
                <FormControl size="md">
                  <FormControlLabel>
                    <FormControlLabelText>{t(`${TRANSLATION_KEY}.degree_optional`)}</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Enter your degree (e.g., B.Tech, MBA)"
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
                      <Text style={styles.fullScreenTitle}>Select Your Degree</Text>
                      <Pressable onPress={handleCloseFullScreen} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                      </Pressable>
                    </HStack>

                    <Input style={styles.fullScreenSearchInput}>
                      <InputField
                        placeholder="Search for your degree"
                        value={degree}
                        onChangeText={handleDegreeInputChange}
                        autoFocus
                        onSubmitEditing={() => {
                          if (filteredDegrees.length > 0) {
                            // Select the first matching degree when Enter is pressed
                            selectDegree(filteredDegrees[0].value);
                          }
                        }}
                        returnKeyType="done"
                      />
                    </Input>

                    <ScrollView
                      style={styles.fullScreenScrollView}
                      keyboardShouldPersistTaps="handled"
                      scrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={{ paddingBottom: 20 }}
                    >
                      {filteredDegrees.length > 0 ? (
                        filteredDegrees.map((option) => (
                          <Pressable
                            key={option.id}
                            style={styles.fullScreenItem}
                            onPress={() => selectDegree(option.value)}
                          >
                            <Text style={styles.fullScreenItemText}>{option.label}</Text>
                          </Pressable>
                        ))
                      ) : (
                        <Pressable
                        key={degree}
                        style={styles.fullScreenItem}
                        onPress={() => selectDegree(degree)}
                      >
                        <Text style={styles.fullScreenItemText}>{degree}</Text>
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
            disabled={!educationLevel}
          />
        </VStack>
      </Box>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,  
    paddingBottom: 100, // Add extra padding at the bottom for the fixed button container
    minHeight: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',

  },
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
    minHeight: '100%',

  },
  content: {
    width: '100%',
    paddingBottom: 20,
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
  },
  educationOptionsContainer: {
    marginTop: 12,
    width: '100%',
  },
  optionsRow: {
    width: '100%',
    justifyContent: 'space-between',
  },
  educationOption: {
    flex: 1,
    marginHorizontal: 4,
    height: 70,
    minHeight: 70,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    borderColor: '#CC0000',
    borderWidth: 2,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:50,
    left: 0,
    right: 0,
    elevation: 0,
  },
  buttonRow: {
    maxWidth: 520,
    width:'90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal:"auto",
  },
  // Full screen styles
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 2000,
    elevation: 5,
  },
  fullScreenContent: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
  fullScreenHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  fullScreenSearchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  fullScreenScrollView: {
    flex: 1,
    height: '100%',
  },
  fullScreenItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fullScreenItemText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default EducationDetails;