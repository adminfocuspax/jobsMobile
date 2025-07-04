import React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { useResponsive } from '@/context/ResponsiveContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  Heart,
  MapPin,
  Calendar,
  Bookmark,
} from 'lucide-react-native';
import { useNavigationGuard } from '@/hooks';
import { useThemeColors } from '../../../hooks/useThemeColor';
import { Badge, BadgeText } from '../../ui/badge';
import { JobInterface } from '../constant';



interface JobCardProps {
  job: JobInterface;
  onViewDetails?: (job: JobInterface) => void;
  onApply?: (job: JobInterface) => void;
  onToggleFavorite?: (job: JobInterface) => void;
  isFavorite?: boolean;
  isGradient?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  onApply,
  onToggleFavorite,
  isFavorite = false,
  isGradient = false
}) => {
  const { thirdColor, values } = useResponsive();
  const { primaryColor, secondaryColor, borderColor } = useThemeColors({}, ['primaryColor', 'secondaryColor', 'borderColor']);
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const themeColors = Colors[colorScheme ?? 'light'];

  console.log('Current theme:', colorScheme, 'isDark:', isDarkTheme);

  const styles = createStyles({
    primaryColor,
    secondaryColor,
    isGradient,
    thirdColor,
    isDarkTheme,
    themeColors,
    borderColor
  });
  const { safeNavigate } = useNavigationGuard({ debounceTime: 1000 });


  const handleViewDetails = () => {
    console.log("view details", job);

    safeNavigate(
      { pathname: '/pages/jobDetails' },
      () => onViewDetails?.(job)
    );
  };

  const handleApply = () => {
    onApply?.(job);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(job);
  };

  const formatPostedDate = (dateString: string) => {
    // If it's already a relative time string, return as is
    if (dateString.includes('ago') || dateString.includes('day') || dateString.includes('hour')) {
      return dateString;
    }

    // Otherwise, try to parse and format the date
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return '1 day ago';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
      } else {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? '1 month ago' : `${months} months ago`;
      }
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card variant="elevated" style={styles.card}>
      {/* Header with company logo, name, location and favorite icon */}
      <HStack style={styles.keywordsContainer}>
        {job.keywords.slice(0, 3).map((keyword, index) => (
          // <Box key={index} style={styles.keywordTag}>
          //   <Text style={styles.keywordText}>
          //     {keyword}
          //   </Text>
          // </Box>
          <Badge key={`${keyword}-${index}`} action={isDarkTheme ? 'muted' : 'success'} variant="solid">
            <BadgeText>{keyword}</BadgeText>
          </Badge>
        ))}
      </HStack>
      <HStack style={styles.header}>

        <HStack style={styles.companyInfo}>
          {/* Company Logo */}
          <Box style={styles.logoContainer}>
            {job.company.logo ? (
              <Image
                source={{ uri: job.company.logo }}
                style={styles.companyLogo}
                alt={`${job.company.name} logo`}
                size='xs'
              />
            ) : (
              <Box style={styles.placeholderLogo}>
                <Text style={styles.placeholderLogoText}>
                  {job.company.name.charAt(0).toUpperCase()}
                </Text>
              </Box>
            )}
          </Box>

          {/* Company Name and Location */}
          <VStack style={styles.companyDetails}>
            <Text style={styles.companyName} numberOfLines={1}>
              {job.company.name}
            </Text>
            {job.company.location.slice(0, 2).map((location, index) => (
              <HStack key={`location-${index}`} style={styles.locationContainer}>
                <Icon as={MapPin} size="xs" style={styles.locationIcon} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {location.area}, {location.city}, {location.state}
                </Text>
              </HStack>
            ))}
            {job.company.location.length > 2 && (
              <HStack style={styles.locationContainer}>
                <Icon as={MapPin} size="xs" style={styles.locationIcon} />
                <Text style={styles.locationText} numberOfLines={1}>
                  +{job.company.location.length - 2} more location{job.company.location.length - 2 > 1 ? 's' : ''}
                </Text>
              </HStack>
            )}
          </VStack>
        </HStack>

        {/* Favorite Icon */}
        <Pressable onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Icon
            as={Bookmark}
            size="md"
            style={[
              styles.favoriteIcon,
              isFavorite && styles.favoriteIconActive
            ]}
          />
        </Pressable>
      </HStack>

      {/* Body with job title, keywords, and posted date */}
      <VStack style={styles.body}>
        {/* Job Title */}
        <Text style={styles.jobTitle} numberOfLines={2}>
          {job.title}
        </Text>

        {/* Keywords */}


        {/* Posted Date */}
        <HStack style={styles.postedDateContainer}>
          <Icon as={Calendar} size="xs" style={styles.dateIcon} />
          <Text style={styles.postedDateText}>
            {formatPostedDate(job.postedDate)}
          </Text>
        </HStack>
      </VStack>
      {/* <VideoComponent
        url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        height={180}
        controls={false}
        autoPlay={true}
        muted={true}
        resizeMode="cover"
      /> */}

      {/* Footer with action buttons */}
      <HStack style={styles.footer}>
        <Button
          variant="outline"
          action="secondary"
          size="sm"
          style={[styles.button, styles.viewDetailsButton]}
          onPress={handleViewDetails}
        >
          <ButtonText style={styles.viewDetailsButtonText}>
            View Details
          </ButtonText>
        </Button>

        <Button
          variant="solid"
          action="primary"
          size="sm"
          style={[styles.button, styles.applyButton]}
          onPress={handleApply}
        >
          <ButtonText style={styles.applyButtonText}>
            Apply
          </ButtonText>
        </Button>
      </HStack>
    </Card>
  );
};

const createStyles = ({
  primaryColor,
  secondaryColor,
  thirdColor,
  isGradient,
  isDarkTheme,
  themeColors,
  borderColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  isGradient: boolean;
  isDarkTheme: boolean;
  borderColor: string,
  themeColors: typeof Colors.light;
}) =>
  StyleSheet.create({
    card: {
      padding: 16,
      marginBottom: 16,
      marginHorizontal: 8,
      backgroundColor: isGradient ? thirdColor : !isDarkTheme ? '#FFFFFF' : '#000',
      borderRadius: 12,
      shadowColor: isDarkTheme ? '#FFFFFF' : '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      minWidth: 310,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: borderColor,
      ...Platform.OS === 'web' && {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: borderColor,
        width: 360,
        minWidth: !isGradient ? "100%" : 410,

      }
    },
    header: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    companyInfo: {
      flex: 1,
      alignItems: 'center',
    },
    logoContainer: {
      marginRight: 12,
      alignItems: 'center',
      flexDirection: 'row',
    },
    companyLogo: {
      width: 76,
      height: 76,
      borderRadius: 8,
    },
    placeholderLogo: {
      width: 48,
      height: 48,
      borderRadius: 8,
      backgroundColor: primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderLogoText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    companyDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    companyName: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 2,
    },
    locationContainer: {
      alignItems: 'center',
    },
    locationIcon: {
      ...(isGradient ? { color: "#FFF" } : { color: '#6B7280' }),
      marginRight: 4,
    },
    locationText: {
      fontSize: 12,
      ...(isGradient ? { color: "#FFF" } : { color: '#6B7280' })
    },
    favoriteButton: {
      padding: 4,
    },
    favoriteIcon: {
      color: '#D1D5DB',
    },
    favoriteIconActive: {
      color: '#EF4444',
    },
    body: {
      marginBottom: 16,
    },
    jobTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColors.text,
      marginBottom: 12,
      ...(Platform.OS !== 'web' && { lineHeight: 24 }),
    },
    keywordsContainer: {
      flexWrap: 'wrap',
      marginBottom: 12,
      gap: 6,
    },
    keywordTag: {
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    keywordText: {
      fontSize: 12,
      color: '#4B5563',
      fontWeight: '500',
    },
    postedDateContainer: {
      alignItems: 'center',
    },
    dateIcon: {
      color: '#9CA3AF',
      marginRight: 4,
      ...(isGradient ? { color: "#FFF" } : {})
    },
    postedDateText: {
      fontSize: 12,
      color: '#9CA3AF',
      ...(isGradient ? { color: "#FFF" } : {})
    },
    footer: {
      justifyContent: 'center',
      gap: 12,
    },
    button: {
      flex: 1,
      minHeight: 40,
    },
    viewDetailsButton: {
      borderColor: isGradient ? primaryColor : secondaryColor,
      ...(isGradient ? { backgroundColor: primaryColor } : {})
    },
    viewDetailsButtonText: {
      color: secondaryColor,
      ...(isGradient ? { color: "#FFF" } : {})
    },
    applyButton: {
      backgroundColor: primaryColor,
    },
    applyButtonText: {
      color: '#FFFFFF',
    },
  });

export default JobCard;