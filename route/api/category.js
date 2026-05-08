const express = require("express");
const {
  addCategoryController,
} = require("../../controller/category.controller");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
const uploadFile = require("../../helpers/uploadsFile");
const router = express.Router();

const upload = uploadFile(["jpg", "jpeg", "png", "webp"], 2);

router.post(
  "/add-category",
  authorize,
  authorizeRole("admin"),
  upload.single("category-image"),
  addCategoryController,
);

module.exports = router;
