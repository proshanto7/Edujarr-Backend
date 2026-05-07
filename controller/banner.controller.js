const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const bannerModel = require("../model/banner.model");
exports.addBannerController = asyncHandler(async (req, res) => {
  const image = req.file.filename;
  const {title, subtitle, isActive } = req.body;
  const banner = new bannerModel({
    title,
    subtitle,
    image: `${process.env.UPLOADS_BASE_URL}/${image}`,
    isActive,
  });
  await banner.save();
  apiResponse(res, 200, "banner added successfully");
});

