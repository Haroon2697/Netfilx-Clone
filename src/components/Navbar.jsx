import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';

const Navbar = () => {
  const {user , logout} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='flex items-center justify-between p-4 md:p-8 z-[100] w-full absolute '>
      <Link to='/'>
      <h1 className='text-red-600 text-3xl md:text-4xl font-bold cursor-pointers'>NETFLIX</h1>
      </Link>

   {user?.email ?    
   <div className='flex items-center'>
        <Link to='/account'>
        <button className='text-white pr-4 hover:text-gray-300 transition-all duration-300 text-sm md:text-base'>Account</button>
        </Link>
        <button onClick={handleLogout} 
        className='text-white bg-red-600 py-2 px-3 rounded-sm cursor-pointer hover:bg-red-800 transition-all duration-300 text-sm md:text-base'>Logout</button>
</div> : 
   <div className='flex items-center'>
   <Link to='/login'>
   <button className='text-white pr-4 hover:text-gray-300 transition-all duration-300 text-sm md:text-base'>Sign In</button>
   </Link>
   <Link to='/signup'>
   <button className='text-white bg-red-600 py-2 px-3 rounded-sm cursor-pointer hover:bg-red-800 transition-all duration-300 text-sm md:text-base'>Sign Up</button>
   </Link>
</div>}
    </div>
  );
};

export default Navbar;
