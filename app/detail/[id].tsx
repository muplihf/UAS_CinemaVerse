import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailCard } from '../../components/DetailCard';
import { GenreChip } from '../../components/GenreChip';
import { MessageDisplay } from '../../components/MessageDisplay';
import { Colors } from '../../constants/Colors';
import { MovieDetail } from '../../types/api';

const DETAIL_API_URL = `https://www.omdbapi.com/?apikey=b45dad4f`;

const DetailInfoText = ({ text, style }: { text: string; style?: any }) => (
  <Text style={[detailStyles.infoText, style]}>{text || 'N/A'}</Text>
);

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(DETAIL_API_URL, { params: { i: id, plot: 'full' } });
        if (response.data.Response === 'True') setMovie(response.data);
        else setError(response.data.Error);
      } catch (e) {
        setError('Failed to load details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <View style={detailStyles.centered}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  }

  if (error || !movie) {
    return <View style={detailStyles.centered}><MessageDisplay title="Error" message={error || 'Movie details not found.'} /></View>;
  }

  const genres = movie.Genre.split(', ');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={detailStyles.content}>
        <Image
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/0A1128/FFFFFF?text=No+Image' }}
          style={detailStyles.poster}
        />
        <Text style={detailStyles.title}>{movie.Title}</Text>
        <Text style={detailStyles.meta}>{`${movie.Year} • ${movie.Rated} • ${movie.Runtime}`}</Text>

        <DetailCard title="Plot"><DetailInfoText text={movie.Plot} /></DetailCard>
        <DetailCard title="Genres"><View style={detailStyles.genreContainer}>{genres.map((g) => <GenreChip key={g} genre={g} />)}</View></DetailCard>
        <DetailCard title="Director"><DetailInfoText text={movie.Director} /></DetailCard>
        <DetailCard title="Writer"><DetailInfoText text={movie.Writer} /></DetailCard>
        <DetailCard title="Cast"><DetailInfoText text={movie.Actors} /></DetailCard>
        <DetailCard title="Country & Language">
          <DetailInfoText text={`Country: ${movie.Country}`} />
          <DetailInfoText text={`Language: ${movie.Language}`} />
        </DetailCard>
        <DetailCard title="Box Office" iconName="dollar-sign">
          <DetailInfoText text={movie.BoxOffice} style={{ color: '#28a745', fontFamily: 'Poppins_700Bold' }} />
        </DetailCard>
        <DetailCard title="Awards & Recognition" iconName="award">
          <DetailInfoText text={movie.Awards} />
        </DetailCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const detailStyles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 40 },
  poster: { width: '60%', aspectRatio: 2 / 3, borderRadius: 16, alignSelf: 'center', marginBottom: 24 },
  title: { color: Colors.text, fontSize: 28, fontFamily: 'Poppins_700Bold', textAlign: 'center', marginBottom: 8 },
  meta: { color: Colors.muted, fontSize: 15, fontFamily: 'Poppins_400Regular', textAlign: 'center', marginBottom: 24 },
  infoText: { color: Colors.muted, fontSize: 15, fontFamily: 'Poppins_400Regular', lineHeight: 24 },
  genreContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
});
