// ------------------------------------------------------
// InventoryPro — UTILITY FUNCTIONS
// Author: GPT (for Luv)
// ------------------------------------------------------

// Redirect to login if user is not authenticated
function authGuard() {
    if (localStorage.getItem("logged_in") !== "true") {
        window.location.href = "login.html";
    }
}

// Add a log entry
function addLog(message) {
    let logs = JSON.parse(localStorage.getItem("inventory_logs")) || [];

    logs.push({
        message,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("inventory_logs", JSON.stringify(logs));
}

// Safe JSON parse
function safeJSON(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

// Generate random ID (if required later)
function randomId() {
    return Math.random().toString(36).substring(2, 10);
}
