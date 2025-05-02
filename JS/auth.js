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
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

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

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // If on login/signup page and already logged in, redirect to home
    if ((window.location.pathname.includes('login.html') || 
         window.location.pathname.includes('signup.html'))) {
        if (checkAuth()) {
            window.location.href = 'index.html';
        }
    }
});

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}