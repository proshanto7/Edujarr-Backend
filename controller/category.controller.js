const { deleteFile } = require("../helpers/deleteHelper");
const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addCategoryController = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;
  const image = req.file?.filename;

  const existsCategory = await categoryModel.findOne({ name });
  if (existsCategory) {
    deleteFile(image);
    return apiResponse(res, 409, "category already exists");
  }
  if (!name) {
    deleteFile(image);
    return apiResponse(res, 400, "category name is required");
  }
  const category = new categoryModel({
    name,
    image: `${process.env.UPLOADS_BASE_URL}/${image}`,
    isActive,
  });
  await category.save();
  apiResponse(res, 200, "category added successfully", category);
});

exports.findAllCategoryController = asyncHandler(async (req, res) => {
  const category = await categoryModel
    .find({})
    .select("name image isActive")
    .sort({ createdAt: -1 });
  apiResponse(res, 200, "category fetched successfully", category);
});