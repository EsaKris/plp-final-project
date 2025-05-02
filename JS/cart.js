// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items-list');
const cartSummary = document.querySelector('.cart-summary');
const updateCartBtn = document.getElementById('update-cart');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCartItems() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.querySelector('.subtotal').textContent = '$0.00';
        document.querySelector('.shipping').textContent = '$0.00';
        document.querySelector('.tax').textContent = '$0.00';
        document.querySelector('.total-price').textContent = '$0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item-row';
        cartItem.innerHTML = `
            <div class="cart-item-product">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Available: ${item.stock}</p>
                </div>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${item.stock}" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });
    
    // Add event listeners to quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityInputChange);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
    
    // Update cart summary
    updateCartSummary();
}

// Handle quantity button clicks
function handleQuantityChange(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
    
    if (e.target.classList.contains('plus')) {
        if (item.quantity < item.stock) {
            item.quantity++;
            input.value = item.quantity;
        } else {
            alert('Maximum stock reached for this item');
        }
    } else if (e.target.classList.contains('minus')) {
        if (item.quantity > 1) {
            item.quantity--;
            input.value = item.quantity;
        } else {
            removeItemFromCart(e);
            return;
        }
    }
    
    updateCart();
    updateCartSummary();
}

// Handle quantity input changes
function handleQuantityInputChange(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const newQuantity = parseInt(e.target.value);
    
    if (isNaN(newQuantity)) {
        e.target.value = item.quantity;
        return;
    }
    
    if (newQuantity < 1) {
        item.quantity = 1;
        e.target.value = 1;
    } else if (newQuantity > item.stock) {
        item.quantity = item.stock;
        e.target.value = item.stock;
        alert('Maximum stock reached for this item');
    } else {
        item.quantity = newQuantity;
    }
    
    updateCart();
    updateCartSummary();
}

// Remove item from cart
function removeItemFromCart(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    
    updateCart();
    renderCartItems();
}

// Update cart summary
function updateCartSummary() {
    if (!cartSummary) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
    const tax = subtotal * 0.1; // 10% tax
    
    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.tax').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.total-price').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    
    // Update sidebar cart total if it exists
    if (document.querySelector('.cart-sidebar .total-price')) {
        document.querySelector('.cart-sidebar .total-price').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }
}

// Update cart button
if (updateCartBtn) {
    updateCartBtn.addEventListener('click', () => {
        // The cart is already updated in real-time, so we just show a message
        alert('Cart updated successfully!');
    });
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    
    // Update cart count on page load
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
});