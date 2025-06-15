'use client';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { ChevronRightIcon, Icon, SunIcon, CheckIcon } from '@/components/ui/icon';
import { router } from 'expo-router';

export interface BreadcrumbItem {
  label: string;
  path?: string; // This will be cast to the appropriate type when used with router
  isActive?: boolean;
  isJobsItem?: boolean; // Flag to identify the "see jobs" item
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onItemPress?: (item: BreadcrumbItem) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  onItemPress 
}) => {
  // Create a ref for the ScrollView
  const scrollViewRef = React.useRef(null);
  
  // Find the active item index
  const activeIndex = React.useMemo(() => {
    return items.findIndex(item => item.isActive);
  }, [items]);
  
  // Scroll to the active item on mount and when active item changes
  React.useEffect(() => {
    if (scrollViewRef.current && activeIndex !== -1) {
      // We need to wait for layout to complete
      setTimeout(() => {
        // Calculate position to center the active item if possible
        const scrollPosition = Math.max(0, (activeIndex * 84) - 40); // Item width (80) + margin (2+2), centered
        
        // @ts-ignore - scrollTo exists on ScrollView ref
        scrollViewRef?.current?.scrollTo({
          x: scrollPosition,
          animated: true
        });
      }, 100);
    }
  }, [activeIndex]);

  const handlePress = (item: BreadcrumbItem) => {
    if (onItemPress) {
      onItemPress(item);
    } else if (item.path) {
      // Use router.navigate instead of router.push for better type compatibility
      router.navigate(item.path as any);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <HStack space="xs" style={styles.breadcrumbContainer}>
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              <TouchableOpacity
                onPress={() => handlePress(item)}
                disabled={item.isActive || !item.path}
                style={styles.itemContainer}
              >
                {/* Vertical layout with number on top and label below */}
                <View style={styles.verticalContainer}>
                  {/* Number circle */}
                  <View style={Object.assign({}, 
                    styles.numberCircle,
                    item.isActive ? {backgroundColor:'#FFD93F'} : {},
                    // Add green background for completed items (items before the active one)
                    activeIndex > index ? {backgroundColor:'#4CAF50'} : {}
                  )}>
                    {activeIndex > index ? (
                      // Show check icon for completed items
                      <Icon as={CheckIcon} size="xs" style={styles.checkIcon} />
                    ) : (
                      // Show number for current and future items
                      <Text style={Object.assign({},
                        styles.numberText,
                        // Change text color for completed items for better contrast
                        activeIndex > index ? {color: '#FFFFFF'} : {}
                      )}>{index + 1}</Text>
                    )}
                  </View>
                  
                  {/* Item text with icon for jobs item */}
                  <View style={styles.textContainer}>
                    <Text
                      size="xs"
                      style={Object.assign({},
                        styles.itemText,
                        item.isActive ? styles.activeItem : {},
                        !item.path ? styles.disabledItem : {},
                        // Style for completed items
                        activeIndex > index ? styles.completedItem : {}
                      )}
                    >
                      {item.label}
                    </Text>
                    
                    {/* {item.isJobsItem && (
                      <Icon as={SunIcon} size="xs" style={styles.jobsIcon} />
                    )} */}
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Line separator between items */}
              {index < items.length - 1 && (
                <View style={styles.separatorContainer}>
                  <View style={Object.assign({},
                    styles.separatorLine,
                    // Green separator for completed sections
                    activeIndex > index + 1 ? {backgroundColor: '#4CAF50'} : {},
                    // Yellow separator if connecting to active item
                    activeIndex === index + 1 ? {backgroundColor: '#FFD93F'} : {}
                  )} />
                  {/* <Icon style={styles.separatorIcon} as={ChevronRightIcon} size="sm" /> */}
                </View>
              )}
            </React.Fragment>
          ))}
        </HStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 24,
    backgroundColor: '#CC0000',
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
    justifyContent: 'center',

  },
  breadcrumbContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from center to flex-start for better scrolling
    flexDirection: 'row',
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
    width: 80, // Fixed width to help with scroll positioning
  },
  verticalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 80, // Limit width to keep items compact
  },
  numberCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    // Add shadow for better visibility
    shadowColor: '#000',
    color: '#FFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  numberText: {
    color: '#CC0000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // Ensure text is perfectly centered
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  itemText: {
    color: '#FFF',
  },
  activeItem: {
    fontWeight: 'bold',
    color:'#FFD93F',
    fontSize: 12,
  },
  completedItem: {
    fontWeight: 'bold',
    color: '#4CAF50', // Green color to match the number background
    fontSize: 12,
  },
  disabledItem: {
    fontWeight: 'bold',
    opacity: 0.7,
    fontSize: 12,
  },
  jobsIcon: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  checkIcon: {
    color: '#FFFFFF',
    width: 14,
    height: 14,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 6,
    alignSelf: 'center',
  },
  separatorLine: {
    height: 1,
    width: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0,
  },
  separatorIcon: {
    color: '#FFFFFF',
  },
});

export default Breadcrumb;