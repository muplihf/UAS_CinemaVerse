import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientText } from '../components/GradientText';
import { MessageDisplay } from '../components/MessageDisplay';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { Colors } from '../constants/Colors';
import { MovieSearchResult } from '../types/api';

const API_KEY = 'b45dad4f';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success' | 'not_found'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() === '') return;
    
    setStatus('loading');
    setMovies([]);
    setErrorMsg('');

    try {
      const response = await axios.get(API_URL, { params: { s: searchTerm } });
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setStatus('success');
      } else {
        setStatus('not_found');
        setErrorMsg(response.data.Error);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not connect to the server. Please check your internet connection.');
    }
  }, [searchTerm]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1 }} />;
      case 'success':
        return (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.imdbID}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            contentContainerStyle={{ gap: 16, padding: 20 }}
          />
        );
      case 'not_found':
        return <MessageDisplay title="Not Found" message={errorMsg} />;
      case 'error':
        return <MessageDisplay title="Oops!" message={errorMsg} />;
      case 'idle':
      default:
        return <MessageDisplay title="Welcome" message="You Need To Find Movie First." />;
    }
  };

  return (
    <SafeAreaView style={indexStyles.container} edges={['top', 'left', 'right']}>
      <View style={indexStyles.header}>
        <GradientText style={indexStyles.headerTitle}>CinemaVerse</GradientText>
      </View>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} onSearch={handleSearch} />
      <View style={indexStyles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const indexStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5, alignItems: 'flex-start' },
  headerTitle: { fontSize: 32, fontFamily: 'Poppins_700Bold' },
  content: { flex: 1 },
});