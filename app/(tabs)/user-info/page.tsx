'use client';
import React, { useState } from 'react';
import UserInfo from '@/app/userDetails/userInfo';
import JobsDrawer from '@/app/components/Drawer';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { SymbolViewProps } from 'expo-symbols';
import i18n from '@/app/i18n/i18n';
import { Box } from '@/components/ui/box';
import ProfileAvatar from '@/app/components/ProfileAvatar';
interface MenuItem {
  icon: SymbolViewProps['name'];
  text: string;
  color: string;
  onPress?: () => void;
}

export default function UserInfoPage() {


  // Function to toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
  };
  const menuItems: MenuItem[] = [
    { icon: "person.fill", text: "My Profile", color: "#000" },
    { icon: "gear", text: "Settings", color: "#000" },
    { icon: "bell.fill", text: "Notifications", color: "#000" },
    { icon: "doc.text.fill", text: "My Applications", color: "#000" },
    { icon: "bookmark.fill", text: "Saved Jobs", color: "#000" },
    { icon: "envelope.fill", text: "Messages", color: "#000" },
    {
      icon: "globe",
      text: i18n.language === 'en' ? "Switch to Tamil" : "Switch to English",
      color: "#000",
      onPress: toggleLanguage
    },
    { icon: "questionmark.circle.fill", text: "Help & Support", color: "#000" },
    { icon: "rectangle.portrait.and.arrow.right", text: "Logout", color: "#CC0000" },
  ];

  return (
  <>
     <Box style={styles.avatarContainer}>
              <ProfileAvatar
                size="xl"
                className="mb-0"
                showChangeText={true}
              />
            </Box>
            <ScrollView
    style={styles.menuList}
    showsVerticalScrollIndicator={true}
    contentContainerStyle={styles.menuListContent}
  >
    {menuItems.map((item, index) => (
      <TouchableOpacity
        key={item.text}
        style={[
          styles.menuItem,
          index === menuItems.length - 1 && styles.menuItemLast
        ]}
        onPress={item.onPress || (() => { })}
      >
        <IconSymbol
          name={item.icon}
          size={18}
          color={item.color}
          style={styles.menuIcon}
        />
        <ThemedText style={[styles.menuText, { color: item.color }]}>
          {item.text}
        </ThemedText>
      </TouchableOpacity>
    ))}
  </ScrollView>

  </>
);
}


const styles = StyleSheet.create({
  avatarContainer:{
    marginTop:30,
  },
  menuHeader: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  logoImage: {
    margin: "auto",
    marginBottom: 8,
    marginTop: 24,
  },
  menuList: {
    maxHeight: 900,
    flex: 1,
  },
  menuListContent: {
    paddingBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
});