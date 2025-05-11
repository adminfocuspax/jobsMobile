import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';
import JobsDrawer from './Drawer';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
}

export default function CustomHeader({ title, showBack = false, showSearch = false }: CustomHeaderProps) {
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
        `${text} - Developer`
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
                source={require('@/assets/images/home-logo.png')} 
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

      {showSearch && (
        <View style={styles.searchWrapper}>
          <ThemedText style={styles.subText} type="subtitle">
            {t('header.opportunity')}
          </ThemedText>
          <View style={styles.searchContainer}>
            <IconSymbol size={20} name="magnifyingglass" color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs..."
              value={searchText}
              onChangeText={handleSearch}
              placeholderTextColor="#666"
            />
            {searchText.length > 0 && (
              <TouchableOpacity 
                onPress={() => {
                  setSearchText('');
                  setShowSuggestions(false);
                }}
                style={styles.clearButton}
              >
                <IconSymbol size={20} name="xmark.circle.fill" color="#666" />
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
                <IconSymbol size={16} name="magnifyingglass" color="#666" style={styles.suggestionIcon} />
                <ThemedText style={styles.suggestionText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop: 8
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 8
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    marginLeft: -16,
    marginTop: 0,
  },
  subText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    maxHeight: 200,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});