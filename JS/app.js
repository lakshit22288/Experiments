// ------------------------------------------------------
// InventoryPro — DASHBOARD MAIN LOGIC
// Author: GPT (for Luv)
// ------------------------------------------------------

// Load dashboard stats
function loadDashboard() {
    // Load stock list
    let items = JSON.parse(localStorage.getItem("inventory_stock")) || [];

    // Load sales
    let sales = JSON.parse(localStorage.getItem("inventory_sales")) || [];

    // ---------- TOTAL ITEMS ----------
    document.getElementById("totalItems").innerText = items.length;

    // ---------- TOTAL STOCK QUANTITIES ----------
    let totalQty = 0;
    items.forEach(i => totalQty += Number(i.quantity));
    document.getElementById("totalStock").innerText = totalQty;

    // ---------- TOTAL SALES ----------
    document.getElementById("totalSales").innerText = sales.length;

    // ---------- TODAY'S REVENUE ----------
    const today = new Date().toLocaleDateString();
    let revenue = 0;

    sales.forEach(s => {
        if (s.date === today) revenue += Number(s.total);
    });

    document.getElementById("todayRevenue").innerText = "₹" + revenue;

    // ---------- SEND DATA TO CHARTS ----------
    generateCharts(items, sales);
}

// Display date in navbar
document.getElementById("date").innerText = new Date().toDateString();
