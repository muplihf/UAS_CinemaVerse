import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { MovieSearchResult } from '../types/api';

export const MovieCard: React.FC<{ movie: MovieSearchResult }> = ({ movie }) => (
  <TouchableOpacity style={movieCardStyles.container} onPress={() => router.push(`/detail/${movie.imdbID}`)}>
    <Image
      source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/0A1128/FFFFFF?text=No+Image' }}
      style={movieCardStyles.poster}
    />
    <View style={movieCardStyles.overlay}>
      <Text style={movieCardStyles.title} numberOfLines={2}>{movie.Title}</Text>
      <Text style={movieCardStyles.year}>{movie.Year}</Text>
    </View>
  </TouchableOpacity>
);

const movieCardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, overflow: 'hidden' },
  poster: { width: '100%', height: 250 },
  overlay: { padding: 12 },
  title: { color: Colors.text, fontSize: 15, fontFamily: 'Poppins_700Bold', marginBottom: 4 },
  year: { color: Colors.muted, fontSize: 12, fontFamily: 'Poppins_400Regular' },
});