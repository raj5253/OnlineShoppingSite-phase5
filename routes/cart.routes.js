const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

// /cart/
router.get("/", cartController.getCart);

// /cart/items
router.post("/items", cartController.addCartItem);

router.patch("/items", cartController.updateCartItem);

module.exports = router;
