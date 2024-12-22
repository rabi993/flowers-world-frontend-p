

// // Fetch and display user data in a card
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const apiUrl = `http://127.0.0.1:8000/users/${userId}`; // Correctly interpolate the userId into the URL
    const cardContainer = document.getElementById("user-card-container");

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((user) => {
        // Create the card element
        const card = document.createElement("div");
        card.className = "card p-3 shadow-lg";
        card.style.width = "20rem";

        // Populate the card with user details
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-center">User Details</h5>
            <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
            <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>Is Superuser:</strong> ${user.is_superuser ? "Yes" : "No"}</p>
          </div>
        `;

        // Append the card to the container
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Failed to load user details.";
        cardContainer.appendChild(errorMessage);
      });
});

// Fetch and display user and buyer data in a card
// document.addEventListener("DOMContentLoaded", function () {
//     const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
//     const buyerId = localStorage.getItem('buyer_id'); // Get the buyer ID from local storage
//     const userApiUrl = `http://127.0.0.1:8000/users/${userId}`; // User API URL
//     const buyerApiUrl = `http://127.0.0.1:8000/buyers/list/${buyerId}`; // Buyer API URL
//     const cardContainer = document.getElementById("user-card-container");

//     // Fetch user and buyer data in parallel
//     Promise.all([fetch(userApiUrl), fetch(buyerApiUrl)])
//       .then(async ([userResponse, buyerResponse]) => {
//         if (!userResponse.ok || !buyerResponse.ok) {
//           throw new Error("Error fetching data");
//         }
//         const user = await userResponse.json();
//         const buyer = await buyerResponse.json();

//         // Create the card element
//         const card = document.createElement("div");
//         card.className = "card p-3 shadow-lg";
//         card.style.width = "25rem";

//         // Populate the card with user and buyer details
//         card.innerHTML = `
//           <div class="card-body">
//             <h5 class="card-title text-center">${user.first_name || "N/A"} ${user.last_name || "N/A"}'s Profile</h5>
//             <div class="card-text w-25 m-auto">
//             ${
//               buyer.image
//                 ? `<img src="${buyer.image}" alt="Buyer Image" class="img-fluid rounded mt-2" style="max-height: 200px;">`
//                 : "<p class='text-muted'>No image available</p>"
//             }
//             </div>
//             <h6 class="mt-3">User Details:</h6>
//             <p class="card-text"><strong>ID:</strong> ${user.id}</p>
//             <p class="card-text"><strong>Username:</strong> ${user.username}</p>
//             <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
//             <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
//             <p class="card-text"><strong>Email:</strong> ${user.email}</p>
//             <p class="card-text"><strong>User's Roll:</strong> ${user.is_superuser ? "Admin/Superuser" : "Buyer"}</p>
            
//             <h6 class="mt-3">Buyer Details:</h6>
//             <p class="card-text"><strong>Buyer ID:</strong> ${buyer.id}</p>
//             <p class="card-text"><strong>Mobile No:</strong> ${buyer.mobile_no || "N/A"}</p>
//             <p class="card-text"><strong>Address:</strong> ${buyer.address || "N/A"}</p>
            
//         `;

//         // Append the card to the container
//         cardContainer.appendChild(card);
//       })
//       .catch((error) => {
//         console.error("Error fetching user or buyer data:", error);
//         const errorMessage = document.createElement("p");
//         errorMessage.textContent = "Failed to load user or buyer details.";
//         cardContainer.appendChild(errorMessage);
//       });
// });
