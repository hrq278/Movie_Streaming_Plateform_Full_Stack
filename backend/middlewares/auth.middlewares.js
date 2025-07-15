import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"



const verifyJWT = asyncHandler( async (req, res, next ) => {
    try {
        
        const tokenFromCookie = req.cookies?.accessToken
        const tokenFromHeader = req.header("Authorization")

        // console.log("tokenFromCookie : ", tokenFromCookie)
        // console.log("tokenFromHeader : ", tokenFromHeader)

        const token = tokenFromCookie || tokenFromHeader?.replace("Bearer ","")
    
        if (!token) {
            throw new ApiError(400, "Unauthorized request")
        }
    
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(verifyToken?._id).select("-password -refreshToken")
        
        if (!user) {
            throw new ApiError(409, "Invalid Access Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        console.log("the JWT error is : ", error)
        throw new ApiError(401, error.message || "Internal Server Error while verifying JWT");     }
} )

export default verifyJWT;