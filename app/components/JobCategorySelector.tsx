import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  Platform,
} from 'react-native';
import { useResponsive } from '@/context/ResponsiveContext';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  AddIcon,
  BellIcon,
  CalendarDaysIcon,
  CheckIcon,
  AlertCircleIcon,
  AtSignIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CopyIcon,
  EditIcon,
  EyeIcon,
  FavouriteIcon,
  GlobeIcon,
  HelpCircleIcon,
  InfoIcon,
  LockIcon,
  MailIcon,
  MenuIcon,
  MessageCircleIcon,
  PhoneIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
  UnlockIcon,
} from '@/components/ui/icon';

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
}

// Job categories with appropriate icons
const JOB_CATEGORIES: JobCategoryInterface[] = [
  {
    "id": "all",
    "label": "All",
    "value": "all",
    "iconName": "AddIcon",
    "description": "Select this option to view all available retail job opportunities."
  },
  {
    "id": "sales_associate",
    "label": "Sales Executive",
    "value": "sales_associate",
    "iconName": "StarIcon",
    "description": "Directly engages with customers, offers product information, and drives sales."
  },
  {
    "id": "cashier",
    "label": "Cashier",
    "value": "cashier",
    "iconName": "CalendarDaysIcon",
    "description": "Manages customer transactions, processes payments, and handles the billing counter."
  },
  {
    "id": "customer_service",
    "label": "Customer Service Representative",
    "value": "customer_service",
    "iconName": "MessageCircleIcon",
    "description": "Assists customers with inquiries, resolves issues, and facilitates returns or exchanges to ensure a positive experience."
  },
  {
    "id": "team_leader",
    "label": "Team Leader / Floor Manager",
    "value": "team_leader",
    "iconName": "PlayIcon",
    "description": "Supervises a team of sales associates, manages daily floor operations, and ensures sales targets are met."
  },
  {
    "id": "department_manager",
    "label": "Department Manager",
    "value": "department_manager",
    "iconName": "SettingsIcon",
    "description": "Oversees a specific department within a store, including inventory, sales performance, and staff."
  },
  {
    "id": "visual_merchandiser",
    "label": "Visual Merchandiser",
    "value": "visual_merchandiser",
    "iconName": "EyeIcon",
    "description": "Responsible for creating appealing product displays and maintaining the store's aesthetic to attract customers."
  },
  {
    "id": "demonstrator",
    "label": "Demonstrator / Product Promoter",
    "value": "demonstrator",
    "iconName": "BellIcon",
    "description": "Showcases products, explains their features, and encourages sales through live demonstrations."
  },
  {
    "id": "stocker",
    "label": "Stocker / Stock Associate",
    "value": "stocker",
    "iconName": "CopyIcon",
    "description": "Manages inventory by unpacking, labeling, and shelving merchandise, ensuring stock availability and an organized backroom."
  },
  {
    "id": "security",
    "label": "Security Guard / Loss Prevention Officer",
    "value": "security",
    "iconName": "LockIcon",
    "description": "Monitors the store to prevent theft and vandalism, ensuring a safe environment for customers and staff."
  },
  {
    "id": "assistant_manager",
    "label": "Assistant Store Manager",
    "value": "assistant_manager",
    "iconName": "InfoIcon",
    "description": "Supports the Store Manager in day-to-day operations, staff supervision, and achieving sales goals."
  },
  {
    "id": "store_manager",
    "label": "Store Manager",
    "value": "store_manager",
    "iconName": "HelpCircleIcon",
    "description": "Oversees all aspects of a retail store's operations, including sales, customer service, inventory, staff management, and profitability."
  },
  {
    "id": "operations_manager",
    "label": "Retail Operations Manager",
    "value": "operations_manager",
    "iconName": "SettingsIcon",
    "description": "Manages the overall operations of multiple retail locations, ensuring efficiency and consistency across stores."
  },
  {
    "id": "district_manager",
    "label": "District Manager",
    "value": "district_manager",
    "iconName": "GlobeIcon",
    "description": "Responsible for overseeing a group of stores within a specific geographical district, focusing on their performance and strategic direction."
  },
  {
    "id": "buyer",
    "label": "Buyer",
    "value": "buyer",
    "iconName": "FavouriteIcon",
    "description": "Conducts market research, identifies customer needs, and procures merchandise for the store."
  },
  {
    "id": "inventory_control",
    "label": "Inventory Control Specialist",
    "value": "inventory_control",
    "iconName": "ClockIcon",
    "description": "Manages and optimizes stock levels, tracks merchandise movement, and prevents overstocking or shortages."
  },
  {
    "id": "logistics",
    "label": "Logistics & Supply Chain Coordinator",
    "value": "logistics",
    "iconName": "ShareIcon",
    "description": "Manages the efficient flow of products from suppliers to retail stores."
  },
  {
    "id": "hr_specialist",
    "label": "Human Resources (HR) Specialist",
    "value": "hr_specialist",
    "iconName": "AtSignIcon",
    "description": "Handles recruitment, training, employee relations, payroll, and benefits for retail employees."
  },
  {
    "id": "marketing_manager",
    "label": "Advertising & Marketing Manager / Specialist",
    "value": "marketing_manager",
    "iconName": "BellIcon",
    "description": "Develops and implements marketing strategies, promotions, and advertising campaigns to attract customers and boost sales."
  },
  {
    "id": "product_developer",
    "label": "Product Developer",
    "value": "product_developer",
    "iconName": "EditIcon",
    "description": "Creates new products, often collaborating with designers and sourcing teams."
  },
  {
    "id": "online_merchandiser",
    "label": "Online Merchandiser",
    "value": "online_merchandiser",
    "iconName": "GlobeIcon",
    "description": "Manages product presentation and the customer experience on the retailer's e-commerce platform."
  },
  {
    "id": "finance",
    "label": "Finance / Accounts (roles)",
    "value": "finance",
    "iconName": "CalendarDaysIcon",
    "description": "Manages the financial operations, budgeting, and reporting for the retail business."
  },
  {
    "id": "it_support",
    "label": "IT Support / Retail Technology Specialist",
    "value": "it_support",
    "iconName": "SettingsIcon",
    "description": "Provides technical assistance for point-of-sale (POS) systems, inventory management software, and other retail technologies."

    },
  ]

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    AddIcon,
    BellIcon,
    CalendarDaysIcon,
    CheckIcon,
    AlertCircleIcon,
    AtSignIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    CopyIcon,
    EditIcon,
    EyeIcon,
    FavouriteIcon,
    GlobeIcon,
    HelpCircleIcon,
    InfoIcon,
    LockIcon,
    MailIcon,
    MenuIcon,
    MessageCircleIcon,
    PhoneIcon,
    PlayIcon,
    SearchIcon,
    SettingsIcon,
    ShareIcon,
    StarIcon,
    TrashIcon,
    UnlockIcon,
  };
  
  return iconMap[iconName] || AddIcon;
};

const JobCategorySelector: React.FC<JobCategorySelectorProps> = ({
  selectedCategory = null,
  onCategorySelect = () => {},

}) => {
  const [activeCategory, setActiveCategory] = useState<JobCategoryInterface | null>(selectedCategory);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { primaryColor,secondaryColor } = useResponsive();
  const styles = createStyles({ primaryColor,secondaryColor });

  const SCROLL_DISTANCE = 300; // Distance to scroll each time

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

  const handleCategoryPress = (category: JobCategoryInterface) => {
    const newSelection = activeCategory?.id === category.id ? null : category;
    setActiveCategory(newSelection);
    onCategorySelect?.(newSelection);
  };

  const renderCategoryButton = (category: JobCategoryInterface) => {
    const isSelected = activeCategory?.id === category.id;
    const IconComponent = getIconComponent(category.iconName);

    return (
      <Pressable
        key={category.id}
        style={styles.categoryButton}
        onPress={() => handleCategoryPress(category)}
      >
        <Box style={isSelected ? {...styles.iconContainer, ...styles.selectedIconContainer} : styles.iconContainer}>
          {Platform.OS === 'web' ? (
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
              {category.label.charAt(0)}
            </Text>
          ) : (
            <Icon as={IconComponent} size="lg" color="#FFFFFF" />
          )}
        </Box>
        <Text
          style={isSelected ? {...styles.categoryLabel, ...styles.selectedLabel} : styles.categoryLabel}
          numberOfLines={2}
        >
          {category.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Pressable style={styles.scrollButtonLeft} onPress={scrollLeft}>
          <Icon as={ChevronLeftIcon} size="md" color="#666666" />
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
          <Icon as={ChevronRightIcon} size="md" color="#666666" />
        </Pressable>
      )}
    </View>
  );
};

const createStyles = ({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) => StyleSheet.create({
  container: {
    height: 120,
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      overflow: 'scroll',
    }),
  },
  scrollContent: {
    paddingHorizontal: 16,
    ...(Platform.OS === 'web' && {
      flexGrow: 1,
    }),
  },
  categoriesContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    ...(Platform.OS === 'web' && {
      minWidth: '100%',
    }),
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 80,
    minHeight: 100,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 8,
    borderColor: '#E0E0E0',
  },
  selectedIconContainer: {
    backgroundColor: primaryColor,
    borderColor: '#AA0000',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: Platform.OS === 'web' ? 1.17 : 14,
    fontWeight: '500',
  },
  selectedLabel: {
    color: primaryColor,
    fontWeight: '600',
  },
  scrollButtonLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollButtonRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

});

export default JobCategorySelector;