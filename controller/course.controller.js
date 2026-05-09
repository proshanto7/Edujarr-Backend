const { asyncHandler } = require("../utils/asyncHandler");

exports.addCourseController = asyncHandler(async (req, res) => {
  res.send("add course");
});
