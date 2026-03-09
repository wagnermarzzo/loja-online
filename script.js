let products = [
  {id:1,name:"Camisa Azul",price:59.9,quantity:10,image:"https://via.placeholder.com/150",category:"moda"},
  {id:2,name:"Perfume Rosa",price:129.9,quantity:5,image:"https://via.placeholder.com/150",category:"perfumaria"}
];

let cart = [];
let users = [];
let currentUser = null;
let sales = [];

// ----- Usuário -----
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const myOrdersBtn = document.getElementById('myOrdersBtn');

registerForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const form = e.target;
  if(users.find(u=>u.username===form.username.value)){ alert("Usuário já existe!"); return; }
  const user = {username:form.username.value,password:form.password.value,purchases:[]};
  users.push(user);
  alert("Cadastro realizado!");
  form.reset();
});

loginForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const form = e.target;
  const user = users.find(u=>u.username===form.username.value && u.password===form.password.value);
  if(user){ currentUser = user; alert("Login realizado!"); myOrdersBtn?.classList.remove('hidden'); }
  else alert("Usuário ou senha inválidos!");
});

// ----- Produtos -----
function loadProducts(){
  const container = document.getElementById('productContainer');
  if(!container) return;
  container.innerHTML="";
  products.forEach(p=>{
    if(p.quantity>0){
      const card = document.createElement('div');
      card.className="productCard";
      card.innerHTML=`<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>R$ ${p.price.toFixed(2)}</p><p>Estoque: ${p.quantity}</p><button onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Adicionar</button>`;
      container.appendChild(card);
    }
  });
}
loadProducts();

function addToCart(id){
  const prod = products.find(p=>p.id===id);
  if(prod && prod.quantity>0){ cart.push({...prod}); prod.quantity--; document.getElementById('cartCount').textContent=cart.length; loadProducts(); }
}

// ----- Carrinho -----
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

cartBtn?.addEventListener('click',()=>{ cartModal.classList.remove('hidden'); showCart(); });
closeCartBtn?.addEventListener('click',()=>{ cartModal.classList.add('hidden'); });

function showCart(){
  const list = document.getElementById('cartList');
  list.innerHTML="";
  cart.forEach(c=>{
    const li=document.createElement('li'); li.textContent=`${c.name} - R$${c.price.toFixed(2)}`; list.appendChild(li);
  });
}

checkoutBtn?.addEventListener('click',()=>{
  if(!currentUser){ alert("Faça login para finalizar a compra!"); return; }
  currentUser.purchases.push(...cart); sales.push(...cart);
  cart=[]; document.getElementById('cartCount').textContent=0; cartModal.classList.add('hidden'); loadProducts();
});
