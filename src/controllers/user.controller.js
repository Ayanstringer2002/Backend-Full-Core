import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from ".../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {

    // Step 1 : Get user details from Frontend
    const {fullName, email, username, password} = req.body
    console.log("email:", email);
    
    // Step 2 : Validation check if some fields are empty
    if (
        [fullName,email, username, password].some((field) => field?.trim() === "")
    ) {
         throw new ApiError(400, "All fields are  required")

    }

    // Step 3 : check if user already exist using username and password
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    }) 

    if(existedUser){
        throw new ApiError(409, "User with or username already exist")
    }

    // Step 4 : Check for avatar in multer local disk
    const avatarLocalPath = req.files?.avatar[0]?.path;

    // Step 5 : Check for cover image in multer Local disk
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // Part of step 4 and step 5
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //  Step 6 : Upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")

    }

    // Step 7 : create user
     const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()


    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // Remove these two fields from database
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registration of user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully" )
    )


}) 

export  {
    registerUser
}