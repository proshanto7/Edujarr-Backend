const { asyncHandler } = require("../utils/asyncHandler");

exports.addCategoryController = asyncHandler(async (req, res) => {
  res.send("add category");
});
