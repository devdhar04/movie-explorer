
export const getGenreNamesById = async (genreIds) => {

    return genreIds
      .map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(name => name !== null);  
  }