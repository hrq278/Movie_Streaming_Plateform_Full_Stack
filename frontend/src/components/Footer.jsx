import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <div className='w-full h-min bg-gray-900  text-gray-300 p-10'>
            <div className='flex flex-col text-center w-full items-center'>   
            <div className=''>
                <p className='hover:text-white font-bold text-lg cursor-pointer w-50  '>Built By{" "}
                  <a 
                  href='https://www.github.com/hrq278'
                  target='_blank'
                  className=' font-medium underline underline-offset-4'
                  >
                    Haroon Rasheed
                  </a>
                </p>
            </div>

            <div className='flex flex-col flex-wrap justify-evenly items-center my-3 py-2   '>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >FAQs</p>
                </Link>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >Help Center</p>
                </Link>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >Terms of Use</p>
                </Link>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >Privacy</p>
                </Link>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >Cookie Preferences</p>
                </Link>
                <Link to={"#"}>
                <p className='hover:text-white cursor-pointer py-2' >Corporate Information</p>
                </Link>
                
            </div>
            </div>
        </div>
    </>
  )
}

export default Footer