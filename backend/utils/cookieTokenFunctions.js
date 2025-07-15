import { User } from "../models/user.models.js";
import { ApiError } from "./ApiError.js";



export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, 
};


    
export const generateAccessAndRefreshToken =async (userId) => {
    
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        
        // console.log("refresh Token in utils : ", refreshToken)
        // console.log("access Token in utils : ", accessToken)
    
        // if (!accessToken || !refreshToken) {
        //     throw new ApiError(500, "Something went wrong while generating Access and Refresh Token" )
        // }

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false })
    
        return { accessToken, refreshToken}
    
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Token")
    }
}
