import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user detail from frontend
  //validation - not empty length etc
  //check if user is already exixts
  // check for ci and avatar   ------ not required
  // upload them on cloudinary ------ not required
  // create user object in db
  // remove pasword and refreshToken field from created user object
  // check for user creation
  //return res

  const { userName, fullName, email, password } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All Fields Are Required");
  }
  const existedUSer = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (existedUSer) {
    throw new apiError(409, "User Alreadfy registered");
  }
  //   console.log(req.file);
  const avatarLocalPath = req.file?.path; //files **

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new apiError(400, "Avatar file is missing");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    userName: userName.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while regestring user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Registered Sucessfully"));
});



export { registerUser };
