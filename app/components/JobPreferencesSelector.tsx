import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform
} from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { JobPreference } from '@/constants/supermarketJobOptions';
import CenterAligned from './CenterAligned';
import { FlashList } from '@shopify/flash-list';
import { useResponsive } from '@/context/ResponsiveContext';

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
  maxSelections = 5
}) => {
  const { width } = useWindowDimensions();
  const { primaryColor } = useResponsive();
  const styles = createStyles(primaryColor);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize selectedPreferences with initialSelections if available
  const [selectedPreferences, setSelectedPreferences] = useState<JobPreference[]>(() => {
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
    } else {
      return preferences.filter(
        pref => 
          pref.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pref.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pref.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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
  const getNumColumns = () => {
    return 1;
  };

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
    const enhancedData = React.useMemo(() => {
      return filteredPreferences.map(pref => ({
        ...pref,
        isSelected: selectedPreferences.some(p => p.id === pref.id)
      }));
    }, [filteredPreferences, selectedPreferences]);

    // Use FlashList with try/catch fallback for native platforms
    try {
      return (
        <FlashList
          data={enhancedData}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={Object.assign({},
                  styles.preferenceCard,
                  item.isSelected && styles.selectedCard
                )}
                onPress={() => togglePreferenceSelection(item)}
              >
                <HStack space="md" style={styles.cardContent}>
                  <Box style={styles.iconContainer}>
                    {/* <Icon 
                      name={item.icon} 
                      size="xl" 
                      color={item.isSelected ? "#FFFFFF" : "#333333"} 
                    /> */}
                  </Box>
                  <VStack style={styles.textContainer}>
                    <Text 
                      style={Object.assign({},
                        styles.cardTitle,
                        item.isSelected && styles.selectedText
                      )}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text 
                        style={Object.assign({},
                          styles.cardDescription,
                          item.isSelected && styles.selectedText
                        )}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Pressable>
            );
          }}
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
                style={Object.assign({},
                  styles.preferenceCard,
                  item.isSelected && styles.selectedCard
                )}
                onPress={() => togglePreferenceSelection(item)}
              >
                <HStack space="md" style={styles.cardContent}>
                  {item.isSelected && 
                    <Box>isSelected</Box>
                  }
                  <Box style={styles.iconContainer}>
                    {/* <Icon 
                      name={item.icon} 
                      size="xl" 
                      color={item.isSelected ? "#FFFFFF" : "#333333"} 
                    /> */}
                  </Box>
                  <VStack style={styles.textContainer}>
                    <Text 
                      style={Object.assign({},
                        styles.cardTitle,
                        item.isSelected && styles.selectedText
                      )}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text 
                        style={Object.assign({},
                          styles.cardDescription,
                          item.isSelected && styles.selectedText
                        )}
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
    <CenterAligned  >
      <VStack space="md" style={styles.content}>
        {/* Search Input */}
        <Input style={styles.searchInput}>
          <InputField
            placeholder="Search job preferences..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </Input>

        {/* Selected Preferences */}
        {selectedPreferences.length > 0 && (
          <Box style={styles.selectedContainer}>
            <Text style={styles.sectionTitle}>Selected Preferences ({selectedPreferences.length}/{maxSelections})</Text>
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
            <Text style={styles.noResultsText}>No matching job preferences found</Text>
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

const createStyles = (primaryColor: string) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 800,
  },
  content: {
    width: '100%',
    padding: 16,
    height: 800,
  },
  searchInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedContainer: {
    marginBottom: 16,
  },
  selectedChipsContainer: {
    height: 60, // Fixed height for horizontal FlashList
  },
  selectedScrollContent: {
    paddingVertical: 8,
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedChipText: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  removeIcon: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  preferencesContainer: {
    flex: 1,
  },
  flashListContainer: {
    flex: 1,
    height: 500, // Fixed height for FlashList
  },
  preferencesGrid: {
    paddingBottom: 200,
  },
  preferenceCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
  },
  selectedCard: {
    backgroundColor: primaryColor,
    borderColor: primaryColor,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  noResultsText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default JobPreferencesSelector;