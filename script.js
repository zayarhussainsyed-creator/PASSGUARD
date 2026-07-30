const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthMessage = document.getElementById('strengthMessage');
const matchMessage = document.getElementById('matchMessage');
const form = document.getElementById('signupForm');
const toggleBtn = document.getElementById('toggleBtn');

// Show / Hide passwords
function togglePasswords() {
    const show = passwordInput.type === 'password';

    passwordInput.type = show ? 'text' : 'password';
    confirmPasswordInput.type = show ? 'text' : 'password';

    toggleBtn.textContent = show ? 'Hide' : 'Show';
}

// Password strength checker
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
        strengthMessage.textContent = 'Weak password! Please select something stronger.';
        strengthMessage.className = 'message weak';
    } else if (score <= 4) {
        strengthMessage.textContent = 'Medium password. Add more security.';
        strengthMessage.className = 'message medium';
    } else {
        strengthMessage.textContent = 'Strong password! Excellent choice.';
        strengthMessage.className = 'message strong';
    }

    checkMatch();
}

// Confirm password checker
confirmPasswordInput.addEventListener('input', checkMatch);

function checkMatch() {
    if (confirmPasswordInput.value === '') {
        matchMessage.textContent = '';
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

// Form validation
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = passwordInput.value;

    if (email === '' && phone === '') {
        alert('Please enter either Email or Phone Number.');
        return;
    }

    if (password !== confirmPasswordInput.value) {
        alert('Passwords do not match.');
        return;
    }

    if (password.toLowerCase().includes(username.toLowerCase())) {
        alert('Password should not contain the username.');
        return;
    }

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

    alert('Strong password accepted!');
    form.reset();

    strengthMessage.textContent = '';
    matchMessage.textContent = '';

    toggleBtn.textContent = 'Show';
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
});
