import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function YourJobsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Jobs</Text>
      <Text style={styles.subtitle}>
        Here you can view and manage your job applications
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
