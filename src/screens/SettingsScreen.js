import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useContext(ThemeContext);

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'Cache cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleResetSettings = async () => {
    Alert.alert(
      'Reset Settings',
      'Reset all customization to defaults?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('theme');
              await AsyncStorage.removeItem('accentColor');
              await AsyncStorage.removeItem('visibleWidgets');
              Alert.alert('Success', 'Settings reset to defaults');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset settings');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>  
      <ScrollView>
        <View style={styles.content}>
          {/* General Settings */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>General</Text>

            <TouchableOpacity
              onPress={handleClearCache}
              style={[styles.button, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>  
                Clear Cache
              </Text>
            </TouchableOpacity>
          </View>

          {/* Advanced Settings */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>Advanced</Text>

            <TouchableOpacity
              onPress={handleResetSettings}
              style={[styles.button, styles.dangerButton]}
            >
              <Text style={styles.dangerText}>Reset to Defaults</Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>App Info</Text>
            <Text style={[styles.info, { color: colors.text }]}>  
              Version: 1.0.0
            </Text>
            <Text style={[styles.info, { color: colors.text }]}>  
              Made with React Native
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  info: {
    fontSize: 14,
    marginVertical: 4,
  },
});