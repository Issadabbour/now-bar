import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function NewsCard() {
  const { colors, accentColor } = useContext(ThemeContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder news data
    const placeholderNews = [
      {
        id: '1',
        title: 'Latest Technology Breakthrough',
        source: 'Tech News',
        time: '2 hours ago',
      },
      {
        id: '2',
        title: 'Global Market Update',
        source: 'Finance Daily',
        time: '4 hours ago',
      },
      {
        id: '3',
        title: 'New Scientific Discovery',
        source: 'Science Today',
        time: '6 hours ago',
      },
      {
        id: '4',
        title: 'Sports Update: Championship Final',
        source: 'Sports Central',
        time: '8 hours ago',
      },
    ];
    setNews(placeholderNews);
    setLoading(false);
  }, []);

  const handleNewsPress = (newsTitle) => {
    Alert.alert('News', `Opening: ${newsTitle}`);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleNewsPress(item.title)}
      style={[
        styles.newsItem,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.newsContent}>
        <Text style={[styles.newsTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <View style={styles.newsFooter}>
          <Text style={[styles.newsSource, { color: colors.text + '80' }]}> 
            {item.source}
          </Text>
          <Text style={[styles.newsTime, { color: colors.text + '80' }]}> 
            {item.time}
          </Text>
        </View>
      </View>
      <View style={[styles.newsImage, { backgroundColor: accentColor + '30' }]}>
        <Text style={styles.imageIcon}>📰</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>For You</Text>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  newsItem: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  newsContent: {
    flex: 1,
    marginRight: 12,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsSource: {
    fontSize: 12,
  },
  newsTime: {
    fontSize: 12,
  },
  newsImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 28,
  },
});