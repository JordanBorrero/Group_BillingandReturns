//JavaScript Contribution -- Jack DeLeo
$(document).ready(function () {
    let cart = [];
    $('#productDetailsForm').on('submit', function (event) {
        event.preventDefault();
        const productData = {
            id: Date.now(),
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()).toFixed(2)
        };
        cart.push(productData);
        updateCartDisplay();
        $('#productDetailsForm')[0].reset();
    });

    function updateCartDisplay() {
        $('#cartItems').empty();

        cart.forEach(item => {
            $('#cartItems').append(`
                <li class="list-group-item">
                    <span><strong>${item.name}</strong>: ${item.description}</span>
                    <span>$${item.price}</span>
                </li>
            `);
        });

        $('#jsonDisplay').text(JSON.stringify(cart, null, 2));
    }
    $('#submitCart').on('click', function () {
        if (cart.length === 0) {
            alert("Cart is empty! Add products to submit.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://your-api-endpoint.com/submitCart",
            contentType: "application/json",
            data: JSON.stringify(cart),
            success: function (response) {
                alert("Cart submitted successfully!");
                cart = [];
                updateCartDisplay();
            },
            error: function (xhr, status, error) {
                alert("Failed to submit cart.");
                console.error(xhr, status, error);
            }
        });
    });
});

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
