const { deleteFile } = require("../helpers/deleteHelper");
const courseModel = require("../model/course.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const createSlug = require("../utils/createSlug");

exports.addCourseController = asyncHandler(async (req, res) => {
  const { name, price, duration, isActive, students } = req.body;
  const image = req.file?.filename;

  if (!name) {
    deleteFile(image);
    return apiResponse(res, 400, "course name is required");
  }
  if (!image) return apiResponse(res, 400, "course image is required");
  const slug = createSlug(name);

  const existsCourse = await courseModel.findOne({ slug });
  if (existsCourse) {
    deleteFile(image);
    return apiResponse(res, 409, "course already exists");
  }

  const course = new courseModel({
    name,
    image: `${process.env.UPLOADS_BASE_URL}/${image}`,
    price,
    duration,
    slug,
    students,
    isActive,
  });

  await course.save();
  apiResponse(res, 200, "course added successfully", course);
});

exports.findAllCourseController = asyncHandler(async (req, res) => {
  const course = await courseModel
    .find({})
    .select("name image price duration slug isActive")
    .sort({ createdAt: -1 });
  apiResponse(res, 200, "course fetched successfully", course);
});