
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

//       if (filteredOrders.length === 0) {
//         // Show a message if no orders are present
//         const tr = document.createElement("tr");
//         tr.innerHTML = `<td colspan="12" class="text-center">No items added to your cart.</td>`;
//         parent.appendChild(tr);
//       } else {
//         filteredOrders.forEach((item) => {
//           const tr = document.createElement("tr");
//           tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.buyer}</td>
//             <td>${item.flower}</td>
//             <td>${item.order_types}</td>
//             <td>${item.order_status}</td>
//             <td>
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
//             </td>
//             <td>${item.quantity}</td>
//             <td>${item.mobile_no}</td>
//             <td>${item.order_date}</td>
//             <td>${item.delivery_date}</td>
//             <td>${item.delivery_address}</td>
//             <td>${item.price} $</td>
//             <td>${item.total_price} $</td>
//           `;
//           parent.appendChild(tr);
//         });
//       }

//       // Display total amounts
//       const parent1 = document.getElementById("totalamount");
//       parent1.innerHTML = ""; // Clear the container
//       let total = 0; // Declare the total variable outside the loop

//       filteredOrders.forEach((item) => {
//         const div = document.createElement("div");
//         div.innerHTML = `<p>${item.flower} - ${item.quantity} - ${item.total_price} $</p>`;
//         total += item.total_price;
//         parent1.appendChild(div);
//       });

//       // Calculate and display the total with VAT
//       const parent2 = document.getElementById("totalamountV");
//       parent2.innerHTML = ""; // Clear the container
//       const vat = total * 0.15; // Calculate 15% VAT
//       const totalWithVAT = total + vat;

//       const div = document.createElement("div");
//       div.innerHTML = `<h4>Total amount + 15% VAT: ${totalWithVAT.toFixed(2)} $</h4>`;
//       parent2.appendChild(div);
//     })
//     .catch((err) => {
//       console.error("Failed to load orders:", err);
//     });
// };


// // Call the function to load the filtered orders into the table
// loadorder();

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

//       if (filteredOrders.length === 0) {
//         // Show a message if no orders are present
//         const tr = document.createElement("tr");
//         tr.innerHTML = `<td colspan="12" class="text-center">No items added to your cart.</td>`;
//         parent.appendChild(tr);
//       } else {
//         filteredOrders.forEach((item) => {
//           const tr = document.createElement("tr");
//           tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.buyer}</td>
//             <td>${item.flower}</td>
//             <td>${item.order_types}</td>
//             <td>${item.order_status}</td>
//             <td>
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
//             </td>
//             <td>${item.quantity}</td>
//             <td>${item.mobile_no}</td>
//             <td>${item.order_date}</td>
//             <td>${item.delivery_date}</td>
//             <td>${item.delivery_address}</td>
//             <td>${item.price} $</td>
//             <td>${item.total_price} $</td>
//           `;
//           parent.appendChild(tr);
//         });
//       }

//       // Display total amounts
//       const parent1 = document.getElementById("totalamount");
//       parent1.innerHTML = ""; // Clear the container
//       let total = 0; // Declare the total variable outside the loop

//       filteredOrders.forEach((item) => {
//         const div = document.createElement("div");
//         div.innerHTML = `<p>${item.flower} - ${item.quantity} - ${item.total_price} $</p>`;
//         total += item.total_price;
//         parent1.appendChild(div);
//       });

//       // Calculate and display the total with VAT
//       const parent2 = document.getElementById("totalamountV");
//       parent2.innerHTML = ""; // Clear the container
//       const vat = total * 0.15; // Calculate 15% VAT
//       const totalWithVAT = total + vat;

//       const div = document.createElement("div");
//       div.innerHTML = `<h4>Total amount + 15% VAT: ${totalWithVAT.toFixed(2)} $</h4>`;
//       parent2.appendChild(div);
//     })
//     .catch((err) => {
//       console.error("Failed to load orders:", err);
//     });
// };

// // PDF Generation Function
// const downloadPdf = () => {
//   const element = document.getElementById("pdf-container1"); // Ensure this container wraps the relevant content

//   if (!element) {
//     console.error("PDF container not found.");
//     return;
//   }

//   const options = {
//     margin: 10,
//     filename: "order_details.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//   };

//   html2pdf().set(options).from(element).save();
// };

// // Call the function to load the filtered orders into the table
// loadorder();

// // Attach the download functionality to a button
// document.getElementById("download-btn").addEventListener("click", downloadPdf);


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
                item.order_status === "Pending"
                  ? "🅿️"
                  : item.order_status === "Processing"
                  ? "🔄"
                  : item.order_status === "Completed"
                  ? "✅"
                  : item.order_status === "Rejected"
                  ? "❌"
                  : ""
              }
            </td>
            <td>${item.quantity}</td>
            <td>${item.mobile_no}</td>
            <td>${item.order_date}</td>
            <td>${item.delivery_date}</td>
            <td>${item.delivery_address}</td>
            <td>${item.price} $</td>
            <td>${item.total_price} $</td>
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
      if (totalWithVAT !== 0) {
        localStorage.setItem("totalWithVAT", totalWithVAT);
      }
      parent2.appendChild(div);
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
    });
};

// PDF Generation Function
const downloadPdf = () => {
  const element = document.getElementById("pdf-container1");

  if (!element) {
    console.error("PDF container not found.");
    return;
  }

  // Configure options for html2pdf
  const options = {
    margin: 10,
    filename: "order_details.pdf", // Output PDF file name
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 }, // Higher scale for better resolution
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Use html2pdf to convert the container into a downloadable PDF
  html2pdf().set(options).from(element).save().catch((err) => {
    console.error("PDF generation failed:", err);
  });
};


// Call the function to load the filtered orders into the table
loadorder();

// Attach the download functionality to a button
document.getElementById("download-btn").addEventListener("click", downloadPdf);


// confirm button click 
//  alert(congratulations ! your order is pending now.)
//  redirect to index.html
//  localStorage.removeItem("order_ids");