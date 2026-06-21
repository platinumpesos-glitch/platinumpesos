let cart = [];

const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const total = document.getElementById("total");

/* OPEN & CLOSE CART */

function openCart() {
  cartContainer.classList.add("active");
}

function closeCart() {
  cartContainer.classList.remove("active");
}

/* SIZE SELECTION */

document.querySelectorAll(".sizes button").forEach(button => {
  button.addEventListener("click", () => {

    const group =
      button.parentElement.querySelectorAll("button");

    group.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});

/* ADD TO CART */

document.querySelectorAll(".add-cart").forEach(button => {

  button.addEventListener("click", () => {

    const product = button.parentElement;

    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    let size = "";

    const sizeSection =
      product.querySelector(".sizes");

    if (sizeSection) {

      const activeSize =
        sizeSection.querySelector(".active");

      if (!activeSize) {
        alert("Please select a size.");
        return;
      }

      size = activeSize.innerText;
    }

    cart.push({
      name,
      price,
      size
    });

    updateCart();

    alert(name + " added to cart.");
  });

});

/* UPDATE CART */

function updateCart() {

  cartItems.innerHTML = "";

  let totalPrice = 0;

  cart.forEach(item => {

    const div =
      document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        ${item.name}
        ${item.size ? ` - ${item.size}` : ""}
      </div>

      <div>
        P${item.price}
      </div>
    `;

    cartItems.appendChild(div);

    totalPrice += item.price;
  });

  cartCount.innerText = cart.length;
  total.innerText = "TOTAL : P" + totalPrice;
}

/* WHATSAPP CHECKOUT */

document
.getElementById("checkout")
.addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message =
    "Hello PLATINUMPESOS,%0A%0A";

  message +=
    "I would like to order:%0A%0A";

  let totalPrice = 0;

  cart.forEach(item => {

    message +=
      `• ${item.name}`;

    if (item.size) {
      message += ` (${item.size})`;
    }

    message +=
      ` - P${item.price}%0A`;

    totalPrice += item.price;
  });

  message +=
    `%0ATOTAL : P${totalPrice}%0A%0A`;

  message +=
    "Name : %0A";

  message +=
    "Location : ";

  window.open(
    `https://wa.me/26774303330?text=${message}`,
    "_blank"
  );
});
