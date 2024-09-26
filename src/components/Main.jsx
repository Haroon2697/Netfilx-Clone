import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../Request';

const Main = () => {
  const [movies, setMovies] = useState([]);

  // Ensure movies is not empty before picking a random one
  const movie = movies.length > 0 ? movies[Math.floor(Math.random() * movies.length)] : null;

  useEffect(() => {
    axios.get(requests.requestPopular)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  // Function to truncate the description
  const truncate = (str, n) => {
    if (str?.length > n) {
      return str.slice(0, n) + '...';
    }
    return str; // Return the original string if it's not longer than n
  };

  return (
<div className='w-full h-[50vh]  md:h-[550px] text-white relative'>
<div className='absolute w-full h-full bg-gradient-to-r from-black'></div>
      {movie ? (
        <img
          className='w-full h-full object-cover object-top' 
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <p>Loading...</p>
        </div>
      )}

      {/* Optional text overlay for title and description */}
      {movie && (
        <div className='absolute w-full top-[20%] left-4 sm:top-[10%] md:top-[30%] p-4 '>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>

          <div className='my-4'>
            <button className='bg-white border border-transparent text-black py-2 px-4 rounded-sm hover:bg-transparent hover:text-white hover:border-white transition duration-300'>Play</button>
            <button className='ml-4 bg-transparent border border-white text-white py-2 px-4 rounded-sm hover:bg-gray-300 hover:text-black transition duration-300'>Watch Later</button>
          </div>

          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>

          <p className='text-gray-300 text-sm md:text-lg my-4 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]'>
            {truncate(movie?.overview, 150)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
