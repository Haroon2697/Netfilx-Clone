import React, { useEffect, useState, useRef } from 'react';  
import axios from 'axios';  
import Movie from './Movie';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);  
  const [likedMovies, setLikedMovies] = useState({});  // Object to store liked state per movie
  const sliderRef = useRef(null);  // Use a ref to access the slider DOM element

  useEffect(() => {
    axios.get(fetchUrl)
      .then(response => {
        setMovies(response.data.results);  
      })
      .catch(error => {
        console.error('Error fetching movies:', error);  
      });
  }, [fetchUrl]);  

  // Toggle like state for a specific movie
  const toggleLike = (id) => {
    setLikedMovies((prevState) => ({
      ...prevState,
      [id]: !prevState[id]  // Toggle the liked state for the specific movie
    }));
  };

  // Function to scroll the slider left
  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= 500;  // Adjust the scroll distance as needed
  };

  // Function to scroll the slider right
  const scrollRight = () => {
    sliderRef.current.scrollLeft += 500;  // Adjust the scroll distance as needed
  };

  return (
    <div className='mx-4 group'>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      
      {/* Horizontal scrolling container with overlay arrows */}
      <div className='relative flex items-center'>
        {/* Left arrow (hidden by default, shown on hover) */}
        <FaChevronLeft 
          onClick={scrollLeft} 
          className='bg-gray-300 p-1 text-black text-xs rounded-full absolute left-4 opacity-0 group-hover:opacity-100 hover:bg-white cursor-pointer z-20 transition-opacity duration-300 hidden md:block'  // Arrow hidden by default, visible on hover
          size={25}
        />
        
        {/* Movie slider */}
        <div 
          id={'slider'} 
          ref={sliderRef}  // Attach the ref to the slider div
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movies.map((item, id) => (
            <Movie 
              key={id} 
              item={item} 
              id={id}  // Pass the movie's ID
              isLiked={likedMovies[id]}  // Pass whether the movie is liked
              toggleLike={toggleLike}  // Pass the toggleLike function
            />
          ))}
        </div>

        {/* Right arrow (hidden by default, shown on hover) */}
        <FaChevronRight 
          onClick={scrollRight} 
          className='bg-gray-300 p-1 text-black text-xs rounded-full absolute right-4 opacity-0 group-hover:opacity-100 hover:bg-white cursor-pointer z-20 transition-opacity duration-300 hidden md:block'  // Arrow hidden by default, visible on hover
          size={25}
        />
      </div>
    </div>
  );
};

export default Row;
