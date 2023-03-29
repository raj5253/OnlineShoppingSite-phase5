// first see if user has a cart -> middleware/cart.js ->used in app.js

const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart; //old cart // creating a reference to cart object store in locals.

  cart.addItem(product); //locals.cart also get updated
  req.session.cart = cart; //cart is stored in db via session. check in MongoDbCompass //  session.cart also gets updated

  // console.log(res.locals.cart);
  // console.log(req.session.cart);

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });

  // next(); // Additional function call that causes error//nothing after res.json()//error[err_http_headers_sent]
}

function getCart(req, res) {
  res.render("customer/cart/cart.ejs");
}

function updateCartItem(req, res) {
  // perform update operation on data exrtracted from req.locals, res.session
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );
  req.session.cart = cart; //for future backend  use

  //for frotend-ajax use
  res.json({
    message: "Item updated!",
    updatedCartData: {
      updatedItemPrice: updatedItemData.updatedItemPrice,
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
    },
  });
} //quantity of that item is still there in cart, .. see cart.model.js

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
