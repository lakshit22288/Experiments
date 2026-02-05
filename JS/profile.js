// ------------------------------------------------------
// InventoryPro — PROFILE SETTINGS
// Author: GPT (for Luv)
// ------------------------------------------------------

// Load user info to fields
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("inventory_user")) || {
        username: "admin",
        password: "admin"
    };

    document.getElementById("p_username").value = user.username;
    document.getElementById("p_password").value = user.password;
}

// SAVE PROFILE CHANGES
function saveProfile() {
    let username = document.getElementById("p_username").value.trim();
    let password = document.getElementById("p_password").value.trim();

    if (!username || !password) {
        alert("Fields cannot be empty!");
        return;
    }

    localStorage.setItem("inventory_user", JSON.stringify({ username, password }));

    addLog("Updated profile settings");

    alert("Profile updated!");
}

// RESET ACCOUNT
function resetAccount() {
    if (!confirm("This will reset login, stock, sales & logs. Continue?")) return;

    localStorage.clear();

    addLog("Account reset to default");

    // restore default login
    localStorage.setItem("inventory_user", JSON.stringify({
        username: "admin",
        password: "admin"
    }));

    alert("Account reset completed. Please login again.");
    window.location.href = "login.html";
}
