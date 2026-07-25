/*======================================================
PLATINUMPESOS®
SCRIPT A1
======================================================*/

/*======================================================
GLOBAL VARIABLES
======================================================*/

const body = document.body;

const website = document.getElementById("website");

const videoGate = document.getElementById("videoGate");

const enterStore = document.getElementById("enterStore");

const header = document.querySelector(".header");

/*======================================================
ENTER STORE
======================================================*/

if (enterStore) {

    enterStore.addEventListener("click", () => {

        videoGate.classList.add("hide");

        body.classList.remove("no-scroll");

        setTimeout(() => {

            if (website) {

                website.style.display = "block";

            }

        }, 400);

    });

}

/*======================================================
INITIAL STATE
======================================================*/

window.addEventListener("load", () => {

    if (website) {

        website.style.display = "none";

    }

});

/*======================================================
HEADER SCROLL EFFECT
======================================================*/

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*======================================================
SCROLL REVEAL
======================================================*/

const revealElements = document.querySelectorAll(

    ".product-card, .collection-header, .info-box, .newsletter, .footer-grid"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach((element) => {

    element.classList.add("fade-in");

    revealObserver.observe(element);

});

/*======================================================
SMOOTH COLLECTION LINKS
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*======================================================
PREVENT EMPTY BUTTON LINKS
======================================================*/

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("click", () => {

        button.blur();

    });

});/*======================================================
PLATINUMPESOS®
SCRIPT A2
PRODUCT IMAGE SLIDER
======================================================*/

document.querySelectorAll(".product-card").forEach((card) => {

    const images = card.querySelectorAll(".product-image");

    const dots = card.querySelectorAll(".slider-dot");

    if (images.length <= 1 || dots.length <= 1) return;

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            images.forEach((image) => {

                image.classList.remove("active");

            });

            dots.forEach((button) => {

                button.classList.remove("active");

            });

            images[index].classList.add("active");

            dot.classList.add("active");

        });

    });

});

/*======================================================
KEYBOARD SUPPORT
======================================================*/

document.querySelectorAll(".slider-dot").forEach((dot) => {

    dot.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            dot.click();

        }

    });

});

/*======================================================
OPTIONAL HOVER PREVIEW (DESKTOP)
======================================================*/

document.querySelectorAll(".product-card").forEach((card) => {

    const images = card.querySelectorAll(".product-image");

    const dots = card.querySelectorAll(".slider-dot");

    if (images.length !== 2) return;

    card.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 992) return;

        images[0].classList.remove("active");

        images[1].classList.add("active");

        dots[0].classList.remove("active");

        dots[1].classList.add("active");

    });

    card.addEventListener("mouseleave", () => {

        if (window.innerWidth <= 992) return;

        images[1].classList.remove("active");

        images[0].classList.add("active");

        dots[1].classList.remove("active");

        dots[0].classList.add("active");

    });

});/*======================================================
PLATINUMPESOS®
SCRIPT A3
SIZE SELECTION
======================================================*/

const selectedSizes = {};

/*======================================================
SIZE BUTTONS
======================================================*/

document.querySelectorAll(".product-card").forEach((card) => {

    const productName =
        card.querySelector(".cart-btn")?.dataset.name;

    const sizeButtons =
        card.querySelectorAll(".size-btn");

    if (!productName || sizeButtons.length === 0) return;

    /* Default selected size */

    const defaultButton = card.querySelector(".active-size");

    if (defaultButton) {

        selectedSizes[productName] =
            defaultButton.textContent.trim();

    }

    sizeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            /* Remove previous selection */

            sizeButtons.forEach((btn) => {

                btn.classList.remove("active-size");

            });

            /* Select new size */

            button.classList.add("active-size");

            selectedSizes[productName] =
                button.textContent.trim();

        });

    });

});

/*======================================================
GET SELECTED SIZE
======================================================*/

function getSelectedSize(productName){

    if(selectedSizes[productName]){

        return selectedSizes[productName];

    }

    return "M";

}

/*======================================================
OPTIONAL SIZE WARNING
======================================================*/

function ensureSizeSelected(productName){

    return !!selectedSizes[productName];

}

/*======================================================
SIZE BUTTON ACCESSIBILITY
======================================================*/

document.querySelectorAll(".size-btn").forEach((button)=>{

    button.setAttribute("type","button");

    button.addEventListener("keydown",(event)=>{

        if(event.key==="Enter" || event.key===" "){

            event.preventDefault();

            button.click();

        }

    });

});

/*======================================================
DEBUG (REMOVE LATER IF DESIRED)
======================================================*/

// console.log(selectedSizes);/*======================================================
PLATINUMPESOS®
SCRIPT A4
SHOPPING CART CORE
======================================================*/

let cart = [];

/*======================================================
ELEMENTS
======================================================*/

const cartDrawer = document.querySelector(".cart-drawer");

const cartBody = document.querySelector(".cart-body");

const cartCount = document.getElementById("cartCount");

const openCartBtn = document.getElementById("openCart");

const closeCartBtn = document.querySelector(".close-cart");

/*======================================================
OPEN / CLOSE CART
======================================================*/

if(openCartBtn){

    openCartBtn.addEventListener("click",()=>{

        cartDrawer.classList.add("open");

        document.body.classList.add("no-scroll");

    });

}

if(closeCartBtn){

    closeCartBtn.addEventListener("click",()=>{

        cartDrawer.classList.remove("open");

        document.body.classList.remove("no-scroll");

    });

}

/*======================================================
UPDATE CART COUNT
======================================================*/

function updateCartCount(){

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item=>{

        total += item.quantity;

    });

    cartCount.textContent = total;

}

/*======================================================
ADD TO CART
======================================================*/

document.querySelectorAll(".cart-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        const name = button.dataset.name;

        const price = Number(button.dataset.price);

        const size = getSelectedSize(name);

        const existing = cart.find(item=>

            item.name===name && item.size===size

        );

        if(existing){

            existing.quantity++;

        }else{

            cart.push({

                name:name,

                price:price,

                size:size,

                quantity:1

            });

        }

        updateCartCount();

        renderCart();

        if(cartDrawer){

            cartDrawer.classList.add("open");

        }

    });

});

/*======================================================
RENDER CART
======================================================*/

function renderCart(){

    if(!cartBody) return;

    if(cart.length===0){

        cartBody.innerHTML=`

            <div class="empty-cart">

                <p>Your cart is empty.</p>

            </div>

        `;

        return;

    }

    cartBody.innerHTML="";

    cart.forEach((item,index)=>{

        cartBody.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <div class="cart-item-price">

                    Size: ${item.size}

                </div>

                <div class="cart-item-price">

                    P${item.price}

                </div>

            </div>

            <div>

                <strong>x${item.quantity}</strong>

            </div>

        </div>

        `;

    });

}/*======================================================
PLATINUMPESOS®
SCRIPT A5
CART MANAGEMENT
======================================================*/

/*======================================================
CART TOTAL
======================================================*/

const cartTotal = document.getElementById("cartTotal");

/*======================================================
SAVE CART
======================================================*/

function saveCart(){

    localStorage.setItem(

        "pp_cart",

        JSON.stringify(cart)

    );

}

/*======================================================
LOAD CART
======================================================*/

function loadCart(){

    const saved = localStorage.getItem("pp_cart");

    if(saved){

        cart = JSON.parse(saved);

    }

    updateCartCount();

    renderCart();

}

loadCart();

/*======================================================
CALCULATE TOTAL
======================================================*/

function calculateTotal(){

    let total = 0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

    });

    if(cartTotal){

        cartTotal.textContent = `P${total}`;

    }

}

/*======================================================
NEW CART RENDER
======================================================*/

function renderCart(){

    if(!cartBody) return;

    if(cart.length===0){

        cartBody.innerHTML=`

        <div class="empty-cart">

            <p>Your cart is empty.</p>

        </div>

        `;

        calculateTotal();

        saveCart();

        return;

    }

    cartBody.innerHTML="";

    cart.forEach((item,index)=>{

        cartBody.innerHTML+=`

<div class="cart-item">

<div class="cart-item-info">

<h4>${item.name}</h4>

<div class="cart-item-price">

Size: ${item.size}

</div>

<div class="cart-item-price">

P${item.price}

</div>

</div>

<div class="quantity-controls">

<button

class="quantity-btn minus-btn"

data-index="${index}">

−

</button>

<span class="quantity-value">

${item.quantity}

</span>

<button

class="quantity-btn plus-btn"

data-index="${index}">

+

</button>

</div>

<button

class="remove-item"

data-index="${index}">

REMOVE

</button>

</div>

`;

    });

    attachCartEvents();

    calculateTotal();

    updateCartCount();

    saveCart();

}

/*======================================================
PLUS / MINUS / REMOVE
======================================================*/

function attachCartEvents(){

document.querySelectorAll(".plus-btn")

.forEach(button=>{

button.onclick=()=>{

const index=button.dataset.index;

cart[index].quantity++;

renderCart();

};

});

document.querySelectorAll(".minus-btn")

.forEach(button=>{

button.onclick=()=>{

const index=button.dataset.index;

cart[index].quantity--;

if(cart[index].quantity<=0){

cart.splice(index,1);

}

renderCart();

};

});

document.querySelectorAll(".remove-item")

.forEach(button=>{

button.onclick=()=>{

const index=button.dataset.index;

cart.splice(index,1);

renderCart();

};

});

}

/*======================================================
INITIAL UPDATE
======================================================*/

calculateTotal();

updateCartCount();/*======================================================
PLATINUMPESOS®
SCRIPT A6
WHATSAPP CHECKOUT
======================================================*/

const checkoutButton = document.querySelector(".checkout-btn");

function buildWhatsAppMessage(){

    if(cart.length===0){

        return null;

    }

    let total = 0;

    let message = "🛒 *PLATINUMPESOS ORDER*%0A%0A";

    cart.forEach((item,index)=>{

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=

`${index+1}. ${item.name}%0A` +

`Size: ${item.size}%0A` +

`Quantity: ${item.quantity}%0A` +

`Price: P${item.price}%0A` +

`Subtotal: P${itemTotal}%0A%0A`;

    });

    message +=

`------------------------%0A` +

`TOTAL: P${total}%0A%0A` +

`Thank you for shopping with PLATINUMPESOS®.`;

    return message;

}

/*======================================================
WHATSAPP CHECKOUT
======================================================*/

if(checkoutButton){

    checkoutButton.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty.");

            return;

        }

        const message = buildWhatsAppMessage();

        const phone = "267XXXXXXXX"; // <-- Replace with your number

        const url =

`https://wa.me/${phone}?text=${message}`;

        window.open(url,"_blank");

    });

}

/*======================================================
ESC KEY CLOSES CART
======================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        if(cartDrawer){

            cartDrawer.classList.remove("open");

        }

        document.body.classList.remove("no-scroll");

    }

});

/*======================================================
CLICK OUTSIDE TO CLOSE CART
======================================================*/

document.addEventListener("click",(event)=>{

    if(!cartDrawer) return;

    if(!cartDrawer.classList.contains("open")) return;

    const clickedCart = cartDrawer.contains(event.target);

    const clickedOpenButton =

        openCartBtn && openCartBtn.contains(event.target);

    if(!clickedCart && !clickedOpenButton){

        cartDrawer.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }

});

/*======================================================
SUCCESS MESSAGE
======================================================*/

function showCartNotification(text){

    const notice = document.createElement("div");

    notice.className = "pp-notification";

    notice.textContent = text;

    document.body.appendChild(notice);

    setTimeout(()=>{

        notice.classList.add("show");

    },10);

    setTimeout(()=>{

        notice.classList.remove("show");

        setTimeout(()=>{

            notice.remove();

        },300);

    },2200);

}

/*======================================================
ADD SUCCESS MESSAGE
======================================================*/

document.querySelectorAll(".cart-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        showCartNotification("Added to cart");

    });

});/*======================================================
PLATINUMPESOS®
SCRIPT A7
PREMIUM INTERACTIONS
======================================================*/

/*======================================================
PRELOAD PRODUCT IMAGES
======================================================*/

document.querySelectorAll(".product-image").forEach((image)=>{

    const preload = new Image();

    preload.src = image.src;

});

/*======================================================
SCROLL TO TOP
======================================================*/

const scrollTopButton = document.createElement("button");

scrollTopButton.className = "scroll-top";

scrollTopButton.innerHTML = "↑";

document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollTopButton.classList.add("show");

    }else{

        scrollTopButton.classList.remove("show");

    }

});

/*======================================================
REVEAL SECTIONS
======================================================*/

const revealItems=document.querySelectorAll(

".collection,.product-card,.newsletter,.store-information,.info-box,footer"

);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

revealItems.forEach(item=>{

item.classList.add("fade-in");

observer.observe(item);

});

/*======================================================
SMOOTH BUTTON PRESS
======================================================*/

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("mousedown",()=>{

button.style.transform="scale(.97)";

});

button.addEventListener("mouseup",()=>{

button.style.transform="";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="";

});

});

/*======================================================
HEADER SHADOW
======================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>20){

header.classList.add("shadow");

}else{

header.classList.remove("shadow");

}

});

/*======================================================
LAZY IMAGE EFFECT
======================================================*/

document.querySelectorAll("img").forEach(img=>{

img.loading="lazy";

});

/*======================================================
PRODUCT HOVER GLOW
======================================================*/

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transition=".35s";

});

});

/*======================================================
WELCOME MESSAGE
======================================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

console.log(

"PLATINUMPESOS® Store Loaded."

);

},500);

});/*======================================================
PLATINUMPESOS®
SCRIPT A8
FINAL OPTIMISATION
VERSION 4.0
======================================================*/

/*======================================================
SAFE INITIALISATION
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    if (typeof renderCart === "function") {

        renderCart();

    }

});

/*======================================================
CLOSE CART AFTER CHECKOUT
======================================================*/

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        setTimeout(() => {

            if (cartDrawer) {

                cartDrawer.classList.remove("open");

            }

            document.body.classList.remove("no-scroll");

        }, 500);

    });

}

/*======================================================
PREVENT DOUBLE CLICKS
======================================================*/

document.querySelectorAll(".cart-btn").forEach((button) => {

    button.addEventListener("click", () => {

        button.disabled = true;

        setTimeout(() => {

            button.disabled = false;

        }, 500);

    });

});

/*======================================================
NOTIFICATION STYLES
======================================================*/

const notificationStyle = document.createElement("style");

notificationStyle.innerHTML = `

.pp-notification{

position:fixed;

bottom:35px;

right:35px;

background:#ffffff;

color:#000000;

padding:16px 26px;

border-radius:50px;

font-weight:700;

letter-spacing:1px;

box-shadow:0 20px 60px rgba(0,0,0,.35);

opacity:0;

transform:translateY(25px);

transition:.35s;

z-index:99999;

}

.pp-notification.show{

opacity:1;

transform:translateY(0);

}

.scroll-top{

position:fixed;

right:30px;

bottom:30px;

width:52px;

height:52px;

border:none;

border-radius:50%;

background:#ffffff;

color:#000000;

font-size:20px;

font-weight:bold;

cursor:pointer;

opacity:0;

pointer-events:none;

transition:.35s;

z-index:9999;

}

.scroll-top.show{

opacity:1;

pointer-events:auto;

}

`;

document.head.appendChild(notificationStyle);

/*======================================================
AUTO CLOSE MOBILE MENU (IF ADDED LATER)
======================================================*/

document.querySelectorAll(".navigation a").forEach((link)=>{

link.addEventListener("click",()=>{

document.body.classList.remove("menu-open");

});

});

/*======================================================
IMAGE ERROR HANDLER
======================================================*/

document.querySelectorAll("img").forEach((image)=>{

image.addEventListener("error",()=>{

image.style.opacity=".35";

console.warn(

"Image failed to load:",

image.src

);

});

});

/*======================================================
STORE READY
======================================================*/

console.log(

"%cPLATINUMPESOS® WEBSITE READY",

"background:#000;color:#fff;padding:8px 14px;font-size:14px;font-weight:bold;border-radius:4px;"

);

console.log(

"Version 4.0 Loaded Successfully"

);

/*======================================================
END
======================================================*/
