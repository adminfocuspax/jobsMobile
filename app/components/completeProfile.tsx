'use client';
import React from 'react';
import { View, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { Card } from '@/components/ui/card';
import ProfileAvatar from './ProfileAvatar';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';



const CompleteProfile: React.FC = () => {
  // Calculate the border percentage for the avatar
  const profilePercentage = 10;

  // Default handler if no onProfilePress is provided

  return (
    <Card style={styles.completeSetup} size="sm" variant="elevated" className='p-0 m-0'>
      <HStack space="md" reversed={false}>
        <Box className="h-20 w-20 mt-4"> 
          {/* Using the new ProfileAvatar component */}
          <ProfileAvatar 
            size="lg" 
          />
        </Box>
        <Box className="h-20 w-70 mt-4">
          <Heading size="sm" className="mb-1">
            Complete your profile
          </Heading>
          <Text size="sm">to match more jobs</Text>
          {/* Display profile completion percentage */}
          <Text size="xs" className="text-gray-500 mt-1">
            {profilePercentage}% complete
          </Text>
        </Box>
        <TouchableOpacity className="h-20 w-10 flex justify-center items-end mt-6" onPress={() => null}>
        <Box >
          <View style={styles.iconContainer}>
            <Icon as={ChevronRightIcon} size="md" />
          </View>
        </Box>
        </TouchableOpacity>
      
       
      </HStack>

      {/* Optional: Add a progress bar to visualize completion */}
      <View style={[styles.progressBar, { width: '80%' }]}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${profilePercentage}%` }
          ]} 
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  completeSetup:{
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)', // Very light gray border
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.5,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    margin: 8,
    padding:8
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 16,
    marginHorizontal: 12,

    overflow: 'hidden',

  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5', // Primary color
    borderRadius: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
});

export default CompleteProfile;