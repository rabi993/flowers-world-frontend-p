// // const loadorder = () => {
// //   const buyer_id = localStorage.getItem("buyer_id");
// //   fetch(
// //     `http://127.0.0.1:8000/orders/?buyer_id=${buyer_id}`
// //   )
// //     .then((res) => res.json())
// //     .then((data) => {
// //       console.log(data);
// //       data.forEach((item) => {
// //         const parent = document.getElementById("table-body1");
// //         const tr = document.createElement("tr");
// //         tr.innerHTML = `
// //             <td>${item.id}</td>
// //             <td>${item.buyer}</td>
// //             <td>${item.flower}</td>
// //             <td>${item.order_types}</td>
// //             <td>${item.order_status}</td>
// //             <td>
// //                 ${
// //                   item.order_status == "Pending"
// //                     ? "🅿️"
// //                     : item.order_status == "Processing"
// //                     ? "🔄"
// //                     : item.order_status == "Completed"
// //                     ? "✅"
// //                     : item.order_status == "Rejected"
// //                     ? "❌"
// //                     : ""
// //                 }
// //             </td>

// //             <td>${item.quantity}</td>
// //             <td>${item.mobile_no}</td>
// //             <td>${item.order_date}</td>
// //             <td>${item.delivery_date}</td>
// //             <td>${item.price} $</td>
// //             <td>${item.total_price} $</td>
// //             `;
// //         parent.appendChild(tr);
// //       });
// //     });
// // };

// // loadorder();
// const loadorder = () => {
//   const buyer_id = localStorage.getItem("buyer_id");
//   const orderIds = JSON.parse(localStorage.getItem("order_ids")) || []; // Get stored order IDs

//   fetch(`http://127.0.0.1:8000/orders/?buyer_id=${buyer_id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("All Orders:", data);

//       // Filter only the orders whose IDs are in the orderIds array
//       const filteredOrders = data.filter((item) => orderIds.includes(item.id));

//       console.log("Filtered Orders:", filteredOrders);

//       const parent = document.getElementById("table-body1");
//       parent.innerHTML = ""; // Clear the table body before adding rows

//       filteredOrders.forEach((item) => {
//         const tr = document.createElement("tr");
//         if (!item){ <h5>No item add to Your Cart</h5>}
//         else{
//           tr.innerHTML = `
//           <td>${item.id}</td>
//           <td>${item.buyer}</td>
//           <td>${item.flower}</td>
//           <td>${item.order_types}</td>
//           <td>${item.order_status}</td>
//           <td>
//               ${
//                 item.order_status == "Pending"
//                   ? "🅿️"
//                   : item.order_status == "Processing"
//                   ? "🔄"
//                   : item.order_status == "Completed"
//                   ? "✅"
//                   : item.order_status == "Rejected"
//                   ? "❌"
//                   : ""
//               }
//           </td>
//           <td>${item.quantity}</td>
//           <td>${item.mobile_no}</td>
//           <td>${item.order_date}</td>
//           <td>${item.delivery_date}</td>
//           <td>${item.price} $</td>
//           <td>${item.total_price} $</td>
//           }
//         `;
//         parent.appendChild(tr);
//       });

//       const parent1 = document.getElementById("totalamount");
//       parent1.innerHTML = "";
//       const total=0;
//       filteredOrders.forEach((item) => {
//         const div = document.createElement("div");
//           div.innerHTML = `
          
//           <p>${item.flower} - ${item.quantity} - ${item.total_price} $</p>
//           }
//         `;
//         total +=item.total_price;

//         parent1.appendChild(div);
//       });

//       const parent2 = document.getElementById("totalamountV");
//       parent2.innerHTML = "";
//       const div = document.createElement("div");
//         div.innerHTML = `
//           <h4>Total amount +15% VAT : ${total} $</h4> 
//         `;

//         parent2.appendChild(div);
      
//     })




//     .catch((err) => {
//       console.error("Failed to load orders:", err);
//     });
// };

// // Call the function to load the filtered orders into the table
// loadorder();

const loadorder = () => {
  const buyer_id = localStorage.getItem("buyer_id");
  const orderIds = JSON.parse(localStorage.getItem("order_ids")) || []; // Get stored order IDs

  fetch(`http://127.0.0.1:8000/orders/?buyer_id=${buyer_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("All Orders:", data);

      // Filter only the orders whose IDs are in the orderIds array
      const filteredOrders = data.filter((item) => orderIds.includes(item.id));

      console.log("Filtered Orders:", filteredOrders);

      const parent = document.getElementById("table-body1");
      parent.innerHTML = ""; // Clear the table body before adding rows

      if (filteredOrders.length === 0) {
        // Show a message if no orders are present
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="12" class="text-center">No items added to your cart.</td>`;
        parent.appendChild(tr);
      } else {
        filteredOrders.forEach((item) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.flower}</td>
            <td>${item.order_types}</td>
            <td>${item.order_status}</td>
            <td>
              ${
                item.order_status == "Pending"
                  ? "🅿️"
                  : item.order_status == "Processing"
                  ? "🔄"
                  : item.order_status == "Completed"
                  ? "✅"
                  : item.order_status == "Rejected"
                  ? "❌"
                  : ""
              }
            </td>
            <td>${item.quantity}</td>
            <td>${item.mobile_no}</td>
            <td>
              ${
                item.order_date
                  ? (() => {
                      const date = new Date(item.order_date);
                      const day = String(date.getUTCDate()).padStart(2, "0");
                      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
                      const year = date.getUTCFullYear();
                      const hours = String(date.getUTCHours()).padStart(2, "0");
                      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                      return `${day}-${month}-${year}#T${hours}:${minutes}`;
                    })()
                  : "N/A"
              }
            </td>
            <td>
              ${
                item.delivery_date
                  ? (() => {
                      const date = new Date(item.delivery_date);
                      const day = String(date.getUTCDate()).padStart(2, "0");
                      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
                      const year = date.getUTCFullYear();
                      return `${day}-${month}-${year}`;
                    })()
                  : "N/A"
              }
            </td>

            <td>${item.delivery_address}</td>
            <td>${item.price} $</td>
            <td>${item.total_price} $</td>
            <td>
                ${
                  item.order_status === "Pending"
                    ? `
                    <button class="btn btn-warning edit-btn" data-id="${item.id}" data-quantity="${item.quantity}" data-flower="${item.flower}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${item.id}" data-quantity="${item.quantity}" data-flower="${item.flower}">Delete</button>
                  `
                    : ""
                }
            </td>
            
          `;
          parent.appendChild(tr);
        });
      }

      // Display total amounts
      const parent1 = document.getElementById("totalamount");
      parent1.innerHTML = ""; // Clear the container
      let total = 0; // Declare the total variable outside the loop

      filteredOrders.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.flower} - ${item.quantity} - ${item.total_price} $</p>`;
        total += item.total_price;
        parent1.appendChild(div);
      });

      // Calculate and display the total with VAT
      const parent2 = document.getElementById("totalamountV");
      parent2.innerHTML = ""; // Clear the container
      const vat = total * 0.15; // Calculate 15% VAT
      const totalWithVAT = total + vat;

      const div = document.createElement("div");
      div.innerHTML = `<h4>Total amount + 15% VAT: ${totalWithVAT.toFixed(2)} $</h4>`;
      parent2.appendChild(div);
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
    });
};

// document.addEventListener("click", (event) => {
//   const target = event.target;

//   // Handle Delete Button
//   if (target.classList.contains("delete-btn")) {
//     const orderId = target.dataset.id; // Order ID from the button's data attribute
//     const flower = target.dataset.flower; // Flower name
//     const quantity = parseInt(target.dataset.quantity); // Quantity as an integer

//     if (!orderId || !flower || isNaN(quantity)) {
//       console.error("Invalid data attributes for delete operation.");
//       return;
//     }

//     // Call delete API and update the available quantity
//     fetch(`http://127.0.0.1:8000/orders/${orderId}/`, { method: "DELETE" })
//       .then((res) => {
//         if (res.ok) {
//           alert("Order deleted successfully!");

//           // Remove order ID from localStorage
//           let orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];
//           orderIds = orderIds.filter((id) => id !== parseInt(orderId)); // Remove the deleted order ID
//           localStorage.setItem("order_ids", JSON.stringify(orderIds));

//           // Update available quantity
//           updateAvailable(flower, quantity);

//           // Reload the orders table
//           loadorder();
//         } else {
//           alert("Failed to delete the order!");
//           console.error("Delete API responded with an error.");
//         }
//       })
//       .catch((err) => {
//         console.error("Delete failed:", err);
//         alert("An error occurred while deleting the order.");
//       });
//   }
// });
document.addEventListener("click", (event) => {
  const target = event.target;

  // Handle Delete Button
  if (target.classList.contains("delete-btn")) {
    const orderId = target.dataset.id; // Order ID from the button's data attribute
    const flower = target.dataset.flower; // Flower name
    const quantity = parseInt(target.dataset.quantity); // Quantity as an integer

    if (!orderId || !flower || isNaN(quantity)) {
      console.error("Invalid data attributes for delete operation.");
      return;
    }

    console.log(`Deleting order: ID=${orderId}, Flower=${flower}, Quantity=${quantity}`);

    // Call delete API and update the available quantity
    fetch(`http://127.0.0.1:8000/orders/${orderId}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          alert("Order deleted successfully!");

          // Remove order ID from localStorage
          let orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];
          orderIds = orderIds.filter((id) => id !== parseInt(orderId)); // Remove the deleted order ID
          localStorage.setItem("order_ids", JSON.stringify(orderIds));

          // Update available quantity
          // updateAvailable(flower, quantity); Auto update kore disi backend model theke 

          // Reload the orders table
          loadorder();
        } else {
          alert("Failed to delete the order!");
          console.error("Delete API responded with an error.");
        }
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("An error occurred while deleting the order.");
      });
  }
});



// Call the function to load the filtered orders into the table
loadorder();



const updateAvailable = (flower, quantity) => {
  console.log(`Updating availability for Flower="${flower}", Quantity=${quantity}`);

  // Fetch the list of flowers
  fetch("http://127.0.0.1:8000/flowers/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch flowers list.");
      }
      return res.json();
    })
    .then((flowers) => {
      // Find the flower based on its title
      const filteredFlower = flowers.find((f) => f.title === flower);

      if (filteredFlower) {
        const flower_id = filteredFlower.id;
        console.log(`Flower ID for "${flower}":`, flower_id);

        // Calculate the updated quantity
        const updatedQuantity = filteredFlower.available + quantity;
        console.log(`Updated quantity for "${flower}":`, updatedQuantity);

        // Update the flower's available quantity
        return fetch(`http://127.0.0.1:8000/flowers/list/${flower_id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ available: updatedQuantity }), // Send only the field to update
        });
      } else {
        throw new Error(`Flower "${flower}" not found in the list.`);
      }
    })
    .then((res) => {
      if (res.ok) {
        console.log(`Flower quantity for "${flower}" updated successfully!`);
      } else {
        console.error(`Failed to update quantity for "${flower}".`);
        return res.text().then((text) => {
          console.error("Error response:", text); // Log server response for debugging
        });
      }
    })
    .catch((err) => console.error("Error:", err.message));
};


// const buyer_id = localStorage.getItem("buyer_id");
// // Fetch orders for the buyer
// fetch(`http://127.0.0.1:8000/orders/?buyer_id=${buyer_id}`)
//   .then((res) => res.json())
//   .then((orders) => {
//     console.log("Orders:", orders);

//     // Example: Loop through each order to process flowers
//     orders.forEach((order) => {
//       const flowername = order.flower;

//       // Fetch the list of flowers
//       fetch("http://127.0.0.1:8000/flowers/list/")
//         .then((res) => res.json())
//         .then((flowers) => {
//           // Filter to find the flower_id based on the title
//           const filteredFlower = flowers.find((f) => f.title === flowername);

//           if (filteredFlower) {
//             const flower_id = filteredFlower.id;
//             console.log(`Flower ID for ${flowername}:`, flower_id);

//             // Fetch details of the specific flower using flower_id
//             fetch(`http://127.0.0.1:8000/flowers/list/${flower_id}`)
//               .then((res) => res.json())
//               .then((flowerDetails) => {
//                 console.log("Flower Details:", flowerDetails);

//                 // Example: Update flower's available quantity
//                 const updatedQuantity = flowerDetails.available + order.quantity;

//                 fetch(`http://127.0.0.1:8000/flowers/list/${flower_id}/`, {
//                   method: "PATCH",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ available: updatedQuantity }),
//                 })
//                   .then((res) => {
//                     if (res.ok) {
//                       console.log("Flower quantity updated successfully!");
//                     } else {
//                       console.error("Failed to update flower quantity.");
//                     }
//                   })
//                   .catch((err) => console.error("Error updating flower quantity:", err));
//               })
//               .catch((err) => console.error("Error fetching flower details:", err));
//           } else {
//             console.error(`Flower "${flowername}" not found in the list.`);
//           }
//         })
//         .catch((err) => console.error("Error fetching flower list:", err));
//     });
//   })
//   .catch((err) => console.error("Error fetching orders:", err));



  const openEditModal = (orderId, flower, oldQuantity) => {
    const modal = document.getElementById("edit-modal");
    const orderIdInput = document.getElementById("edit-order-id");
    const quantityInput = document.getElementById("edit-quantity");
  
    // Set existing values in the modal
    orderIdInput.value = orderId;
    quantityInput.value = oldQuantity;
  
    // Show the modal
    modal.style.display = "block";
  
    // Handle form submission
    const form = document.getElementById("edit-order-form");
    form.onsubmit = (e) => {
      e.preventDefault();
  
      const newQuantity = parseInt(quantityInput.value);
      const quantityChange = newQuantity - oldQuantity;
  
      // Update the order quantity
      fetch(`http://127.0.0.1:8000/orders/${orderId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
        .then((res) => {
          if (res.ok) {
            alert("Order updated successfully!");
  
            // Adjust flower quantity
            updateFlowerQuantity(flower, -quantityChange);
  
            // Reload the orders table and close the modal
            loadorder();
            modal.style.display = "none";
          } else {
            alert("Failed to update the order.");
          }
        })
        .catch((err) => console.error("Update failed:", err));
    };
  };
  

//   let editingOrderId = null; // To keep track of whether editing or adding

// // Function to open the modal for editing
// const editOrder = (order) => {
//   editingOrderId = order.id; // Save the order ID being edited

//   // Populate the modal fields with the existing order data
//   document.getElementById("quantity").value = order.quantity;
//   document.getElementById("price").value = order.price;
//   document.getElementById("total_price").value = order.total_price;
//   document.getElementById("delivery_address").value = order.delivery_address;
//   document.getElementById("mobile_no").value = order.mobile_no;
//   document.getElementById("delivery_date").value = order.delivery_date;
//   document.getElementById("order_types").value = order.order_types;

//   // Change the button text to "Update Order"
//   document.getElementById("submitOrder").innerText = "Update Order";

//   // Open the modal
//   const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
//   modal.show();
// };

// // Function to handle form submission (for both adding and editing)
// const submitOrderForm = (event) => {
//   event.preventDefault();

//   const orderData = {
//     quantity: document.getElementById("quantity").value,
//     price: document.getElementById("price").value,
//     total_price: document.getElementById("total_price").value,
//     delivery_address: document.getElementById("delivery_address").value,
//     mobile_no: document.getElementById("mobile_no").value,
//     delivery_date: document.getElementById("delivery_date").value,
//     order_types: document.getElementById("order_types").value,
//   };

//   if (editingOrderId) {
//     // Update the existing order
//     fetch(`http://127.0.0.1:8000/orders/${editingOrderId}/`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     })
//       .then((res) => res.json())
//       .then((updatedOrder) => {
//         console.log("Order updated:", updatedOrder);
//         editingOrderId = null; // Reset after editing
//         location.reload(); // Reload to reflect changes
//       })
//       .catch((err) => console.error("Failed to update order:", err));
//   } else {
//     // Add a new order
//     fetch("http://127.0.0.1:8000/orders/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     })
//       .then((res) => res.json())
//       .then((newOrder) => {
//         console.log("New order created:", newOrder);
//         location.reload(); // Reload to reflect changes
//       })
//       .catch((err) => console.error("Failed to create order:", err));
//   }
// };



