let cart = [];

const cartContainer =
document.getElementById("cart");

const cartItems =
document.getElementById("cart-items");

const cartCount =
document.getElementById("cart-count");

const total =
document.getElementById("total");



function openCart() {

cartContainer.classList.add("active");

}

function closeCart() {

cartContainer.classList.remove("active");

}





document
.querySelectorAll(".add-cart")
.forEach(button => {

button.addEventListener("click", () => {

const name =
button.dataset.name;

const price =
parseInt(button.dataset.price);

cart.push({
name,
price
});

updateCart();

});

});






function updateCart() {

cartItems.innerHTML = "";

let totalPrice = 0;



cart.forEach(item => {

cartItems.innerHTML += `

<div style="
padding:15px 0;
border-bottom:1px solid #333;
display:flex;
justify-content:space-between;
">

<span>${item.name}</span>

<span>P${item.price}</span>

</div>

`;

totalPrice += item.price;

});



cartCount.innerText =
cart.length;

total.innerText =
"TOTAL : P" + totalPrice;

}






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
`• ${item.name} - P${item.price}%0A`;

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
