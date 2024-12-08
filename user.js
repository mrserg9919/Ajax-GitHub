const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let profile = document.getElementById('profile');
let productsGrid = document.getElementById('user-products-grid');

let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';

fetch(`${url}/users/${id}`)
.then(async function(response) {
    let user = await response.json();
    profile.innerHTML = `
        <h1>${user.name}</h1>
        <h2>${user.surname}</h1>
        <img class="profile-img" src="${user.photo_url}">
        <p>Balance: ${user.balance}$</p>
    `
})

fetch(`${url}/products?author_id=${id}`)
    .then(async function (response) {
        let products = await response.json();
        productsGrid.innerHTML = null;
        products.forEach(p => {
            productsGrid.innerHTML += `
                <div class="product">
                    <h2 class='product-name'>${p.name}</h2>
                    <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
                    <p class='product-price'><b>Price: </b>$${p.price}</p>
                </div>
            `;
        });
    });
