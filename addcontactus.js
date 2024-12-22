// Fetch and display Contact Us entries
const fetchContactUs = () => {
    fetch("http://127.0.0.1:8000/contact_us/")
      .then((response) => response.json())
      .then((contacts) => {
        const contactUsList = document.getElementById("contactus-list");
        contactUsList.innerHTML = ""; // Clear the table rows
  
        if (contacts.length === 0) {
          const noDataRow = document.createElement("tr");
          noDataRow.innerHTML = `
            <td colspan="4" class="text-center">No contact entries available.</td>
          `;
          contactUsList.appendChild(noDataRow);
        } else {
          contacts.forEach((contact) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${contact.id}</td>
              <td>${contact.name}</td>
              <td>${contact.phone}</td>
              <td>${contact.content}</td>
              <td>
                <button class="btn btn-danger btn-sm" onclick="deleteContactUs(${contact.id})">Delete</button>
              </td>
            `;
            contactUsList.appendChild(row);
          });
        }
      })
      .catch((error) => console.error("Error fetching Contact Us entries:", error));
  };
  
  // Handle form submission for adding a Contact Us entry
  const handleAddContactUs = (event) => {
    event.preventDefault();
  
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const content = document.getElementById("contactContent").value.trim();
  
    if (!name || !phone || !content) {
      alert("All fields are required.");
      return;
    }
  
    const contactData = {
      name: name,
      phone: phone,
      content: content,
    };
  
    fetch("http://127.0.0.1:8000/contact_us/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Server error:", errorData);
            throw new Error(errorData.detail || "Failed to submit Contact Us entry.");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Contact Us entry submitted successfully!");
        document.getElementById("contactus_form").reset();
        fetchContactUs(); // Refresh the table
      })
      .catch((error) => {
        console.error("Error submitting Contact Us entry:", error.message);
        alert(`Error: ${error.message}`);
      });
  };
  
  // Initial fetch to populate the table
  fetchContactUs();
  

  // Handle delete Contact Us entry
const deleteContactUs = (contactId) => {
  if (!confirm("Are you sure you want to delete this entry?")) return;

  fetch(`http://127.0.0.1:8000/contact_us/${contactId}/`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete Contact Us entry");
      }
      alert("Contact Us entry deleted successfully!");
      fetchContactUs(); // Refresh the table
    })
    .catch((error) => {
      console.error("Error deleting Contact Us entry:", error);
      alert("Failed to delete Contact Us entry.");
    });
};
