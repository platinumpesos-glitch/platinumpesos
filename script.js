/*======================================================
PLATINUMPESOS®
PREMIUM STREETWEAR
SCRIPT VERSION 3.0
======================================================*/

/*======================================================
GLOBAL
======================================================*/

let cart = [];

const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const total = document.getElementById("total");

/*======================================================
VIDEO GATE
======================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const gate=document.getElementById("video-gate");
const site=document.getElementById("site-content");
const enter=document.getElementById("enter-store");
const video=document.getElementById("intro-video");

if(video){

video.muted=true;

video.setAttribute("playsinline","");

video.setAttribute("webkit-playsinline","");

video.play().catch(()=>{});

}

site.style.display="none";

enter.addEventListener("click",()=>{

gate.classList.add("hide");

setTimeout(()=>{

gate.style.display="none";

site.style.display="block";

window.scrollTo({

top:0,

behavior:"smooth"

});

},900);

});

});

/*======================================================
OPEN CART
======================================================*/

function openCart(){

cartContainer.classList.add("active");

}

/*======================================================
CLOSE CART
======================================================*/

function closeCart(){

cartContainer.classList.remove("active");

}

/*======================================================
SIZE SELECTOR
======================================================*/

document.querySelectorAll(".sizes button").forEach(button=>{

button.addEventListener("click",()=>{

const parent=button.parentElement;

parent.querySelectorAll("button").forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

});

});/*======================================================
ADD TO CART
======================================================*/

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

const product=button.closest(".product");

const name=button.dataset.name;

const price=Number(button.dataset.price);

let size="";

const sizes=product.querySelector(".sizes");

if(sizes){

const active=sizes.querySelector(".active");

if(!active){

alert("Please select a size.");

return;

}

size=active.innerText;

}

cart.push({

name,

price,

size

});

button.innerText="ADDED ✓";

button.style.background="#18c964";

button.style.color="#fff";

setTimeout(()=>{

button.innerText="ADD TO CART";

button.style.background="#fff";

button.style.color="#000";

},1200);

updateCart();

});

});

/*======================================================
UPDATE CART
======================================================*/

function updateCart(){

cartItems.innerHTML="";

let totalPrice=0;

cart.forEach((item,index)=>{

const div=document.createElement("div");

div.className="cart-item";

div.innerHTML=`

<div>

<strong>${item.name}</strong><br>

${item.size ? item.size : "ONE SIZE"}

</div>

<div>

P${item.price}

</div>

`;

cartItems.appendChild(div);

totalPrice+=item.price;

});

cartCount.innerText=cart.length;

total.innerText="TOTAL : P"+totalPrice;

}

/*======================================================
REMOVE CART ITEMS
======================================================*/

function removeCartItem(index){

cart.splice(index,1);

updateCart();

}

/*======================================================
CLEAR CART
======================================================*/

function clearCart(){

cart=[];

updateCart();

}/*======================================================
WHATSAPP CHECKOUT
======================================================*/

document.getElementById("checkout").addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

let totalPrice=0;

let message="Hello PLATINUMPESOS,%0A%0A";

message+="I would like to order:%0A%0A";

cart.forEach(item=>{

message+="• "+item.name;

if(item.size){

message+=" ("+item.size+")";

}

message+=" - P"+item.price+"%0A";

totalPrice+=item.price;

});

message+="%0A";

message+="TOTAL : P"+totalPrice+"%0A%0A";

message+="Name : %0A";

message+="Phone Number : %0A";

message+="Location : %0A%0A";

message+="Thank you.";

window.open(

"https://wa.me/26774303330?text="+message,

"_blank"

);

});

/*======================================================
ESC CLOSE CART
======================================================*/

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

closeCart();

}

});

/*======================================================
CLICK OUTSIDE CART
======================================================*/

document.addEventListener("click",e=>{

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

/*======================================================
PRODUCT REVEAL
======================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{

threshold:.15

});

document.querySelectorAll(".product").forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(45px)";

card.style.transition=".8s ease";

observer.observe(card);

});

/*======================================================
BUTTON RIPPLE
======================================================*/

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=diameter+"px";

circle.style.height=diameter+"px";

circle.style.position="absolute";

circle.style.borderRadius="50%";

circle.style.left=(

e.clientX-

this.getBoundingClientRect().left-

diameter/2

)+"px";

circle.style.top=(

e.clientY-

this.getBoundingClientRect().top-

diameter/2

)+"px";

circle.style.background="rgba(255,255,255,.25)";

circle.style.transform="scale(0)";

circle.style.transition=".6s";

circle.style.pointerEvents="none";

this.style.position="relative";

this.style.overflow="hidden";

this.appendChild(circle);

requestAnimationFrame(()=>{

circle.style.transform="scale(4)";

circle.style.opacity="0";

});

setTimeout(()=>{

circle.remove();

},650);

});

});

/*======================================================
AUTO PLAY VIDEO
======================================================*/

window.addEventListener("load",()=>{

const video=document.getElementById("intro-video");

if(video){

video.muted=true;

video.playsInline=true;

video.play().catch(()=>{});

}

});

/*======================================================
PREVENT IMAGE DRAG
======================================================*/

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});

/*======================================================
PAGE LOADED
======================================================*/

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});/*======================================================
CORTEIZ IMAGE SWITCH
PART 2A
======================================================*/

document.querySelectorAll(".product").forEach(product=>{

const front=product.querySelector(".front-image");

const back=product.querySelector(".back-image");

if(!front||!back)return;

/*======================================================
DESKTOP
======================================================*/

product.addEventListener("mouseenter",()=>{

product.classList.add("show-back");

});

product.addEventListener("mouseleave",()=>{

product.classList.remove("show-back");

});

/*======================================================
MOBILE TAP
======================================================*/

let tapped=false;

product.addEventListener("click",e=>{

if(

e.target.closest(".add-cart")||

e.target.closest(".sizes button")

){

return;

}

if(window.innerWidth<=768){

e.preventDefault();

tapped=!tapped;

if(tapped){

product.classList.add("show-back");

}else{

product.classList.remove("show-back");

}

}

});

});

/*======================================================
RESET IMAGES AFTER RESIZE
======================================================*/

window.addEventListener("resize",()=>{

if(window.innerWidth>768){

document.querySelectorAll(".product").forEach(product=>{

product.classList.remove("show-back");

});

}

});

/*======================================================
PRELOAD PRODUCT IMAGES
======================================================*/

document.querySelectorAll(".front-image,.back-image").forEach(img=>{

const preload=new Image();

preload.src=img.src;

});

/*======================================================
SMOOTH IMAGE LOADING
======================================================*/

document.querySelectorAll(".product-image img").forEach(img=>{

img.onload=()=>{

img.style.opacity=img.classList.contains("front-image")?1:0;

};

});/*======================================================
PART 2B
PREMIUM PRODUCT INTERACTIONS
======================================================*/

/*======================================================
IMAGE ZOOM EFFECT
======================================================*/

document.querySelectorAll(".product").forEach(product=>{

const images=product.querySelectorAll(".product-image img");

product.addEventListener("mouseenter",()=>{

images.forEach(img=>{

img.style.transform="scale(1.03)";

});

});

product.addEventListener("mouseleave",()=>{

images.forEach(img=>{

img.style.transform="scale(1)";

});

});

});

/*======================================================
TOUCH OPTIMIZATION
======================================================*/

document.querySelectorAll(".product").forEach(product=>{

product.addEventListener("touchstart",()=>{

product.style.transition=".25s ease";

},{passive:true});

});

/*======================================================
PRELOAD IMAGES
======================================================*/

window.addEventListener("load",()=>{

document.querySelectorAll(".product-image img").forEach(img=>{

const preload=new Image();

preload.src=img.src;

});

});

/*======================================================
SMOOTH FADE WHEN IMAGES LOAD
======================================================*/

document.querySelectorAll(".product-image img").forEach(img=>{

if(img.complete){

img.style.opacity=img.classList.contains("front-image")?"1":"0";

}else{

img.addEventListener("load",()=>{

img.style.opacity=img.classList.contains("front-image")?"1":"0";

});

}

});

/*======================================================
PRODUCT HOVER LIFT
======================================================*/

document.querySelectorAll(".product").forEach(product=>{

product.addEventListener("mouseenter",()=>{

product.style.transform="translateY(-8px)";

});

product.addEventListener("mouseleave",()=>{

product.style.transform="translateY(0)";

});

});

/*======================================================
PREVENT DOUBLE TAP ZOOM
======================================================*/

let lastTouchEnd=0;

document.addEventListener("touchend",function(e){

const now=(new Date()).getTime();

if(now-lastTouchEnd<=300){

e.preventDefault();

}

lastTouchEnd=now;

},{passive:false});

/*======================================================
RESET PRODUCT STATES
======================================================*/

window.addEventListener("resize",()=>{

if(window.innerWidth>768){

document.querySelectorAll(".product").forEach(product=>{

product.classList.remove("show-back");

});

}

});

/*======================================================
END OF SCRIPT
======================================================*/

console.log("PLATINUMPESOS® Premium Store Loaded Successfully");
