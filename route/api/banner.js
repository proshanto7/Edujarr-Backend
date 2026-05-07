const express = require("express");
const { addBannerController } = require("../../controller/banner.controller");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
const uploadFile = require("../../helpers/uploadsFile");
const router = express.Router();

const upload = uploadFile(["jpg", "jpeg", "png", "webp"], 2); // 2MB limit, allowed extensions jpg/jpeg/png/webp

router.post(
  "/add-banner",
  authorize,
  authorizeRole("admin", "editor"),
  upload.single("banner-image"),
  addBannerController,
);

module.exports = router;
