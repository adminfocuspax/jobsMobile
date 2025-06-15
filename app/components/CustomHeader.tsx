import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import JobsDrawer from './Drawer';
import CompleteProfile from './CompleteProfile';
import CenterAligned from './CenterAligned';

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
}

export default function CustomHeader({
  title,
  showBack = false,
  showSearch = false,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleProfilePress = () => {
    // This function is simplified as we're not using animations or profile menu
  };

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      setSuggestions([
        `${text} - Software Engineer`,
        `${text} - Product Manager`,
        `${text} - Designer`,
        `${text} - Developer`,
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          {/* <View>
      <JobsDrawer />
    </View> */}
          <View style={styles.greetingTextContainer}>
            <View style={styles.greetingRow}>
              <Image
                source={require('@/assets/images/header-logo.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
          {/* <TouchableOpacity 
      onPress={handleProfilePress}
      activeOpacity={0.8}
    >
      <Avatar size="md">
        <AvatarFallbackText>Jane Doe</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <AvatarBadge />
      </Avatar>
    </TouchableOpacity> */}
        </View>
      </View>
      <CenterAligned>
        <Box style={{ height: 120 }}>
          <CompleteProfile />
        </Box>
        {showSearch && (
          <View style={styles.searchWrapper}>
            <ThemedText style={styles.subText} type='subtitle'>
              {t('header.opportunity')}
            </ThemedText>
            <View style={styles.searchContainer}>
              <IconSymbol
                size={20}
                name='magnifyingglass'
                color='#666'
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder='Search jobs...'
                value={searchText}
                onChangeText={handleSearch}
                placeholderTextColor='#666'
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                    setShowSuggestions(false);
                  }}
                  style={styles.clearButton}
                >
                  <IconSymbol size={20} name='xmark.circle.fill' color='#666' />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchText(item);
                    setShowSuggestions(false);
                  }}
                >
                  <IconSymbol
                    size={16}
                    name='magnifyingglass'
                    color='#666'
                    style={styles.suggestionIcon}
                  />
                  <ThemedText style={styles.suggestionText}>{item}</ThemedText>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps='handled'
            />
          </View>
        )}
      </CenterAligned>
    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    padding: 4,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    marginTop: 40,
  },
  greetingContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  greetingTextContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  logoImage: {
    height: 60,
    marginLeft: -16,
    marginRight: 8,
    marginTop: 0,
    width: 190,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    color: '#333',
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  searchWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  subText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionItem: {
    alignItems: 'center',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 12,
  },
  suggestionText: {
    color: '#333',
    fontSize: 14,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
