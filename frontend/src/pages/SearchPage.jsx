import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import useContentStore from '../store/content.store'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ORIGINAL_IMAGE_BASE_URL } from '../../utils/constants'

const SearchPage = () => {
    const [ activeTab, setActiveTab ] = useState("movie")
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ results, setResults ] = useState([])
    
    const { setContentType } = useContentStore()

    const handleTabsClick = (tab) => {
        setActiveTab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tvshow") 
        setResults([])
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/user/search/${activeTab}/${searchTerm}`)
            const searchResult = res.data.data
            setResults(searchResult)
        } catch (error) {
            if (error.response.status ===404) {
                toast.error("Nothing Found, make sure you are searching in the right Category")
            }
            else{
                toast.error("An Error occurred, Please try again")
            }
        }
    }

  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar/>
        <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-center gap-3 mb-4'>
                <button className={`py-2 px-4 rounded ${ activeTab === "movie" ? "bg-red-600" : "bg-gray-600" } hover:bg-red-700`}
                onClick={()=> handleTabsClick("movie")}>
                    Movies
                </button>
                <button className={`py-2 px-4 rounded ${ activeTab === "tvshow" ? "bg-red-600" : "bg-gray-600" } hover:bg-red-700`}
                onClick={()=> handleTabsClick("tvshow")}>
                    Tv Shows
                </button>
                <button className={`py-2 px-4 rounded ${ activeTab === "person" ? "bg-red-600" : "bg-gray-600" } hover:bg-red-700`}
                onClick={()=> handleTabsClick("person")}>
                    Person
                </button>
            </div>

            {/* input Field for Search */}
        <form className='flex gap-2 items-stretch my-8  max-w-2xl mx-auto' 
        onSubmit={handleSearch}>
            <input type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder={"Search for a "+activeTab }
            className='w-full p-2 rounded bg-gray-800 text-white'
            />
            <button className='bg-red-600 hover:bg-red-700 text-white p-2 rouned'>
                <Search className='size-6' />
            </button>
        </form>


        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center'>
            {results.map((result)=>{
                if (!result.poster_path && !result.profile_path) return null;

                return(
                    <div key={result.id} className='bg-gray-800 p-4 rounded'>
                        {activeTab === "person" ? (
                            <div className='flex flex-col items-center'>
                                <img 
                                src={ORIGINAL_IMAGE_BASE_URL+ result.profile_path} 
                                alt="Person Image"
                                className='max-h-96 rounded mx-auto' />
                                <h2 className='mt-2 text-xl font-bold'>
                                    {result.name}
                                </h2>
                            </div>
                        ) : (
                            <Link to={"/watch/"+result.id} onClick={()=>{setContentType(activeTab)}} >
                                <img 
                                src={ORIGINAL_IMAGE_BASE_URL+result.poster_path} 
                                alt={result.name || result.title}
                                className='w-full h-auto rounded' />
                                <h2 className='mt-2 text-xl font-bold'>
                                    { result.title || result.name}
                                </h2>
                            </Link>
                        )}
                    </div>
                )

            })}
        </div>

        </div>
    </div>
  )
}

export default SearchPage