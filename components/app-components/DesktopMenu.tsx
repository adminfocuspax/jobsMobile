import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    useColorScheme,
    Image,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '../../components/ui/icon';
import {
    Home,
    Briefcase,
    Mail,
    Bell,
    Bookmark,
    User,
    Settings,
} from 'lucide-react-native';

interface MenuItem {
    id: string;
    title: string;
    icon: string;
    route?: string;
    action?: () => void;
    badge?: number;
}

interface DesktopMenuProps {
    activeRoute?: string;
}

export default function DesktopMenu({ activeRoute }: DesktopMenuProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === 'dark';

    const menuItems: MenuItem[] = [
        {
            id: 'home',
            title: t('menu.home') || 'Home',
            icon: 'Home',
            route: '/(tabs)',
        },
        {
            id: 'jobs',
            title: t('menu.jobs') || 'Jobs',
            icon: 'Briefcase',
            route: '/(tabs)/yourjobs',
        },
        {
            id: 'messages',
            title: t('menu.messages') || 'Messages',
            icon: 'Mail',
            badge: 3,
        },
        {
            id: 'notifications',
            title: t('menu.notifications') || 'Notifications',
            icon: 'Bell',
            badge: 12,
        },
        {
            id: 'bookmarks',
            title: t('menu.bookmarks') || 'Bookmarks',
            icon: 'Bookmark',
        },
        {
            id: 'profile',
            title: t('menu.profile') || 'Profile',
            icon: 'User',
            route: '/(tabs)/user-info/page',
        },
        {
            id: 'settings',
            title: t('menu.settings') || 'Settings',
            icon: 'Settings',
        },
    ];

    const getIconComponent = (iconName: string) => {
        const iconMap: { [key: string]: any } = {
            Home,
            Briefcase,
            Mail,
            Bell,
            Bookmark,
            User,
            Settings,
        };
        return iconMap[iconName] || Home;
    };

    const handleMenuItemPress = (item: MenuItem) => {
        if (item.action) {
            item.action();
        } else if (item.route) {
            router.push(item.route as any);
        }
    };

    const dynamicStyles = createStyles(isDarkTheme);

    return (
        <ThemedView style={dynamicStyles.container}>
            {/* Logo Section */}
            <View style={dynamicStyles.logoSection}>
                <ThemedText style={dynamicStyles.logoText}>imartJobs</ThemedText>
            </View>

            {/* Navigation Menu */}
            <View style={dynamicStyles.menuSection}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            dynamicStyles.menuItem,
                            (activeRoute && activeRoute === item.route) && dynamicStyles.activeMenuItem,
                        ]}
                        onPress={() => handleMenuItemPress(item)}
                        activeOpacity={0.7}
                    >
                        <View style={dynamicStyles.menuItemContent}>
                            <Icon
                                as={getIconComponent(item.icon)}
                                size="lg"
                                className={
                                    (activeRoute && activeRoute === item.route)
                                        ? "text-white"
                                        : isDarkTheme ? "text-white" : "text-gray-700"
                                }
                            />
                            <ThemedText
                                style={[
                                    dynamicStyles.menuText,
                                    (activeRoute && activeRoute === item.route) && dynamicStyles.activeMenuText,
                                ]}
                            >
                                {item.title}
                            </ThemedText>
                            {item.badge && item.badge > 0 && (
                                <View style={dynamicStyles.badge}>
                                    <ThemedText style={dynamicStyles.badgeText}>
                                        {item.badge > 99 ? '99+' : item.badge.toString()}
                                    </ThemedText>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* User Profile Section */}
            <View style={dynamicStyles.profileSection}>
                <TouchableOpacity
                    style={dynamicStyles.profileButton}
                    onPress={() => console.log('Profile pressed')}
                    activeOpacity={0.7}
                >
                    <Avatar size="md">
                        <AvatarFallbackText>JD</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                            }}
                        />
                    </Avatar>
                    <View style={dynamicStyles.profileInfo}>
                        <ThemedText style={dynamicStyles.profileName}>Jane Doe</ThemedText>
                        <ThemedText style={dynamicStyles.profileHandle}>@janedoe</ThemedText>
                    </View>
                    <IconSymbol
                        size={16}
                        name="ellipsis"
                        color={dynamicStyles.menuText.color}
                    />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const createStyles = (isDarkTheme: boolean) =>
    StyleSheet.create({
        container: {
            width: 280,
            height: '100%',
            backgroundColor: isDarkTheme ? '#000000' : '#FFFFFF',
            borderRightWidth: 1,
            borderRightColor: isDarkTheme ? '#2F3336' : '#E1E8ED',
            paddingVertical: 20,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
        },
        logoSection: {
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkTheme ? '#2F3336' : '#E1E8ED',
            marginBottom: 20,
        },
        logoText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: isDarkTheme ? '#FFFFFF' : '#0F1419',
        },
        menuSection: {
            flex: 1,
            paddingTop: 10,
        },
        menuItem: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 25,
            marginBottom: 4,
        },
        activeMenuItem: {
            backgroundColor: isDarkTheme ? '#1D9BF0' : '#1D9BF0',
        },
        menuItemContent: {
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
        },
        menuText: {
            fontSize: 20,
            fontWeight: '400',
            marginLeft: 20,
            color: isDarkTheme ? '#FFFFFF' : '#0F1419',
        },
        activeMenuText: {
            color: '#FFFFFF',
            fontWeight: '700',
        },
        badge: {
            position: 'absolute',
            right: 0,
            backgroundColor: '#1D9BF0',
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 6,
        },
        badgeText: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '700',
        },
        profileSection: {
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: isDarkTheme ? '#2F3336' : '#E1E8ED',
        },
        profileButton: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            borderRadius: 25,
            backgroundColor: 'transparent',
        },
        profileInfo: {
            flex: 1,
            marginLeft: 12,
        },
        profileName: {
            fontSize: 16,
            fontWeight: '700',
            color: isDarkTheme ? '#FFFFFF' : '#0F1419',
        },
        profileHandle: {
            fontSize: 14,
            color: isDarkTheme ? '#71767B' : '#536471',
            marginTop: 2,
        },
    });