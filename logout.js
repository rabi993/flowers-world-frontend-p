// const handlelogOut = () => {
//   const token = localStorage.getItem("token");

//   fetch("http://127.0.0.1:8000/buyers/logout/", {
//     method: "POST",
//     headers: {
//       Authorization: `Token ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_id");
//       localStorage.removeItem("buyer_id");
//       localStorage.removeItem("username");
//       localStorage.removeItem("username");
//       localStorage.removeItem("order_ids");


//       // Redirect to login page
//       window.location.href = "login.html"; // Redirect to the login page
//     });
// };

// ==================== Order Delete Logic ====================
// ==================== Order Delete Logic ====================
const orderdelete = () => {
  // Get order IDs from localStorage
  const orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];

  if (orderIds.length === 0) {
    console.log("No orders to delete from the server.");
    return;
  }

  console.log(`Deleting orders: ${orderIds}`);

  // Loop through each order ID and delete the order from the server
  orderIds.forEach((orderId) => {
    fetch(`http://127.0.0.1:8000/orders/${orderId}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          console.log(`Order ID ${orderId} deleted successfully.`);
        } else {
          console.error(`Failed to delete Order ID ${orderId}.`);
        }
      })
      .catch((err) => {
        console.error(`Error deleting Order ID ${orderId}:`, err);
      });
  });
};

// ==================== Logout Functionality ====================
const handlelogOut = () => {
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/buyers/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logout response:", data);

      // Call orderdelete to delete all orders in order_ids
      orderdelete();

      // Clear all localStorage items
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("buyer_id");
      localStorage.removeItem("username");
      localStorage.removeItem("order_ids");
      localStorage.removeItem("totalWithVAT");
      localStorage.removeItem("isPaid");

      console.log("LocalStorage cleared successfully.");

      // Redirect to login page
      window.location.href = "login.html"; // Redirect to the login page
    })
    .catch((err) => {
      console.error("Logout failed:", err);
      alert("An error occurred during logout.");
    });
};

// ==================== Attach Logout Event Listener ====================
document.getElementById("logout-btn").addEventListener("click", handlelogOut);
