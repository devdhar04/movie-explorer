import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchMovieDetails, getCast } from '../services/api';
import { useLocalSearchParams } from 'expo-router';
import LabelValueView from '../components/LabelValueView'

const MovieDetailScreen = ({ route }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const { id, title, releaseYear } = useLocalSearchParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      console.log('MovieDetail', data);
      setMovie(data);
    };
    const getCastDetails = async () => {
      const data = await getCast(id);
      console.log('getCastDetails', data.cast);
      setCast(data.cast);
      setCrew(data.crew);
    };
    getCastDetails();
    getMovieDetails();
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <LabelValueView label="Release Date :" value={movie.release_date}/>
        <LabelValueView label="Rating :" value={movie.vote_average}/>
        <LabelValueView label="Genres :" value={movie.genres.map((g) => g.name).join(', ')}/>
        <Text style={styles.description}>{movie.overview}</Text>
        <LabelValueView label="Cast :" value={cast.slice(0, 5).map((g) => g.name).join(', ')}/>
        <LabelValueView label="Crew :" value={crew.slice(0, 3).map((g) => g.name).join(', ')} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  poster: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 14, color: 'gray' },
  labelContainer: {
    flexDirection: 'row', // Align label and value in a row
    marginVertical: 10,   // Space between each label-value pair
  },
});

export default MovieDetailScreen;
