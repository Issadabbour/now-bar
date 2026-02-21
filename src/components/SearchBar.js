import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SearchBar() {
  const { colors, accentColor } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      Alert.alert('Search', `You searched for: ${searchText}`);
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]} 
          placeholder="Search..."
          placeholderTextColor={colors.text + '80'}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <View
            style={[
              styles.searchButton,
              { backgroundColor: accentColor },
            ]}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
});
