import products from "./product.js";

const cart = () => {
    const iconCart = document.querySelector(".icon-cart");
    const closeBtn = document.querySelector(".cartTab .close");
    const body = document.querySelector("body");
    const cartItems = [];

    if (iconCart) {
        iconCart.addEventListener("click", () => {
            body.classList.toggle("activeTabCart");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            body.classList.remove("activeTabCart");
        });
    }

    const setProductInCart = (id, quantity, position) => {
        if (quantity > 0) {
            if (position < 0) {
                // Add new item
                cartItems.push({
                    product_id: id,
                    quantity: quantity
                });
            } else {
                // Update existing item
                cartItems[position].quantity = quantity;
            }
        } else {
            // Remove item if quantity is 0 or less
            if (position >= 0) {
                cartItems.splice(position, 1);
            }
        }

        refreshCartHTML();
    };

    const refreshCartHTML = () => {
        const listHTML = document.querySelector(".ListCart");
        const total = document.querySelector(".icon-cart span");
        let totalQuantity = 0;

        if (!listHTML) return;

        listHTML.innerHTML = cartItems.map(item => {
            const product = products.find(p => p.id === Number(item.product_id) || p.id === item.product_id);
            if (!product) return "";

            totalQuantity += item.quantity;

            return `
                <div class="cart-item" data-id="${item.product_id}">
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">$${(product.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus" style="cursor:pointer;">-</span>
                        <span class="quantity-value">${item.quantity}</span>
                        <span class="plus" style="cursor:pointer;">+</span>
                    </div>
                </div>
            `;
        }).join("");

        if (total) {
            total.innerHTML = totalQuantity;
        }
    };

    // Event delegation for add to cart, plus, minus, and outside click to close
    document.addEventListener("click", (event) => {
        const button = event.target;

        // Handle Add to Cart
        if (button.classList.contains("addToCart")) {
            const idProduct = button.dataset.id;
            const position = cartItems.findIndex(value => value.product_id == idProduct);
            const quantity = position < 0 ? 0 : cartItems[position].quantity;
            setProductInCart(idProduct, quantity + 1, position);
        }
        // Handle Plus button
        else if (button.classList.contains("plus")) {
            const cartItem = button.closest(".cart-item");
            const idProduct = cartItem.dataset.id;
            const position = cartItems.findIndex(value => value.product_id == idProduct);
            if (position >= 0) {
                setProductInCart(idProduct, cartItems[position].quantity + 1, position);
            }
        }
        // Handle Minus button
        else if (button.classList.contains("minus")) {
            const cartItem = button.closest(".cart-item");
            const idProduct = cartItem.dataset.id;
            const position = cartItems.findIndex(value => value.product_id == idProduct);
            if (position >= 0) {
                const newQty = cartItems[position].quantity - 1;
                setProductInCart(idProduct, newQty, position);
            }
        }
        // Close cart when clicking outside
        else if (!button.closest(".cartTab") && !button.closest(".icon-cart") && body.classList.contains("activeTabCart")) {
            body.classList.remove("activeTabCart");
        }
    });
};

export default cart;