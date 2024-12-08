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