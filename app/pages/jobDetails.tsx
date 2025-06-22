import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import {
    ArrowLeft,
    Share,
    Heart,
    Phone,
    Banknote,
    GraduationCap,
    Zap
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// UI Components
import { Box } from '../../components/ui/box';
import { HStack } from '../../components/ui/hstack';
import { VStack } from '../../components/ui/vstack';
import { Text } from '../../components/ui/text';
import { Heading } from '../../components/ui/heading';
import { Button, ButtonText } from '../../components/ui/button';
import { Badge, BadgeText } from '../../components/ui/badge';
import { Image } from '../../components/ui/image';
import { Card } from '../../components/ui/card';
import { Icon } from '../../components/ui/icon';


// Constants
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import useNavigationGuard from '../../hooks/useNavigationGuard';

export default function JobDetailsScreen() {
    const router = useRouter();
    const { safeNavigate, safeReplace, safeGoBack, isNavigating } = useNavigationGuard({
        debounceTime: 800, // Custom debounce time
    });

    const handleGoBack = () => {
        safeGoBack();
    };

    const handleShare = () => {
        // Implement share functionality
        console.log('Share job');
    };

    const handleFavorite = () => {
        // Implement favorite functionality
        console.log('Add to favorites');
    };

    const handleCompanyProfile = () => {
        // Navigate to company profile
        console.log('Navigate to company profile');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <HStack className="justify-between items-center px-4 py-3 bg-white">
                    <TouchableOpacity onPress={handleGoBack}>
                        <Icon as={ArrowLeft} size="lg" className="text-gray-700" />
                    </TouchableOpacity>

                    <HStack className="gap-4">
                        <TouchableOpacity onPress={handleShare}>
                            <Icon as={Share} size="lg" className="text-gray-700" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFavorite}>
                            <Icon as={Heart} size="lg" className="text-gray-700" />
                        </TouchableOpacity>
                    </HStack>
                </HStack>

                {/* Job Description Header */}
                <VStack className="px-4 py-4">
                    <HStack className="items-center gap-3 mb-4">
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60x60' }}
                            alt="Company Logo"
                            className="w-15 h-15 rounded-lg"
                        />
                        <VStack className="flex-1">
                            <Heading size="lg" className="text-gray-900 mb-1">
                                Software Developer
                            </Heading>
                            <Text className="text-gray-600">
                                Mumbai, Maharashtra
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Job Details List */}
                    <VStack className="gap-3 mb-4">
                        <HStack className="items-center gap-3">
                            <Icon
                                as={Phone}
                                size="sm"
                                style={{ color: Colors.light.primaryColor }}
                            />
                            <Text className="text-gray-700">0-1 years experience</Text>
                        </HStack>

                        <HStack className="items-center gap-3">
                            <Icon
                                as={Banknote}
                                size="sm"
                                style={{ color: Colors.light.primaryColor }}
                            />
                            <Text className="text-gray-700">Rs 12000 - 14000 per month</Text>
                        </HStack>

                        <HStack className="items-center gap-3">
                            <Icon
                                as={GraduationCap}
                                size="sm"
                                style={{ color: Colors.light.primaryColor }}
                            />
                            <Text className="text-gray-700">IT Diploma</Text>
                        </HStack>
                    </VStack>

                    {/* Keywords/Skills Badges */}
                    <HStack className="gap-2 mb-4 flex-wrap">
                        <Badge action="info" variant="solid">
                            <BadgeText>React Native</BadgeText>
                        </Badge>
                        <Badge action="info" variant="solid">
                            <BadgeText>JavaScript</BadgeText>
                        </Badge>
                        <Badge action="info" variant="solid">
                            <BadgeText>Mobile Development</BadgeText>
                        </Badge>
                    </HStack>

                    {/* Job Posted Time */}
                    <Text className="text-gray-500 text-sm mb-4">
                        Posted 4 days ago
                    </Text>

                    {/* Company Profile Button */}
                    <Button
                        variant="link"
                        action="primary"
                        onPress={handleCompanyProfile}
                        className="self-start p-0"
                    >
                        <ButtonText>Company Profile</ButtonText>
                    </Button>
                </VStack>

                {/* Job Details Section */}
                <VStack className="px-4 py-4">
                    <Heading size="md" className="text-gray-900 mb-4">
                        Job Details
                    </Heading>

                    {/* Job Highlights Card */}
                    <Card
                        className="p-4 mb-4"
                        style={{ backgroundColor: '#FAEBD7' }}
                    >
                        <HStack className="items-center gap-2 mb-3">
                            <Icon
                                as={Zap}
                                size="sm"
                                style={{ color: Colors.light.primaryColor }}
                            />
                            <Heading size="sm" className="text-gray-900">
                                Job Highlights
                            </Heading>
                        </HStack>

                        <VStack className="gap-3">
                            <VStack>
                                <Text className="font-semibold text-gray-900 mb-1">
                                    Skills Required:
                                </Text>
                                <Text className="text-gray-700">
                                    React Native, JavaScript, TypeScript, Mobile App Development,
                                    REST APIs, Git, Agile Development
                                </Text>
                            </VStack>

                            <VStack>
                                <Text className="font-semibold text-gray-900 mb-1">
                                    Job Timings:
                                </Text>
                                <Text className="text-gray-700">
                                    Monday to Friday, 9:00 AM - 6:00 PM
                                    Flexible working hours available
                                </Text>
                            </VStack>

                            <VStack>
                                <Text className="font-semibold text-gray-900 mb-1">
                                    Role:
                                </Text>
                                <Text className="text-gray-700">
                                    Junior Software Developer responsible for developing and
                                    maintaining mobile applications using React Native framework.
                                    Work closely with senior developers and participate in code reviews.
                                </Text>
                            </VStack>
                        </VStack>
                    </Card>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}