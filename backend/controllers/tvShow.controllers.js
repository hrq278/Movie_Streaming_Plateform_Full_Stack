import { fetchTMDB } from "../TMDB_Services/tmdb.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const trendingTv = asyncHandler(async (req, res) => {
  try {
    const data = await fetchTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

    if (!data?.results?.length) {
      throw new ApiError(400, "Trending tvShow not found");
    }

    const result = data.results;

    const content = result[Math.floor(Math.random() * result.length)];

    return res.status(200).json(
      new ApiResponse(200, content, "Trending tv successfully fetched")
    );

  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error while fetching trending tv Show");
  }
});

const getTvTrailer = asyncHandler( async (req, res) => {
    
    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, data.results, "tv show Trailer Fetched")
        )
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching getting tv show Trailer");

} )

const getTvDetail = asyncHandler( async (req, res) => {

    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)

        return res
        .status(200)
        .json(
            new ApiResponse(200, data, "tv Show Details Fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching getting tv Show Details");

    
} )

const getSimilarTv = asyncHandler( async (req, res) => {
    const { id } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)

        return res
        .status(200)
        .json(
            new ApiResponse(200, data.results, "Similar tv Fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching get Similar tv show");
 
} )

const getTvCategory = asyncHandler( async (req, res) => {
 
    const { category } = req.params

    try {
        const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        const content= data.results

        return res
        .status(200)
        .json(
            new ApiResponse(200, content, "tv show Category fetched")
        )
    } catch (error) {
         if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
    }
    throw new ApiError(500, error.message || "Internal server error while fetching get tv show Category");
 
} )

export {
    trendingTv,
    getSimilarTv,
    getTvCategory,
    getTvTrailer,
    getTvDetail
}