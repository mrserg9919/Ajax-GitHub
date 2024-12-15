let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';
let cardProd = document.getElementById('cart-products');
let card = [];

function addProductToCart(id) {
    let product = productArray.find(function(p) {
        return p.id == id;
    })
    cart.push(product);
    drawCartProducts();
}

fetch(url + '/products')
    .then(async function(response){
        let products = await response.json()
        productsGrid.innerHTML = null;
        products.forEach(p => {
            productsArray.push(p);
            let pElem = document.createElement('div');
            pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-price'><b>Price: </b>${p.price}$</p>
            <p class='product-description'><b>Description: </b>${p.description}$</p>
            <a href='userProfile.html?id=${p.author_id}'>Seller profile</a>
            <button>Buy</button>
            `;
            productsGrid.append(pElem);
        })
});

function openCart() {
    cartProd.classList.toggle('hide');
}



if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function drawCartProducts() {

    if (cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function (p) {
        cartProd.innerHTML += `
            <p><img src="${p.photo_url}"> ${p.name} | $${p.price}</p>
            <hr>
        `;
        sum += p.price;
    });
    cartProd.innerHTML += `
        <p>Total Price: $${sum}</p>
        <button onclick="buyAll()">Buy All</button>
    `;
    localstorage.setItem("cart", JSON.stringify(cart));
    JSON.parse(localstorage.getItem('cart'));
}

function butALL () {
    cart = [];
    cartProd.innerHTML = 'Money was withdrawn from your credit card';
}