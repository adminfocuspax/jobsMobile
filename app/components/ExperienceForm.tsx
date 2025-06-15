import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelperText,
} from '@/components/ui/form-control';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import {
  JOB_TITLES,
  INDUSTRIES_EXPERIENCED_IN,
} from '@/constants/experienceOptions';
import {
  AddIcon,
  Icon,
  TrashIcon,
  ChevronDownIcon,
} from '@/components/ui/icon';
import { useResponsive } from '@/context/ResponsiveContext';

const TRANSLATION_KEY = 'userInfo.experience';

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  industry?: string; // Industry field
  companyAddress?: string; // Optional company address
  companyCity?: string; // Optional company city
  companyArea?: string; // Optional company area/region
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  years: string; // Keep for backward compatibility and total calculation
  months: string; // Keep for backward compatibility and total calculation
}

interface ExperienceFormProps {
  initialExperiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
  onValidationChange?: (isValid: boolean) => void;
  initialHasNoExperience?: boolean;
  onHasNoExperienceChange?: (hasNoExperience: boolean) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  initialExperiences,
  onExperiencesChange,
  onValidationChange,
  initialHasNoExperience = false,
  onHasNoExperienceChange,
}) => {
  const { t } = useTranslation();
  const { primaryColor } = useResponsive();
  const styles = createStyles(primaryColor);

  // State for experiences
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);

  // State for job title suggestions
  const [showJobTitleOptions, setShowJobTitleOptions] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<
    string | null
  >(null);
  const [filteredJobTitles, setFilteredJobTitles] = useState(JOB_TITLES);
  const [totalExperience, setTotalExperience] = useState({
    years: 0,
    months: 0,
  });
  const [isFormValid, setIsFormValid] = useState(true); // Track form validation status
  const [hasNoExperience, setHasNoExperience] = useState(
    initialHasNoExperience
  ); // Track if user has no experience

  // Validate all experiences
  const validateExperiences = (exps: Experience[]): boolean => {
    // If user has selected "No Experience", the form is valid regardless of other fields
    if (hasNoExperience) return true;

    // If there are no experiences, that's not valid unless "No Experience" is checked
    if (exps.length === 0) return false;

    // Check each experience for required fields
    for (const exp of exps) {
      // Company name is required
      if (!exp.company.trim()) {
        return false;
      }

      // Job title is required
      if (!exp.jobTitle.trim()) {
        return false;
      }

      // Start date is required
      if (!exp.startMonth || !exp.startYear) {
        return false;
      }

      // End date is required if not current job
      if (!exp.isCurrent && (!exp.endMonth || !exp.endYear)) {
        return false;
      }

      // If both start and end dates are provided, validate that end date is after start date
      if (
        !exp.isCurrent &&
        exp.startMonth &&
        exp.startYear &&
        exp.endMonth &&
        exp.endYear
      ) {
        const startDate = new Date(
          parseInt(exp.startYear),
          parseInt(exp.startMonth) - 1
        );
        const endDate = new Date(
          parseInt(exp.endYear),
          parseInt(exp.endMonth) - 1
        );

        if (endDate < startDate) {
          return false;
        }
      }
    }

    return true;
  };

  // Handle "No Experience" checkbox change
  const handleNoExperienceChange = (value: boolean) => {
    setHasNoExperience(value);

    // Notify parent component if callback is provided
    if (onHasNoExperienceChange) {
      onHasNoExperienceChange(value);
    }
  };

  // Calculate total experience whenever experiences change
  useEffect(() => {
    let totalYears = 0;
    let totalMonths = 0;

    experiences.forEach(exp => {
      totalYears += parseInt(exp.years || '0');
      totalMonths += parseInt(exp.months || '0');
    });

    // Convert excess months to years
    if (totalMonths >= 12) {
      totalYears += Math.floor(totalMonths / 12);
      totalMonths %= 12;
    }

    setTotalExperience({ years: totalYears, months: totalMonths });

    // Validate experiences and update state
    const valid = validateExperiences(experiences);
    setIsFormValid(valid);

    // Notify parent components of changes
    onExperiencesChange(experiences);
    if (onValidationChange) {
      onValidationChange(valid);
    }
  }, [
    experiences,
    hasNoExperience,
    onExperiencesChange,
    onValidationChange,
    onHasNoExperienceChange,
  ]);

  // Add a new experience entry
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
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
  };

  // Remove an experience entry
  const removeExperience = (id: string) => {
    if (experiences.length === 1) {
      Alert.alert(
        t(`${TRANSLATION_KEY}.cannot_remove`),
        t(`${TRANSLATION_KEY}.min_experience_required`)
      );
      return;
    }
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  // Update experience field
  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setExperiences(
      experiences.map(exp => {
        if (exp.id !== id) return exp;

        const updatedExp = { ...exp, [field]: value };

        // Calculate duration if start and end dates are set
        if (
          ['startMonth', 'startYear', 'endMonth', 'endYear'].includes(
            field as string
          ) ||
          field === 'isCurrent'
        ) {
          const { startMonth, startYear, endMonth, endYear, isCurrent } =
            updatedExp;

          // Only calculate if we have valid start date
          if (startMonth && startYear) {
            const start = new Date(
              parseInt(startYear),
              parseInt(startMonth) - 1
            );
            let end;

            if (isCurrent) {
              // If current job, use current date
              end = new Date();
            } else if (endMonth && endYear) {
              // If end date provided, use it
              end = new Date(parseInt(endYear), parseInt(endMonth) - 1);
            } else {
              // If no valid end date, don't calculate
              return updatedExp;
            }

            // Calculate difference in months
            const diffMonths =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth());

            // Convert to years and months
            const years = Math.floor(diffMonths / 12).toString();
            const months = (diffMonths % 12).toString();

            return { ...updatedExp, years, months };
          }
        }

        return updatedExp;
      })
    );
  };

  // Filter job title options based on input
  const handleJobTitleInputChange = (id: string, text: string) => {
    updateExperience(id, 'jobTitle', text);

    if (text.trim() === '') {
      setFilteredJobTitles(JOB_TITLES);
    } else {
      const filtered = JOB_TITLES.filter(
        option =>
          option.label.toLowerCase().includes(text.toLowerCase()) ||
          option.value.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredJobTitles(filtered);
    }

    setSelectedExperienceId(id);
    setShowJobTitleOptions(true);
  };

  // Select a job title from the suggestions
  const selectJobTitle = (id: string, selectedTitle: string) => {
    updateExperience(id, 'jobTitle', selectedTitle);
    setShowJobTitleOptions(false);
    setSelectedExperienceId(null);
  };

  // Close suggestions when clicking outside
  const handleOutsidePress = () => {
    if (showJobTitleOptions) {
      setShowJobTitleOptions(false);
      setSelectedExperienceId(null);
    }
  };

  return (
    <VStack space='xl' style={styles.content} onTouchStart={handleOutsidePress}>
      <Heading size='xl' style={styles.heading}>
        {t(`${TRANSLATION_KEY}.experience_details`, 'Work Experience')}
      </Heading>

      <Text style={styles.encouragementText}>
        {t(
          `${TRANSLATION_KEY}.experience_encouragement`,
          'Tell us about your work experience to help us find the best job matches for you.'
        )}
      </Text>

      {/* No Experience Checkbox */}
      <FormControl size='md' style={styles.noExperienceContainer}>
        <HStack space='sm'>
          <Pressable
            style={[styles.checkbox, hasNoExperience && styles.checkboxChecked]}
            onPress={() => handleNoExperienceChange(!hasNoExperience)}
          >
            {hasNoExperience && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={styles.noExperienceText}>
            {t(
              `${TRANSLATION_KEY}.no_experience`,
              "I don't have any work experience"
            )}
          </Text>
        </HStack>
      </FormControl>

      {/* Total Experience Summary - Only show if not "No Experience" */}
      {!hasNoExperience && (
        <Box style={styles.totalExperienceBox}>
          <Text style={styles.totalExperienceText}>
            {t(`${TRANSLATION_KEY}.total_experience`, {
              years: totalExperience.years,
              yearPlural: totalExperience.years !== 1 ? 's' : '',
              months: totalExperience.months > 0 ? totalExperience.months : '',
              monthPlural: totalExperience.months !== 1 ? 's' : '',
            })}
          </Text>
        </Box>
      )}

      {/* Experience Entries - Only show if not "No Experience" */}
      {!hasNoExperience &&
        experiences.map((experience, index) => (
          <Box key={experience.id} style={styles.experienceCard}>
            <HStack style={styles.experienceHeader}>
              <Text style={styles.experienceTitle}>
                {t(`${TRANSLATION_KEY}.experience_number`, {
                  number: index + 1,
                })}
              </Text>
              {experiences.length > 1 && (
                <Button
                  variant='link'
                  onPress={() => removeExperience(experience.id)}
                  style={styles.removeButton}
                >
                  <ButtonIcon as={TrashIcon} color={primaryColor} />
                </Button>
              )}
            </HStack>

            {/* Company Name */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.company_name`)}
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder={t(`${TRANSLATION_KEY}.company_name_placeholder`)}
                  value={experience.company}
                  onChangeText={text =>
                    updateExperience(experience.id, 'company', text)
                  }
                />
              </Input>
            </FormControl>

            {/* Company Address (Optional) */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.company_address`)}
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder={t(
                    `${TRANSLATION_KEY}.company_address_placeholder`
                  )}
                  value={experience.companyAddress}
                  onChangeText={text =>
                    updateExperience(experience.id, 'companyAddress', text)
                  }
                />
              </Input>
            </FormControl>

            {/* Company City and Area (Optional) */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.city_area`)}
                </FormControlLabelText>
              </FormControlLabel>
              <HStack space='md'>
                <Input style={{ flex: 1 }}>
                  <InputField
                    placeholder={t(`${TRANSLATION_KEY}.city_placeholder`)}
                    value={experience.companyCity}
                    onChangeText={text =>
                      updateExperience(experience.id, 'companyCity', text)
                    }
                  />
                </Input>
                <Input style={{ flex: 1 }}>
                  <InputField
                    placeholder={t(`${TRANSLATION_KEY}.area_placeholder`)}
                    value={experience.companyArea}
                    onChangeText={text =>
                      updateExperience(experience.id, 'companyArea', text)
                    }
                  />
                </Input>
              </HStack>
            </FormControl>

            {/* Job Title */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.job_title`)}
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder={t(`${TRANSLATION_KEY}.job_title_placeholder`)}
                  value={experience.jobTitle}
                  onChangeText={text =>
                    handleJobTitleInputChange(experience.id, text)
                  }
                />
              </Input>

              {/* Job Title Suggestions */}
              {showJobTitleOptions &&
                selectedExperienceId === experience.id && (
                  <Box style={styles.suggestionsContainer}>
                    <ScrollView
                      style={styles.suggestionsScrollView}
                      keyboardShouldPersistTaps='handled'
                      nestedScrollEnabled
                    >
                      {filteredJobTitles.length > 0 ? (
                        filteredJobTitles.map(option => (
                          <Pressable
                            key={option.id}
                            style={styles.suggestionItem}
                            onPress={() =>
                              selectJobTitle(experience.id, option.value)
                            }
                          >
                            <Text style={styles.suggestionText}>
                              {option.label}
                            </Text>
                          </Pressable>
                        ))
                      ) : (
                        <Text style={styles.noResultsText}>
                          {t(`${TRANSLATION_KEY}.no_matching_jobs`)}
                        </Text>
                      )}
                    </ScrollView>
                  </Box>
                )}
            </FormControl>

            {/* Industry Selection */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.industry`)}
                </FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={experience.industry}
                onValueChange={(value: string | boolean) =>
                  updateExperience(experience.id, 'industry', value)
                }
              >
                <SelectTrigger variant='outline' size='md'>
                  <SelectInput
                    placeholder={t(`${TRANSLATION_KEY}.select_industry`)}
                  />
                  <SelectIcon>
                    <ChevronDownIcon />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {INDUSTRIES_EXPERIENCED_IN.map(option => (
                      <SelectItem
                        key={option.id}
                        label={t(`${TRANSLATION_KEY}.${option.label}`)}
                        value={option.value}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            {/* Start Date */}
            <FormControl size='md' style={styles.formField}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t(`${TRANSLATION_KEY}.start_date`)}
                </FormControlLabelText>
              </FormControlLabel>
              <HStack space='md'>
                <Input style={styles.durationInput}>
                  <InputField
                    placeholder='Month (1-12)'
                    value={experience.startMonth}
                    onChangeText={text => {
                      // Only allow numbers and limit to 1-12
                      const numericValue = text.replace(/[^0-9]/g, '');
                      if (numericValue === '') {
                        updateExperience(experience.id, 'startMonth', '');
                      } else {
                        const month = Math.min(
                          Math.max(parseInt(numericValue), 1),
                          12
                        ).toString();
                        updateExperience(experience.id, 'startMonth', month);
                      }
                    }}
                    keyboardType='numeric'
                  />
                </Input>
                <Input style={styles.durationInput}>
                  <InputField
                    placeholder='Year (YYYY)'
                    value={experience.startYear}
                    onChangeText={text => {
                      // Only allow numbers and limit to reasonable years
                      const numericValue = text.replace(/[^0-9]/g, '');
                      if (numericValue.length <= 4) {
                        updateExperience(
                          experience.id,
                          'startYear',
                          numericValue
                        );
                      }
                    }}
                    keyboardType='numeric'
                    maxLength={4}
                  />
                </Input>
              </HStack>
              <FormControlHelperText>
                {t(`${TRANSLATION_KEY}.start_date_helper`)}
              </FormControlHelperText>
            </FormControl>

            {/* Current Job Checkbox */}
            <FormControl size='md' style={styles.formField}>
              <HStack space='sm'>
                <Pressable
                  style={[
                    styles.checkbox,
                    experience.isCurrent && styles.checkboxChecked,
                  ]}
                  onPress={() =>
                    updateExperience(
                      experience.id,
                      'isCurrent',
                      !experience.isCurrent
                    )
                  }
                >
                  {experience.isCurrent && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
                <Text>{t(`${TRANSLATION_KEY}.current_job`)}</Text>
              </HStack>
            </FormControl>

            {/* End Date - Only show if not current job */}
            {!experience.isCurrent && (
              <FormControl size='md' style={styles.formField}>
                <FormControlLabel>
                  <FormControlLabelText>
                    {t(`${TRANSLATION_KEY}.end_date`)}
                  </FormControlLabelText>
                </FormControlLabel>
                <HStack space='md'>
                  <Input style={styles.durationInput}>
                    <InputField
                      placeholder='Month (1-12)'
                      value={experience.endMonth}
                      onChangeText={text => {
                        // Only allow numbers and limit to 1-12
                        const numericValue = text.replace(/[^0-9]/g, '');
                        if (numericValue === '') {
                          updateExperience(experience.id, 'endMonth', '');
                        } else {
                          const month = Math.min(
                            Math.max(parseInt(numericValue), 1),
                            12
                          ).toString();
                          updateExperience(experience.id, 'endMonth', month);
                        }
                      }}
                      keyboardType='numeric'
                    />
                  </Input>
                  <Input style={styles.durationInput}>
                    <InputField
                      placeholder='Year (YYYY)'
                      value={experience.endYear}
                      onChangeText={text => {
                        // Only allow numbers and limit to reasonable years
                        const numericValue = text.replace(/[^0-9]/g, '');
                        if (numericValue.length <= 4) {
                          updateExperience(
                            experience.id,
                            'endYear',
                            numericValue
                          );
                        }
                      }}
                      keyboardType='numeric'
                      maxLength={4}
                    />
                  </Input>
                </HStack>
                <FormControlHelperText>
                  {t(`${TRANSLATION_KEY}.end_date_helper`)}
                </FormControlHelperText>
              </FormControl>
            )}

            {/* Duration Display - Show calculated duration */}
            {experience.startMonth &&
              experience.startYear &&
              (experience.isCurrent ||
                (experience.endMonth && experience.endYear)) && (
                <Box style={styles.durationDisplay}>
                  <Text style={styles.durationText}>
                    {t(`${TRANSLATION_KEY}.duration`, {
                      years: experience.years || '0',
                      yearPlural: experience.years !== '1' ? 's' : '',
                      months:
                        experience.months && experience.months !== '0'
                          ? experience.months
                          : '',
                      monthPlural: experience.months !== '1' ? 's' : '',
                    })}
                  </Text>
                </Box>
              )}
          </Box>
        ))}

      {/* Add Experience Button - Only show if not "No Experience" */}
      {!hasNoExperience && (
        <Button
          variant='outline'
          style={styles.addButton}
          onPress={addExperience}
        >
          {/* <ButtonIcon as={AddIcon} style={{ marginRight: 8, width:12 }} /> */}
          <Icon as={AddIcon} size='xs' />
          <ButtonText>{t(`${TRANSLATION_KEY}.add_experience`)}</ButtonText>
        </Button>
      )}
    </VStack>
  );
};

const createStyles = (primaryColor: string) =>
  StyleSheet.create({
    addButton: {
      marginBottom: 24,
      marginTop: 8,
    },
    checkbox: {
      alignItems: 'center',
      borderColor: '#666',
      borderRadius: 4,
      borderWidth: 2,
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    checkboxChecked: {
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    checkmark: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      width: '100%',
    },
    durationDisplay: {
      backgroundColor: '#f0f8ff',
      borderRadius: 6,
      marginTop: 8,
      padding: 12,
    },
    durationInput: {
      flex: 1,
    },
    durationText: {
      color: '#333',
      fontSize: 14,
      textAlign: 'center',
    },
    encouragementText: {
      color: '#666',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
    },
    experienceCard: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 16,
      padding: 16,
    },
    experienceHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    experienceTitle: {
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    },
    formField: {
      marginBottom: 16,
    },
    heading: {
      marginBottom: 8,
      textAlign: 'center',
    },
    noExperienceContainer: {
      marginBottom: 16,
    },
    noExperienceText: {
      color: '#333',
      fontSize: 16,
    },
    noResultsText: {
      color: '#666',
      padding: 12,
      textAlign: 'center',
    },
    removeButton: {
      padding: 0,
    },
    suggestionItem: {
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      padding: 12,
    },
    suggestionText: {
      fontSize: 14,
    },
    suggestionsContainer: {
      backgroundColor: '#FFF',
      borderColor: '#ddd',
      borderRadius: 4,
      borderWidth: 1,
      elevation: 5,
      left: 0,
      marginTop: 4,
      maxHeight: 200,
      opacity: 1,
      right: 0,
      zIndex: 8000,
    },
    suggestionsScrollView: {
      maxHeight: 200,
    },
    totalExperienceBox: {
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
    },
    totalExperienceText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ExperienceForm;
