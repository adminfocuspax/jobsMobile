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
            size="md" 
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
    borderWidth: 2,
    borderColor: '#dc2626',
    borderRadius: 12,
    backgroundColor: '#dc2626',
    margin: 8,
    marginTop: 16,
    padding: 20,
    minHeight: 100,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconTouchable: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  whiteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,

  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '500',

  },
  whiteIcon: {
    color: '#fff',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginTop: 12,
    marginHorizontal: 0,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CompleteProfile;