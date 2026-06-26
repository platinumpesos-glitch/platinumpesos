let cart = [];

const cartContainer =
document.getElementById("cart");

const cartItems =
document.getElementById("cart-items");

const cartCount =
document.getElementById("cart-count");

const total =
document.getElementById("total");


/* ======================
OPEN & CLOSE CART
====================== */

function openCart() {

  cartContainer.classList.add("active");

}

function closeCart() {

  cartContainer.classList.remove("active");

}


/* ======================
SIZE SELECTION
====================== */

document
.querySelectorAll(".sizes button")
.forEach(button => {

  button.addEventListener("click", () => {

    const parent =
    button.parentElement;

    parent
    .querySelectorAll("button")
    .forEach(btn => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

  });

});


/* ======================
ADD TO CART
====================== */

document
.querySelectorAll(".add-cart")
.forEach(button => {

  button.addEventListener("click", () => {

    const product =
    button.parentElement;

    const name =
    button.dataset.name;

    const price =
    parseInt(button.dataset.price);

    let size = "";

    const sizes =
    product.querySelector(".sizes");

    if (sizes) {

      const activeSize =
      sizes.querySelector(".active");

      if (!activeSize) {

        alert(
          "Please select a size."
        );

        return;

      }

      size =
      activeSize.innerText;

    }

    cart.push({

      name,
      price,
      size

    });

    updateCart();

  });

});


/* ======================
UPDATE CART
====================== */

function updateCart() {

  cartItems.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item,index)=>{

    const div =
    document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `

      <div>

        ${item.name}
        ${item.size ? " - "+item.size : ""}

      </div>

      <div>

        P${item.price}

      </div>

    `;

    cartItems.appendChild(div);

    totalPrice += item.price;

  });

  cartCount.innerText =
  cart.length;

  total.innerText =
  "TOTAL : P" + totalPrice;

}


/* ======================
WHATSAPP CHECKOUT
====================== */

document
.getElementById("checkout")
.addEventListener("click",()=>{

  if(cart.length===0){

    alert(
      "Your cart is empty."
    );

    return;

  }

  let message =
  "Hello PLATINUMPESOS,%0A%0A";

  message +=
  "I would like to order:%0A%0A";

  let totalPrice = 0;

  cart.forEach(item=>{

    message +=
    "• "
    + item.name;

    if(item.size){

      message +=
      " ("
      + item.size
      + ")";

    }

    message +=
    " - P"
    + item.price
    + "%0A";

    totalPrice +=
    item.price;

  });

  message +=
  "%0A";

  message +=
  "TOTAL : P"
  + totalPrice
  + "%0A%0A";

  message +=
  "Name : %0A";

  message +=
  "Location : %0A";

  message +=
  "Phone Number : ";

  window.open(

    "https://wa.me/26774303330?text="
    + message,

    "_blank"

  );

});


/* ======================
ESC KEY CLOSE CART
====================== */

document.addEventListener(
"keydown",
e=>{

  if(e.key==="Escape"){

    closeCart();

  }

});


/* ======================
CLICK OUTSIDE CLOSE
====================== */

document.addEventListener(
"click",
e=>{

  if(

    cartContainer.classList.contains("active")

    &&

    !cartContainer.contains(e.target)

    &&

    !e.target.closest(".cart-icon")

  ){

    closeCart();

  }

});
