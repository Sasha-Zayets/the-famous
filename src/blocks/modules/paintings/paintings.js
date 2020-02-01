import axios from 'axios';

const buyButtons = document.querySelectorAll('.card__buy-button');

// проверяем какие продукты уже куплены
setBuyProducts();

if (!!buyButtons) {
    buyButtons.forEach(button => {
        if (!button.classList.contains('button--buy')) {
            button.addEventListener('click', function () {
                loadData(button);
            });
        }
    })
}

function loadData(element) {
    element.classList.add('button--loader');
    axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then(() => {
            setTimeout(() => {
                element.classList.remove('button--loader');
                addStorage(element.getAttribute('data-id'));
                addHtmlButton(element);
            }, 1000);
        })
        .catch(error => console.log(error))
}

function setBuyProducts() {
    const products = localStorage.getItem('products');

    if(!!products) {
        const buyProduct = products.split(',');
        let button;
        buyProduct.forEach(id => {
            button = document.querySelector(`[data-id="${id}"]`);
            button.classList.add('button--buy');
            addHtmlButton(button);
        });
    }
}

function addHtmlButton(element) {
    const html = `
            <svg class="button__icon">
                <use xlink:href="/img/icons/sprite.svg#feather_check"></use>
            </svg>
            В корзине`;
    element.innerHTML = html;
}

function addStorage(data) {
    let newIdProduct = [];
    const products = localStorage.getItem('products');

    if (!!products) {
        newIdProduct.push(products);
    }

    newIdProduct.push(data);
    localStorage.setItem('products', newIdProduct);
}