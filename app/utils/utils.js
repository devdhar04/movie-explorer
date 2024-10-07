import {Share} from 'react-native';

/**
 * Retrieves genre names based on an array of genre IDs and a list of available genres.
 * @param {Array<number>} genreIds - An array of genre IDs.
 * @param {Array<Object>} genres - A list of genre objects, each containing an `id` and `name`.
 * @returns {Promise<string>} A string of genre names separated by commas.
 */
export const getGenreNamesById = async (genreIds,genres) => {
  const genreNames =  genreIds.map(id => {

    const genre = genres.find(genre => genre.id === id);
    return genre ? genre.name : null;
  }).filter(name => name);  // Filter out null values if any genre is not found
  return genreNames.join(', '); 
};

/**
 * Filters out duplicate movies from the provided array based on unique movie IDs.
 * @param {Array<Object>} movies - An array of movie objects, each containing an `id`.
 * @returns {Array<Object>} A filtered array containing only unique movies.
 */
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

/**
 * Generates a comma-separated string of values (e.g., names) from an array.
 * @param {Array<Object>} array - An array of objects that contain a `name` property.
 * @param {number} sliceIndex - The number of elements to take from the array.
 * @returns {string} A comma-separated string of the names from the sliced array.
 */
export const getCSVValues = (array,sliceIndex) => {

  return array.slice(0, sliceIndex).map((g) => g.name).join(', ')
}

/**
 * Shares a movie's details including title, overview, and cast via the native share functionality.
 * @param {Object} movie - The movie object containing the movie details.
 * @param {Array<Object>} cast - An array of cast members, each containing a `name`.
 * @returns {Promise<void>} Initiates the share functionality with the movie's message.
 */
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