const stripe = require("stripe")(
  "sk_test_51MkkYdSDNqeO4XdQUSYhPwCyPSALcf1Ofv7nbB7PhWCffNC9DvRAtlO4Zte8AfnVIokK16kxZkVdo4ZQ5sWhrLYw00bYgEMbBE"
); //don't share key. security
const Order = require("../models/oders.model");
const User = require("../models/user.model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null; //once order placed cart should be cleared

  const session = await stripe.checkout.sessions.create({
    //the checkput.session has nothing to do with session created in res.locals

    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
  // res.redirect("/orders");
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}
function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
