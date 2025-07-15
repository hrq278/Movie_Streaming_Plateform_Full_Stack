import express from "express"
import { trendingMovie, getMovieTrailer, getMovieCategory, getMovieDetail, getSimilarMovie } from "../controllers/movie.controllers.js"

const router = express.Router()

router.get("/trending", trendingMovie )
router.get("/trailers/:id", getMovieTrailer )
router.get("/details/:id", getMovieDetail )
router.get("/similar/:id", getSimilarMovie )
router.get("/:category", getMovieCategory )

export default router