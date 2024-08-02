import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong while generating token");
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  //req.body ->data
  // useranme or email validation
  // find the user form db
  //password check
  //access token and refresh token generate and send to user
  //send it in req cookie
  const { userName, email, password } = req.body;
  if (!userName && !email) {
    throw new apiError(400, "Username or email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    new apiError(404, "User dosen't exists");
  }
  const ispasswordValid = await user.isPasswordCorrect(password);
  if (!ispasswordValid) {
    throw new apiError(400, "inavlid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accesstoken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user_id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, {}, "User Logged Out Successfully"));
});

export { registerUser, loginUser, logoutUser };
