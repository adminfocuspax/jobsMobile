import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from '../components/CustomHeader';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primaryColor,
        headerShown: true,
        header: (props: BottomTabHeaderProps) => {
          // With our type declaration, TypeScript now knows about this property
          const headerSearchEnabled = props.options.headerSearchEnabled;
          return (
            <CustomHeader 
              title={props.options.title || props.route.name} 
              showSearch={headerSearchEnabled === true}
            />
          );
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerSearchEnabled:true,
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
    
      
      <Tabs.Screen
        name="user-info/page"
        options={{
          title: 'Settings',
          headerShown: false,
          headerSearchEnabled:false,
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
