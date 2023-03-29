async function updateCartPrices(req, res, next) {
  const cart = res.locals.cart;

  await cart.updatePrices(); //calling function of cart object, to update prices in it.

  // req.session.cart = cart;
  next();
}

module.exports = updateCartPrices;
