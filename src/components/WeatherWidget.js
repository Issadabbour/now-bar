import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function WeatherWidget() {
  const { colors, accentColor } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder weather data
    setWeather({
      temp: 24,
      condition: 'Partly Cloudy',
      location: 'Your Location',
      humidity: 65,
      windSpeed: 12,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.card }]}>  
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

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
      <View style={styles.header}>
        <Text style={[styles.location, { color: colors.text }]}>  
          {weather.location}
        </Text>
        <Text style={[styles.condition, { color: colors.text + '80' }]}>  
          {weather.condition}
        </Text>
      </View>

      <View style={styles.mainTemp}>
        <Text style={[styles.temperature, { color: colors.text }]}>  
          {weather.temp}°C
        </Text>
        <Text style={styles.weatherIcon}>☀️</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={[styles.detailLabel, { color: colors.text + '80' }]}>  
            Humidity
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>  
            {weather.humidity}%
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={[styles.detailLabel, { color: colors.text + '80' }]}>  
            Wind
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>  
            {weather.windSpeed} km/h
          </Text>
        </View>
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
  header: {
    marginBottom: 12,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 14,
    marginTop: 4,
  },
  mainTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  weatherIcon: {
    fontSize: 40,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
