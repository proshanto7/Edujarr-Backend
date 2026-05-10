const express = require("express");
const { authorize } = require("../../middleware/authorize");
const {
  addToCartController,
  getCartController,
} = require("../../controller/cart.controller");
const router = express.Router();

router.post("/add-to-cart", authorize, addToCartController);
router.get("/get-cart", authorize, getCartController);

module.exports = router;
