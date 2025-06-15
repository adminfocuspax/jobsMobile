import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';

// Define the type for our responsive values
type ResponsiveValues = {
  logoHeight: number;
  inputHeight: number;
  buttonWidth: number;
  fontSize: number;
  padding: number;
  buttonPadding: number;
  marginBottom: number;
  maxWidth: number;
  inputStyle: 'outline' | 'underlined';
};

// Define the context type
type ResponsiveContextType = {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isTablet: boolean;
  isWeb: boolean;
  width: number;
  height: number;
  values: ResponsiveValues;
  primaryColor: string;
  secondaryColor: string;
};

// Create the context with a default value
const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

// Provider component
export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get initial dimensions
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  // Calculate screen size breakpoints
  const isSmallScreen = dimensions.width < 375; // iPhone SE, etc.
  const isMediumScreen = dimensions.width >= 375 && dimensions.width < 414; // iPhone 12, etc.
  const isLargeScreen = dimensions.width >= 414; // iPhone 12 Pro Max, etc.
  const isTablet = dimensions.width >= 768; // iPad, etc.
  const isWeb = Platform.OS === 'web';

  console.log('isSmallScreen', isSmallScreen);
  console.log('isMediumScreen', isMediumScreen);
  console.log('isLargeScreen', isLargeScreen);
  console.log('isTablet', isTablet);
  console.log('isWeb', isWeb);

  // Calculate responsive values
  const values: ResponsiveValues = {
    logoHeight: isSmallScreen
      ? 90
      : isMediumScreen
        ? 100
        : isTablet
          ? 120
          : 110,
    inputHeight: isSmallScreen ? 45 : isMediumScreen ? 50 : isTablet ? 60 : 55,
    buttonWidth: isSmallScreen
      ? dimensions.width * 0.7
      : isMediumScreen
        ? dimensions.width * 0.75
        : isTablet
          ? dimensions.width * 0.2
          : dimensions.width * 0.7,
    fontSize: isSmallScreen ? 16 : isMediumScreen ? 18 : isTablet ? 20 : 20,
    padding: isSmallScreen ? 15 : isMediumScreen ? 18 : isTablet ? 24 : 20,
    buttonPadding: isSmallScreen
      ? 10
      : isMediumScreen
        ? 10
        : isTablet
          ? 10
          : 10,
    marginBottom: isSmallScreen ? 20 : isMediumScreen ? 25 : isTablet ? 30 : 30,
    maxWidth: isTablet ? 500 : dimensions.width,
    inputStyle: isMediumScreen || isSmallScreen ? 'outline' : 'outline',
  };

  // Listen for dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription.remove();
  }, []);

  // Context value
  const contextValue: ResponsiveContextType = {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isTablet,
    isWeb,
    width: dimensions.width,
    height: dimensions.height,
    values,
    primaryColor: '#CC0000',
    secondaryColor: '#71c6eb',
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom hook to use the responsive context
export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
