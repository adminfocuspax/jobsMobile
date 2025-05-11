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
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import ProfileAvatar from '../components/ProfileAvatar';
import JobsBreadcrumb from '../components/JobsBreadcrumb';
import { GradientButton } from '@/components/ui/GradientButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import CenterAligned from '../components/CenterAligned';

const UserInfo: React.FC = () => {
  // State for form fields
  const { values, primaryColor } = useResponsive();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted:', { fullName, email, age, gender });
    // Navigate to the education page
    router.push('/userDetails/educations');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <JobsBreadcrumb currentStep="profile" />
      <Box style={styles.container}>
        <CenterAligned >
          <VStack space="xl" style={styles.content}>
            <Heading size="xl" style={styles.heading}>Complete Your Profile</Heading>

            {/* Profile Avatar */}
            <Box style={styles.avatarContainer}>
              <ProfileAvatar
                size="xl"
                className="mb-0"
                showChangeText={true}
              />
            </Box>
            {/* Full Name Input */}
            <FormControl size="md">
              <FormControlLabel>
                <FormControlLabelText>Full Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </Input>
            </FormControl>

            {/* Email Input */}
            <FormControl size="md">
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>
            </FormControl>

            {/* Age Input */}
            <FormControl size="md">
              <FormControlLabel>
                <FormControlLabelText>Age</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Enter your age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                />
              </Input>
            </FormControl>

            {/* Gender Selection */}
            <FormControl size="md">
              <FormControlLabel>
                <FormControlLabelText>Gender</FormControlLabelText>
              </FormControlLabel>
              <VStack space="sm" style={styles.genderContainer}>
                <Pressable
                  style={Object.assign({},
                    styles.radioOption,
                    gender === 'male' ? styles.radioOptionSelected : {}
                  )}
                  onPress={() => setGender('male')}
                >
                  <Box style={Object.assign({},
                    styles.radioCircle,
                    gender === 'male' ? { borderColor: primaryColor } : {}
                  )}>
                    {gender === 'male' && <Box style={styles.radioInnerCircle} />}
                  </Box>
                  <Text style={styles.radioText}>Male</Text>
                </Pressable>
                <Pressable
                  style={Object.assign({},
                    styles.radioOption,
                    gender === 'female' ? styles.radioOptionSelected : {}
                  )}
                  onPress={() => setGender('female')}
                >
                  <Box style={Object.assign({},
                    styles.radioCircle,
                    gender === 'female' ? { borderColor: primaryColor } : {}
                  )}>
                    {gender === 'female' && <Box style={styles.radioInnerCircle} />}
                  </Box>
                  <Text style={styles.radioText}>Female</Text>
                </Pressable>

                <Pressable
                  style={Object.assign({},
                    styles.radioOption,
                    gender === 'other' ? styles.radioOptionSelected : {}
                  )}
                  onPress={() => setGender('other')}
                >
                  <Box style={Object.assign({},
                    styles.radioCircle,
                    gender === 'other' ? { borderColor: primaryColor } : {}
                  )}>
                    {gender === 'other' && <Box style={styles.radioInnerCircle} />}
                  </Box>
                  <Text style={styles.radioText}>Other</Text>
                </Pressable>
              </VStack>
            </FormControl>
          </VStack>
        {/* Next Button */}
  
        </CenterAligned>


      </Box>
          <Box style={styles.buttonContainer}>
          <GradientButton
            width={"100%"}
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text={t('common.next')}
            onPress={handleSubmit}
            disabled={false}
          />
        </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,

  },
  content: {
    flex: 1,
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 0,
  },
  formContainer: {

  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  genderContainer: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioOptionSelected: {
    // You can add styles for the selected option if needed
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#000",
    marginRight: 10,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c00',
    backgroundColor: 'white',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '90%',
    paddingVertical: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 520,
    marginHorizontal:'auto',
    alignSelf:"center",
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5',
  },
});

export default UserInfo;