// Initialize user data if not present
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

let balance = 0;
let transactions = [];
let darkModeEnabled = false;

// Show Signup Page
function showSignup() {
    document.getElementById("signup-container").style.display = "flex";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
}

// Show Login Page
function showLogin() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
}

// Signup Function
function signup() {
    let name = document.getElementById("signup-name").value;
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (name === "" || username === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Username already exists! Choose another.");
        return;
    }

    users.push({ name, username, password, balance: 0, transactions: [] });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Redirecting to login...");
    showLogin();
}

// Login Function
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        document.getElementById("user-display").innerText = user.name;
        document.getElementById("dashboard").style.display = "flex";
        document.getElementById("login-container").style.display = "none";
        balance = user.balance;
        transactions = user.transactions || [];
        updateUI();
    } else {
        alert("Invalid credentials! Please try again.");
    }
}

// Deposit Money (Fixed)
function deposit() {
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }
    balance += amount;
    transactions.push(`Deposited INR ${amount}`);
    saveUserData();
    updateUI();
}

// Withdraw Money (Fixed)
function withdraw() {
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }
    if (balance >= amount) {
        balance -= amount;
        transactions.push(`Withdrew INR ${amount}`);
        saveUserData();
        updateUI();
    } else {
        alert("Insufficient balance!");
    }
}

// Send Money
function sendMoney() {
    let recipient = document.getElementById("recipient").value;
    let sendAmount = parseFloat(document.getElementById("send-amount").value);
    if (sendAmount > 0 && sendAmount <= balance) {
        balance -= sendAmount;
        transactions.push(`Sent INR ${sendAmount} to ${recipient}`);
        saveUserData();
        updateUI();
    } else {
        alert("Invalid transaction!");
    }
}

// View Account Statement
function viewStatement() {
    alert("Feature coming soon: View detailed statements!");
}

// Download Bank Statement (Mock)
function downloadStatement() {
    alert("Feature coming soon: Download statements as PDF!");
}

// Apply for Loan
function applyLoan() {
    let loanAmount = prompt("Enter Loan Amount (?):");
    loanAmount = parseFloat(loanAmount);
    if (!isNaN(loanAmount) && loanAmount > 0) {
        balance += loanAmount;
        transactions.push(`Loan Approved: INR ${loanAmount}`);
        saveUserData();
        updateUI();
        alert("Loan approved successfully!");
    } else {
        alert("Invalid loan amount!");
    }
}

// Credit Card Management
function manageCredit() {
    alert("Feature coming soon: Manage credit cards & payments!");
}

// Change PIN
function changePin() {
    let newPin = prompt("Enter New PIN:");
    if (newPin && newPin.length === 4) {
        alert("PIN changed successfully!");
    } else {
        alert("Invalid PIN! Must be 4 digits.");
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle("dark-mode", darkModeEnabled);
}

// Upload Profile Picture
function updateProfilePic() {
    let fileInput = document.getElementById("profile-pic");
    if (fileInput.files.length > 0) {
        alert("Profile picture uploaded successfully!");
    } else {
        alert("No file selected!");
    }
}

// Save User Data
function saveUserData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    users = users.map(user => {
        if (user.username === currentUser.username) {
            user.balance = balance;
            user.transactions = transactions;
        }
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    currentUser.balance = balance;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

// Update Dashboard UI
function updateUI() {
    document.getElementById("balance").innerText = balance;
    let transactionList = document.getElementById("transactions");
    transactionList.innerHTML = "";
    transactions.forEach(tx => {
        let li = document.createElement("li");
        li.textContent = tx;
        transactionList.appendChild(li);
    });
}

// Logout Function
function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("dashboard").style.display = "none";
    showLogin();
}


