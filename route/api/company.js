const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
const { addCompanyController } = require("../../controller/company.controller");
const uploadFile = require("../../helpers/uploadsFile");
const router = express.Router();

const upload = uploadFile(["jpg", "jpeg", "png", "webp"], 2);

router.post(
  "/add-company",
  authorize,
  authorizeRole("admin"),
  upload.single("company-image"),
  addCompanyController,
);

module.exports = router;
