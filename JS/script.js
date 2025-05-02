// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        oldPrice: 129.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "electronics",
        rating: 4.5,
        reviews: 42,
        stock: 10,
        badge: "New"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "electronics",
        rating: 4.2,
        reviews: 36,
        stock: 5,
        badge: "Sale"
    },
    {
        id: 3,
        name: "Premium Leather Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "accessories",
        rating: 4.7,
        reviews: 28,
        stock: 15
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 29.99,
        oldPrice: 39.99,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        category: "electronics",
        rating: 4.0,
        reviews: 19,
        stock: 0,
        badge: "Sale"
    },
    {
        id: 5,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "clothing",
        rating: 4.3,
        reviews: 31,
        stock: 20
    },
    {
        id: 6,
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        oldPrice: 24.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de93e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        category: "home",
        rating: 4.8,
        reviews: 47,
        stock: 12,
        badge: "Popular"
    }
];

// Static user data for demo purposes
const demoUsers = [
    {
        email: "user@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        email: "sarah@example.com",
        password: "password123",
        firstName: "Sarah",
        lastName: "Johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const closeCart = document.querySelector('.close-cart');
const cartCount = document.querySelector('.cart-count');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profileForm = document.querySelector('.profile-form');
const passwordForm = document.querySelector('.settings-form');
const checkoutForm = document.getElementById('shippingForm');
const couponForm = document.querySelector('.coupon-form');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render products
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const badgeClass = product.badge ? product.badge.toLowerCase().replace(' ', '-') : '';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button><i class="fas fa-heart"></i></button>
                    <button><i class="fas fa-eye"></i></button>
                    <button><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-meta">
                    <div class="product-rating">
                        ${renderRating(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart ${product.stock === 0 ? 'disabled' : ''}" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> ${product.stock === 0 ? 'Out of Stock' : 'Add'}
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('disabled')) return;
            
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            addToCart(product);
        });
    });
}

// Render rating stars
function renderRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Maximum stock reached for this item');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            stock: product.stock
        });
    }
    
    updateCart();
    showAddedToCartMessage(product.name);
}

// Show added to cart message
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'added-to-cart-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Update cart UI
function updateCart() {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Update cart sidebar if it exists on the page
    if (document.querySelector('.cart-items')) {
        renderCartItems();
    }
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items-list');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (!cartItemsContainer || !cartSummary) return;
    
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
    const cartSummary = document.querySelector('.cart-summary');
    if (!cartSummary) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
    const tax = subtotal * 0.1; // 10% tax
    
    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.tax').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.total-price').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    
    // Update sidebar cart total if it exists on the page
    if (document.querySelector('.cart-sidebar .total-price')) {
        document.querySelector('.cart-sidebar .total-price').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Check if user is logged in
function checkAuth() {
    return localStorage.getItem('currentUser');
}

// Handle login
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Find user in demo data
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            // Redirect to homepage
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Handle signup
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Create new user (just for demo, not actually stored)
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
        };
        
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirect to homepage
        window.location.href = 'index.html';
    });
}

// Update UI based on auth status
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userNavItem = document.querySelector('.nav-user');
    
    if (currentUser && userNavItem) {
        // Show user info in nav
        userNavItem.innerHTML = `
            <div class="user-avatar">
                <img src="${currentUser.avatar}" alt="${currentUser.firstName}">
            </div>
            <span class="user-name">${currentUser.firstName}</span>
        `;
        
        // Update profile page if exists
        if (document.querySelector('.profile-name')) {
            document.querySelector('.profile-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
            document.querySelector('.profile-email').textContent = currentUser.email;
            document.querySelector('.profile-pic img').src = currentUser.avatar;
        }
    }
}

// Handle profile form submission
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const birthday = document.getElementById('birthday').value;
        
        // Update user data
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.firstName = firstName;
            currentUser.lastName = lastName;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.birthday = birthday;
            
            // Save updated user data
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update UI
            document.querySelector('.profile-name').textContent = `${firstName} ${lastName}`;
            document.querySelector('.profile-email').textContent = email;
            
            // Show success message
            alert('Profile updated successfully!');
        }
    });
}

// Handle password change form
if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        
        // In a real app, you would verify current password and update it
        alert('Password changed successfully!');
        passwordForm.reset();
    });
}

// Handle checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would process the payment here
        // For demo, we'll just redirect to order success page
        
        // Create order object
        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toLocaleDateString(),
            items: cart,
            total: document.querySelector('.summary-total span:last-child').textContent,
            status: 'Processing'
        };
        
        // Save order to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(order));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    });
}

// Handle coupon application
if (couponForm) {
    couponForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const couponCode = this.querySelector('input').value;
        
        // Simple coupon validation
        if (couponCode === 'DISCOUNT10') {
            alert('Coupon applied! 10% discount will be applied at checkout.');
        } else {
            alert('Invalid coupon code');
        }
    });
}

// Handle payment method selection
const paymentMethods = document.querySelectorAll('.payment-method');
paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
    });
});

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Initialize orders page
function initOrdersPage() {
    // Load orders from localStorage (in a real app, this would come from a backend)
    const orders = [
        {
            id: 'ORD-2023-45678',
            date: 'October 15, 2023',
            status: 'Processing',
            total: '$326.76'
        },
        {
            id: 'ORD-2023-42351',
            date: 'September 28, 2023',
            status: 'Shipped',
            total: '$189.99'
        },
        {
            id: 'ORD-2023-39876',
            date: 'September 5, 2023',
            status: 'Delivered',
            total: '$245.50'
        },
        {
            id: 'ORD-2023-35621',
            date: 'August 12, 2023',
            status: 'Cancelled',
            total: '$78.99'
        }
    ];
    
    // Populate orders table
    const ordersTable = document.querySelector('.orders-table tbody');
    if (ordersTable) {
        orders.forEach(order => {
            const row = document.createElement('tr');
            
            // Determine status class
            let statusClass = '';
            if (order.status === 'Processing') statusClass = 'status-processing';
            else if (order.status === 'Shipped') statusClass = 'status-shipped';
            else if (order.status === 'Delivered') statusClass = 'status-delivered';
            else if (order.status === 'Cancelled') statusClass = 'status-cancelled';
            
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td><span class="order-status ${statusClass}">${order.status}</span></td>
                <td>${order.total}</td>
                <td><a href="#" class="view-order">View</a></td>
            `;
            
            ordersTable.appendChild(row);
        });
    }
    
    // Handle view order clicks
    document.querySelectorAll('.view-order').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Order details would show here in a real application');
        });
    });
}

// Initialize order success page
function initOrderSuccessPage() {
    // Load order details from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (order) {
        // Display order details
        document.querySelector('.detail-row:nth-child(1) .detail-value').textContent = order.id;
        document.querySelector('.detail-row:nth-child(2) .detail-value').textContent = order.date;
        document.querySelector('.detail-row:nth-child(3) .detail-value').textContent = order.total;
        
        // In a real app, you would show actual payment method
        document.querySelector('.detail-row:nth-child(4) .detail-value').textContent = 'Credit Card (•••• •••• •••• 4242)';
    }
    
    // Update cart count to 0 since order is complete
    if (document.querySelector('.cart-count')) {
        document.querySelector('.cart-count').textContent = '0';
    }
}

// Initialize settings page
function initSettingsPage() {
    // Load user preferences
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    // Set initial toggle states
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');
    const promotionalOffers = document.getElementById('promotionalOffers');
    const newsletter = document.getElementById('newsletter');
    
    if (emailNotifications) emailNotifications.checked = currentUser.emailNotifications !== false;
    if (smsNotifications) smsNotifications.checked = currentUser.smsNotifications || false;
    if (promotionalOffers) promotionalOffers.checked = currentUser.promotionalOffers !== false;
    if (newsletter) newsletter.checked = currentUser.newsletter !== false;
    
    // Handle preference changes
    document.querySelectorAll('.switch input').forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            if (!currentUser) return;
            
            const preferenceId = this.id;
            currentUser[preferenceId] = this.checked;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        });
    });
    
    // Handle account deletion
    const deleteAccountBtn = document.querySelector('.danger-zone button');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                // Clear user data
                localStorage.removeItem('currentUser');
                localStorage.removeItem('cart');
                
                // Redirect to homepage
                window.location.href = 'index.html';
            }
        });
    }
}

// Event listeners
if (cartIcon) cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

if (closeCart) closeCart.addEventListener('click', toggleCart);
if (overlay) overlay.addEventListener('click', toggleCart);

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Render products on the products page
    renderProducts(products);
    
    // Update cart count on page load
    updateCart();
    
    // Update auth UI
    updateAuthUI();
    
    // Initialize specific pages
    if (window.location.pathname.includes('orders.html')) {
        initOrdersPage();
    } else if (window.location.pathname.includes('order-success.html')) {
        initOrderSuccessPage();
    } else if (window.location.pathname.includes('settings.html')) {
        initSettingsPage();
    }
    
    // If on login/signup page and already logged in, redirect to home
    if ((window.location.pathname.includes('login.html') || 
         window.location.pathname.includes('signup.html')) && 
        checkAuth()) {
        window.location.href = 'index.html';
    }
});

// Style for added to cart message
const addedToCartStyle = document.createElement('style');
addedToCartStyle.textContent = `
    .added-to-cart-message {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--success-color);
        color: white;
        padding: 12px 20px;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--box-shadow);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .added-to-cart-message.show {
        opacity: 1;
    }
    
    .added-to-cart-message i {
        font-size: 20px;
    }
`;
document.head.appendChild(addedToCartStyle);