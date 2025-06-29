import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Heart, House, Star, Zap } from 'lucide-react-native';
import { Icon } from '../../../components/ui/icon';
import { useThemeColors } from '../../../hooks/useThemeColor';
import { useResponsive } from '../../../context/ResponsiveContext';
// import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import CustomHeader from '../../../components/app-components/CustomHeader';
import DesktopMenu from '../../../components/app-components/DesktopMenu';
import { BottomTabHeaderProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { isDesktop, smallDesktop } = useResponsive();
    const styles = createStyles(smallDesktop);

    const TabsComponent = (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
                headerShown: !isDesktop, // Hide header on desktop since we have the side menu
                header: (props: BottomTabHeaderProps) => {
                    // With our type declaration, TypeScript now knows about this property

                    return (
                        !isDesktop ? (
                            <CustomHeader
                                title={props.options.title || props.route.name}
                                showSearch={false}
                            />
                        ) : null
                    );
                },
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: isDesktop ? { display: 'none' } : Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: true,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <IconSymbol size={28} name='house.fill' color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='yourjobs'
                options={{
                    title: 'Your Jobs',
                    headerShown: true,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <IconSymbol size={28} name='briefcase.fill' color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: true,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <IconSymbol size={28} name='person.fill' color={color} />
                    ),
                }}
            />
        </Tabs>
    );

    // On desktop, render with side menu
    if (isDesktop) {
        return (
            <View style={styles.desktopContainer}>
                <DesktopMenu />
                <View style={styles.desktopContent}>
                    <View style={styles.tabsContainer}>
                        {TabsComponent}
                    </View>
                    {/* <DummyComponent /> */}
                </View>
            </View>
        );
    }

    // On mobile/tablet, render normally
    return TabsComponent;
}

const createStyles = (smallDesktop: boolean) => StyleSheet.create({
    desktopContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 0,
        paddingLeft: smallDesktop ? '0%' : '0%',
        backgroundColor: '#fff',
    },
    desktopContent: {
        flex: 1,
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        //maxWidth: '75%',
        overflow: 'scroll',
    },
    tabsContainer: {
        flex: 3, // Takes 75% of the space (3/4)
    },
});