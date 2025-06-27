import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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
import { ThemedView } from '../ThemedView';
import { useResponsive } from '../../context/ResponsiveContext';

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
  const { isDesktop } = useResponsive();
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const logoImage = isDarkTheme
    ? require('@/assets/images/header-logo-dark.png')
    : require('@/assets/images/header-logo.png');

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

  const dynamicStyles = createStyles(isDarkTheme);

  return (
    <ThemedView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.greetingContainer}>

          <View style={dynamicStyles.greetingTextContainer}>
            <View style={dynamicStyles.greetingRow}>
              {logoImage &&
                <Image
                  source={logoImage}
                  style={dynamicStyles.logoImage}
                />
              }

            </View>
          </View>
          <View>
            <JobsDrawer />
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
      {/* <CenterAligned> */}
      {/* <Box style={{ height: 120 }}>
          <CompleteProfile />
        </Box> */}
      {showSearch && (
        <View style={dynamicStyles.searchWrapper}>
          <ThemedText style={dynamicStyles.subText} type='subtitle'>
            {t('header.opportunity')}
          </ThemedText>
          <View style={dynamicStyles.searchContainer}>
            <IconSymbol
              size={20}
              name='magnifyingglass'
              color='#666'
              style={dynamicStyles.searchIcon}
            />
            <TextInput
              style={dynamicStyles.searchInput}
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
                style={dynamicStyles.clearButton}
              >
                <IconSymbol size={20} name='xmark.circle.fill' color='#666' />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <View style={dynamicStyles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={dynamicStyles.suggestionItem}
                onPress={() => {
                  setSearchText(item);
                  setShowSuggestions(false);
                }}
              >
                <IconSymbol
                  size={16}
                  name='magnifyingglass'
                  color='#666'
                  style={dynamicStyles.suggestionIcon}
                />
                <ThemedText style={dynamicStyles.suggestionText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps='handled'
          />
        </View>
      )}
      {/* </CenterAligned> */}
    </ThemedView>
  );
}

const createStyles = (isDarkTheme: boolean) => StyleSheet.create({
  clearButton: {
    padding: 4,
  },
  container: {
    backgroundColor: 'transparent',
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
    backgroundColor: !isDarkTheme ? '#FFFFFF' : '#000',
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
    backgroundColor: isDarkTheme ? '#000' : '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    color: isDarkTheme ? '#FFFFFF' : '#333',
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  searchWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  subText: {
    color: isDarkTheme ? '#FFFFFF' : '#000',
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
    color: isDarkTheme ? '#FFFFFF' : '#333',
    fontSize: 14,
  },
  suggestionsContainer: {
    backgroundColor: isDarkTheme ? '#000' : '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    maxHeight: 200,
    shadowColor: isDarkTheme ? '#FFFFFF' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
