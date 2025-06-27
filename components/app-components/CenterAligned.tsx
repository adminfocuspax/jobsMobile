import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useResponsive } from '@/context/ResponsiveContext';
import { Platform } from 'react-native';

interface CenterAlignedProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  maxWidth?: number; // Allow custom max width override
}

/**
 * A responsive container component that centers content on the screen.
 * - Adapts to different screen sizes (mobile, tablet, desktop)
 * - Uses responsive breakpoints for optimal layout
 * - Centered horizontally on the screen
 * - Tablet-optimized with larger max widths and appropriate padding
 *
 * @param {ReactNode} children - The content to be displayed inside the container
 * @param {StyleProp<ViewStyle>} style - Additional styles to apply to the container (optional)
 * @param {number} padding - Padding to apply to the container (uses responsive default if not provided)
 * @param {number} maxWidth - Custom max width override (optional)
 */
const CenterAligned: React.FC<CenterAlignedProps> = ({
  children,
  style = {},
  padding,
  maxWidth,
}) => {
  const {
    width,
    isTablet,
    isDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    values
  } = useResponsive();

  // Calculate responsive max width
  const getMaxWidth = () => {
    if (maxWidth) return maxWidth; // Use custom override if provided

    if (isTablet || isDesktop) return 800; // Larger max width for tablets
    if (isLargeScreen) return 520; // Original size for large phones
    if (isMediumScreen) return 400; // Slightly smaller for medium phones
    return 350; // Smaller for small screens
  };

  // Calculate responsive padding
  const getPadding = () => {
    if (padding !== undefined) return padding; // Use provided padding if specified
    return values.padding; // Use responsive padding from context
  };

  // Calculate responsive width
  const getWidth = () => {
    const calculatedMaxWidth = getMaxWidth();

    // Always use maxWidth for both mobile and tablet
    return calculatedMaxWidth;
  };

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          {
            maxWidth: getMaxWidth(),
            width: getWidth(),
            padding: 16,
            // Add responsive margin for tablets

            // backgroundColor: '#000',
            //marginHorizontal: isTablet ? 20 : 10,
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
  container: {
    // Ensure proper flex behavior for content
    flexShrink: 1,
    //...(Platform.OS === 'web' && { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }),
  },
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    // Ensure proper layout on tablets
    minHeight: 0,
  },
});

export default CenterAligned;
