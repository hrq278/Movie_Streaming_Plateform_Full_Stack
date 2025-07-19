import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const LoginPage = () => {

    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
      e.preventDefault()
      console.log({email, password})
  }


  return (
    <>
    <div className='max-h-full bg-black responsive-hero md:w-full md:h-screen '>
      {/* Header */}
      <div>
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="Netflix Logo" className='w-50 p-4 mx-3'  />
        </Link>
      </div>
      {/* signUp Form */}
      <div className='flex justify-center py-10'> 
        <div className='flex flex-col justify-center items-center text-white   bg-black/60 p-15 '>
          <div className='m-4 font-bold text-3xl'>
            <h1 className='  '>Login</h1>
          </div>

         <form action="" className='flex flex-col ' onSubmit={handleLogin}>

            <div className='py-2 '>
              <label htmlFor="email" className=' font-medium '>Email</label>            
              <input 
              type="email"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='johnny@gmail.com'
              id='email'
              value={email}
              onChange={(e)=> setEmail(e.target.value) } />
            </div>

            <div className='py-2 '>
              <label htmlFor="password" className=' font-medium '>Password</label>  
              <input 
              type="Password"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='Password'
              id='password'
              value={password}
              onChange={(e)=> setPassword(e.target.value) } />
            </div>

            <div>
              <button 
              type='submit' 
              className='w-full mt-5 bg-red-600 p-2 rounded-md hover:bg-red-700 font-medium '
                >Login</button>
            </div>

         </form>


        <div className='mt-3'>
          Don't have an Account?
          <Link to={"/Signup"}> <span className='text-red-500 '>Sign Up</span> </Link>
        </div>

        

        
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default LoginPage