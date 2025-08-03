import React from 'react'
import HeroPage from '../components/HeroPage'
import AuthPage from '../components/AuthPage'
import Navbar from '../components/Navbar'
import useAuthStore from '../store/authUser.store'

const HomePage = () => {
  
  const { user } = useAuthStore()

  return (
    <>
      {user ? <AuthPage /> : <HeroPage/>  }
    </>
  )
}

export default HomePage