// for deleting product-items on admin page.
// the buttons for delete are controlled by frontend+ AJAX

const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Something went wrong! Couldn't delete");
    return;
  }

  // update the dom
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove(); //removes the li tag
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}

//use this script in all-products.ejs
