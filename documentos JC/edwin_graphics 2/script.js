const products=[
["Guardabarro","Diseño 1"],["Guardabarro","Diseño 2"],["Tanque","Diseño 1"],["Tanque","Diseño 2"],
["Laterales","Diseño 1"],["Laterales","Diseño 2"],["Carenaje","Diseño 1"],["Carenaje","Diseño 2"]
];
const grid=document.getElementById("productGrid"),search=document.getElementById("search"),filter=document.getElementById("filter");
function render(){let q=search.value.toLowerCase(),f=filter.value;grid.innerHTML=products.filter(p=>(!f||p[0]===f)&&p.join(" ").toLowerCase().includes(q)).map((p,i)=>`<article class="card"><div class="cardImg">🏍️</div><h3>${p[0]} — ${p[1]}</h3><p>POR CONFIRMAR</p><button onclick="addCart(${i})">AGREGAR AL CARRITO</button></article>`).join("")}
search.oninput=render;filter.onchange=render;render();

let cart=JSON.parse(localStorage.getItem("egCart")||"[]");
function save(){localStorage.setItem("egCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length;document.getElementById("cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cartItem"><span>${x[0]} — ${x[1]}</span><button onclick="removeCart(${i})">✕</button></div>`).join(""):"<p style='color:#777'>Tu carrito está vacío.</p>"}
function addCart(i){cart.push(products[i]);save();toast("Producto agregado al carrito");}
function removeCart(i){cart.splice(i,1);save()}
save();
const cartEl=document.getElementById("cart");document.getElementById("cartBtn").onclick=()=>cartEl.classList.add("open");document.getElementById("closeCart").onclick=()=>cartEl.classList.remove("open");

document.querySelectorAll("#parts button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#parts button").forEach(x=>x.classList.remove("active"));b.classList.add("active");toast("Pieza seleccionada: "+b.textContent)});
document.querySelectorAll(".design").forEach(b=>b.onclick=()=>{document.querySelectorAll(".design").forEach(x=>x.classList.remove("active"));b.classList.add("active");toast(b.dataset.design==="0"?"Diseño retirado":"Diseño aplicado: "+b.textContent)});
document.querySelectorAll(".sw").forEach(b=>b.onclick=()=>{document.querySelectorAll(".sw").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(".fakeBike").style.filter=`drop-shadow(0 20px 30px #000) brightness(.8)`;toast("Color base seleccionado")});
document.getElementById("resetView").onclick=()=>toast("Vista restablecida");
document.getElementById("quoteBtn").onclick=()=>toast("Preparado para solicitar cotización");
document.getElementById("contactForm").onsubmit=e=>{e.preventDefault();toast("Mensaje listo para enviar");e.target.reset()};
function toast(t){let x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
