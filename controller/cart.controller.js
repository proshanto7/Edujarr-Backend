const cartModel = require("../model/cart.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.addToCartController = asyncHandler(async (req, res) => {
  const { courseId, quantity } = req.body;
  const userId = req.user.safeData._id;
  const cart = new cartModel({
    userId,
    courseId,
    quantity,
  });
  await cart.save();
  apiResponse(res, 200, "course added to cart successfully", cart);
});
