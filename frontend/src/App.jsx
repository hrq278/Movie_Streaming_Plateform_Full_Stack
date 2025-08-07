import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'

import useAuthStore from './store/authUser.store'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import WatchPage from './pages/WatchPage'

function App() {
  const { user, isCheckingAuth, authUserCheck } = useAuthStore()

  useEffect(() => {
    authUserCheck()
  }, [authUserCheck])

  
  if (isCheckingAuth) {
    return(
      <div className='h-screen '>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
    }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to={"/"} /> } />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} /> } />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} /> } />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
