import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';
import { Pressable } from '@/components/ui/pressable';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { ThemedText } from '@/components/ThemedText';

interface GradientButtonProps {
  onPress: () => void;
  text: string;
  width?: DimensionValue;
  padding?: number;
  fontSize?: number;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const GradientButton = ({
  onPress,
  text,
  width,
  padding,
  fontSize,
  colors = ['#c00', '#c00'],
  style,
  textStyle,
  disabled = false,
}: GradientButtonProps) => {
  return (
    <Pressable
      style={[width !== undefined ? { width } : undefined, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        className='rounded-[8vw] items-center justify-center'
        style={[styles.button, { padding: padding }]}
        colors={colors}
        start={[0, 0]}
        end={[1, 0]}
      >
        <ThemedText
          style={[styles.buttonText, { fontSize: fontSize }, textStyle]}
        >
          {text}
        </ThemedText>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
