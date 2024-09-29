import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // To capture error message
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const {user, signUp } = UserAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true); // Start loading state when submitting the form
    try {
      await signUp(email, password);
      navigate('/'); // Redirect to home page after successful sign up
    } catch (error) {
      // Check for specific error code
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use.'); // Set user-friendly error message
      } else {
        setError(error.message); // Capture other error messages
      }
      console.log(error.message);
    }
    setIsLoading(false); // Stop loading after the process
  }
  

  return (
    <>
      <div className="w-full h-screen">
        <img className='hidden sm:block absolute w-full h-full object-cover' 
          src="https://cdn.neowin.com/news/images/uploaded/2023/05/1683747988_background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.jpg" 
          alt="/" />
        <div className="fixed w-full h-screen top-0 left-0 bg-black/60 "></div>

        <div className="fixed w-full px-4 py-24 z-50 ">
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
              
              {/* Error Message */}
              {error ? <p className='p-3 bg-red-500 mt-4 text-center'>{error}</p> : null} 

              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4 '>
                <input 
                  type='email' 
                  onChange={(e) => setEmail(e.target.value)}
                  id='email' 
                  placeholder="Email or Phone number" 
                  className='bg-gray-800 my-2 p-3 border border-gray-800 rounded-sm' 
                  disabled={isLoading} // Disable input during loading
                />
                <input 
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  id='password' 
                  placeholder="Password"
                  autoComplete='current-password'  
                  className='bg-gray-800 my-2 p-3 border border-gray-800 rounded-sm' 
                  disabled={isLoading} // Disable input during loading
                />

                {/* Button */}
                <button 
                  type='submit' 
                  className={`bg-red-600 text-white py-3 my-6 rounded-sm hover:bg-red-700 transition duration-300 flex justify-center items-center ${isLoading ? 'opacity-50' : ''}`} 
                  disabled={isLoading} // Disable button during loading
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Signing up...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>

                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-400'>
                    <input className='mr-2' type='checkbox' />Remember me
                  </p>
                  <p className='text-sm text-gray-400'>Need Help?</p>
                </div>
                
                <div className='flex justify-between items-center mt-8'>
                  <p className='py-4'>
                    <span className='text-gray-200'>Already have an account?</span>{' '}
                    <Link to='/login'>
                      <span className='text-red-600'>Sign in now</span>
                    </Link>
                  </p>
                </div>

                <div className='flex justify-center items-center my-4'>
                  <p className='text-sm text-gray-600'>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='text-red-600'>Learn more</span>
                  </p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
