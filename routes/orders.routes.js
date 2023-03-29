const express = require("express");
const orderController = require("../controllers/orders.controller");

const router = express.Router();

// /orders
router.get("/", orderController.getOrders);

// /orders
router.post("/", orderController.addOrder);

router.get("/success", orderController.getSuccess);

router.get("/failure", orderController.getFailure);

module.exports = router;
