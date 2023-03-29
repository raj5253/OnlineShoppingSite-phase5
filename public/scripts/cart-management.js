const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadgeElements = document.querySelectorAll(".nav-items .badge"); //you have two.  mobile,desktop

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("something went wrong! No json response from server.");
    return;
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener("click", addToCart);

// This Button element contains a fucntion , which get trigerred on click event.
// Function has fetch( of POST type request, ie, sends data to url).
//  the url is handled by cart.router -> which calls cart.controller -> controller adds items to cart in req.session.cart and req.locals.cart

// middleware, which appear before routes in app.js,  checks csrftokens
