import '@react-navigation/bottom-tabs';

declare module '@react-navigation/bottom-tabs' {
  export interface BottomTabNavigationOptions {
    headerSearchEnabled?: boolean;
  }
}

declare module 'expo-router' {
  export interface TabsScreenOptions {
    headerSearchEnabled?: boolean;
  }
}
