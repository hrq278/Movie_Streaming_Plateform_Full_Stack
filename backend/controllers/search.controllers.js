import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import { User } from "../models/user.models.js"

import { fetchTMDB } from "../TMDB_Services/tmdb.service.js"


const searchPerson = asyncHandler(async (req, res) => {

  const { query } = req.params;
  try {
    const response = await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

    // console.log("response:", response);

    const results = response?.results;

    if (!results || results.length === 0) {
      return res.status(400).send(null);
    }

    const person = results[0];

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: person.id,
          Image: person.profile_path,
          title: person.name,
          type: "person",
          createdAt: new Date()
        },
      },
    });

    return res.status(200).json(
      new ApiResponse(200, results, "Person searched successfully")
    );
  } 

    catch (error) {
        console.error("error:", error);

    if (error.message?.includes("404")) {
      return res.status(404).send(null);
    }

    throw new ApiError(
      500,
      error.message || "Internal server error while searching person"
    );
  }
});

const searchMovie = asyncHandler( async (req, res) => {

    const {query} = req.params
    try {
        const response = await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        // console.log("response :" ,response)

        const results = response?.results

        if (results.length === 0) {
            return res.status(400).send(null)
        }

        const movie = response.results[0]

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id: movie.id,
                    Image: movie.poster_path,
                    title: movie.title,
                    type: "movie",
                    createdAt: new Date()
                }
            }
        } )
         return res
         .status(200)
         .json(
            new ApiResponse( 200, results, "movie searched Successfully" )
         )

    } catch (error) {
        if (error?.message.includes("404")) {
            return res.status(404).send(null)
        }
        throw new ApiError(500, error?.message || "Internal server error while searching movie");
    }

        
} )

const searchTvShow = asyncHandler( async (req, res) => {

    const {query} = req.params

    try {
        const response = await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        console.log("response :", response)
        const results = response?.results

        if (results.length === 0) {
            return res.status(400).send(null)
        }

        const tvShow = response.results[0]

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id: tvShow.id,
                    Image: tvShow.poster_path,
                    title: tvShow.name,
                    type: "Tv Show",
                    createdAt: new Date()
                }
            }
        } )
         return res
         .status(200)
         .json(
            new ApiResponse( 200, results, "Tv Show searched Successfully" )
         )

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
        throw new ApiError(500, error.message || "Internal server error while searching Tv show");
    }

} )

const searchHistory = asyncHandler( async (req,res) => {
    
try {
        
    const user = await User.findById(req.user._id).select("searchHistory");

    if (!user || !Array.isArray(user?.searchHistory)) {
        return res
        .status(404)
        .json(new ApiResponse(404, [], "No search history found"));
    }
        return res
        .status(200)
        .json(
            new ApiResponse(200, user.searchHistory, "History fetched Successfully")
        )

} catch (error) {
        throw new ApiError(500, error.message || "Internal server error while searching Tv show");
    }
} )

const deleteHistory = asyncHandler( async (req, res) => {
    
    let { id } = req.params
    
    if (!id) {
        throw new ApiError(400, "Missing ID in request");
    }

    const NumericID = Number(id)

    const result = await User.findByIdAndUpdate(req.user._id,
        {
            $pull:{
                searchHistory:{
                    id : NumericID
                }
            }
        },
        {
            new: true
        }
    )

    if (!result) {
        throw new ApiError(400, "History not Deleted")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, result.searchHistory, "History deleted successfully")
    )

} )


export {
    searchPerson,
    searchMovie,
    searchTvShow,
    deleteHistory,
    searchHistory
}


// const deleteAllHistory = asyncHandler( async (req, res) => {
    
//     const id = req.user._id
//     const deleteHistory = await User.findByIdAndUpdate(id,
//         {
//             $unset:{
//                 searchHistory: 1
//             }
//         },
//         {
//             new: true
//         }
//       )
//     if (!deleteHistory) {
//         throw new ApiError(400, "Error while deleting History")
//     }

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, "history deleted Successfully")
//     )
// } )
