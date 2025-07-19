import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const SignupPage = () => {

  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup=(e)=>{
    e.preventDefault();
    console.log({email,fullName,password,username})
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
            <h1 className='  '>Sign Up</h1>
          </div>

         <form action="" className='flex flex-col' onSubmit={handleSignup}>

            <div className='py-2 '>
              <label htmlFor="email" className=' font-medium '>Email</label>            
              <input type="email"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='johnny@gmail.com'
              id='email'
              value={email}
              onChange={(e)=> setEmail(e.target.value) } />
            </div>

            <div className='py-2 '>
              <label htmlFor="full Name" className=' font-medium '>Full Name</label>
              <input type="text"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='Johnny Johns'
              id='fullName'
              value={fullName}
              onChange={(e)=> setFullName(e.target.value)} />
            </div>

            <div className='py-2 '>
              <label htmlFor="username" className=' font-medium '>Username</label>  
              <input type="text"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='johnny_john'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}  />
            </div>

            <div className='py-2 '>
              <label htmlFor="password" className=' font-medium '>Password</label>  
              <input
              type="password"
              className=' w-full border-1 border-gray-400 py-2 px-3 mt-1 focus:outline-none focus:ring rounded-md '
              placeholder='Password'
              id='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}  />
            </div>

            <div>
              <button type='submit' className='w-full mt-5 bg-red-600 p-2 rounded-md hover:bg-red-700 font-medium ' >Sign Up</button>
            </div>

         </form>


        <div className='mt-3'>
          Already a member?
          <Link to={"/login"}> <span className='text-red-500 '>Login</span> </Link>
        </div>

        

        
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default SignupPage