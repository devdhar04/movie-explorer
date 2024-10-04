
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