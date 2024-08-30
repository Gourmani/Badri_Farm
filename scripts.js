let cart = [];

// Add product to cart
function addToCart(productName) {
    const productPrice = getProductPrice(productName);
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
    } else {
        const product = { name: productName, price: productPrice, quantity: 1, totalPrice: productPrice };
        cart.push(product);
    }
    
    updateCartCount();
    saveCart();
    displayCartItems();  // Ensure cart items are displayed
    
    // Show alert when item is added to the cart
    alert(`${productName} सफलतापूर्वक कार्ट में जोड़ा गया है!`);
}

// Get price of the product
function getProductPrice(productName) {
    const prices = {
        'ताजे दूध': 50,
        'पनीर': 120,
        'मक्खन': 100,
        'घी': 700,
        'दही': 80
    };
    return prices[productName] || 0;
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
        displayCartItems();  // Display items after loading
    }
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ₹${item.price} x 
            <div class="button-container">
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
            = ₹${item.totalPrice} 
            <button class="delete-button" onclick="removeFromCart('${item.name}')">Delete</button>
        `;
        cartItems.appendChild(li);
        total += item.totalPrice;
    });

    cartTotal.textContent = `कुल: ₹${total}`;
}

// Change quantity of item in the cart
function changeQuantity(productName, amount) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            removeFromCart(productName);
        } else {
            product.totalPrice = product.quantity * product.price;
            updateCartCount();
            saveCart();
            displayCartItems();
        }
    }
}

// Remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    saveCart();
    displayCartItems();
}

// Initialize cart on page load
function initializeCart() {
    loadCart();
}

// Feedback Form Handling
document.getElementById('feedbackForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your feedback!');
    this.reset();
});

// Event listener for checkout button
document.getElementById('checkout')?.addEventListener('click', function() {
    alert('चेकआउट अभी उपलब्ध नहीं है।');
});

// Call initializeCart on page load
window.onload = initializeCart;

