// Handle form submission to add a new category
const handleAddCategory = (event) => {
    event.preventDefault(); // Prevent form refresh
  
    // Gather form data
    const categoryBody = document.getElementById("categoryBody").value.trim();
  
    if (!categoryBody) {
      alert("Category name cannot be empty.");
      return;
    }
    const slug = categoryBody.toLowerCase().replace(/\s+/g, "-"); // Generate slug
    const categoryData = {
    name: categoryBody,
    slug: slug, // Include slug in the request
    };

    // const categoryData = {
    //   name: categoryBody, // Assuming the API expects "name" for the category field
    // };
  
    // Submit the category
    fetch("http://127.0.0.1:8000/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((response) => {
        if (!response.ok) {
          // Get server-side error if available
          return response.json().then((errorData) => {
            console.error("Server error:", errorData);
            throw new Error(errorData.detail || "Failed to submit category.");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Category submitted successfully!");
        // Clear the input field
        document.getElementById("categoryBody").value = "";
        // Refresh the category list
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(`Error submitting category: ${error.message}`);
      });
  };
  
  // Fetch and display the list of categories
  const fetchCategories = () => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        return response.json();
      })
      .then((categories) => {
        const categoryList = document.getElementById("category-list");
        categoryList.innerHTML = ""; // Clear existing categories
        if (categories.length === 0) {
          categoryList.textContent = "No categories available.";
        } else {
          categories.forEach((category) => {
            const div = document.createElement("div");
            div.textContent = category.name; // Assuming the API returns category objects with "name"
            div.classList.add("m-2","btn","btn-info");
            categoryList.appendChild(div);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
        document.getElementById("category-list").textContent =
          "Failed to load categories.";
      });
  };
  
  // Fetch categories when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
  });
  