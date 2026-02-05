// ------------------------------------------------------
// InventoryPro — LOGS / REPORTS SYSTEM
// Author: GPT (for Luv)
// ------------------------------------------------------

let logs = [];

// Load logs on page load
function loadLogs() {
    logs = JSON.parse(localStorage.getItem("inventory_logs")) || [];
    displayTimeline(logs);
    displayTable(logs);
}

// Display logs in TIMELINE
function displayTimeline(data) {
    const box = document.getElementById("timelineLogs");
    box.innerHTML = "";

    data.reverse().forEach(log => {
        box.innerHTML += `
            <div class="log-item">
                <div style="color:white; font-size:15px;">${log.message}</div>
                <div class="log-time">${log.time}</div>
            </div>
        `;
    });
}

// Display logs in TABLE
function displayTable(data) {
    const table = document.getElementById("tableLogs");
    table.innerHTML = "";

    data.forEach(log => {
        table.innerHTML += `
            <tr>
                <td>${log.message}</td>
                <td>${log.time}</td>
            </tr>
        `;
    });
}

// FILTER LOGS
function filterLogs() {
    let keyword = document.getElementById("logSearch").value.toLowerCase();
    let date = document.getElementById("logDate").value;

    let filtered = logs.filter(log =>
        log.message.toLowerCase().includes(keyword) &&
        (date === "" || log.time.startsWith(date))
    );

    displayTimeline(filtered);
    displayTable(filtered);
}

// CLEAR LOGS
function clearLogs() {
    if (!confirm("Clear all activity logs?")) return;

    logs = [];
    localStorage.setItem("inventory_logs", JSON.stringify(logs));

    loadLogs();
    alert("All logs cleared.");
}
