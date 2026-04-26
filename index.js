import cart from "./cart.js";
import product from "./product.js";
let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

//loading template file
const loadTemplate = () => {
    fetch("template.html")
        .then((response) => response.text())
        .then((html) => {
            app.innerHTML = html;
            let contentTab = document.querySelector(".contentTab");
            contentTab.innerHTML = temporaryContent.innerHTML;
            temporaryContent.innerHTML = "";
            cart();
            initApp();
        });
};

loadTemplate();
const initApp = () => {
    let listProduct = document.querySelector(".ListProduct");
    listProduct.innerHTML = "";

    product.forEach(item => {
        let newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.innerHTML = `
      <img src="${item.image}" alt="">
      <h3>${item.name}</h3>
      <div class="price">${item.price}$</div>
      <button class="addToCart" data-id="${item.id}"
      >Add to Cart</button>
    `;
        listProduct.appendChild(newProduct);
    });

    document.querySelectorAll(".addToCart").forEach(button => {
        button.addEventListener("click", () => {
            // add cart logic here
            console.log("Add to cart clicked");
        });
    });
};
//*click add to cart get in to cart