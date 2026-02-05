// ------------------------------------------------------
// InventoryPro — CHARTS (Donut + Line)
// Author: GPT (for Luv)
// ------------------------------------------------------

// Load Chart.js from CDN (auto inject)
(function loadChartScript() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.head.appendChild(script);
})();

// Main function called from app.js
function generateCharts(items, sales) {
    setTimeout(() => {   // wait for CDN load
        drawRevenueLineChart(sales);
        drawStockDonutChart(items);
    }, 300);
}

// ----------------------
// 1) REVENUE LINE CHART
// ----------------------
function drawRevenueLineChart(sales) {
    const ctx = document.getElementById("revenueChart");

    // Prepare revenue per day
    let revenueMap = {};

    sales.forEach(s => {
        if (!revenueMap[s.date]) revenueMap[s.date] = 0;
        revenueMap[s.date] += Number(s.total);
    });

    const labels = Object.keys(revenueMap);
    const values = Object.values(revenueMap);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Revenue (₹)",
                data: values,
                borderWidth: 3,
                tension: 0.4
            }]
        }
    });
}

// ----------------------
// 2) STOCK DONUT CHART
// ----------------------
function drawStockDonutChart(items) {
    const ctx = document.getElementById("stockChart");

    let labels = items.map(i => i.name);
    let values = items.map(i => Number(i.quantity));

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                borderWidth: 2
            }]
        }
    });
}
