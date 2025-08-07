import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { ChevronLeft, ChevronRight, Scroll } from 'lucide-react'
import ReactPlayer from 'react-player'

import Navbar from '../components/Navbar'
import WatchpageSkeleton from '../components/skeletons/WatchpageSkeleton'

import useContentStore from '../store/content.store'
import { formatReleaseDate } from '../../utils/utilFunctions'
import { ORIGINAL_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL } from '../../utils/constants'



const WatchPage = () => {

    const { id } = useParams()
    
    const sliderRef = useRef(null)

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

    const scrollLeft =  () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior: 'smooth'})
        }
    }
    const scrollRight =  () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior: 'smooth'})
        }
    }

    if (isLoading) return(
        <div className='min-h-screen bg-black p-10'>
            <WatchpageSkeleton/>
        </div>
    )

    
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

                {trailer?.length === 0 && (
                    <h2 className=' text-xl text-center mt-5'>
                        No Trailers Availabe for (" ")
                        <span className='font-bold text-red-600'>
                            {content?.title || content?.name}
                        </span>
                    </h2>
                )}
            </div>
                    {/* Movie Details */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto '>
                <div className=' mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance '>
                        {content?.title || content?.name}
                    </h2>
                    <p className='mt-2 text-lg '>
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                        {content?.adult ?(
                            <span className='text-red-600'>18+</span>
                        ) :(
                            <span className='text-green-600'>PG-13</span>
                        )}{" "}
                    </p>
                    <p className='mt-4 text-lg'>
                        {content?.overview}
                    </p>
                </div>

                <img src={ORIGINAL_IMAGE_BASE_URL+content?.poster_path} alt="poster Image" 
                className='max-h-[600px] rounded-md  '/>
            </div>

            {similarContent.length > 0 && (
                <div className='mt-12 max-w-5xl mx-auto relative '>
                    <h3 className='text-3xl font-bold mb-4'>
                        Similar Movies/TV Show
                    </h3>

                    <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>

                        {similarContent.map((content)=>(
                            <Link key={content.id} to={`/watch/${content.id}`} 
                            className='w-52 flex-none'>

                                <img src={SMALL_IMAGE_BASE_URL+content?.poster_path} alt="Poster path" 
                                className='w-fullo h-auto rounded-md' />

                                <h4 className='mt-2 text-lg font-semibold'>
                                    {content.title || content.name}
                                </h4>
                            </Link>
                        ))}
                        <ChevronRight
                        className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full '
                        onClick={scrollRight} 
                        />

                        <ChevronLeft
                        className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full '
                        onClick={scrollLeft} 
                        />
                    </div>
                </div>
            )}

        </div>
    </div>
  )
}

export default WatchPage