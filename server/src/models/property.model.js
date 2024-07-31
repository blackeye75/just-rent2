import mongoose, { Schema } from "mongoose";

// Define the property schema
const propertySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    category: {
      type: String,
      enum: ['rent', 'plot', 'pg'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rentDetails: {
      bhkType: { type: String },
      budget: { type: Number },
    },
    pgDetails: {
      occupancyType: { type: String },
      budget: { type: Number },
    },
    plotDetails: {
      useType: { type: String },
      budget: { type: Number },
    }
  },
  { timestamps: true }
);

// Create the model from the schema
const Property = mongoose.model('Property', propertySchema);

export default Property;
