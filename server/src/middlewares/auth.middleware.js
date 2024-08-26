import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifiyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log("Cookei",req.cookies.accessToken);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      console.log(token);
    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Inavlid Access Token");
  }
  
});
