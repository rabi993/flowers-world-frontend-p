// Fetch and display user and buyer data in a card
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const buyerId = localStorage.getItem('buyer_id'); // Get the buyer ID from local storage
    const userApiUrl = `http://127.0.0.1:8000/users/${userId}`; // User API URL
    const buyerApiUrl = `http://127.0.0.1:8000/buyers/list/${buyerId}`; // Buyer API URL
    const cardContainer = document.getElementById("user-card-container1");

    // Fetch user and buyer data in parallel
    Promise.all([fetch(userApiUrl), fetch(buyerApiUrl)])
      .then(async ([userResponse, buyerResponse]) => {
        if (!userResponse.ok || !buyerResponse.ok) {
          throw new Error("Error fetching data");
        }
        const user = await userResponse.json();
        const buyer = await buyerResponse.json();

        // Create the card element
        const card = document.createElement("div");
        card.className = "card p-3 shadow-lg";
        card.style.width = "25rem";

        // Populate the card with user and buyer details
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-center">${user.first_name || "N/A"} ${user.last_name || "N/A"}'s Profile</h5>
            <div class="card-text w-25 m-auto">
            ${
              buyer.image
                ? `<img src="${buyer.image}" alt="Buyer Image" class="img-fluid rounded mt-2" style="max-height: 200px;">`
                : "<p class='text-muted'>No image available</p>"
            }
            </div>
            <h6 class="mt-3">User Details:</h6>
            <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
            <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>User's Roll:</strong> ${user.is_superuser ? "Admin/Superuser" : "Buyer"}</p>
            
            <h6 class="mt-3">Buyer Details:</h6>
            <p class="card-text"><strong>Buyer ID:</strong> ${buyer.id}</p>
            <p class="card-text"><strong>Mobile No:</strong> ${buyer.mobile_no || "N/A"}</p>
            <p class="card-text"><strong>Address:</strong> ${buyer.address || "N/A"}</p>
            
        `;

        // Append the card to the container
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error fetching user or buyer data:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Failed to load user or buyer details.";
        cardContainer.appendChild(errorMessage);
      });
});

// document.addEventListener("DOMContentLoaded", function () {
//     const updateForm = document.getElementById("update-profile-form");
//     const userId = localStorage.getItem("user_id"); // Retrieve user ID from local storage
//     const buyerId = localStorage.getItem("buyer_id"); // Retrieve buyer ID from local storage
//     const apiUrl = `http://127.0.0.1:8000/buyers/update/${buyerId}`; // Update endpoint URL
  
//     // Fetch existing data and prefill the form
//     fetch(`http://127.0.0.1:8000/buyers/list/${buyerId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         document.getElementById("first_name").value = data.user.first_name || "";
//         document.getElementById("last_name").value = data.user.last_name || "";
//         document.getElementById("mobile_no").value = data.mobile_no || "";
//         document.getElementById("address").value = data.address || "";
//       })
//       .catch((error) => console.error("Error fetching profile data:", error));
  
//     // Handle form submission
//     updateForm.addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent the default form submission
  
//       const formData = new FormData(updateForm);
  
//       // Send PUT request to update the profile
//       fetch(apiUrl, {
//         method: "PUT",
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Profile updated successfully:", data);
//           document.getElementById("success-message").classList.remove("d-none");
//           document.getElementById("error-message").classList.add("d-none");
//         })
//         .catch((error) => {
//           console.error("Error updating profile:", error);
//           document.getElementById("success-message").classList.add("d-none");
//           document.getElementById("error-message").classList.remove("d-none");
//         });
//     });
//   });
  

document.addEventListener("DOMContentLoaded", function () {
    const buyerId = localStorage.getItem("buyer_id");
    const userId = localStorage.getItem("user_id");
  
    const buyerApiUrl = `http://127.0.0.1:8000/buyers/list/${buyerId}/`;
    const userApiUrl = `http://127.0.0.1:8000/users/${userId}/`;
  
    const updateForm = document.getElementById("update-profile-form");
  
    // Fetch and populate data
    Promise.all([
      fetch(userApiUrl).then((response) => response.json()),
      fetch(buyerApiUrl).then((response) => response.json()),
    ])
      .then(([userData, buyerData]) => {
        // Populate readonly fields
        document.getElementById("id").value = userData.id;
        document.getElementById("username").value = userData.username;
        document.getElementById("email").value = userData.email;
  
        // Populate editable fields
        document.getElementById("first_name").value = userData.first_name || "";
        document.getElementById("last_name").value = userData.last_name || "";
        document.getElementById("mobile_no").value = buyerData.mobile_no || "";
        document.getElementById("address").value = buyerData.address || "";
  
        // Profile image preview
        const imagePreview = document.getElementById("profile-image-preview");
      imagePreview.src = buyerData.image || "https://via.placeholder.com/150";
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  
    // Handle form submission
    updateForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = new FormData(updateForm);
  
      // Update user data
      const userData = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
      };
  
      // Update buyer data
      const buyerData = new FormData();
      buyerData.append("mobile_no", formData.get("mobile_no"));
      buyerData.append("address", formData.get("address"));
      if (formData.get("image").size > 0) {
        buyerData.append("image", formData.get("image"));
      }
  
      // Send PATCH requests
      Promise.all([
        fetch(userApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }),
        fetch(buyerApiUrl, {
          method: "PATCH",
          body: buyerData,
        }),
      ])
        .then((responses) => {
          if (responses.some((response) => !response.ok)) {
            throw new Error("Error updating profile");
          }
          return Promise.all(responses.map((response) => response.json()));
        })
        .then(() => {
          document.getElementById("success-message").classList.remove("d-none");
          document.getElementById("error-message").classList.add("d-none");
          // Reload the page to reflect updated data
          setTimeout(() => location.reload(), 1500);
        })
        .catch((error) => {
          console.error(error);
          document.getElementById("success-message").classList.add("d-none");
          document.getElementById("error-message").classList.remove("d-none");
        });
    });
  });
  