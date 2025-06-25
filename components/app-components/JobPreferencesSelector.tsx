import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { JobPreference } from '@/constants/supermarketJobOptions';
import { FlashList } from '@shopify/flash-list';
import { useResponsive } from '@/context/ResponsiveContext';
import CenterAligned from './CenterAligned';
import { Scroll } from 'lucide-react-native';

interface JobPreferencesSelectorProps {
  preferences: JobPreference[];
  onSelectionChange: (selectedPreferences: JobPreference[]) => void;
  initialSelections?: string[]; // Array of preference IDs that should be pre-selected
  maxSelections?: number; // Optional maximum number of selections allowed
}

const JobPreferencesSelector: React.FC<JobPreferencesSelectorProps> = ({
  preferences,
  onSelectionChange,
  initialSelections = [],
  maxSelections = 5,
}) => {
  const { width } = useWindowDimensions();
  const { primaryColor } = useResponsive();
  const styles = createStyles(primaryColor);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize selectedPreferences with initialSelections if available
  const [selectedPreferences, setSelectedPreferences] = useState<
    JobPreference[]
  >(() => {
    if (initialSelections.length > 0) {
      return preferences.filter(pref => initialSelections.includes(pref.id));
    }
    return [];
  });

  // Notify parent component of initial selections
  useEffect(() => {
    if (initialSelections.length > 0 && selectedPreferences.length > 0) {
      onSelectionChange(selectedPreferences);
    }
  }, []);

  // Filter preferences based on search query - compute this on the fly instead of storing in state
  const filteredPreferences = React.useMemo(() => {
    if (searchQuery.trim() === '') {
      return preferences;
    }
    return preferences.filter(
      pref =>
        pref.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pref.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pref.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, preferences]);

  // Handle preference selection/deselection
  const togglePreferenceSelection = (preference: JobPreference) => {
    // Use functional update to ensure we're working with the latest state
    setSelectedPreferences(prevSelected => {
      // Check if the preference is already selected
      const isAlreadySelected = prevSelected.some(p => p.id === preference.id);

      let updatedSelections: JobPreference[];

      if (isAlreadySelected) {
        // Remove from selections
        updatedSelections = prevSelected.filter(p => p.id !== preference.id);
      } else {
        // Add to selections if under max limit
        if (prevSelected.length < maxSelections) {
          updatedSelections = [...prevSelected, preference];
        } else {
          // Max selections reached
          console.warn(`Maximum of ${maxSelections} selections allowed`);
          return prevSelected; // Return unchanged state
        }
      }

      // Call onSelectionChange outside of this function
      setTimeout(() => onSelectionChange(updatedSelections), 0);

      return updatedSelections;
    });
  };

  // Calculate number of columns based on screen width
  const getNumColumns = () => 1;

  // Calculate number of columns based on screen width

  // Render selected preferences based on platform
  const renderSelectedPreferences = () => {
    // Use FlashList with try/catch fallback for native platforms
    try {
      return (
        <FlashList
          data={selectedPreferences}
          renderItem={({ item }) => (
            <Pressable
              style={styles.selectedChip}
              onPress={() => togglePreferenceSelection(item)}
            >
              <Text style={styles.selectedChipText}>{item.label}</Text>
              <Text style={styles.removeIcon}>✕</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={120}
          contentContainerStyle={styles.selectedScrollContent}
          extraData={selectedPreferences.length} // Force re-render when the array length changes
        />
      );
    } catch (error) {
      console.error('Error rendering selected preferences FlashList:', error);
      // Fallback to a simple horizontal scrollable view
      return (
        <View style={[styles.selectedScrollContent, { flexDirection: 'row' }]}>
          {selectedPreferences.map(item => (
            <Pressable
              key={item.id}
              style={styles.selectedChip}
              onPress={() => togglePreferenceSelection(item)}
            >
              <Text style={styles.selectedChipText}>{item.label}</Text>
              <Text style={styles.removeIcon}>✕</Text>
            </Pressable>
          ))}
        </View>
      );
    }
  };

  // Render all preferences based on platform
  const renderAllPreferences = () => {
    // Create an enhanced data array that includes selection state
    // This forces FlashList to re-render when selection state changes
    const enhancedData = React.useMemo(
      () =>
        filteredPreferences.map(pref => ({
          ...pref,
          isSelected: selectedPreferences.some(p => p.id === pref.id),
        })),
      [filteredPreferences, selectedPreferences]
    );

    // Use FlashList with try/catch fallback for native platforms
    try {
      return (
        <FlashList
          data={enhancedData}
          renderItem={({ item }) => (
            <Pressable
              style={{
                ...styles.preferenceCard,
                ...(item.isSelected && styles.selectedCard),
              }}
              onPress={() => togglePreferenceSelection(item)}
            >
              <HStack space='md' style={styles.cardContent}>
                <Box style={styles.iconContainer}>
                  {/* <Icon 
                      name={item.icon} 
                      size="xl" 
                      color={item.isSelected ? "#FFFFFF" : "#333333"} 
                    /> */}
                </Box>
                <VStack style={styles.textContainer}>
                  <Text
                    style={{
                      ...styles.cardTitle,
                      ...(item.isSelected && styles.selectedText),
                    }}
                  >
                    {item.label}
                  </Text>
                  {item.description && (
                    <Text
                      style={{
                        ...styles.cardDescription,
                        ...(item.isSelected && styles.selectedText),
                      }}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </Pressable>
          )}
          keyExtractor={item => item.id}
          numColumns={getNumColumns()}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.preferencesGrid}
          extraData={selectedPreferences} // This helps FlashList know when to re-render
        />
      );
    } catch (error) {
      console.error('Error rendering FlashList:', error);
      // Fallback to a simple scrollable view
      return (
        <View style={styles.preferencesGrid}>
          {enhancedData.map(item => (
            <View key={item.id}>
              <Pressable
                style={{
                  ...styles.preferenceCard,
                  ...(item.isSelected && styles.selectedCard),
                }}
                onPress={() => togglePreferenceSelection(item)}
              >
                <HStack space='md' style={styles.cardContent}>
                  {item.isSelected && <Box>isSelected</Box>}
                  <Box style={styles.iconContainer}>
                    {/* <Icon 
                      name={item.icon} 
                      size="xl" 
                      color={item.isSelected ? "#FFFFFF" : "#333333"} 
                    /> */}
                  </Box>
                  <VStack style={styles.textContainer}>
                    <Text
                      style={{
                        ...styles.cardTitle,
                        ...(item.isSelected && styles.selectedText),
                      }}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text
                        style={{
                          ...styles.cardDescription,
                          ...(item.isSelected && styles.selectedText),
                        }}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Pressable>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <CenterAligned>
      <VStack space='md' style={styles.content}>
        {/* Search Input */}
        <Input style={styles.searchInput}>
          <InputField
            placeholder='Search job preferences...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType='search'
          />
        </Input>

        {/* Selected Preferences */}
        {selectedPreferences.length > 0 && (
          <Box style={styles.selectedContainer}>
            <Text style={styles.sectionTitle}>
              Selected Preferences ({selectedPreferences.length}/{maxSelections}
              )
            </Text>
            <Box style={styles.selectedChipsContainer}>
              {renderSelectedPreferences()}
            </Box>
          </Box>
        )}

        {/* All Preferences */}
        <Box style={styles.preferencesContainer}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Search Results' : 'All Job Preferences'}
          </Text>

          {filteredPreferences.length === 0 ? (
            <Text style={styles.noResultsText}>
              No matching job preferences found
            </Text>
          ) : (
            <Box style={styles.flashListContainer}>
              {renderAllPreferences()}
            </Box>
          )}
        </Box>
      </VStack>
    </CenterAligned>
  );
};

const createStyles = (primaryColor: string) =>
  StyleSheet.create({
    cardContent: {
      alignItems: 'center',
    },
    cardDescription: {
      color: '#666',
      fontSize: 14,
    },
    cardTitle: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      height: 800,
      width: '100%',
    },
    content: {
      height: 800,
      padding: 16,
      width: '100%',
    },
    flashListContainer: {
      flex: 1,
      height: 500, // Fixed height for FlashList
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: '#eeeeee',
      borderRadius: 25,
      height: 50,
      justifyContent: 'center',
      width: 50,
    },
    noResultsText: {
      color: '#666',
      fontSize: 16,
      padding: 20,
      textAlign: 'center',
    },
    preferenceCard: {
      backgroundColor: '#f9f9f9',
      borderColor: '#eee',
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      margin: 8,
      padding: 16,
    },
    preferencesContainer: {
      flex: 1,
    },
    preferencesGrid: {
      paddingBottom: 200,
    },
    removeIcon: {
      color: '#666',
      fontSize: 14,
    },
    searchInput: {
      borderColor: '#ddd',
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 16,
    },
    sectionTitle: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    selectedCard: {
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    selectedChip: {
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      flexDirection: 'row',
      marginRight: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    selectedChipText: {
      color: '#333',
      fontSize: 14,
      marginRight: 6,
    },
    selectedChipsContainer: {
      height: 60, // Fixed height for horizontal FlashList
    },
    selectedContainer: {
      marginBottom: 16,
    },
    selectedScrollContent: {
      paddingVertical: 8,
    },
    selectedText: {
      color: '#FFFFFF',
    },
    textContainer: {
      flex: 1,
    },
  });

export default JobPreferencesSelector;
