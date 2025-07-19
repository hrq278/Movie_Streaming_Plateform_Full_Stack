import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage />}  />
        <Route path="/login" element= {<LoginPage />}  />
        <Route path="/signup" element= {<SignupPage />}  />
      </Routes>

      <Footer />
    </>
  )
  
}

export default App
