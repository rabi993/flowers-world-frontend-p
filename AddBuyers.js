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
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editBuyer(${buyer.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteBuyer(${buyer.id})">Delete</button>
                    </td>
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
// const handleAddBuyer = (event) => {
//     event.preventDefault();

//     const username = document.getElementById("username").value.trim();
//     const mobileNo = document.getElementById("mobileNo").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const image = document.getElementById("image").files[0];

//     if (!username || !mobileNo || !address) {
//         alert("All fields are required.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("user", username);  // Assume username exists and is used as reference for the User model
//     formData.append("mobile_no", mobileNo);
//     formData.append("address", address);
//     if (image) formData.append("image", image);

//     fetch("http://127.0.0.1:8000/buyers/list/", {
//         method: "POST",
//         body: formData,
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         alert("Buyer added successfully!");
//         document.getElementById("buyer-form").reset();
//         fetchBuyers(); // Refresh the buyers list
//     })
//     .catch((error) => {
//         console.error("Error adding buyer:", error);
//         alert(`Error: ${error.message}`);
//     });
// };
// Handle form submission to add or update a buyer
const handleAddOrUpdateBuyer = (event) => {
    event.preventDefault();
  
    const buyerId = document.getElementById("buyerId").value;
    const username = document.getElementById("username").value.trim();
    const mobileNo = document.getElementById("mobileNo").value.trim();
    const address = document.getElementById("address").value.trim();
    const image = document.getElementById("image").files[0];
  
    if (!username || !mobileNo || !address) {
      alert("All fields are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("user", username);
    formData.append("mobile_no", mobileNo);
    formData.append("address", address);
    if (image) formData.append("image", image);
  
    const method = buyerId ? "PUT" : "POST";
    const url = buyerId
      ? `http://127.0.0.1:8000/buyers/list/${buyerId}/`
      : "http://127.0.0.1:8000/buyers/list/";
  
    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(buyerId ? "Buyer updated successfully!" : "Buyer added successfully!");
        document.getElementById("buyer-form").reset();
        fetchBuyers(); // Refresh the buyers list
      })
      .catch((error) => {
        console.error("Error adding/updating buyer:", error);
        alert(`Error: ${error.message}`);
      });
  };
  


// Initialize: Fetch buyers
fetchBuyers();


// Edit buyer details
const editBuyer = (buyerId) => {
    // Fetch the specific buyer details
    fetch(`http://127.0.0.1:8000/buyers/list/${buyerId}/`)
      .then((response) => response.json())
      .then((buyer) => {
        document.getElementById("buyerId").value = buyer.id;
        document.getElementById("username").value = buyer.user;
        document.getElementById("mobileNo").value = buyer.mobile_no;
        document.getElementById("address").value = buyer.address;
        if (buyer.image) {
          document.getElementById("imagePreview").src = buyer.image;
        }
      })
      .catch((error) => {
        console.error("Error fetching buyer details:", error);
        alert("Failed to load buyer details.");
      });
  };
  
// Delete a buyer
const deleteBuyer = (buyerId) => {
    if (!confirm("Are you sure you want to delete this buyer?")) return;
  
    fetch(`http://127.0.0.1:8000/buyers/list/${buyerId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete buyer.");
        }
        alert("Buyer deleted successfully!");
        fetchBuyers(); // Refresh the buyers list
      })
      .catch((error) => {
        console.error("Error deleting buyer:", error);
        alert("Failed to delete buyer.");
      });
  };
  