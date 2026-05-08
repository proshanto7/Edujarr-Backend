const companyModel = require("../model/company.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addCompanyController = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;
  const image = req.file.filename;

  const company = new companyModel({
    name,
    image: `${process.env.UPLOADS_BASE_URL}/${image}`,
    isActive,
  });

  await company.save();
  apiResponse(res, 200, "company added successfully", company);
});

exports.allCompanyController = asyncHandler(async (req, res) => {
  const company = await companyModel
    .find({})
    .select("name image isActive")
    .sort({ createdAt: -1 });
  apiResponse(res, 200, "company fetched successfully", company);
});
