import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { Info, Play } from 'lucide-react'
import useTrendingContent from '../hooks/useTrendingContent'
import { MOVIE_CATEGORIES, ORIGINAL_IMAGE_BASE_URL, TV_CATEGORIES } from '../../utils/constants'
import useContentStore from '../store/content.store'
import ContentSlider from './ContentSlider'
import { useState } from 'react'

const AuthPage = () => {

  const { trendingContent } = useTrendingContent()
  const { contentType } = useContentStore()

  const [imageLoading, setImageLoading] = useState(true)
  
  if (!trendingContent) return(
    <div className='h-screen text-white relative'>
      <Navbar/>
      <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer ' >

      </div>
    </div>
  )

  return (
    <>
    <div className='relative h-screen text-white '>
      <Navbar />
      {imageLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-50 '>

        </div>
      )}

      <img src={ORIGINAL_IMAGE_BASE_URL+trendingContent?.backdrop_path } alt="Hero Image"
      className='absolute top-0 left-0 w-full h-full object-cover object-center -z-50 '
      onLoad={()=>{setImageLoading(false)}} />
      
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50 '
      aria-hidden="true" />

        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 -z-0 '>
        
        <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-20 ' />

        <div className='max-w-2xl z-30'>
            <h1 className='mt-4 text-6xl font-extrabold text-balance '>
             {trendingContent?.title || trendingContent?.name }
            </h1>
                <p className='mt-2 text-lg'>
                {(() => {
                  const date = trendingContent?.release_date || trendingContent?.first_air_date;
                  return date ? date.split("-")[0] : "N/A";
                })()} 
                {" | "}
                {trendingContent?.adult === true ? "18+" : "13+"}
              </p>

            <p className='mt-4 text-lg '>{trendingContent?.overview.length > 200 ? trendingContent?.overview.slice(0, 200) +"..." : trendingContent?.overview }
            </p>
        </div>

        <div className='flex mt-8' >
          <Link to={`/watch/${trendingContent?.id}`} 
          className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center '>
          <Play className='size-6 mr-2 fill-black ' />
          Play
          </Link>

          <Link to={`/watch/${trendingContent?.id}`}
          className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded mr-4 flex items-center '>
          <Info className='size-6 mr-2 ' />
          More Info
          </Link>
        </div>

        </div>
    </div>

    <div className='flex flex-col gap10 bg-black py-10'>
      {
      contentType ==="movie" ? 
       MOVIE_CATEGORIES.map((category) =><ContentSlider key={category} category={category} /> ) : 
       TV_CATEGORIES.map((category)=><ContentSlider key={category} category={category} /> )
      }

    </div>
    </>
  )
}

export default AuthPage