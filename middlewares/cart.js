// check if user is having a cart before adding item to cart
// if not, then add a cart variable to the user session

const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;

    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    ); //New memory allocation .creating new cart from old cart, as old cart methods are not accessible. //cart is instance of class, so methods of class can be used now.
  }

  res.locals.cart = cart;

  next();
}
module.exports = initializeCart;

// used in app.js
/*
 we store cart in req.session for loged in users.
 REMEMBER : I have alwasy accessed session data from req.locals , not from req.session.
 
 cart-info from req.session is passed to req.locals for acess in iviews.
 if no session(ie user not loged in ), you create dummy cart and send to req.locals
 */
