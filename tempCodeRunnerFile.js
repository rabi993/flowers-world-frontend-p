fetch("http://127.0.0.1:8000/colors/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch colors");
        return response.json();
      })
      .then((data) => {
        console.log(data)
        // const colorSelect = document.getElementById("flowerColor");
        // colorSelect.innerHTML = ""; // Clear previous options
//         data.forEach((color) => {
//           const option = document.createElement("option");
//           option.value = color.slug; // Use slug as the value
//           option.textContent = color.name;
//           colorSelect.appendChild(option);
//         });
      })