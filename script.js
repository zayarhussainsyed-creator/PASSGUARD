const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthMessage = document.getElementById('strengthMessage');
const matchMessage = document.getElementById('matchMessage');
const form = document.getElementById('signupForm');

// Check password strength while typing
passwordInput.addEventListener('input', checkStrength);

function checkStrength() {
    const password = passwordInput.value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length === 0) {
        strengthMessage.textContent = '';
        strengthMessage.className = 'message';
    } else if (score <= 2) {
        strengthMessage.textContent =
            'Weak password! Please select something stronger.';
        strengthMessage.className = 'message weak';
    } else if (score <= 4) {
        strengthMessage.textContent =
            'Medium password. Add more security.';
        strengthMessage.className = 'message medium';
    } else {
        strengthMessage.textContent =
            'Strong password! Excellent choice.';
        strengthMessage.className = 'message strong';
    }

    checkMatch();
}

// Check whether passwords match
confirmPasswordInput.addEventListener('input', checkMatch);

function checkMatch() {
    if (confirmPasswordInput.value === '') {
        matchMessage.textContent = '';
        matchMessage.className = 'message';
        return;
    }

    if (passwordInput.value === confirmPasswordInput.value) {
        matchMessage.textContent = 'Passwords match.';
        matchMessage.className = 'message strong';
    } else {
        matchMessage.textContent = 'Passwords do not match.';
        matchMessage.className = 'message weak';
    }
}

// Generate a strong password
function generatePassword() {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!';

    let password = '';

    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordInput.value = password;
    confirmPasswordInput.value = '';
    checkStrength();
    matchMessage.textContent = '';
}

// Form submission validation
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = passwordInput.value;

    // Require either email or phone
    if (email === '' && phone === '') {
        alert('Please enter either Email or Phone Number.');
        return;
    }

    // Passwords must match
    if (password !== confirmPasswordInput.value) {
        alert('Passwords do not match.');
        return;
    }

    // Password should not contain username
    if (password.toLowerCase().includes(username.toLowerCase())) {
        alert('Password should not contain the username.');
        return;
    }

    // Final strong password validation
    const strong =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);

    if (!strong) {
        alert('Please choose a stronger password.');
        return;
    }

    // Save data in localStorage (demo database)
    const userData = {
        username,
        email,
        phone,
        password
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    form.reset();

    strengthMessage.textContent = '';
    matchMessage.textContent = '';
});
