import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const HeroPage = () => {
    const [email, setEmail] =useState()
    const navigate = useNavigate()

    const handleEmailSubmit =(e) =>{
        e.preventDefault()
        setEmail(email)
        navigate(`/signup?email=${email}`)
        console.log({email})
    }
  return (
    <>
    <div className='hero-bg relative'>
         <div className='flex  items-center justify-around '>
            <Link to={"/"}>
            <img src="netflix-logo.png" alt="Netflix Logo" className='w-25 md:w-50  mt-7 mx-3 cursor-pointer'  />
            </Link>
                <div className="mt-4">
                <Link to={"/login"}>
                    <button className="py-2 px-4 mt-3 font-bold  text-white bg-red-600 rounded cursor-pointer ">Sign In</button>
                </Link>
                </div>
            </div>
        <div className='flex flex-col max-w-6xl mx-auto py-40 text-center justify-center items-center text-white '>
            
            <div>
                <div className='text-4xl md:text-6xl  font-bold py-3 px-5'>Unlimited movies, TV shows, and more</div>
                <div className='text-2xl font-bold p-3 '>Starts at Rs 250. Cancel anytime.</div>
                <div className=' text-medium md:text-xl font-medium p-3 '>Ready to watch? Enter your email to create or restart your membership.</div>
            </div>
            
            <form 
            onSubmit={handleEmailSubmit}
            className='flex flex-col md:flex-row justify-center items-center gap-2 pt-4 '>
                <input 
                type="email"
                className='p-3 bg-black/75 rounded border border-gray-700 '
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />

                 <button
                 className='bg-red-500 px-4 md:ml-4 py-1 rounded flex justify-center items-center '
                 >Get Started <ChevronRight className='size-8 md:size-10' /></button>
            </form>
             
        </div>
    </div>

                                {/* heroEnded */}        


                            {/* separatorLine */}
           <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

                            {/* 1st Section */}
    <div className='flex flex-col md:flex-row w-full justify-center items-center gap-10 p-20 bg-black text-white'>
        {/* left div */}
        <div className=' text-center md:text-left flex-1 '>
            <p className='text-4xl md:text-5xl  font-bold mb-10  '>Enjoy on your TV </p>
            <p className='text-l font-medium'>Watch on Smart TV's, PlayStations, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
        </div>
        {/* right Div */}
        <div className='flex-1 relative'>
            <img 
            src="/tv.png" 
            alt="tv Image" 
            className='mt-4 z-20 relative' />
            <video autoPlay loop muted
            className='absolute top-1/2 left-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2  z-10'>
                <source src="/hero-vid.mp4" type="video/mp4" />
            </video>
            
        </div>
    </div>

                        {/* separatorLine */}
    <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

                         {/* 2nd Section */}
    <div className='flex flex-col-reverse md:flex-row w-full justify-center items-center gap-10 p-20 bg-black text-white'>
        {/* left div */}
       
        <div className='flex-1 '>
            <div className='relative'>
            <img src="/stranger-things-lg.png" alt="stranger-things Image" 
            className='mt-4' />

            <div className=' flex  items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2  '>

                <img src="stranger-things-sm.png" alt="stranger-things-sm" className='h-full'/>
                <div className='flex justify-center items-center w-full'>
                    <div className='flex flex-col gap-0'>
                        <p className='font-bold text-md lg:text-lg '>Stranger Things</p>
                    <p className='text-blue-600 text-sm'>Downloading...</p>
                    </div>
                </div>
                <img src="download-icon.gif" alt="download icon gif" className='h-12 ' />
            </div>
            
        </div>
            
        </div>
        {/* right Div */}
         <div className=' text-center md:text-left flex-1 '>
            <p className='text-4xl md:text-5xl  font-bold mb-10  '>Download your shows to watch offline </p>
            <p className='text-l font-medium'>Save your favourite easily and always have something to watch.</p>
        </div>
    </div>

                         {/* separatorLine */}
    <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

                         {/* 1st Section */}
    <div className='flex flex-col md:flex-row w-full justify-center items-center gap-10 p-20 bg-black text-white'>
        {/* left div */}
        <div className=' text-center md:text-left flex-1 '>
            <p className='text-4xl md:text-5xl  font-bold mb-10  '>Watch everywhere</p>
            <p className='text-l font-medium'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV</p>
        </div>
        {/* right Div */}
        <div className='flex-1 relative'>
            <img 
            src="/device-pile.png" 
            alt="device-pile Image" 
            className='mt-4 z-20 relative' />
            <video autoPlay loop muted
            className='absolute top-2 left-1/2 h-2/3 -translate-x-1/2  max-w-[63%]  z-10'>
                <source src="/video-devices.mp4" type="video/mp4" />
            </video>
            
        </div>
    </div>

    
                        {/* separatorLine */}
    <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

                         {/* 4nd Section */}
    <div className='flex flex-col-reverse md:flex-row w-full justify-center items-center gap-10 p-20 bg-black text-white'>
        {/* left div */}
       
        <div className='flex-1 '>
            <div className='relative'>
            <img src="/kids.png" alt="kids Image" 
            className='mt-4' />
        </div>
            
        </div>
        {/* right Div */}
         <div className=' text-center md:text-left flex-1 '>
            <p className='text-4xl md:text-5xl  font-bold mb-10  '>Create profile for kids</p>
            <p className='text-l font-medium'>Send kids on adventures with their favorite characters in a space made just for them --free with our membership</p>
        </div>
    </div>


    </>
  )
}

export default HeroPage