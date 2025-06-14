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
    <Card style={styles.completeSetup} size="sm" variant="elevated" className='p-0 m-0 mt-4'>
      <HStack space="sm" reversed={false} className="items-center">
        <Box style={styles.avatarContainer}> 
          <ProfileAvatar 
            size="xs" 
          />
        </Box>
        <Box className="flex-1" style={styles.textContainer}>
          <Text size="xs" style={styles.whiteText}>
            Complete profile
          </Text>
          <Text size="xs" style={styles.percentageText}>
            {profilePercentage}%
          </Text>
        </Box>
        <TouchableOpacity style={styles.iconTouchable} onPress={() => null}>
          <View style={styles.iconContainer}>
            <Icon as={ChevronRightIcon} size="xs" style={styles.whiteIcon} />
          </View>
        </TouchableOpacity>
      </HStack>

      {/* Compact progress bar */}
      <View style={styles.progressBar}>
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
    borderColor: '#c00',
    borderRadius: 8,
    backgroundColor: '#c00',
    margin: 2,
    padding: 6,
    height: 40,
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 4,
  },
  iconTouchable: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  percentageText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  whiteIcon: {
    color: '#fff',
  },
  progressBar: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    marginTop: 2,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  iconContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CompleteProfile;