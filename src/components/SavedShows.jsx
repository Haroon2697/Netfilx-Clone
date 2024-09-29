import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrashAlt } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot, arrayRemove } from 'firebase/firestore';

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const sliderRef = useRef(null); // Create a reference for the slider

    useEffect(() => {
        if (user?.email) {
            const docRef = doc(db, 'users', user.email);
            onSnapshot(docRef, (doc) => {
                setMovies(doc.data()?.savedShows || []); // Ensure you access 'savedShows'
            });
        }
    }, [user?.email]);

    // Function to scroll the slider left
    const scrollLeft = () => {
        sliderRef.current.scrollLeft -= 500;  // Adjust the scroll distance as needed
    };

    // Function to scroll the slider right
    const scrollRight = () => {
        sliderRef.current.scrollLeft += 500;  // Adjust the scroll distance as needed
    };

    // Function to remove a movie from the user's saved shows
    const removeMovie = async (movie) => {
        if (!user?.email) return;
        try {
            const docRef = doc(db, 'users', user.email);
            await updateDoc(docRef, {
                savedShows: arrayRemove(movie), // Remove the movie from the array
            });
        } catch (error) {
            console.log('Error removing movie:', error);
        }
    };

    return (
        <div className='mx-4 group'>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            
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
                    id='slider' 
                    ref={sliderRef} // Reference to the slider for scrolling
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >
                    {movies.length > 0 ? (
                        movies.map((item, id) => (
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
                                
                                {/* Movie details and delete button */}
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
                                    
                                    {/* Delete button */}
                                    <FaTrashAlt 
                                        className='text-white absolute top-4 right-4 cursor-pointer hover:text-red-600 transition-colors' 
                                        onClick={() => removeMovie(item)}  // Call removeMovie function
                                        size={20} 
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>No movies saved yet.</p>
                    )}
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

export default SavedShows;
