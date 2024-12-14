const loadServices = () => {
  // Fetch services from the API
  fetch('http://127.0.0.1:8000/services/')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => displayService(data))
    .catch((err) => {
      console.error("Failed to fetch services:", err);
      displayErrorMessage("Failed to load services. Please try again later.");
    });
};

const displayService = (services) => {
  const parent = document.getElementById("service-container");

  // Clear the parent container first (optional, in case of multiple calls)
  parent.innerHTML = "";

  services.forEach((service) => {
    const li = document.createElement("li");
    li.classList.add("mb-4"); // Optional: Add spacing between items
    li.innerHTML = `
      <div class="card shadow h-100">
        <div class="ratio ratio-16x9">
          <img
            src="${service.image}"
            class="card-img-top"
            loading="lazy"
            alt="${service.name || 'Service Image'}"
          />
        </div>
        <div class="card-body p-3 p-xl-5">
          <h3 class="card-title h5">${service.name || "Unnamed Service"}</h3>
          <p class="card-text">
            ${service.description ? service.description.slice(0, 140) : "No description available."}
          </p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });
};

const displayErrorMessage = (message) => {
  const parent = document.getElementById("service-container");
  parent.innerHTML = `<p class="text-danger">${message}</p>`;
};

// Call loadServices when the DOM is ready
document.addEventListener("DOMContentLoaded", loadServices);

// const loadServices = () => {
//   fetch("https://flowers-world-ten.vercel.app/services/")
//     .then((res) => res.json())
//     .then((data) => displayService(data))
//     .catch((err) => console.log(err));
// };

// const displayService = (services) => {
//     console.log(services);
//   services.forEach((service) => {
//     const parent = document.getElementById("service-container");
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <div class="card shadow h-100">
//                 <div class="ratio ratio-16x9">
//                   <img
//                     src=${service.image}
//                     class="card-img-top"
//                     loading="lazy"
//                     alt="..."
//                   />
//                 </div>
//                 <div class="card-body p-3 p-xl-5">
//                   <h3 class="card-title h5">${service.name}</h3>
//                   <p class="card-text">
//                     ${service.description.slice(0, 140)}
//                   </p>
//                   <a href="#" class="btn btn-primary">Details</a>
//                 </div>
//               </div>
//       `;
//     parent.appendChild(li);
//   });
// };

const loadDoctors = (search) => {
  document.getElementById("doctors").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `http://127.0.0.1:8000/flowers/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displyDoctors(data?.results);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displyDoctors = (doctors) => {
  doctors?.forEach((doctor) => {
    // console.log(doctor);
    const parent = document.getElementById("doctors");
    const div = document.createElement("div");
    div.classList.add("doc-card", "col-12", "col-md-6", "col-lg-4");
    div.innerHTML = `
        <img class="doc-img" src=${doctor.image} alt="" />
              <h4>${doctor?.title}</h4>
              ${doctor?.category?.map((item) => {
                return `<button>${item}</button>`;
              })}
              <h6>Available : ${doctor?.available}</h6>
              <p>
              ${doctor?.content.slice(0, 40)}...
              </p>
              
              <h6>Price : ${doctor?.price}</h6>
              <p>
              ${doctor?.color?.map((item) => {
                return `<button>${item}</button>`;
              })}
              </p>

              <button > <a target="_blank" href="docDetails.html?flowerId=${
                doctor.id
              }">Details</a> </button>
        `;

    parent.appendChild(div);
  });
};




const loadDesignation = () => {
  fetch("http://127.0.0.1:8000/categories/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-deg");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        // li.innerText = item?.name;
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')"> ${item?.name}</li>
          `;
        parent.appendChild(li);
      });
    });
};
const loadSpecialization = () => {
  fetch("http://127.0.0.1:8000/colors/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-spe");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')"> ${item.name}</li>
          `;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadDoctors(value);
};

const loadReview = () => {
  // fetch("https://testing-8az5.onrender.com/doctor/review/")
  fetch("http://127.0.0.1:8000/flowers/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
        <img src="./Images/girl.png" alt="" />
            <h4>${review.reviewer}</h4>
            <h5>${review.flower}</h5>
            <p>
             ${review.body.slice(0, 100)}
            </p>
            <h6>${review.rating}</h6>
        `;
    parent.appendChild(div);
  });
};

loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
loadReview();


const loadBuyerId = () => {
  const user_id = localStorage.getItem("user_id"); // Get the user_id from localStorage
  if (!user_id) {
    console.error("User ID is not found in localStorage.");
    return;
  }

  // Step 1: Fetch the username using user_id
  fetch(`http://127.0.0.1:8000/users/${user_id}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }
      return res.json();
    })
    .then((userData) => {
      // Store the username in localStorage
      localStorage.setItem("username", userData.username);
      const username = userData.username;

      // Step 2: Fetch the list of buyers
      return fetch(`http://127.0.0.1:8000/buyers/list/`);
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch buyers: ${res.statusText}`);
      }
      return res.json();
    })
    .then((buyersData) => {
      // Step 3: Find the buyer with the matching username
      const username = localStorage.getItem("username");
      const buyer = buyersData.find((buyer) => buyer.user === username);
      if (buyer) {
        // Store the buyer_id in localStorage
        localStorage.setItem("buyer_id", buyer.id);
        console.log(`Buyer ID (${buyer.id}) stored successfully.`);
      } else {
        console.error("No buyer found with the specified username.");
      }
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
    });
};

// Call the function
loadBuyerId();





