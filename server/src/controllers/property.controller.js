import Property from "../models/property.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const createProperty = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user._id);
  const { category, rentDetails, pgDetails, plotDetails, location } =
    req.body;
  const userId = user._id;
  console.log(category);
  if (!userId) {
    throw new apiError(400, "User ID is required");
  }

  let propertyDetails = {};

  switch (selectedCategory.toLowerCase()) {
    case "rent":
      propertyDetails = { ...rentDetails, category: "rent" };
      break;
    case "pg":
      propertyDetails = { ...pgDetails, category: "pg" };
      break;
    case "plot":
      propertyDetails = { ...plotDetails, category: "plot" };
      break;
    default:
      throw new apiError(400, "Invalid category selected");
  }

  //   const imagesLoaclPath = req.files?.path;
  const imagePaths = req.files?.map((file) => file.path);

  // Upload images to Cloudinary if provided
  const uploadedImages =
    imagePaths.length > 0
      ? await Promise.all(imagePaths.map((image) => uploadOnCloudinary(image)))
      : [];
    //   console.log(imagePaths);
    //   console.log(uploadOnCloudinary);

  const property = await Property.create({
    ...propertyDetails,
    location,
    user: userId,
    images: uploadedImages.map(img => img.url),
    isActive: true, // Assuming the property is active by default
  });

  return res
    .status(201)
    .json(new apiResponse(200, property, "Property Created Successfully"));
});

export { createProperty };
