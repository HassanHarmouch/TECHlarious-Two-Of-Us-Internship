document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showSignup').classList.add('selected');
    document.getElementById('signupFormContainer').style.display = 'block';
    document.getElementById('loginFormContainer').style.display = 'none';
});

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('signupFormContainer').style.display = 'block';
    document.getElementById('loginFormContainer').style.display = 'none';
    setActiveButton(this);
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signupFormContainer').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    setActiveButton(this);
});

function setActiveButton(button) {
    const buttons = document.querySelectorAll('.toggle-container button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validation for all fields
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('All fields are required');
        return;
    }

    // Email format validation
    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    // Phone format validation
    const phonePattern = /^[0-9]{2}\/[0-9]{6}$/;
    if (!phonePattern.test(phone)) {
        alert('Phone format should be XX/XXXXXX');
        return;
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const signupData = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    saveData(signupData);
    alert('Signup successful');
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function saveData(data) {
    let users = [];
    const existingData = localStorage.getItem('signupData');
    if (existingData) {
        users = JSON.parse(existingData);
    }
    users.push(data);
    localStorage.setItem('signupData', JSON.stringify(users));

    downloadDataAsJSON(users);
}

function downloadDataAsJSON(data) {
    const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON format
    const blob = new Blob([jsonData], { type: 'application/json' }); // Create a blob
    const url = URL.createObjectURL(blob); // Create a download URL
    const a = document.createElement('a'); // Create a temporary anchor element
    a.href = url; // Set the URL for download
    a.download = 'signupData.json'; // Specify the filename
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Programmatically click the anchor to trigger download
    document.body.removeChild(a); // Remove the anchor after the download
}

function clearData() {
    localStorage.removeItem('signupData');
    alert('All data cleared');
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Admin check
    if (email === 'admin@gmail.com' && password === 'admin') {
        window.location.href = 'adminindex.html';
        return;
    }

    // Validation for login fields
    if (!email || !password) {
        alert('Both email and password are required');
        return;
    }

    const existingData = localStorage.getItem('signupData');
    if (existingData) {
        const users = JSON.parse(existingData);
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password');
        }
    } else {
        alert('No registered users found');
    }
}

function signupWithGoogle() {
    // Google signup logic here
}

function signupWithFacebook() {
    // Facebook signup logic here
}

function loginWithGoogle() {
    // Google login logic here
}

// Add event listener to clear data
document.getElementById('clearData').addEventListener('click', clearData);
