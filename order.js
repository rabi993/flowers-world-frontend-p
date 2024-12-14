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
            <td>${item.order_date}</td>
            <td>${item.delivery_date}</td>
            <td>${item.price} $</td>
            <td>${item.total_price} $</td>
            `;
        parent.appendChild(tr);
      });
    });
};

loadAllAppointment();
