import { fetchTMDB } from "../TMDB_Services/tmdb.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const trendingMovie = asyncHandler(async (req, res) => {
  try {
    const data = await fetchTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

    if (!data?.results?.length) {
      throw new ApiError(400, "Trending movies not found");
    }

    const result = data.results;

    const trendingMovie = result[Math.floor(Math.random() * result.length)];

    return res.status(200).json(
      new ApiResponse(200, trendingMovie, "Trending movie successfully fetched")
    );

  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error while fetching trending movies");
  }
});

const getMovieTrailer = asyncHandler( async (req, res) => {
    
    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, data, "Movie Trailer Fetched")
        )
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching getting Movie Trailer");

} )

const getMovieDetail = asyncHandler( async (req, res) => {

    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)

        return res
        .status(200)
        .json(
            new ApiResponse(200, data, "Movie Details Fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching getting Movie Details");

    
} )
const getSimilarMovie = asyncHandler( async (req, res) => {
    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)

        return res
        .status(200)
        .json(
            new ApiResponse(200, data.results, "Similar Movie Fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching get Similar Movie");
 
} )
const getMovieCategory = asyncHandler( async (req, res) => {
 const { category } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)

        return res
        .status(200)
        .json(
            new ApiResponse(200, data.results, "Movie Category fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching getMovieCategory");
 
} )

export {
    trendingMovie,
    getSimilarMovie,
    getMovieCategory,
    getMovieTrailer,
    getMovieDetail
}