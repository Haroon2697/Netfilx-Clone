const key = 'f8b9300b60a825b9633fd393b3e1fc17'

export const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`,
    requestActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
    requestComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`,
    requestHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
    requestRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,
    requestDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=99`,
    requestNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,
    requestDiscover: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=99`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export default requests;