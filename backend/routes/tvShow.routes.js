import express from "express"
import { getSimilarTv, getTvCategory, getTvDetail, getTvTrailer, trendingTv } from "../controllers/tvShow.controllers.js"

const router = express.Router()

router.get("/trending",trendingTv )
router.get("/trailers/:id", getTvTrailer )
router.get("/details/:id", getTvDetail )
router.get("/similar/:id", getSimilarTv )
router.get("/:category", getTvCategory )

export default router