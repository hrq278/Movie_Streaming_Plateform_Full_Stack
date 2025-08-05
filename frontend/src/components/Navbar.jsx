import { LogOut, Search, Menu } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import useContentStore from "../store/content.store"
import useAuthStore from "../store/authUser.store"


const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState( false)
  const {logout, user} = useAuthStore()

  const { setContentType } = useContentStore()


  const toggleMobileMenu =() =>{
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 ">
      <div className="flex items-center gap-10 z-50" > 
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="Netflix logo" className=" w-32 sm:w-40 " />
        </Link>
      </div>

        {/* desktop navbar items */}
      <div className="hidden sm:flex gap-2 items-center  ">
          <Link to="/" className="hover:underline cursor-pointer " onClick={()=>setContentType("movie")} >
          Movies
          </Link>
          <Link to="/" className="hover:underline cursor-pointer" onClick={()=>setContentType("tvshow")} >
          Tv Shows
          </Link>
          <Link to="/history" className="hover:underline " >
          Search History
          </Link>
      </div>
        
      <div className="flex gap-3 items-center z-50 ">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer " />
          </Link>

          <img src={user.image} alt="avatar" className="size-6 rounded cursor-pointer "/>

          <Link to={"/"}>
            <LogOut className="size-6 cursor-pointer " onClick={logout} />
          </Link>

      <div className="sm:hidden">
            <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />

      </div>
    </div>

    {isMobileMenuOpen && (
      <div className="w-full sm:hidden mt-4 hover:underline p-2 bg-black border rounded border-gray-800 ">
         <Link to="/" className="block p-2 hover:underline " onClick={toggleMobileMenu} >
          Movies
          </Link>
           <Link to="/" className="block p-2 hover:underline " onClick={toggleMobileMenu} >
          Tv Shows
          </Link>
           <Link to="/history" className="block p-2 hover:underline " onClick={toggleMobileMenu} >
          Search History
          </Link>

      </div>
    )}

      
      
    </header>
    
    
}

export default Navbar