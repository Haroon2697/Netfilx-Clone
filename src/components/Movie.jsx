import React  from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Movie = ({ item, isLiked, toggleLike, id }) => {
  return (
    <div 
      key={id} 
      className='w-[160px] sm:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2 transition-all duration-500 ease-in-out hover:scale-[1.05] hover:z-10 transform-origin-top' 
      style={{ overflow: 'visible' }} 
    >
      {/* Movie image */}
      <img 
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} 
        alt={item.title} 
        className='w-full h-auto block'
      />
      
      {/* Hover effect: title overlay */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-0 hover:opacity-100 transition-all duration-300'>
        <p 
          className='text-white text-xs md:text-sm font-bold flex justify-center items-center h-full text-center p-1' 
          style={{ 
            whiteSpace: 'normal',  // Allow text to wrap if needed
            overflow: 'hidden',    // Prevent overflow if the text is too long
            textOverflow: 'ellipsis' // Add ellipsis at the end if it overflows
          }}
        >
          {item.title}
        </p>

        {/* Like button */}
        <p 
          className='absolute top-4 left-4 text-white'
          onClick={() => toggleLike(id)}  // Toggle like when clicked
        >
          {isLiked ? <FaHeart size={20} className='text-red-300' /> : <FaRegHeart size={20} />}
        </p>
      </div>
    </div>
  );
}

export default Movie;
