import axios from 'axios';

export default {
  getTvSeries: async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  find: async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },

};
