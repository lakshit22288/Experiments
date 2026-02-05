// ------------------------------------------------------
// InventoryPro — LOGIN SYSTEM (localStorage only)
// Author: GPT (for Luv)
// ------------------------------------------------------

// Default credentials (can be changed)
const defaultUser = {
    username: "admin",
    password: "admin"
};

// Save default user on first load
if (!localStorage.getItem("inventory_user")) {
    localStorage.setItem("inventory_user", JSON.stringify(defaultUser));
}

// LOGIN FUNCTION
function loginUser() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("inventory_user"));

    if (user === savedUser.username && pass === savedUser.password) {
        localStorage.setItem("logged_in", "true");   // save login state
        alert("Login successful!");
        window.location.href = "index.html";         // go to dashboard
    } else {
        alert("Incorrect username or password!");
    }
}

// PROTECT PAGES (redirect if not logged in)
function authGuard() {
    if (localStorage.getItem("logged_in") !== "true") {
        window.location.href = "login.html";
    }
}

// LOGOUT FUNCTION
function logoutUser() {
    localStorage.removeItem("logged_in");
    window.location.href = "login.html";
}
