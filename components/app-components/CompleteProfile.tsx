'use client';
import React from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { Card } from '@/components/ui/card';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';
import ProfileAvatar from './ProfileAvatar';

const CompleteProfile: React.FC = () => {
  // Calculate the border percentage for the avatar
  const profilePercentage = 10;

  // Default handler if no onProfilePress is provided

  return (
    <Card
      style={styles.completeSetup}
      size='sm'
      variant='elevated'
      className='p-0 m-0 mt-4'
    >
      <HStack space='sm' reversed={false} className='items-center'>
        <Box style={styles.avatarContainer}>
          <ProfileAvatar size='md' />
        </Box>
        <Box className='flex-1' style={styles.textContainer}>
          <Text size='xs' style={styles.whiteText}>
            Complete profile
          </Text>
          <Text size='xs' style={styles.percentageText}>
            {profilePercentage}%
          </Text>
        </Box>
        <TouchableOpacity style={styles.iconTouchable} onPress={() => null}>
          <View style={styles.iconContainer}>
            <Icon as={ChevronRightIcon} size='xs' style={styles.whiteIcon} />
          </View>
        </TouchableOpacity>
      </HStack>

      {/* Compact progress bar */}
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${profilePercentage}%` }]}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  completeSetup: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    borderRadius: 12,
    borderWidth: 2,
    elevation: 8,
    justifyContent: 'flex-start',
    margin: 8,
    marginTop: 16,
    minHeight: 100,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  iconTouchable: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  progressBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    height: 4,
    marginHorizontal: 0,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  whiteIcon: {
    color: '#fff',
  },
  whiteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
    height: 24,
  },
});

export default CompleteProfile;
