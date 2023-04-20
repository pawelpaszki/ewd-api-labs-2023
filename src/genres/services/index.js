export default {
  find: ({ genresRepository }) => {
    return genresRepository.find();
  },
  getGenre: (tmdbID, { genresRepository }) => {
    return genresRepository.get(tmdbID);
  },
};
