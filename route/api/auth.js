const express = require("express");
const {
  signupController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  otpValidationController,
  resendOptController,
  findAllUsersController,
  userInfoController,
} = require("../../controller/auth.controller");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
const router = express.Router();

// localhost:8080/api/v1/auth/signup
router.post("/signup", signupController);
// localhost:8080/api/v1/auth/signin
router.post("/signin", signinController);
// localhost:8080/api/v1/auth/otp-validation
router.post("/otp-validation", otpValidationController);
// localhost:8080/api/v1/auth/resend-otp
router.post("/resend-otp", resendOptController);
// localhost:8080/api/v1/auth/forgot-password
router.post("/forgot-password", forgotPasswordController);
// localhost:8080/api/v1/auth/reset-password
router.post("/reset-password", resetPasswordController);
// localhost:8080/api/v1/auth/all-user
router.get(
  "/all-users",
  authorize,
  authorizeRole("admin"),
  findAllUsersController,
);
// localhost:8080/api/v1/auth/user-info/:id
router.get(
  "/user-info/:id",
  authorize,
  authorizeRole("admin", "editor"),
  userInfoController,
);

module.exports = router;
