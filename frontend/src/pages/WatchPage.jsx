import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useContentStore from '../store/content.store'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReactPlayer from 'react-player'

const WatchPage = () => {

    const { id } = useParams()

    const [ trailer, setTrailer ] = useState([])
    const [currentTrailerIdx, setCurrentTrailerIdx ] = useState(0)
    const [similarContent, setSimilarContent ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ content, setContent ]= useState({})

    const { contentType } = useContentStore()

    useEffect(() => {
      const getTrailer = async () => {
        try {
            const res = await axios.get(`/api/user/${contentType}/trailers/${id}`)
            const data = res.data.data
            setTrailer(data)

        } catch (error) {
            if (error.message.includes("404")) {
                setTrailer(null)
            }
        } finally{
            setIsLoading(false)
        }
      }
      getTrailer()
    }, [contentType, id])

    useEffect(() => {
    const getSimilarContent = async () => {
    try {
        const res = await axios.get(`/api/user/${contentType}/similar/${id}`)
        const data = res.data.data
        setSimilarContent(data)
        console.log("similar",data)
        
    } catch (error) {
        if (error.message.includes("404")) {
                setSimilarContent(null)
            }
    } finally{
        setIsLoading(false)
    }
    }
    getSimilarContent()
    }, [contentType, id])

    useEffect(() => {
    const getContentDetails = async () => {
    try {
        const res = await axios.get(`/api/user/${contentType}/details/${id}`)
        const data = res.data.data
        setContent(data)
        console.log("content",data)
        
    } catch (error) {
        if (error.message.includes("404")) {
                setContent(null)
            }
    } finally{
        setIsLoading(false)
    }
    }
    getContentDetails()
    }, [contentType, id])

    const handleNext = () => {
        if (currentTrailerIdx < trailer.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx +  1)
        }
    }
    const handlePrev = () => {
         if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1)
        }
    }

    
  return (
    <div className='bg-black min-h-screen text-white '>
        <div className='mx-auto container px-4 py-8 h-full '>
            <Navbar />

            {trailer.length > 0 && (
                <div className='flex justify-between items-center mb-4 '>
                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                        currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : "cursor-pointer"
                    } `}
                    disabled={currentTrailerIdx === 0}
                    onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                        currentTrailerIdx === trailer.length - 1 ? "opacity-50 cursor-not-allowed " : "cursor-pointer"
                    } `}
                    disabled={currentTrailerIdx === trailer.length - 1}
                    onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32 '>
                {trailer.length > 0 && (
                    <ReactPlayer 
                    controls={true}
                    width={"100%"}
                    height={"70vh"}
                    className='mx-auto overflow-hidden rounded-lg '
                    url={`https://www.youtube.com/watch?v=${trailer[currentTrailerIdx].key}`} />
                )}
            </div>

        </div>
    </div>
  )
}

export default WatchPage