//created after auth.routes.js. Once authentication(+csrf + MongoDbsession + userSession) completed,
//after admin part,we srated  working on product routes for user on webiste
const express = require("express");
const productsController = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
