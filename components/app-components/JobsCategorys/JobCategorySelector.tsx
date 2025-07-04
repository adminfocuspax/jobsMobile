import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  Platform,
  useColorScheme,
} from 'react-native';
import { useResponsive } from '@/context/ResponsiveContext';
import { useThemeColor, useThemeColors } from '@/hooks/useThemeColor';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  Plus,
  Bell,
  Calendar,
  Check,
  AlertCircle,
  AtSign,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Edit,
  Eye,
  Heart,
  Globe,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Search,
  Settings,
  Share,
  Star,
  Trash,
  Unlock,
  Camera,
  Chrome,
  Instagram,
  Facebook,
  Paperclip,
  EditIcon,
} from "lucide-react-native"
import { VStack } from '../../../components/ui/vstack';
import { ThemedText } from '../../ThemedText';
import { ButtonText, Button, ButtonIcon } from '../../ui/button';

export interface JobCategoryInterface {
  id: string;
  label: string;
  value: string;
  iconName: string;
  description?: string;
}

interface JobCategorySelectorProps {
  onCategorySelect?: (category: JobCategoryInterface | null) => void;
  selectedCategory?: JobCategoryInterface | null;
  onSubscribe?: (category: JobCategoryInterface) => void;
}

// Job categories with appropriate icons
const JOB_CATEGORIES: JobCategoryInterface[] = [
  {
    id: 'all',
    label: 'All',
    value: 'all',
    iconName: 'Plus',
    description:
      'Select this option to view all available retail job opportunities.',
  },
  {
    id: 'sales_associate',
    label: 'Sales Executive',
    value: 'sales_associate',
    iconName: 'Paperclip',
    description:
      'Directly engages with customers, offers product information, and drives sales.',
  },
  {
    id: 'cashier',
    label: 'Cashier',
    value: 'cashier',
    iconName: 'Calendar',
    description:
      'Manages customer transactions, processes payments, and handles the billing counter.',
  },
  {
    id: 'customer_service',
    label: 'Customer Service Representative',
    value: 'customer_service',
    iconName: 'MessageCircle',
    description:
      'Assists customers with inquiries, resolves issues, and facilitates returns or exchanges to ensure a positive experience.',
  },
  {
    id: 'team_leader',
    label: 'Team Leader / Floor Manager',
    value: 'team_leader',
    iconName: 'Play',
    description:
      'Supervises a team of sales associates, manages daily floor operations, and ensures sales targets are met.',
  },
  {
    id: 'department_manager',
    label: 'Department Manager',
    value: 'department_manager',
    iconName: 'Settings',
    description:
      'Oversees a specific department within a store, including inventory, sales performance, and staff.',
  },
  {
    id: 'visual_merchandiser',
    label: 'Visual Merchandiser',
    value: 'visual_merchandiser',
    iconName: 'Eye',
    description:
      "Responsible for creating appealing product displays and maintaining the store's aesthetic to attract customers.",
  },
  {
    id: 'demonstrator',
    label: 'Demonstrator / Product Promoter',
    value: 'demonstrator',
    iconName: 'Bell',
    description:
      'Showcases products, explains their features, and encourages sales through live demonstrations.',
  },
  {
    id: 'stocker',
    label: 'Stocker / Stock Associate',
    value: 'stocker',
    iconName: 'Copy',
    description:
      'Manages inventory by unpacking, labeling, and shelving merchandise, ensuring stock availability and an organized backroom.',
  },
  {
    id: 'security',
    label: 'Security Guard / Loss Prevention Officer',
    value: 'security',
    iconName: 'Lock',
    description:
      'Monitors the store to prevent theft and vandalism, ensuring a safe environment for customers and staff.',
  },
  {
    id: 'assistant_manager',
    label: 'Assistant Store Manager',
    value: 'assistant_manager',
    iconName: 'Info',
    description:
      'Supports the Store Manager in day-to-day operations, staff supervision, and achieving sales goals.',
  },
  {
    id: 'store_manager',
    label: 'Store Manager',
    value: 'store_manager',
    iconName: 'HelpCircle',
    description:
      "Oversees all aspects of a retail store's operations, including sales, customer service, inventory, staff management, and profitability.",
  },
  {
    id: 'operations_manager',
    label: 'Retail Operations Manager',
    value: 'operations_manager',
    iconName: 'Settings',
    description:
      'Manages the overall operations of multiple retail locations, ensuring efficiency and consistency across stores.',
  },
  {
    id: 'district_manager',
    label: 'District Manager',
    value: 'district_manager',
    iconName: 'Globe',
    description:
      'Responsible for overseeing a group of stores within a specific geographical district, focusing on their performance and strategic direction.',
  },
  {
    id: 'buyer',
    label: 'Buyer',
    value: 'buyer',
    iconName: 'Heart',
    description:
      'Conducts market research, identifies customer needs, and procures merchandise for the store.',
  },
  {
    id: 'inventory_control',
    label: 'Inventory Control Specialist',
    value: 'inventory_control',
    iconName: 'Clock',
    description:
      'Manages and optimizes stock levels, tracks merchandise movement, and prevents overstocking or shortages.',
  },
  {
    id: 'logistics',
    label: 'Logistics & Supply Chain Coordinator',
    value: 'logistics',
    iconName: 'Share',
    description:
      'Manages the efficient flow of products from suppliers to retail stores.',
  },
  {
    id: 'hr_specialist',
    label: 'Human Resources (HR) Specialist',
    value: 'hr_specialist',
    iconName: 'AtSign',
    description:
      'Handles recruitment, training, employee relations, payroll, and benefits for retail employees.',
  },
  {
    id: 'marketing_manager',
    label: 'Advertising & Marketing Manager / Specialist',
    value: 'marketing_manager',
    iconName: 'Bell',
    description:
      'Develops and implements marketing strategies, promotions, and advertising campaigns to attract customers and boost sales.',
  },
  {
    id: 'product_developer',
    label: 'Product Developer',
    value: 'product_developer',
    iconName: 'Edit',
    description:
      'Creates new products, often collaborating with designers and sourcing teams.',
  },
  {
    id: 'online_merchandiser',
    label: 'Online Merchandiser',
    value: 'online_merchandiser',
    iconName: 'Globe',
    description:
      "Manages product presentation and the customer experience on the retailer's e-commerce platform.",
  },
  {
    id: 'finance',
    label: 'Finance / Accounts (roles)',
    value: 'finance',
    iconName: 'Calendar',
    description:
      'Manages the financial operations, budgeting, and reporting for the retail business.',
  },
  {
    id: 'it_support',
    label: 'IT Support / Retail Technology Specialist',
    value: 'it_support',
    iconName: 'Settings',
    description:
      'Provides technical assistance for point-of-sale (POS) systems, inventory management software, and other retail technologies.',
  },
];

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Plus,
    Bell,
    Calendar,
    Check,
    AlertCircle,
    AtSign,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    Edit,
    Eye,
    Heart,
    Globe,
    HelpCircle,
    Info,
    Lock,
    Mail,
    Menu,
    MessageCircle,
    Phone,
    Play,
    Search,
    Settings,
    Share,
    Star,
    Trash,
    Unlock,
    Camera,
    Chrome,
    Instagram,
    Facebook,
    Paperclip,
  };

  return iconMap[iconName] || Plus;
};

// function Example() {
//   return (
//     <VStack space="md" className="items-center">
//       <Icon className="text-typography-500" as={Camera} />
//       <Icon className="text-typography-500" as={ChromeIcon} />
//       <Icon className="text-typography-500" as={InstagramIcon} />
//       <Icon className="text-typography-500" as={FacebookIcon} />
//     </VStack>
//   )

// }


const JobCategorySelector: React.FC<JobCategorySelectorProps> = ({
  selectedCategory = null,
  onCategorySelect = () => { },
  onSubscribe = () => { },
}) => {
  const [activeCategory, setActiveCategory] =
    useState<JobCategoryInterface | null>(selectedCategory);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  // const colorScheme = useColorScheme();
  const isDarkTheme = true;
  const { primaryColor, secondaryColor, borderColor } = useThemeColors({}, ['primaryColor', 'secondaryColor', 'borderColor']);
  const styles = createStyles({ primaryColor, secondaryColor, borderColor, isDarkTheme });

  const SCROLL_DISTANCE = 800; // Distance to scroll each time

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - SCROLL_DISTANCE);
    scrollViewRef.current?.scrollTo({ x: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  const scrollRight = () => {
    const newPosition = scrollPosition + SCROLL_DISTANCE;
    scrollViewRef.current?.scrollTo({ x: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  const handleScroll = (event: any) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
  };

  useEffect(() => {
    if (!activeCategory) {
      handleCategoryPress();
    }
  }, [])

  const handleCategoryPress = (category?: JobCategoryInterface | null) => {

    const categoryToUse = category || JOB_CATEGORIES.find((cat) => cat.value === 'all') || null;
    const newSelection = activeCategory?.id === categoryToUse?.id ? null : categoryToUse;
    if (newSelection) {
      setActiveCategory(newSelection);
      onCategorySelect?.(newSelection);
    }

  };

  const renderCategoryButton = (category: JobCategoryInterface) => {
    const isSelected = activeCategory?.id === category.id;
    const IconComponent = getIconComponent(category.iconName);

    return (
      <Pressable
        key={category.id}
        style={!isSelected ? styles.categoryButton : { ...styles.categoryButton, ...styles.selectedIconContainer, backgroundColor: 'transparent' }}
        onPress={() => handleCategoryPress(category)}
      >
        <View style={styles.categoryContent}>
          <Box
            style={
              isSelected
                ? { ...styles.iconContainer, ...styles.selectedIconContainer }
                : styles.iconContainer
            }
          >
            {/* {Platform.OS === 'web' ? (
              <Text
                style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}
              >
                {category.label.charAt(0)}
              </Text>
            ) : (
              <Icon as={IconComponent} size='xl' color='#FFFFFF' />
            )} */}
            <Icon as={IconComponent} size='xl' color='#FFFFFF' />
          </Box>
          {Platform.OS === 'web' ? (
            <Text
              style={
                isSelected
                  ? { ...styles.categoryLabel, ...styles.selectedLabel }
                  : styles.categoryLabel
              }
              numberOfLines={2}
            >
              {category.label}
            </Text>
          ) : (
            <ThemedText
              type='link'
              style={
                isSelected
                  ? { ...styles.categoryLabel, ...styles.selectedLabel }
                  : styles.categoryLabel
              }
              numberOfLines={2}
            >
              {category.label}
            </ThemedText>
          )}
          {Platform.OS === 'web' ? (
            <Text
              style={
                isSelected
                  ? { ...styles.categoryDescrition, ...styles.selectedCategoryDescrition }
                  : styles.categoryDescrition
              }

            >
              {category.description}
            </Text>
          ) : (
            <ThemedText
              style={
                isSelected
                  ? { ...styles.categoryDescrition, ...styles.selectedCategoryDescrition }
                  : styles.categoryDescrition
              }
              numberOfLines={2}
            >
              {category.description}
            </ThemedText>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button size="xs" variant="solid" action={isSelected ? 'secondary' : 'primary'}>
            <ButtonText style={{ color: '#FFFFFF' }}>Follow</ButtonText>
          </Button>
        </View>
        {/* <Button size="lg" className="rounded-full p-3.5">
          <ButtonIcon as={EditIcon} />
        </Button> */}
        {/* <Pressable style={styles.subscribeButton} onPress={() => onSubscribe?.(category)}>
          <Icon as={Bell} size='sm' color='#FFFFFF' style={styles.subscribeIcon} />
          {Platform.OS === 'web' ? (
            <Text style={styles.subscribeText}>Subscribe </Text>
          ) : (
            <ThemedText style={styles.subscribeText}>Subscribe</ThemedText>
          )}
        </Pressable> */}

      </Pressable>
    );
  };

  return (
    <VStack space="md">
      <View style={styles.container}>
        {Platform.OS === 'web' && (
          <Pressable style={styles.scrollButtonLeft} onPress={scrollLeft}>
            <Icon as={ChevronLeft} size='md' color='#fff' />
          </Pressable>
        )}

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.categoriesContainer}>
            {JOB_CATEGORIES.map(renderCategoryButton)}
          </View>
        </ScrollView>

        {Platform.OS === 'web' && (
          <Pressable style={styles.scrollButtonRight} onPress={scrollRight}>
            <Icon as={ChevronRight} size='md' color='#fff' />
          </Pressable>
        )}

      </View>
    </VStack>
  );
};

const createStyles = ({
  primaryColor,
  secondaryColor,
  borderColor,
  buttonSize = 150,
  isDarkTheme
}: {
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  buttonSize?: number;
  isDarkTheme: boolean;

}) =>
  StyleSheet.create({
    categoriesContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    categoryButton: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 8,
      minHeight: 100,
      width: Platform.OS === 'web' ? buttonSize + 40 : buttonSize - 20,
      height: Platform.OS === 'web' ? buttonSize + 120 : buttonSize + 80,
      borderColor: borderColor,
      borderRadius: 10,
      borderWidth: 1,
      paddingVertical: 16,
      paddingHorizontal: 8,
      flexDirection: 'column',
    },
    categoryContent: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonContainer: {
      width: '100%',
      paddingTop: 8,
    },
    categoryLabel: {
      fontSize: Platform.OS === 'web' ? buttonSize / 10 : (buttonSize / 12),
      fontWeight: 'bold',
      lineHeight: Platform.OS === 'web' ? 1.17 : 16,
      height: Platform.OS === 'web' ? 64 : 48,
      textAlign: 'left',
    },
    categoryDescrition: {
      fontSize: Platform.OS === 'web' ? buttonSize / 10 : (buttonSize / 12),
      fontWeight: 'bold',
      lineHeight: Platform.OS === 'web' ? 1.4 : 16,
      height: Platform.OS === 'web' ? 40 : 56,
      textAlign: 'left',
      overflow: 'hidden',
      ...(Platform.OS === 'web' && {
        textOverflow: 'ellipsis',

      }),
    },
    selectedCategoryDescrition: {
      color: !isDarkTheme ? secondaryColor : primaryColor,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      height: Platform.OS === 'web' ? buttonSize + 180 : buttonSize + 90,
      overflow: 'hidden',
      marginVertical: 0,
      //backgroundColor:secondaryColor
    },

    iconContainer: {
      alignItems: 'center',
      backgroundColor: primaryColor,
      borderColor: '#E0E0E0',
      borderRadius: 30,
      borderWidth: 8,
      height: 60,
      justifyContent: 'center',
      marginBottom: 8,
      width: 60,
    },
    scrollButtonLeft: {
      alignItems: 'center',
      backgroundColor: secondaryColor,
      borderRadius: 20,
      elevation: 3,
      height: 40,
      justifyContent: 'center',
      left: 10,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      top: '50%',
      transform: [{ translateY: -20 }],
      width: 40,
      zIndex: 999999,
    },
    scrollButtonRight: {
      alignItems: 'center',
      backgroundColor: secondaryColor,
      borderRadius: 20,
      elevation: 3,
      height: 40,
      justifyContent: 'center',
      position: 'absolute',
      right: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      top: '50%',
      transform: [{ translateY: -20 }],
      width: 40,
      zIndex: 10,
    },
    scrollContent: {
      paddingHorizontal: 16,
      ...(Platform.OS === 'web' && {
        flexGrow: 1,
      }),
    },
    scrollView: {
      flex: 1,
      ...(Platform.OS === 'web' && {
        overflow: 'scroll',
      }),
    },
    selectedIconContainer: {
      backgroundColor: secondaryColor,
      borderColor: '#E0E0E0',
    },
    selectedLabel: {
      color: primaryColor,
      fontWeight: '600',
    },
    subscribeButton: {
      alignItems: 'center',
      backgroundColor: primaryColor,
      borderRadius: 25,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    subscribeIcon: {
      marginRight: 8,
    },
    subscribeText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default JobCategorySelector;
