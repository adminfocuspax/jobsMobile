'use client';
import React from 'react';
import { TouchableOpacity, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { ThemedText } from '@/components/ThemedText';

interface ProfileAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  avatarUrl?: string;
  userName?: string;
  showBadge?: boolean;
  showChangeText?:boolean
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  style?:StyleProp<ViewStyle>
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  className,
  showBadge = true,
  showChangeText=false,
  style,
  onPress,
}) => {
  const avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  const userName = 'Jane Doe';
  // Default handler if no onPress is provided
  const handleProfilePress = (event: GestureResponderEvent): void => {
    if (onPress) {
      onPress(event);
    } else {
      // Default behavior - can be customized as needed
      console.log('Profile avatar pressed');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleProfilePress}
      activeOpacity={0.8}
      className={className}
      style={[
        showChangeText && { 
          alignItems: 'center',
          justifyContent: 'center'
        },
        style
      ]}
    >
      <Avatar size={size}>
        <AvatarFallbackText>{userName}</AvatarFallbackText>
        {avatarUrl && (
          <AvatarImage
            source={{
              uri: avatarUrl,
            }}
          />
        )}
        {showBadge && <AvatarBadge />}
      </Avatar>
      {showChangeText && <ThemedText type="small">Tap to change profile picture</ThemedText>}
    </TouchableOpacity>
  );
};

export default ProfileAvatar;