// cretqaed to handle all the routes related to admin

const express = require("express");
const adminController = require("../controllers/admin.controller");
// const imageUploadMiddleware = require("../middlewares/image-upload-local");
const imageUploadMiddleware = require("../middlewares/image-upload-cloud");

const router = express.Router();

router.get("/products", adminController.getProducts); //admin/products

router.get("/products/new", adminController.getNewProduct);

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.get("/products/:id", adminController.getUpdateProduct);

router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProduct
);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;

/* all routes in this router are prefixed with '/admin' .
 '/admin' is added in app.js 
 Only routes having '/admin' in prefix will be handled by admin.routes.js */
