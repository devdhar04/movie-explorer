import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchMovieDetails, getCast } from '../../services/api';
import { useLocalSearchParams } from 'expo-router';
import LabelValueView from '../../components/LabelValueView'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getCSVValues, onShare } from '../../utils/utils'
import RatingPopup from '../../components/RatingView';
import RatingButton from '../../components/RatingButton';
import MovieCarousel from '../../components/MovieCarousel'
import RatingCircle from '../../components/RatingCircle'
import { useNavigation} from 'expo-router';
import {API_CONFIG} from '../../services/apiConfig'

const MovieDetailScreen = ({ }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();

  const imagePaths = [
    `${API_CONFIG.IMAGE_BASE_URL}${movie?.poster_path}`,
    `${API_CONFIG.IMAGE_BASE_URL}${movie?.backdrop_path}`
];

  const { id,item } = useLocalSearchParams();

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const loadDataFromPreviousScreen = () => {
    if (item) {
      try {
        const parsedMovie = JSON.parse(item);
        setMovie(parsedMovie);
       
      } catch (error) {
        console.error('Error parsing movieDetails:', error);
      }
    }
  }
  
  useEffect(() => {
    const configureShareButton= () =>{
      navigation.setOptions({
        headerRight: () => (
          <FontAwesome
            name="share-alt-square"
            size={26}
            color={'#5dade2'}
            onPress={() => onShare(movie, cast)}
            style={{marginRight:10}}
          />
        ),
      });
    }
    configureShareButton();
  }, [movie,cast]);

  useEffect(() => {
    
    loadDataFromPreviousScreen();
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      
        if(data){
          setMovie(data);
        }
    };
    const getCastDetails = async () => {
      const data = await getCast(id);
      setCast(data?.cast);
      setCrew(data?.crew);
     
    };
    getCastDetails();
    getMovieDetails();
    
  }, [id]);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieCarousel movie={imagePaths}/>
        <Text style={styles.title}>{movie?.title}</Text>
        <View style={{ flexDirection: 'row' }} >
          <LabelValueView label="Release Date :" value={movie?.release_date} />
        </View>
        <RatingPopup
          movieId={movie?.id}
          isVisible={isPopupVisible}
          onClose={closePopup}
        />
        <View style={{ flexDirection: 'row' }} >
          <RatingCircle rating={movie?.vote_average} />
          <LabelValueView label="Vote Count :" value={movie?.vote_count} />
          <RatingButton onPress={openPopup} />
        </View>
        
        {movie?.genres && <LabelValueView label="Genres :" value={movie?.genres.map((g) => g.name).join(', ')} />}

        <Text style={styles.description}>{movie?.overview}</Text>
        {cast  && <LabelValueView label="Cast :" value={getCSVValues(cast, 5)} />}
        {crew &&  <LabelValueView label="Crew :" value={getCSVValues(crew, 3)} />}
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
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default MovieDetailScreen;
