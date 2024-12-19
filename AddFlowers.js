// Fetch and populate categories
const fetchCategories = () => {
  fetch("http://127.0.0.1:8000/categories/")
      .then((response) => response.json())
      .then((categories) => {
          const categorySelect = document.getElementById("flowerCategory");
          categorySelect.innerHTML = ""; // Clear existing options
          categories.forEach((category) => {
              const option = document.createElement("option");
              option.value = category.slug; // Use slug as the value
              option.textContent = category.name; // Display category name
              categorySelect.appendChild(option);
          });
      })
      .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to load categories.");
      });
};

// Fetch and populate colors
const fetchColors = () => {
  fetch("http://127.0.0.1:8000/colors/")
      .then((response) => response.json())
      .then((colors) => {
          const colorSelect = document.getElementById("flowerColor");
          colorSelect.innerHTML = ""; // Clear existing options
          colors.forEach((color) => {
              const option = document.createElement("option");
              option.value = color.slug; // Use slug as the value
              option.textContent = color.name; // Display color name
              colorSelect.appendChild(option);
          });
      })
      .catch((error) => {
          console.error("Error fetching colors:", error);
          alert("Failed to load colors.");
      });
};

// Handle form submission to add a flower
const handleAddFlower = (event) => {
  event.preventDefault();

  const title = document.getElementById("flowerTitle").value.trim();
  const content = document.getElementById("flowerContent").value.trim();
  const image = document.getElementById("flowerImage").files[0];

  // Get selected categories and colors
  const selectedCategories = Array.from(document.getElementById("flowerCategory").selectedOptions).map(
      (option) => option.value
  );
  const selectedColors = Array.from(document.getElementById("flowerColor").selectedOptions).map(
      (option) => option.value
  );

  const available = parseInt(document.getElementById("flowerAvailable").value.trim());
  const price = parseFloat(document.getElementById("flowerPrice").value.trim());

  if (!title || !content || !image || !selectedCategories.length || !selectedColors.length || !available || !price) {
      alert("All fields are required.");
      return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);
  selectedCategories.forEach((cat) => formData.append("category", cat));
  selectedColors.forEach((col) => formData.append("color", col));
  formData.append("available", available);
  formData.append("price", price);

  fetch("http://127.0.0.1:8000/flowers/list/", {
      method: "POST",
      body: formData,
  })
      .then((response) => {
          if (!response.ok) {
              return response.json().then((errorData) => {
                  console.error("Server error:", errorData);
                  throw new Error(errorData.detail || "Failed to add flower.");
              });
          }
          return response.json();
      })
      .then((data) => {
          alert("Flower added successfully!");
          document.getElementById("flower_form").reset();
          fetchFlowers(); // Refresh the flowers list
      })
      .catch((error) => {
          console.error("Error adding flower:", error.message);
          alert(`Error: ${error.message}`);
      });
};

// Fetch and display flowers in the table
const fetchFlowers = () => {
  fetch("http://127.0.0.1:8000/flowers/list/")
      .then((response) => response.json())
      .then((data) => {
          const flowersList = document.getElementById("flowers-list");
          flowersList.innerHTML = ""; // Clear existing rows
          data.results.forEach((flower) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${flower.id}</td>
                  <td>${flower.title}</td>
                  <td>${flower.content}</td>
                  <td><img src="${flower.image}" alt="${flower.title}" style="width: 100px; height: 100px;"></td>
                  <td>${flower.category.join(", ")}</td>
                  <td>${flower.color.join(", ")}</td>
                  <td>${flower.available}</td>
                  <td>${flower.price.toFixed(2)}</td>
              `;
              flowersList.appendChild(row);
          });
      })
      .catch((error) => {
          console.error("Error fetching flowers:", error);
      });
};

// Initialize: Fetch categories, colors, and flowers
fetchCategories();
fetchColors();
fetchFlowers();
