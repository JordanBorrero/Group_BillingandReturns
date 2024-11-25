//JavaScript Contribution -- Jack DeLeo
$(document).ready(function () {
    $("#billingForm").submit(function (e) {
        e.preventDefault();

        const billingDetails = {
            name: $("#billingName").val().trim(),
            address: $("#billingAddress").val().trim(),
        };

        if (!billingDetails.name || !billingDetails.address) {
            alert("Please fill out all fields.");
            return;
        }

        const jsonDisplay = `
            <h4>Billing Details Submitted:</h4>
            <pre>${JSON.stringify(billingDetails, null, 2)}</pre>
        `;
        $("#billingDetailsPage").append(jsonDisplay);
    });

    const products = [
        { id: 1, name: "Laptop", category: "Electronics" },
        { id: 2, name: "Chair", category: "Furniture" },
        { id: 3, name: "Headphones", category: "Electronics" },
        { id: 4, name: "Table", category: "Furniture" },
        { id: 5, name: "Phone", category: "Electronics" },
    ];

    $("#returnsForm").submit(function (e) {
        e.preventDefault();

        const searchQuery = $("#productSearch").val().trim().toLowerCase();

        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery)
        );

        const productList = $("#productsList");
        productList.empty();

        if (filteredProducts.length > 0) {
            filteredProducts.forEach((product) => {
                const productItem = `
                    <div>
                        <strong>${product.name}</strong> - ${product.category}
                    </div>
                `;
                productList.append(productItem);
            });
        } else {
            productList.text("No products found.");
        }
    });
});
