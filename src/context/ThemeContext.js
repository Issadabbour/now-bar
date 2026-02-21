import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#007AFF');
  const [visibleWidgets, setVisibleWidgets] = useState({
    weather: true,
    news: true,
    quickAccess: true,
    search: true,
    reminders: true,
  });

  const colors = {
    light: {
      background: '#fff',
      text: '#000',
      card: '#f5f5f5',
      border: '#e0e0e0',
    },
    dark: {
      background: '#1a1a1a',
      text: '#fff',
      card: '#2a2a2a',
      border: '#444',
    },
  };

  const accentColors = [
    '#007AFF', // Blue
    '#FF3B30', // Red
    '#34C759', // Green
    '#FF9500', // Orange
    '#AF52DE', // Purple
  ];

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedAccent = await AsyncStorage.getItem('accentColor');
      const savedWidgets = await AsyncStorage.getItem('visibleWidgets');

      if (savedTheme) setTheme(savedTheme);
      if (savedAccent) setAccentColor(savedAccent);
      if (savedWidgets) setVisibleWidgets(JSON.parse(savedWidgets));
    } catch (error) {
      console.log('Error loading preferences:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const setNewAccentColor = async (color) => {
    setAccentColor(color);
    await AsyncStorage.setItem('accentColor', color);
  };

  const toggleWidget = async (widgetName) => {
    const newWidgets = {
      ...visibleWidgets,
      [widgetName]: !visibleWidgets[widgetName],
    };
    setVisibleWidgets(newWidgets);
    await AsyncStorage.setItem('visibleWidgets', JSON.stringify(newWidgets));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: colors[theme],
        accentColor,
        accentColors,
        toggleTheme,
        setNewAccentColor,
        visibleWidgets,
        toggleWidget,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};