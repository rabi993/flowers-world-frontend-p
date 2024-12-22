// Fetch and display user and buyer data in a card
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const userApiUrl = `http://127.0.0.1:8000/users/${userId}`; // User API URL
    const cardContainer = document.getElementById("user-card-container2");

    // Fetch user and buyer data in parallel
    Promise.all([fetch(userApiUrl),])
      .then(async ([userResponse,]) => {
        if (!userResponse.ok ) {
          throw new Error("Error fetching data");
        }
        const user = await userResponse.json();

        // Create the card element
        const card = document.createElement("div");
        card.className = "card p-3 shadow-lg";
        card.style.width = "25rem";

        // Populate the card with user and buyer details
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-center">${user.first_name || "N/A"} ${user.last_name || "N/A"}'s Profile</h5>
            <div class="card-text w-25 m-auto">
            
              <img src="./Images/man.jpg" alt="Admin Image" class="img-fluid rounded mt-2" style="max-height: 200px;">
                
            
            </div>
            <h6 class="mt-3">Admin Details:</h6>
            <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
            <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>User's Roll:</strong> ${user.is_superuser ? "Admin/Superuser" : "Buyer"}</p>
            
            
            
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



document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user_id");
  
    const userApiUrl = `http://127.0.0.1:8000/users/${userId}/`;
  
    const updateForm = document.getElementById("update-profile-form1");
  
    // Fetch and populate data
    Promise.all([
      fetch(userApiUrl).then((response) => response.json()),
    ])
      .then(([userData, ]) => {
        // Populate readonly fields
        document.getElementById("id").value = userData.id;
        document.getElementById("username").value = userData.username;
        document.getElementById("email").value = userData.email;
  
        // Populate editable fields
        document.getElementById("first_name").value = userData.first_name || "";
        document.getElementById("last_name").value = userData.last_name || "";
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
  
      
  
      // Send PATCH requests
      Promise.all([
        fetch(userApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
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
  