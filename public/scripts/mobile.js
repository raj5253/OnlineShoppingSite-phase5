const mobileMenuBtnElement = document.getElementById("mobile-menu-btn");
const mobileMenuElement = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenuElement.classList.toggle("open");
}

mobileMenuBtnElement.addEventListener("click", toggleMobileMenu);

//if "open" class is not there in css class list of that html element, then it will add it. if there then remove it.
