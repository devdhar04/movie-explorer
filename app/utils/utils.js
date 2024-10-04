import {Share} from 'react-native';

export const getGenreNamesById = async (genreIds,genres) => {

  return genreIds.map(id => {
    const genre = genres.find(genre => genre.id === id);
    return genre ? genre.name : null;
  }).filter(name => name);  // Filter out null values if any genre is not found
};

export const getUniqueMovies = (movies) => {
  const uniqueMovies = [];
  const movieIds = new Set();

  movies.forEach((movie) => {
    if (!movieIds.has(movie.id)) {
      uniqueMovies.push(movie);
      movieIds.add(movie.id);
    }
  });

  return uniqueMovies;
};

export const getCSVValues = (array,sliceIndex) => {

  return array.slice(0, sliceIndex).map((g) => g.name).join(', ')
}

export const onShare = async (movie,cast) => {
  try {
    const result = await Share.share({
      message: buildMovieMessage(movie,cast)
    });
    
  } catch (error) {
    Alert.alert(error.message);
  }
};

/**
 * Utility function to build a message string for a movie.
 * @param {Object} movie - The movie object containing title, overview, and poster path.
 * @param {Array} cast - The list of cast members.
 * @param {number} maxCast - Maximum number of cast members to display (default is 5).
 * @returns {string} - The formatted message string.
 */
export const buildMovieMessage = (movie, cast, maxCast = 5) => {
  // Helper function to get a comma-separated list of cast names, limited by maxCast
  const getCSVValues = (cast, maxCast) => {
    return cast.slice(0, maxCast).map(member => member.name).join(', ');
  };

  // Build the message
  const message = `${movie.title}\n\n${movie.overview}\n\nCast: ${getCSVValues(cast, maxCast)}\n\nhttps://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return message;
};