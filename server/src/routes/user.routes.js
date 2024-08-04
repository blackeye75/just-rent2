import { Router } from "express";
import {
  chnageCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifiyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-Password").post(verifiyJWT, chnageCurrentPassword);
router.route("/current-user").get(verifiyJWT, getCurrentUser);
router.route("/update-account").patch(verifiyJWT, updateAccountDetails);
router.route("/avatar").patch(verifiyJWT, upload.single("avatar"), updateUserAvatar);
export default router;
