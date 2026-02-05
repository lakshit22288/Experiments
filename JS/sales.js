// ------------------------------------------------------
// InventoryPro — SALES SYSTEM
// Author: GPT (for Luv)
// ------------------------------------------------------

let stockItems = [];
let salesList = [];

// Load data into page
function loadSalesPage() {
    stockItems = JSON.parse(localStorage.getItem("inventory_stock")) || [];
    salesList = JSON.parse(localStorage.getItem("inventory_sales")) || [];

    loadDropdown();
    loadSalesTable();
}

// Load product dropdown
function loadDropdown() {
    const select = document.getElementById("saleItem");
    select.innerHTML = `<option value="">Select Item</option>`;

    stockItems.forEach((item, i) => {
        select.innerHTML += `<option value="${i}">${item.name}</option>`;
    });
}

// When user selects product
function selectSaleItem() {
    let id = document.getElementById("saleItem").value;

    if (id === "") return;

    document.getElementById("salePrice").value = stockItems[id].price;
    updateTotal();
}

// Total calculation
function updateTotal() {
    let qty = Number(document.getElementById("saleQty").value);
    let price = Number(document.getElementById("salePrice").value);

    if (!qty || !price) {
        document.getElementById("saleTotal").value = "";
        return;
    }

    document.getElementById("saleTotal").value = qty * price;
}

// ADD SALE
function addSale() {
    let id = document.getElementById("saleItem").value;
    let qty = Number(document.getElementById("saleQty").value);
    let price = Number(document.getElementById("salePrice").value);
    let total = qty * price;

    if (id === "" || qty <= 0) {
        alert("Please fill all fields");
        return;
    }

    // Check stock availability
    if (qty > Number(stockItems[id].quantity)) {
        alert("Not enough stock!");
        return;
    }

    // Reduce stock
    stockItems[id].quantity -= qty;
    localStorage.setItem("inventory_stock", JSON.stringify(stockItems));

    // Save sale
    let sale = {
        item: stockItems[id].name,
        qty,
        total,
        date: new Date().toLocaleDateString()
    };

    salesList.push(sale);
    localStorage.setItem("inventory_sales", JSON.stringify(salesList));

    // Add log
    addLog(`Sold ${qty} of ${stockItems[id].name}`);

    loadSalesPage();
    alert("Sale added!");
}

// DISPLAY SALES TABLE
function loadSalesTable() {
    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    salesList.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.item}</td>
                <td>${s.qty}</td>
                <td>₹${s.total}</td>
                <td>${s.date}</td>
            </tr>
        `;
    });
}

// CLEAR SALES HISTORY
function clearSales() {
    if (!confirm("Clear entire sales history?")) return;

    salesList = [];
    localStorage.setItem("inventory_sales", JSON.stringify(salesList));
    addLog("Cleared all sales history");

    loadSalesTable();
    alert("Sales history cleared.");
}
