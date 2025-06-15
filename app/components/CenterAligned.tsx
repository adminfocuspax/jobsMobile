import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CenterAlignedProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
}

/**
 * A responsive container component that centers content on the screen.
 * - Maximum width of 520px on larger screens
 * - Full width on screens smaller than 520px
 * - Centered horizontally on the screen
 *
 * @param {ReactNode} children - The content to be displayed inside the container
 * @param {StyleProp<ViewStyle>} style - Additional styles to apply to the container (optional)
 * @param {number} padding - Padding to apply to the container (default: 16)
 */
const CenterAligned: React.FC<CenterAlignedProps> = ({
  children,
  style = {},
  padding = 4,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          {
            maxWidth: 520,
            width: width < 520 ? '100%' : 520,
            padding: padding,
            backgroundColor: 'white',
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFF',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default CenterAligned;
