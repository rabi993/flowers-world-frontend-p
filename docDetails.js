const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("flowerId");
  
  fetch(`http://127.0.0.1:8000/flowers/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

  fetch(`http://127.0.0.1:8000/flowers/reviews/?flower_id=${param}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data));
};

const doctorReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-details-review");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
          <img src="./Images/girl.png" alt="" />
              <h4>${review.reviewer}</h4>
            <h5>${review.flower}</h5>
            <p>
             ${review.body.slice(0, 100)}
            </p>
            <h6>${review.rating}</h6>
          `;
    parent.appendChild(div);
  });
};

const displayDetails = (doctor) => {
  console.log(doctor);
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
    <div class="doctor-img">
    <img src=${doctor.image} alt="" />
  </div>
  <div class="doc-info">
    <h4>${doctor?.title}</h4>
              ${doctor?.category?.map((item) => {
                return `<button>${item}</button>`;
              })}
              <h6>Available : ${doctor?.available}</h6>
              <p>
              ${doctor?.content}
              </p>
              
              <h6>Price : ${doctor?.price}</h6>
              <p>
              ${doctor?.color?.map((item) => {
                return `<button>${item}</button>`;
              })}
              </p>
    <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    id="buyNowBtn" onclick="openOrderModal()"
  >
   Buy Now
  </button>
  </div>
    `;
  parent.appendChild(div);
};

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (!userId || !flowerId) {
    // alert("Missing user or flower information.");
    return;
  }

  // Fetch and fill the reviewer's name
  fetch(`http://127.0.0.1:8000/users/${userId}/`) // Replace with your actual user API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return response.json();
    })
    .then((userData) => {
      const reviewerNameInput = document.getElementById("reviewerName");
      reviewerNameInput.value = userData.first_name || "Guest";
    })
    .catch((error) => {
      console.error(error);
      // alert("Failed to retrieve user details.");
    });

  // Fetch and fill the flower's name
  fetch(`http://127.0.0.1:8000/flowers/${flowerId}/`) // Replace with your actual flower API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch flower details");
      }
      return response.json();
    })
    .then((flowerData) => {
      const flowerNameInput = document.getElementById("flowerName");
      flowerNameInput.value = flowerData.title || "Unknown Flower";
    })
    .catch((error) => {
      console.error(error);
      // alert("Failed to retrieve flower details.");
    });
});

const handleReviewSubmission = (event) => {
  event.preventDefault(); // Prevent form refresh

  const userId = localStorage.getItem("user_id");
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (!userId || !flowerId) {
    alert("Missing user or flower information.");
    return;
  }

  // Gather form data
  const reviewBody = document.getElementById("reviewBody").value;
  const reviewRating = document.getElementById("reviewRating").value;

  const reviewData = {
    reviewer: userId, // Use user ID for backend submission
    flower: flowerId, // Use flower ID for backend submission
    body: reviewBody,
    rating: reviewRating,
  };

  // Submit the review
  fetch("http://127.0.0.1:8000/flowers/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    })
    .then((data) => {
      alert("Review submitted successfully!");

      // Optionally reload reviews section
      const reviewList = document.getElementById("doc-details-review");
      reviewList.innerHTML = ""; // Clear existing reviews
      fetch(`http://127.0.0.1:8000/flowers/reviews/?flower_id=${flowerId}`)
        .then((res) => res.json())
        .then((data) => doctorReview(data)); // Update the reviews display
    })
    .catch((error) => {
      console.error(error);
      alert("Error submitting review. Please try again later.");
    });
};






// const orderFlower = () => {
//   const flowerId = new URLSearchParams(window.location.search).get("flowerId");
//   const quantity = document.getElementsByName("quantity");
//   const order_status = document.getElementsByName("order_status");
//   const selected = Array.from(order_status).find((button) => button.checked);
//   const delivery_address = document.getElementById("delivery_address").value;
//   const mobile_no = document.getElementById("mobile_no").value;
//   const order_date = document.getElementById("order_date").value;
//   const delivery_date = document.getElementById("delivery_date");
//   const order_types = document.getElementById("order_types");
  
  
//   const buyer_id = localStorage.getItem("buyer_id");
//   const info = {
//     order_types: order_types,
//     order_types: selected.value,
//     order_status: "Pending",
//     delivery_address: delivery_address,
//     quantity : quantity,
//     mobile_no : mobile_no,
//     order_date : order_date,
//     delivery_date : delivery_date,
//     cancel: false,
//     buyer: buyer_id,
//     flower: flowerId,
//   };

//   console.log(info);
//   fetch("http://127.0.0.1:8000/appointment/", {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(info),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       window.location.href = `pdf.html?flowerId=${flowerId}`;
//       // handlePdf();
//       // console.log(data);
//     });
// };

// const loadBuyerId = () => {
//   const user_id = localStorage.getItem("user_id");

//   fetch(`http://127.0.0.1:8000/buyers/list/?user_id=${user_id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       localStorage.setItem("buyer_id", data[0].id);
//     });
// };

// loadBuyerId();
getparams();

// const openOrderModal = () => {
//   document.getElementById("orderModal").style.display = "block";
// };

// const closeOrderModal = () => {
//   document.getElementById("orderModal").style.display = "none";
// };

// const submitOrderForm = (event) => {
//   event.preventDefault(); // Prevent form submission and page reload

//   const flowerId = new URLSearchParams(window.location.search).get("flowerId");
//   const buyer_id = localStorage.getItem("buyer_id");

//   const quantity = document.getElementById("quantity").value;
//   const delivery_address = document.getElementById("delivery_address").value;
//   const mobile_no = document.getElementById("mobile_no").value;
//   const order_date = document.getElementById("order_date").value;
//   const delivery_date = document.getElementById("delivery_date").value;
//   const order_types = document.getElementById("order_types").value;

//   const orderInfo = {
//     buyer: buyer_id,
//     flower: flowerId,
//     quantity: parseInt(quantity),
//     delivery_address: delivery_address,
//     mobile_no: mobile_no,
//     order_date: order_date,
//     delivery_date: delivery_date,
//     order_types: order_types,
//     order_status: "Pending",
//     cancel: false,
//   };

//   console.log(orderInfo);

//   // Submit the order data via API
//   fetch("http://127.0.0.1:8000/orders/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(orderInfo),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       alert("Order placed successfully!");
//       closeOrderModal(); // Close the modal after submission
//       window.location.href = `pdf.html?flowerId=${flowerId}`; // Redirect if needed
//     })
//     .catch((error) => {
//       console.error("Error placing order:", error);
//       alert("Failed to place the order. Please try again.");
//     });
// };

// // Load buyer ID from the logged-in user
// const loadBuyerId = () => {
//   const user_id = localStorage.getItem("user_id");

//   fetch(`http://127.0.0.1:8000/buyers/list/?user_id=${user_id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       localStorage.setItem("buyer_id", data[0].id);
//     })
//     .catch((error) => {
//       console.error("Error fetching buyer ID:", error);
//     });
// };

// loadBuyerId();

// let flowerPrice = 0; // Variable to store the flower price

// // Fetch the flower details when the page loads
// const flowerId = new URLSearchParams(window.location.search).get("flowerId");

// if (flowerId) {
//   fetch(`http://127.0.0.1:8000/flowers/${flowerId}/`)
//     .then((res) => res.json())
//     .then((data) => {
//       flowerPrice = data.price; // Store the flower price
//       console.log("Flower Price:", flowerPrice);
//     })
//     .catch((err) => {
//       console.error("Failed to fetch flower details:", err);
//     });
// }

let flowerPrice = 0; // To store the flower's price

// Fetch the flower price when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (flowerId) {
    fetch(`http://127.0.0.1:8000/flowers/${flowerId}/`)
      .then((res) => res.json())
      .then((data) => {
        flowerPrice = data.price; // Store the flower price
        document.getElementById("price").value = flowerPrice.toFixed(2); // Display price
      })
      .catch((err) => {
        console.error("Failed to fetch flower details:", err);
      });
  }
});

// Update total price when quantity changes
document.getElementById("quantity").addEventListener("input", () => {
  const quantity = parseInt(document.getElementById("quantity").value) || 0;
  const totalPrice = flowerPrice * quantity;

  // Update total price in the form
  document.getElementById("total_price").value = totalPrice.toFixed(2);
});


const submitOrderForm = (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const flowerId = new URLSearchParams(window.location.search).get("flowerId");
  const buyerId = localStorage.getItem("buyer_id");

  if (!flowerId || !buyerId) {
    alert("Missing flower or buyer information.");
    return;
  }

  const quantity = document.getElementById("quantity").value;
  const deliveryAddress = document.getElementById("delivery_address").value;
  const mobileNo = document.getElementById("mobile_no").value;
  const deliveryDate = document.getElementById("delivery_date").value;
  const orderType = document.getElementById("order_types").value;
  // Calculate the total price
  const totalPrice = flowerPrice * quantity;

  const orderData = {
    flower_id: flowerId,
    buyer_id: buyerId,
    quantity: parseInt(quantity),
    price: flowerPrice, // Add the flower price
    total_price: totalPrice, // Add the total price
    delivery_address: deliveryAddress,
    mobile_no: mobileNo,
    delivery_date: deliveryDate,
    order_types: orderType,
    order_status: "Pending",
    cancel: false,
  };

  console.log("Order Data:", orderData);

  // Send the data to the API
  fetch(`http://127.0.0.1:8000/orders/?flower_id=${flowerId}&buyer_id=${buyerId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
      return response.json();
    })
    .then((data) => {
      // document.getElementById("exampleModal").style.display = "none"; // Close modal
      console.log("Order Response:", data);
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
      modal.hide();
      alert("Order placed successfully!");
      location.reload();
    })
    
};


// const loadBuyerId = () => {
//   const user_id = localStorage.getItem("user_id"); // Get the user_id from localStorage
//   if (!user_id) {
//     console.error("User ID is not found in localStorage.");
//     return;
//   }

//   // Step 1: Fetch the username using user_id
//   fetch(`http://127.0.0.1:8000/users/${user_id}/`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Failed to fetch user: ${res.statusText}`);
//       }
//       return res.json();
//     })
//     .then((userData) => {
//       // Store the username in localStorage
//       localStorage.setItem("username", userData.username);
//       const username = userData.username;

//       // Step 2: Fetch the list of buyers
//       return fetch(`http://127.0.0.1:8000/buyers/list/`);
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Failed to fetch buyers: ${res.statusText}`);
//       }
//       return res.json();
//     })
//     .then((buyersData) => {
//       // Step 3: Find the buyer with the matching username
//       const username = localStorage.getItem("username");
//       const buyer = buyersData.find((buyer) => buyer.user === username);
//       if (buyer) {
//         // Store the buyer_id in localStorage
//         localStorage.setItem("buyer_id", buyer.id);
//         console.log(`Buyer ID (${buyer.id}) stored successfully.`);
//       } else {
//         console.error("No buyer found with the specified username.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching or processing data:", error);
//     });
// };

// // Call the function
// loadBuyerId();







