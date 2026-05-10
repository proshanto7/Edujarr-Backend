const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { addToCartController } = require("../../controller/cart.controller");
const router = express.Router();

router.post("/add-to-cart", authorize, addToCartController);

module.exports = router;
