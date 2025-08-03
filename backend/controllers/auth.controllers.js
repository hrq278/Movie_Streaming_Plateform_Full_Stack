import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { cookieOptions, generateAccessAndRefreshToken } from "../utils/cookieTokenFunctions.js";


const signUp = asyncHandler( async (req, res) => {

    const{username, email, fullName, password } = req.body
    
    if (!email || !username || !fullName) {
        throw new ApiError(400, "Email and Full Name Required")
    }
    
    const existedUser = await User.findOne({
        $or: [{email},{username}]
    }) 

    if (existedUser) {
        throw new ApiError(409, "User already exist")
    }

    if (!password || password?.length < 6 ) {
        throw new ApiError(400, "Enter Valid 6 digit password ")
    }

    const profilePics = ["/avatar1.png","/avatar2.png","/avatar3.png"]

    const image = profilePics[Math.floor( Math.random() * profilePics.length)]

    const createUser = await User.create({
        fullName,
        email,
        password,
        username,
        image
    })

    const user = await User.findById(createUser._id)
    .select("-password -refreshToken")

    if (!user) {
        throw new ApiError(500, "Try again Something went wrong while registering user")
    }
    
    return res.json(
        new ApiResponse( 200, user, "Account Created Successfully")
    )
})

const login = asyncHandler( async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "email is Required")
    }

    if (!password || password?.length < 6) {
        throw new ApiError(400, "Password Required")   
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "Account not found. Please sign up first")
    }
    
    const checkPassword = await user.isPasswordCorrect(password)
    if (!checkPassword) {
        throw new ApiError(401, "Please Enter Correct Password")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user?._id)

    // console.log("refresh Token : ", refreshToken)
    // console.log("access Token : ", accessToken)

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions )
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000, } )
    .json(
        new ApiResponse(200, loggedInUser, "User LoggedIn Successfully")
    )
})

const logout = asyncHandler( async (req, res) => {

    const user = req.user
    // console.log("user : ",user)
    await User.findByIdAndUpdate(user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new :true
        }
    )
    return res
    .status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(
        new ApiResponse(200, {}, `${req.user.fullName} Logout Successfully`)
    )
    
})

const refreshAccessToken = asyncHandler( async (req,res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Unauthorized Token")
    }

    try {
        
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(400, "Invalid Refresh Token ")
        }
        const user = await User.findById(decodedToken._id)

        if (!user) {
            throw new ApiError(409, "User not found")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is either expired or used") 
        }
    

        const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user?._id)

        // console.log("refresh Token : ", refreshToken)
        // console.log("access Token : ", accessToken)

        return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions )
        .cookie("refreshToken", refreshToken,  { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000, } )
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: refreshToken},
                "access token refreshed"
                )
            )

    } catch (error) {
         throw new ApiError(401, error?.message || "error in refreshing the access token") 
    }
    
} )

const authCheck = asyncHandler( async (req, res) => {
    const user = req.user
    return res.status(200)
    .json({user: user, message: "User is Authenticated"})
} )

export {
    signUp,
    login,
    logout,
    refreshAccessToken,
    authCheck
}