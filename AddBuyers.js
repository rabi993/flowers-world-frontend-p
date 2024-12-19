// Fetch and display buyers
const fetchBuyers = () => {
    fetch("http://127.0.0.1:8000/buyers/list/")
        .then((response) => response.json())
        .then((buyers) => {
            const buyersList = document.getElementById("buyers-list");
            buyersList.innerHTML = ""; // Clear existing rows
            buyers.forEach((buyer) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${buyer.id}</td>
                    <td>${buyer.user}</td>
                    <td><img src="${buyer.image ? buyer.image : 'https://via.placeholder.com/100'}" alt="Image" style="width: 100px; height: 100px;"></td>
                    <td>${buyer.mobile_no || 'N/A'}</td>
                    <td>${buyer.address}</td>
                `;
                buyersList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching buyers:", error);
            alert("Failed to load buyers.");
        });
};

// Handle form submission to add a new buyer
const handleAddBuyer = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const mobileNo = document.getElementById("mobileNo").value.trim();
    const address = document.getElementById("address").value.trim();
    const image = document.getElementById("image").files[0];

    if (!username || !mobileNo || !address) {
        alert("All fields are required.");
        return;
    }

    const formData = new FormData();
    formData.append("user", username);  // Assume username exists and is used as reference for the User model
    formData.append("mobile_no", mobileNo);
    formData.append("address", address);
    if (image) formData.append("image", image);

    fetch("http://127.0.0.1:8000/buyers/list/", {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Buyer added successfully!");
        document.getElementById("buyer-form").reset();
        fetchBuyers(); // Refresh the buyers list
    })
    .catch((error) => {
        console.error("Error adding buyer:", error);
        alert(`Error: ${error.message}`);
    });
};

// Initialize: Fetch buyers
fetchBuyers();
