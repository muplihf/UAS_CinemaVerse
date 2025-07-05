import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSearch }) => (
  <View style={searchBarStyles.container}>
    <TextInput
      style={searchBarStyles.input}
      placeholder="Search for movies, series..."
      placeholderTextColor={Colors.muted}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSearch}
      returnKeyType="search"
    />
  </View>
);

const searchBarStyles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});