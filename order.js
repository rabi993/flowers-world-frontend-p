const loadAllAppointment = () => {
  const buyer_id = localStorage.getItem("buyer_id");
  fetch(
    `http://127.0.0.1:8000/orders/?buyer_id=${buyer_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.flower}</td>
            
            <td>
              ${(() => {
                const statusClasses = {
                  Online: "btn btn-warning",
                  Offline: "btn btn-secondary",
                };
                return item.order_types in statusClasses
                  ? `<button class="${statusClasses[item.order_types]}">${item.order_types}</button>`
                  : "";
              })()}
            </td>
            
            <td>
              ${(() => {
                const statusClasses = {
                  Pending: "btn btn-warning",
                  Processing: "btn btn-info",
                  Completed: "btn btn-success",
                  Rejected: "btn btn-danger",
                };
                return item.order_status in statusClasses
                  ? `<button class="${statusClasses[item.order_status]}">${item.order_status}</button>`
                  : "";
              })()}
            </td>

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
                JSON.parse(localStorage.getItem("order_ids") || "[]").includes(item.id)
                  ? `<button class="btn btn-info">In Customer's Cart not paid </button>`
                  : `<button class="btn btn-success">Final Order paid</button>`
              }
            </td>

            `;
        parent.appendChild(tr);
      });
    });
};

loadAllAppointment();

