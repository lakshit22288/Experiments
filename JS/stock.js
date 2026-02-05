// ------------------------------------------------------
// InventoryPro — STOCK LIST + LIVE SEARCH
// Author: GPT (for Luv)
// ------------------------------------------------------

let stockData = [];

// LOAD STOCK
function loadStock() {
    stockData = JSON.parse(localStorage.getItem("inventory_stock")) || [];
    displayStock(stockData);
}

// DISPLAY STOCK IN TABLE
function displayStock(data) {
    const list = document.getElementById("stockList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>${item.supplier}</td>
                <td>${item.category}</td>
            </tr>
        `;
    });
}

// FILTER SYSTEM
function filterStock() {
    let name = document.getElementById("searchName").value.toLowerCase();
    let category = document.getElementById("searchCategory").value.toLowerCase();
    let supplier = document.getElementById("searchSupplier").value.toLowerCase();

    let filtered = stockData.filter(item =>
        item.name.toLowerCase().includes(name) &&
        item.category.toLowerCase().includes(category) &&
        item.supplier.toLowerCase().includes(supplier)
    );

    displayStock(filtered);
}
