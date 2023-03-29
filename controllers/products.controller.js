// here also we use Product model.So, it got used two times.
const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
  // products were also shown to admin
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products.ejs", { products: products });
  } catch (error) {
    next(error); // default error handler -> 500
  }
}

async function getProductDetails(req, res, next) {
  try {
    const product = await Product.findById(req.params.id); //should return a promise, but returns class as per model
    res.render("customer/products/product-details.ejs", { product: product });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
