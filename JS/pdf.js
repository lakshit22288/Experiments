function generatePDF(sale) {
    let text =
`INVENTORY PRO - SALE INVOICE

Invoice ID: ${sale.invoiceId}
Date: ${sale.date}

Product: ${sale.name}
Quantity: ${sale.qty}
Total Amount: ₹${sale.total}

Thank you for your purchase!`;

    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = sale.invoiceId + ".txt";
    link.click();
}
