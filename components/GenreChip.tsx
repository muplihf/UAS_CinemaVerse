import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export const GenreChip: React.FC<{ genre: string }> = ({ genre }) => (
  <View style={chipStyles.container}>
    <Text style={chipStyles.text}>{genre}</Text>
  </View>
);

const chipStyles = StyleSheet.create({
  container: { borderColor: Colors.primary, borderWidth: 1, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
  text: { color: Colors.text, fontFamily: 'Poppins_400Regular', fontSize: 12 },
});