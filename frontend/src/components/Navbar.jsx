import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
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
    </>
    )
}

export default Navbar