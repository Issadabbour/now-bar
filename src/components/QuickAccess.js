import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const APPS = [
  { id: 1, name: 'Phone', icon: '☎️' },
  { id: 2, name: 'Messages', icon: '💬' },
  { id: 3, name: 'Camera', icon: '📷' },
  { id: 4, name: 'Maps', icon: '🗺️' },
  { id: 5, name: 'Music', icon: '🎵' },
  { id: 6, name: 'Gallery', icon: '🖼️' },
];

export default function QuickAccess() {
  const { colors, accentColor } = useContext(ThemeContext);

  const handleAppPress = (appName) => {
    Alert.alert('Launch App', `Launching ${appName}...`);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Quick Access</Text>

      <View style={styles.appsGrid}>
        {APPS.map((app) => (
          <TouchableOpacity
            key={app.id}
            onPress={() => handleAppPress(app.name)}
            style={styles.appItem}
          >
            <View
              style={[
                styles.appIcon,
                { backgroundColor: accentColor + '20' },
              ]}
            >
              <Text style={styles.icon}>{app.icon}</Text>
            </View>
            <Text style={[styles.appName, { color: colors.text }]}> {app.name} </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  appItem: {
    alignItems: 'center',
    marginBottom: 12,
    width: '32%',
  },
  appIcon: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
  },
  appName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
