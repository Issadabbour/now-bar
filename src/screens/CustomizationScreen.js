import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function CustomizationScreen() {
  const {
    colors,
    accentColor,
    accentColors,
    setNewAccentColor,
    visibleWidgets,
    toggleWidget,
    theme,
    toggleTheme,
  } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>  
      <ScrollView>
        <View style={styles.content}>
          {/* Theme Section */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>

            <View style={styles.setting}>  
              <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>  
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#ccc', true: '#81c784' }}
              />
            </View>
          </View>

          {/* Accent Color Section */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>Accent Color</Text>
            <View style={styles.colorGrid}>  
              {accentColors.map((color) => (
                <TouchableOpacity  
                  key={color}
                  onPress={() => setNewAccentColor(color)}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    accentColor === color && styles.selectedColor,
                  ]}>
                  {accentColor === color && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Widget Visibility Section */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>Widgets</Text>

            {Object.entries(visibleWidgets).map(([widget, isVisible]) => (
              <View key={widget} style={styles.setting}>
                <Text style={[styles.label, { color: colors.text }]}>  
                  {widget.charAt(0).toUpperCase() + widget.slice(1)}
                </Text>
                <Switch
                  value={isVisible}
                  onValueChange={() => toggleWidget(widget)}
                  trackColor={{ false: '#ccc', true: '#81c784' }}
                />
              </View>
            ))}
          </View>

          {/* About Section */}
          <View style={[styles.section, { borderBottomColor: colors.border }]}>  
            <Text style={[styles.title, { color: colors.text }]}>About</Text>
            <Text style={[styles.info, { color: colors.text }]}>  
              Now Bar v1.0.0
            </Text>
            <Text style={[styles.info, { color: colors.text }]}>  
              A Samsung Now Bar clone
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
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  checkmark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    fontSize: 14,
    marginVertical: 4,
  },
});