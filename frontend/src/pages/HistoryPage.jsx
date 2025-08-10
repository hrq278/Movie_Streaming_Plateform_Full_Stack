import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SMALL_IMAGE_BASE_URL } from '../../utils/constants'
import { formatDate } from '../../utils/utilFunctions'
import { Trash } from 'lucide-react'

const HistoryPage = () => {
  const [searchHistory, setsearchHistory] = useState([])

  useEffect(() => {
    const getSearchHistory = async() => {
        try {
            const res = await axios.get(`/api/user/search/history`)
            const history = res.data.data
            console.log("history :",history)
            setsearchHistory(history)
            } catch (error) {
            console.log("Client history error :", error.message )
            setsearchHistory([])
        }
    }
    getSearchHistory()
  }
  , [])
 
    const handleDelete = async(entry) => {
        try {
            await axios.delete(`/api/user/search/delete/${entry.id}`)
            setsearchHistory(searchHistory.filter((item)=> item.id !== entry.id));

        } catch (error) {
            console.log("Failed to delete :", error.message )
        }
    }

  if (searchHistory?.length === 0) {
    return(
        <div className='bg-black min-h-screen text-white'>
            <Navbar/>
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                <div className='flex justify-center items-center h-96'>
                    <p className='text-xl'>No search history found</p>
                </div>
            </div>
        </div>
    )
  }

    return (
    <div className='bg-black text-white min-h-screen'>
        <Navbar/>
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>Search History</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center'>
                {searchHistory?.map((entry) => (
                    <div className='bg-gray-800 p-4 rounded flex items-start' key={entry.id}>
                        <img 
                        src={SMALL_IMAGE_BASE_URL + entry.Image}
                        alt={entry.title || entry.name || "history Images"}
                        className='size-16 rounded-full object-cover mr-2' />
                        <div className=' flex flex-col'>
                            <span className='text-white text-lg'>{entry.title}</span>
                            <span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
                        </div>

                        <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto  ${
                            entry.type === "movie"
                            ? "bg-red-600" 
                            : entry.type === "Tv Show"
                            ? "bg-blue-600"
                            : "bg-green-600" }`}
                            >
                        {entry.type[0].toUpperCase()+entry.type.slice(1)}</span>
                        <Trash className='size-6 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
                        onClick={()=>handleDelete(entry)}/>
                    </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default HistoryPage