import { Router } from "express";
import { verifiyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProperty } from "../controllers/property.controller.js";

const router = Router();

router
  .route("/create")
  .post(verifiyJWT,  upload.array('images', 10), createProperty);

export default router;
