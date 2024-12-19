document.addEventListener("DOMContentLoaded", () => {
  fetchServices(); // Load the services when the page loads
});

// Fetch and display services
const fetchServices = () => {
  fetch("http://127.0.0.1:8000/services/")
    .then((response) => response.json())
    .then((services) => {
      const serviceList = document.getElementById("service-list");
      serviceList.innerHTML = ""; // Clear existing rows

      if (services.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `
          <td colspan="3" class="text-center">No services available.</td>
        `;
        serviceList.appendChild(noDataRow);
      } else {
        services.forEach((service) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td><img src="${service.image}" alt="${service.name}" style="height: 50px; width: 50px; object-fit: cover;"></td>
            <td>${service.name}</td>
            <td>${service.description}</td>
          `;

          serviceList.appendChild(row);
        });
      }
    })
    .catch((error) => console.error("Error fetching services:", error));
};

// Call the function to populate the table
fetchServices();


// Handle adding a new service
const handleAddService = (event) => {
  event.preventDefault(); // Prevent form refresh

  const serviceName = document.getElementById("serviceName").value.trim();
  const serviceDescription = document.getElementById("serviceDescription").value.trim();
  const serviceImage = document.getElementById("serviceImage").files[0];

  if (!serviceName || !serviceDescription || !serviceImage) {
    alert("All fields are required.");
    return;
  }

  const formData = new FormData();
  formData.append("name", serviceName);
  formData.append("description", serviceDescription);
  formData.append("image", serviceImage);

  fetch("http://127.0.0.1:8000/services/", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add service");
      }
      return response.json();
    })
    .then((data) => {
      alert("Service added successfully!");
      document.getElementById("service_form").reset();
      fetchServices(); // Refresh the service list
    })
    .catch((error) => {
      console.error("Error adding service:", error);
      alert("Error adding service. Please try again.");
    });
};
