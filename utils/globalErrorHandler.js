const { apiResponse } = require("./apiResponse");

exports.globalErrorHandler = (err, req, res, next) => {
  if (err.username === "ValidationError") {
    let errors = {};

    Object.values(errors).forEach((value) => {
      apiResponse(res, 400, value);
    });
  } else {
    apiResponse(res, 400, err.message || "Something went wrong");
  }
};
