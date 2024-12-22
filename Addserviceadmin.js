document.addEventListener("DOMContentLoaded", () => {
  fetchServices(); // Load the services when the page loads
});
const fetchServices = () => {
  fetch("http://127.0.0.1:8000/services/")
    .then((response) => response.json())
    .then((services) => {
      const serviceList = document.getElementById("service-list");
      serviceList.innerHTML = ""; // Clear existing rows

      if (services.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `
          <td colspan="4" class="text-center">No services available.</td>
        `;
        serviceList.appendChild(noDataRow);
      } else {
        services.forEach((service) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td><img src="${service.image}" alt="${service.name}" style="height: 50px; width: 50px; object-fit: cover;"></td>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>
              <button class="btn btn-warning btn-sm mx-1" onclick="handleEditService('${service.id}', '${service.name}', '${service.description}', '${service.image}')">Edit</button>
              <button class="btn btn-danger btn-sm mx-1" onclick="handleDeleteService('${service.id}')">Delete</button>
            </td>
          `;

          serviceList.appendChild(row);
        });
      }
    })
    .catch((error) => console.error("Error fetching services:", error));
};




// Handle adding or updating a service
const handleAddService = (event) => {
  event.preventDefault(); // Prevent form refresh

  const serviceName = document.getElementById("serviceName").value.trim();
  const serviceDescription = document.getElementById("serviceDescription").value.trim();
  const serviceImage = document.getElementById("serviceImage").files[0];
  const serviceId = document.getElementById("serviceId").value.trim();

  if (!serviceName || !serviceDescription || !serviceImage) {
    alert("All fields are required.");
    return;
  }

  const formData = new FormData();
  formData.append("name", serviceName);
  formData.append("description", serviceDescription);
  if (serviceImage) formData.append("image", serviceImage);

  const method = serviceId ? "PUT" : "POST"; // If serviceId exists, it's an update; otherwise, it's a new service
  const url = serviceId
    ? `http://127.0.0.1:8000/services/${serviceId}/`
    : "http://127.0.0.1:8000/services/";

  fetch(url, {
    method: method,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(serviceId ? "Failed to update service" : "Failed to add service");
      }
      return response.json();
    })
    .then(() => {
      alert(serviceId ? "Service updated successfully!" : "Service added successfully!");
      document.getElementById("service_form").reset();
      document.getElementById("form-title").textContent = "Add Service"; // Reset form title
      document.getElementById("addServiceButton").textContent = "Add Service"; // Reset button text
      fetchServices(); // Refresh the service list
    })
    .catch((error) => {
      console.error("Error adding/updating service:", error);
      alert("Error processing service. Please try again.");
    });
};




// Handle deleting a service
const handleDeleteService = (id) => {
  if (!confirm("Are you sure you want to delete this service?")) {
    return;
  }

  fetch(`http://127.0.0.1:8000/services/${id}/`, {
    method: "DELETE", // Assuming the API uses DELETE for deletions
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }
      alert("Service deleted successfully!");
      fetchServices(); // Refresh the service list
    })
    .catch((error) => {
      console.error("Error deleting service:", error);
      alert("Error deleting service. Please try again.");
    });
};
// Handle editing a service
// Handle editing a service
const handleEditService = (id, currentName, currentDescription, currentImage) => {
  // Fill in the form with the current values
  document.getElementById("serviceName").value = currentName;
  document.getElementById("serviceDescription").value = currentDescription;
  document.getElementById("serviceId").value = id;  // Hidden input field to store the service id
  if (currentImage) {
    document.getElementById("imagePreview").src = currentImage;
  }

  // Change the form title to "Edit Service"
  document.getElementById("form-title").textContent = "Edit Service";
  document.getElementById("addServiceButton").textContent = "Update Service";
};


// Handle editing a service
