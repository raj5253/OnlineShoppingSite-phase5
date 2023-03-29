const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

async function updateCartItem(event) {
  // extracting data of form present in cart-item.ejs
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      // sending  data to backend for update ->will be handled by Cart.router
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  //response is a promise
  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  console.log(response);

  const responseData = await response.json(); // res.json from cartController -> function updateCartItem
  console.log(responseData);

  // updating totalprice of that item  in cart
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement =
      form.parentElement.querySelector(".cart-item-price");

    cartItemTotalPriceElement.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  //updating total price of cart
  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent =
      responseData.updatedCartData.newTotalQuantity;
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}

/*
extract data from respose received from sever(backend) .
update the frontend data by responseData
for this replace the correct  html-tag element's textContent by responseData.
*/
/*Why React is better:
see clearly :
fuction updateCartItem(event) is called to each item in cart, even when we only one item is to be changed. 
wastage of memory and processing */
