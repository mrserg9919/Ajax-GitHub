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

