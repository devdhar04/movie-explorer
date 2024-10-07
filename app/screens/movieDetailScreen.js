import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchMovieDetails, getCast } from '../services/api';
import { useLocalSearchParams } from 'expo-router';
import LabelValueView from '../components/LabelValueView'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getCSVValues, onShare } from '../utils/utils'
import RatingPopup from '../components/RatingView';
import RatingButton from '../components/RatingButton';

const MovieDetailScreen = ({ route }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);


  const { id } = useLocalSearchParams();

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    const getCastDetails = async () => {
      const data = await getCast(id);
      setCast(data.cast);
      setCrew(data.crew);
    };
    getCastDetails();
    getMovieDetails();
  }, [id]);


  if (!movie)
    return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={{ flexDirection: 'row' }} >
          <LabelValueView label="Release Date :" value={movie.release_date} />
          <FontAwesome size={24} name="share-alt" onPress={() => onShare(movie, cast)} />
        </View>
        <RatingPopup
          movieId={movie.id}
          isVisible={isPopupVisible}
          onClose={closePopup}
        />
        <View style={{ flexDirection: 'row' }} >
          <LabelValueView label="Rating :" value={movie.vote_average} />
          <RatingButton onPress={openPopup}/>
        </View>

        <LabelValueView label="Genres :" value={movie.genres.map((g) => g.name).join(', ')} />
        <Text style={styles.description}>{movie.overview}</Text>
        <LabelValueView label="Cast :" value={getCSVValues(cast, 5)} />
        <LabelValueView label="Crew :" value={getCSVValues(crew, 3)} />
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
