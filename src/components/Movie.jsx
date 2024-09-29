import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';

const Movie = ({ item, toggleLike, id }) => {
  const [liked, setLiked] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, 'users', `${user?.email}`); // Add semicolon
  const savedShows = async () => {
    if (user?.email) {
      setLiked(!liked);
      await updateDoc(movieId, { 
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          backdrop_path: item.backdrop_path,
          Timestamp: Timestamp.now()
          
        }) 
      });
    } else {
      alert('You must be logged in to save movies');
    }
  };

  return (
    <div 
      key={id} 
      className='w-[160px] sm:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2 transition-all duration-500 ease-in-out hover:scale-[1.05] hover:z-10 transform-origin-top' 
      style={{ overflow: 'visible' }} 
    >
      <img 
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} 
        alt={item.title} 
        className='w-full h-auto block'
      />
      
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-0 hover:opacity-100 transition-all duration-300'>
        <p 
          className='text-white text-xs md:text-sm font-bold flex justify-center items-center h-full text-center p-1' 
          style={{ 
            whiteSpace: 'normal',  
            overflow: 'hidden',    
            textOverflow: 'ellipsis'
          }}
        >
          {item.title}
        </p>

        <p 
          className='absolute top-4 left-4 text-white'
          onClick={savedShows} // Corrected to use savedShows directly
          toggleLike={toggleLike}
        >
          {liked ? 
          <FaHeart size={20} className='text-red-300' /> 
          : 
          <FaRegHeart size={20} />}
        </p>
      </div>
    </div>
  );
}

export default Movie;
