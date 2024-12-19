// Handle form submission to add a new color
const handleAddColor = (event) => {
    event.preventDefault(); // Prevent form refresh
  
    // Gather form data
    const colorBody = document.getElementById("colorBody").value.trim();
  
    if (!colorBody) {
      alert("Color name cannot be empty.");
      return;
    }
    const slug = colorBody.toLowerCase().replace(/\s+/g, "-"); // Generate slug
    const colorData = {
    name: colorBody,
    slug: slug, // Include slug in the request
    };

    // const colorData = {
    //   name: colorBody, // Assuming the API expects "name" for the color field
    // };
  
    // Submit the color
    fetch("http://127.0.0.1:8000/colors/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorData),
    })
      .then((response) => {
        if (!response.ok) {
          // Get server-side error if available
          return response.json().then((errorData) => {
            console.error("Server error:", errorData);
            throw new Error(errorData.detail || "Failed to submit color.");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Color submitted successfully!");
        // Clear the input field
        document.getElementById("colorBody").value = "";
        // Refresh the color list
        fetchColors();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(`Error submitting color: ${error.message}`);
      });
  };
  
  // Fetch and display the list of colors
  const fetchColors = () => {
    fetch("http://127.0.0.1:8000/colors/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch colors.");
        }
        return response.json();
      })
      .then((colors) => {
        const colorList = document.getElementById("color-list");
        colorList.innerHTML = ""; // Clear existing colors
        if (colors.length === 0) {
          colorList.textContent = "No colors available.";
        } else {
          colors.forEach((color) => {
            const div = document.createElement("div");
            div.textContent = color.name; // Assuming the API returns color objects with "name"
            div.classList.add("m-2","btn","btn-info");
            colorList.appendChild(div);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching colors:", error.message);
        document.getElementById("color-list").textContent =
          "Failed to load colors.";
      });
  };
  
  // Fetch colors when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetchColors();
  });
  