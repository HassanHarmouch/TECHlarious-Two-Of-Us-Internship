// Show the Signup form by default when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginFormContainer').classList.add('active');
    document.getElementById('signupFormContainer').classList.remove('active');
});

// Add item to cart
function addToCart(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Find the product to add to cart
    const product = products.find(p => p.id === productId);

    // Check if the product exists and if enough stock is available
    if (product && product.quantity >= quantity) {
        const cartItemIndex = cart.findIndex(item => item.id === productId);

        if (cartItemIndex === -1) {
            // Add new item to cart
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        } else {
            // Update the existing item quantity in the cart
            cart[cartItemIndex].quantity += quantity;
        }

        // Update product quantity in the products list
        product.quantity -= quantity;

        // Save updated cart and products data to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('products', JSON.stringify(products));

        alert('Item added to cart!');
    } else {
        alert('Not enough stock available!');
    }
}

// Checkout process
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Update product stock based on cart items
    let products = JSON.parse(localStorage.getItem('products')) || [];

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.quantity -= item.quantity; // Reduce the stock by quantity purchased
        }
    });

    // Save the updated products data back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Now store cart data in localStorage for checkout
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Redirect to the checkout page
    window.location.href = 'checkout.html';
}

// Handle Checkout on checkout page
function processCheckout(event) {
    event.preventDefault();

    // Collect user data
    const fullname = document.getElementById('fullname').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    const paymentDetails = {
        fullname,
        address,
        phone,
        email,
        paymentMethod,
    };

    // Collect payment-specific data
    if (paymentMethod === 'Credit Card') {
        paymentDetails.cardNumber = document.getElementById('card-number').value;
        paymentDetails.expiryDate = document.getElementById('expiry-date').value;
        paymentDetails.cvv = document.getElementById('cvv').value;
    } else if (paymentMethod === 'PayPal') {
        paymentDetails.paypalEmail = document.getElementById('paypal-email').value;
    }

    // Collect item details from cart
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsDetails = cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
    }));

    // Combine user info with item details
    const checkoutDetails = {
        user: paymentDetails,
        items: itemsDetails,
    };

    // Convert the details to JSON format
    const jsonData = JSON.stringify(checkoutDetails, null, 2);

    // Create a downloadable JSON file
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'checkout-details.json';
    link.click();

    // Clear cart after checkout (optional)
    localStorage.removeItem('cart');

    alert('Checkout completed! Redirecting to home page...');
    window.location.href = 'home.html';
}

// Handle signup with Google
function signupWithGoogle() {
    console.log('Signing up with Google');
    // Add Google signup logic here
}

// Handle signup with Facebook
function signupWithFacebook() {
    console.log('Signing up with Facebook');
    // Add Facebook signup logic here
}

// Show the Signup form by default when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginFormContainer').classList.add('active');
    document.getElementById('signupFormContainer').classList.remove('active');
});

// Switch to Signup form when "Sign Up" button is clicked
document.getElementById('showSignup').addEventListener('click', function () {
    document.getElementById('loginFormContainer').classList.remove('active');
    document.getElementById('signupFormContainer').classList.add('active');
    setActiveButton(this);
});

// Switch to Login form when "Login" button is clicked
document.getElementById('showLogin').addEventListener('click', function () {
    document.getElementById('signupFormContainer').classList.remove('active');
    document.getElementById('loginFormContainer').classList.add('active');
    setActiveButton(this);
});

// Set the active button (Login or Signup)
function setActiveButton(button) {
    const buttons = document.querySelectorAll('.toggle-container button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

// Go to Signup form when "Don't have an account? Sign Up" link is clicked on the Login form
document.getElementById('goToSignup').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginFormContainer').classList.remove('active');
    document.getElementById('signupFormContainer').classList.add('active');
    document.getElementById('showSignup').classList.add('selected');
    document.getElementById('showLogin').classList.remove('selected');
});

// Go to Login form when "Already have an account? Login" link is clicked on the Signup form
document.getElementById('goToLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signupFormContainer').classList.remove('active');
    document.getElementById('loginFormContainer').classList.add('active');
    document.getElementById('showLogin').classList.add('selected');
    document.getElementById('showSignup').classList.remove('selected');
});

// Handle Login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (email && password) {
        // Redirect to home.html if credentials are correct
        window.location.href = 'home.html';
    } else {
        alert('Please fill in all fields.');
    }
}

// Handle login with Google
function loginWithGoogle() {
    console.log('Logging in with Google');
    // Add Google login logic here
}

// Handle login with Facebook
function loginWithFacebook() {
    console.log('Logging in with Facebook');
    // Add Facebook login logic here
}

// Handle Signup
function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (name && email && phone && password && confirmPassword) {
        if (password === confirmPassword) {
            // Handle signup logic here
            console.log('Signing up:', name, email, phone, password);
            window.location.href = 'home.html'; // Redirect to home after successful signup
        } else {
            alert('Passwords do not match.');
        }
    } else {
        alert('Please fill in all fields.');
    }
}
