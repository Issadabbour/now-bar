import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';
import WeatherWidget from '../components/WeatherWidget';
import NewsCard from '../components/NewsCard';
import QuickAccess from '../components/QuickAccess';
import ReminderWidget from '../components/ReminderWidget';

export default function HomeScreen() {
  const { colors, visibleWidgets } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {/* Search Bar */}
          {visibleWidgets.search && <SearchBar />}

          {/* Weather Widget */}
          {visibleWidgets.weather && <WeatherWidget />}

          {/* Quick Access */}
          {visibleWidgets.quickAccess && <QuickAccess />}

          {/* Reminders */}
          {visibleWidgets.reminders && <ReminderWidget />}

          {/* News Feed */}
          {visibleWidgets.news && (
            <View>
              <NewsCard />
            </View>
          )}
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
});
