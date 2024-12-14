const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let profile = document.getElementById('profile');
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';

//User details request
let userRequest = new XMLHttpRequest();

userRequest.open('GET',`${url}/products/${id}`);
userRequest.responseType = 'json'
userRequest.onload = function() { 
    let p = userRequest.response;
    profile.innerHTML = `
        <h2 class='product-name'>${p.name}</h2>
        <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
        <p class='product-price'><b>Price: </b>${p.price}$</p>
        <p class='product-description'><b>Description: </b>${p.description}</p>
        <a href='userProfile.html?id=${p.author_id}'>Seller profile</a>
        <button onclick="addProductToCart(${p.id})">Buy</button>
    `
}

userRequest.send();
