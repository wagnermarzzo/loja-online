// Produtos mock
let products = [
  {id:1, name:"Camisa Azul", price:59.9, quantity:10, image:"https://via.placeholder.com/150", category:"moda"},
  {id:2, name:"Perfume Rosa", price:129.9, quantity:5, image:"https://via.placeholder.com/150", category:"perfumaria"}
];

let cart = [];

// Carregar produtos
function loadProducts(){
  const container = document.getElementById('productContainer');
  if(!container) return;
  container.innerHTML = "";
  products.forEach(p=>{
    if(p.quantity>0){
      const card = document.createElement('div');
      card.className = "productCard";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>R$ ${p.price.toFixed(2)}</p>
        <p>Estoque: ${p.quantity}</p>
        <button onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
      `;
      container.appendChild(card);
    }
  });
}
loadProducts();

// Carrinho
function addToCart(id){
  const prod = products.find(p=>p.id===id);
  if(prod && prod.quantity>0){
    cart.push({...prod});
    prod.quantity--;
    alert(`${prod.name} adicionado ao carrinho`);
    document.getElementById('cartCount').textContent = cart.length;
    loadProducts();
  }
}

// Modal carrinho
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
cartBtn?.addEventListener('click',()=>{ cartModal.classList.remove('hidden'); showCart(); });
closeCartBtn?.addEventListener('click',()=>{ cartModal.classList.add('hidden'); });

function showCart(){
  const list = document.getElementById('cartList');
  list.innerHTML = "";
  cart.forEach((c,i)=>{
    const li = document.createElement('li');
    li.textContent = `${c.name} - R$${c.price.toFixed(2)}`;
    list.appendChild(li);
  });
}

// ADM Dashboard
const addProductForm = document.getElementById('addProductForm');
const productList = document.getElementById('productList');

addProductForm?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const form = e.target;
  const newProd = {
    id: products.length+1,
    name: form.name.value,
    price: parseFloat(form.price.value),
    quantity: parseInt(form.quantity.value),
    image: form.image.value,
    category:"moda"
  };
  products.push(newProd);
  alert(`${newProd.name} adicionado com sucesso!`);
  form.reset();
  displayProductList();
  loadProducts();
});

function displayProductList(){
  if(!productList) return;
  productList.innerHTML = "";
  products.forEach(p=>{
    const li = document.createElement('li');
    li.textContent = `${p.name} - R$${p.price.toFixed(2)} - Estoque: ${p.quantity}`;
    productList.appendChild(li);
  });
}
displayProductList();
