// Fetch and display flowers list
const fetchFlowers = () => {
    const flowersList = document.getElementById("flowers-list");
    flowersList.innerHTML = `<tr><td colspan="8" class="text-center">Loading flowers...</td></tr>`;
  
    fetch("http://127.0.0.1:8000/flowers/list/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flowers.");
        }
        return response.json();
      })
      .then((data) => {
        const flowers = data.results;
        flowersList.innerHTML = ""; // Clear the table rows
  
        if (flowers.length === 0) {
          flowersList.innerHTML = `
            <tr>
              <td colspan="8" class="text-center">No flowers available.</td>
            </tr>`;
        } else {
          flowers.forEach((flower) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${flower.id}</td>
              <td>${flower.title}</td>
              <td>${flower.content}</td>
              <td><img src="${flower.image}" alt="${flower.title}" style="width: 100px; height: 100px; object-fit: cover;"></td>
              <td>${flower.category.join(", ")}</td>
              <td>${flower.color.join(", ")}</td>
              <td>${flower.available}</td>
              <td>${flower.price.toFixed(2)}</td>
              <td>
                <div class ="d-flex ">
                  <button class="btn btn-info" onclick='handleEditFlower(${JSON.stringify(flower)})'>Edit</button>
                  <button class="btn btn-danger mx-3" onclick='handleDeleteFlower(${flower.id})'>Delete</button>
                </div>
              </td>
            `;
            flowersList.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        flowersList.innerHTML = `
          <tr>
            <td colspan="8" class="text-center text-danger">Error loading flowers.</td>
          </tr>`;
      });
  };
  

  // Fetch categories and populate the multiple select dropdown
  const fetchCategories = () => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch categories");
        return response.json();
      })
      .then((data) => {
        const categorySelect = document.getElementById("flowerCategory");
        categorySelect.innerHTML = ""; // Clear previous options
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.slug; // Use slug as the value
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  // Fetch colors and populate the multiple select dropdown
  const fetchColor = () => {
    fetch("http://127.0.0.1:8000/colors/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch colors");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const colorSelect = document.getElementById("flowerColor");
        colorSelect.innerHTML = ""; // Clear previous options
        data.forEach((color) => {
          const option = document.createElement("option");
          option.value = color.slug; // Use slug as the value
          option.textContent = color.name;
          colorSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };


  fetchCategories();
  fetchColor();

  // Handle form submission to add a new flower
  const handleAddFlower = (event) => {
    event.preventDefault();
    const formMessage = document.getElementById("form-message");
    formMessage.innerHTML = "";
  
    const title = document.getElementById("flowerTitle").value.trim();
    const content = document.getElementById("flowerContent").value.trim();
    const image = document.getElementById("flowerImage").files[0];
    // const category = document.getElementById("flowerCategory").value.split(",").map((c) => c.trim());
    // const color = document.getElementById("flowerColor").value.split(",").map((c) => c.trim());
    const category = Array.from(document.getElementById("flowerCategory").selectedOptions).map((option) => option.value);
    const color = Array.from(document.getElementById("flowerColor").selectedOptions).map((option) => option.value);
    const available = parseInt(document.getElementById("flowerAvailable").value.trim());
    const price = parseFloat(document.getElementById("flowerPrice").value.trim());
  
    if (!title || !content || !image || !category.length || !color.length || isNaN(available) || isNaN(price)) {
      alert("All fields are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    category.forEach((cat) => formData.append("category", cat));
    color.forEach((col) => formData.append("color", col));
    formData.append("available", available);
    formData.append("price", price);
  
    fetch("http://127.0.0.1:8000/flowers/list/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to add flower.");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("Flower added successfully!");
        document.getElementById("flower_form").reset();
        fetchFlowers(); // Refresh the table
      })
      .catch((error) => {
        console.error("Error adding flower:", error.message);
        formMessage.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      });
  };
  
  // Initial fetch to populate the table
  fetchFlowers();

  // Handle Edit Flower
// const handleEditFlower = (flower) => {
//   // Populate form fields
  
//   document.getElementById("flowerTitle").value = flower.title;
//   document.getElementById("flowerContent").value = flower.content;
//   document.getElementById("flowerAvailable").value = flower.available;
//   document.getElementById("flowerPrice").value = flower.price;

//   // Set categories and colors
//   const categorySelect = document.getElementById("flowerCategory");
//   Array.from(categorySelect.options).forEach(option => {
//     option.selected = flower.category.includes(option.value);
//   });

//   const colorSelect = document.getElementById("flowerColor");
//   Array.from(colorSelect.options).forEach(option => {
//     option.selected = flower.color.includes(option.value);
//   });

//   // Attach event for saving the updated flower
//   const flowerForm = document.getElementById("flower_form");
//   flowerForm.onsubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(flowerForm);

//     fetch(`http://127.0.0.1:8000/flowers/list/${flower.id}/`, {
//       method: "PATCH",
//       body: formData,
//     })
//       .then(response => {
//         if (!response.ok) throw new Error("Failed to update flower.");
//         return response.status === 204 ? {} : response.json();
//       })
//       .then(() => {
//         alert("Flower updated successfully!");
//         fetchFlowers(); // Refresh the table
//       })
//       .catch(async (error) => {
//         const errorMessage = error.message;
//         console.error("Error updating flower:", errorMessage);
//         alert(`Error updating flower: ${errorMessage}`);
//       });
//   };
// };

const handleEditFlower = (flower) => {
  // Populate form fields
  document.getElementById("flowerTitle").value = flower.title;
  document.getElementById("flowerContent").value = flower.content;
  document.getElementById("flowerAvailable").value = flower.available;
  document.getElementById("flowerPrice").value = flower.price;

  // Set categories and colors
  const categorySelect = document.getElementById("flowerCategory");
  Array.from(categorySelect.options).forEach(option => {
    option.selected = flower.category.includes(option.value);
  });

  const colorSelect = document.getElementById("flowerColor");
  Array.from(colorSelect.options).forEach(option => {
    option.selected = flower.color.includes(option.value);
  });

  // Attach event for saving the updated flower
  const flowerForm = document.getElementById("flower_form");
  flowerForm.onsubmit = (event) => {
    event.preventDefault();

    // Prepare FormData to include the image and other fields
    const formData = new FormData();
    formData.append("title", flowerForm.elements["flowerTitle"].value);
    formData.append("content", flowerForm.elements["flowerContent"].value);
    formData.append("available", flowerForm.elements["flowerAvailable"].value);
    formData.append("price", flowerForm.elements["flowerPrice"].value);

    // Add selected categories
    Array.from(categorySelect.selectedOptions).forEach(option => {
      formData.append("category", option.value);
    });

    // Add selected colors
    Array.from(colorSelect.selectedOptions).forEach(option => {
      formData.append("color", option.value);
    });

    // Add image if a file is selected
    const fileInput = document.getElementById("flowerImage");
    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    }

    // Log the form data for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Make the API call to update the flower
    fetch(`http://127.0.0.1:8000/flowers/list/${flower.id}/`, {
      method: "PUT", // Use PATCH if your backend supports partial updates
      body: formData,
    })
      .then(async response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          const responseBody = await response.json();
          console.log("Response body:", responseBody);
          throw new Error(responseBody.detail || "Failed to update flower.");
        }
        return response.json();
      })
      .then(data => {
        console.log("Updated flower data:", data);
        alert("Flower updated successfully!");
        fetchFlowers(); // Refresh the flower list
      })
      .catch(error => {
        console.error("Error updating flower:", error.message);
        alert(`Error updating flower: ${error.message}`);
      });
  };
};



  // Handle Delete Flower
  const handleDeleteFlower = (id) => {
    if (confirm("Are you sure you want to delete this flower?")) {
      fetch(`http://127.0.0.1:8000/flowers/list/${id}/`, {
        method: "DELETE",
      })
        .then(response => {
          if (!response.ok) throw new Error("Failed to delete flower.");
          alert("Flower deleted successfully!");
          fetchFlowers(); // Refresh the table
        })
        .catch(error => {
          console.error("Error deleting flower:", error.message);
        });
    }
  };

  

  
