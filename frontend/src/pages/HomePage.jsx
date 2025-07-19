import React from 'react'
import HeroPage from '../components/HeroPage'
import AuthPage from '../components/AuthPage'
import Navbar from '../components/Navbar'

const HomePage = () => {
  
  const isLoggedIn =false

  return (
    <div>
      
      {isLoggedIn ? <AuthPage /> : <HeroPage/>  }
    </div>
  )
}

export default HomePage