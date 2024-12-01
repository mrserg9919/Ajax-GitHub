let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let url = 'https://my-json-server.typicode.com/RobocodeSchool/marketplace';


fetch(url + '/products')
    .then(async function(response){
        let products = await response.json()
        productsGrid.innerHTML = null;
        products.forEach(p => {
            productsArray.push(p);
            let pElem = document.createElement('div');
        });
    }
)