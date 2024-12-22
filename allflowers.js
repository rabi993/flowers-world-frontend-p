const loadDoctors = (search = "") => {
    const doctorsContainer = document.getElementById("doctors");
    const spinner = document.getElementById("spinner");
    const noData = document.getElementById("nodata");
  
    doctorsContainer.innerHTML = "";
    spinner.style.display = "block";
    noData.style.display = "none";
  
    fetch(`http://127.0.0.1:8000/flowers/list/?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        spinner.style.display = "none";
        if (data.results && data.results.length > 0) {
          displyDoctors(data.results);
        } else {
          noData.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        spinner.style.display = "none";
        noData.style.display = "block";
      });
  };
  
  const displyDoctors = (doctors) => {
    // Sort doctors array by id in descending order
    const sortedDoctors = doctors.sort((a, b) => b.id - a.id);

  
    const doctorsContainer = document.getElementById("doctors");
    doctorsContainer.innerHTML = ""; // Clear previous content if any
  
    sortedDoctors.forEach((doctor) => {
      const div = document.createElement("div");
      div.classList.add("doc-card", "col-12", "col-md-6", "col-lg-4");
      div.innerHTML = `
        <img class="doc-img" src="${doctor.image}" alt="${doctor.title}" />
        <h4>${doctor.title}</h4>
        <div>${doctor.category.map((item) => `<button>${item}</button>`).join("")}</div>
        <h6>Available: ${doctor.available}</h6>
        <p>${doctor.content.slice(0, 40)}...</p>
        <h6>Price: ${doctor.price}</h6>
        <div>${doctor.color.map((item) => `<button>${item}</button>`).join("")}</div>
        <button>
          <a href="docDetails.html?flowerId=${doctor.id}">Details</a>
        </button>
      `;
      doctorsContainer.appendChild(div);
    });
  };
  

  
  const loadDesignation = () => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-deg");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button class="btn btn-link" onclick="loadDoctors('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  const loadSpecialization = () => {
    fetch("http://127.0.0.1:8000/colors/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-spe");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button class="btn btn-link" onclick="loadDoctors('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };
  
  const handleSearch = () => {
    const value = document.getElementById("search").value.trim();
    loadDoctors(value);
  };
  
  // Load initial data on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadDoctors();
    loadDesignation();
    loadSpecialization();
  });
  