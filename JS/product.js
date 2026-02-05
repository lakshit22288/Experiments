// ------------------------------------------------------
// InventoryPro — PRODUCT (Stock CRUD)
// Author: GPT (for Luv)
// ------------------------------------------------------

function loadItems() {
    const items = JSON.parse(localStorage.getItem("inventory_stock")) || [];
    const table = document.getElementById("stockTable");
    table.innerHTML = "";

    items.forEach((item, index) => {
        let row = `
            <tr onclick="selectItem(${index})">
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>${item.category}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// SELECT ITEM — fills the form for editing
function selectItem(index) {
    const items = JSON.parse(localStorage.getItem("inventory_stock")) || [];
    const item = items[index];

    document.getElementById("editId").value = index;
    document.getElementById("name").value = item.name;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("price").value = item.price;
    document.getElementById("supplier").value = item.supplier;
    document.getElementById("category").value = item.category;

    document.getElementById("deleteBtn").style.display = "block";
}

// SAVE ITEM (Add + Update)
function saveItem() {
    let name = document.getElementById("name").value.trim();
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let supplier = document.getElementById("supplier").value.trim();
    let category = document.getElementById("category").value.trim();
    let editId = document.getElementById("editId").value;

    if (!name || !quantity || !price) {
        alert("Please fill required fields!");
        return;
    }

    let items = JSON.parse(localStorage.getItem("inventory_stock")) || [];

    const newItem = {
        name, quantity, price, supplier, category
    };

    if (editId !== "") {
        // UPDATE
        items[editId] = newItem;
        addLog(`Updated item: ${name}`);
    } else {
        // ADD
        items.push(newItem);
        addLog(`Added new item: ${name}`);
    }

    localStorage.setItem("inventory_stock", JSON.stringify(items));

    // Reset form
    document.getElementById("editId").value = "";
    document.getElementById("deleteBtn").style.display = "none";
    document.querySelector("form")?.reset;

    loadItems();
    alert("Item saved!");
}

// DELETE ITEM
function deleteItem() {
    let editId = document.getElementById("editId").value;

    if (editId === "") {
        alert("Select an item first!");
        return;
    }

    let items = JSON.parse(localStorage.getItem("inventory_stock")) || [];
    addLog(`Deleted item: ${items[editId].name}`);

    items.splice(editId, 1);
    localStorage.setItem("inventory_stock", JSON.stringify(items));

    document.getElementById("editId").value = "";
    document.getElementById("deleteBtn").style.display = "none";
    loadItems();
    alert("Item deleted!");
}

// LOG SYSTEM — (stored for reports.html)
function addLog(message) {
    let logs = JSON.parse(localStorage.getItem("inventory_logs")) || [];

    logs.push({
        message,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("inventory_logs", JSON.stringify(logs));
}
