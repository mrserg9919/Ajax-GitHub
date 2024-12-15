let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';
let cartProd = document.getElementById('cart-products');
let cart = [];

function addProductToCart(id) {
    let product = productsArray.find(function (p) {
        return p.id == id;
    });
    if (!product) return;
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
    
    let cartButton = document.getElementById('cart-button');
    cartButton.classList.add('active');
    setTimeout(function () {
        cartButton.classList.remove('active');
    }, 500);
}

fetch(url + '/products')
    .then(async function (response) {
        if (!response.ok) {
            console.error('Failed to fetch products');
            return;
        }
        let products = await response.json();
        productsGrid.innerHTML = null;
        products.forEach(p => {
            productsArray.push(p);
            let pElem = document.createElement('div');
            pElem.innerHTML = `
                <h2 class='product-name'>${p.name}</h2>
                <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
                <p class='product-price'><b>Price: </b>${p.price}$</p>
                <p class='product-description'><b>Description: </b>${p.description}</p>
                <a href='userProfile.html?id=${p.author_id}'>Seller profile</a>
                <button onclick="addProductToCart(${p.id})">Buy</button>
            `;
            productsGrid.append(pElem);
        });
    })
    .catch(err => console.error('Error fetching products:', err));

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    drawCartProducts();
}

function drawCartProducts() {
    if (cart.length === 0) {
        cartProd.innerHTML = 'Cart is empty';
        return;
    }
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function (p) {
        cartProd.innerHTML += `
            <p><img src="${p.photo_url}" alt="${p.name}" width="50"> ${p.name} | $${p.price}</p>
            <hr>
        `;
        sum += +p.price;
    });
    cartProd.innerHTML += `
        <p>Total Price: $${sum}</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}

function buyAll() {
    cart = [];
    cartProd.innerHTML = 'Money was withdrawn from your credit card';
    localStorage.setItem("cart", '[]');
}

function openCart() {
    cartProd.classList.toggle('hide');
}
