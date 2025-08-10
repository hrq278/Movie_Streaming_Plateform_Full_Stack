import express from "express"
import { deleteHistory, searchHistory, searchMovie, searchPerson, searchTvShow } from "../controllers/search.controllers.js"

const router = express.Router()

router.get("/person/:query", searchPerson)
router.get("/movie/:query", searchMovie)
router.get("/tvshow/:query", searchTvShow)

router.get("/history", searchHistory)

router.delete("/delete/:id", deleteHistory)

export default router