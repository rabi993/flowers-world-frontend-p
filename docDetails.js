const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("flowerId");
  loadTime(param);
  fetch(`http://127.0.0.1:8000/flowers/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

  fetch(`http://127.0.0.1:8000/flowers/reviews/?flower_id=${param}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data));
};

const doctorReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-details-review");
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

const displayDetails = (doctor) => {
  console.log(doctor);
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
    <div class="doctor-img">
    <img src=${doctor.image} alt="" />
  </div>
  <div class="doc-info">
    <h4>${doctor?.title}</h4>
              ${doctor?.category?.map((item) => {
                return `<button>${item}</button>`;
              })}
              <h6>Available : ${doctor?.available}</h6>
              <p>
              ${doctor?.content}
              </p>
              
              <h6>Price : ${doctor?.price}</h6>
              <p>
              ${doctor?.color?.map((item) => {
                return `<button>${item}</button>`;
              })}
              </p>
    <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
   Buy Now
  </button>
  </div>
    `;
  parent.appendChild(div);
};

const handleReviewSubmission = (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  const reviewerName = document.getElementById("reviewerName").value;
  const reviewBody = document.getElementById("reviewBody").value;
  const reviewRating = document.getElementById("reviewRating").value;
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  const reviewData = {
    reviewer: reviewerName,
    body: reviewBody,
    rating: reviewRating,
    flower: flowerId, // Assuming `flower` is the key for the flower ID
  };

  fetch("http://127.0.0.1:8000/flowers/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    })
    .then((data) => {
      alert("Review submitted successfully!");
      // Optionally, reload the reviews section to show the newly added review
      const reviewList = document.getElementById("doc-details-review");
      reviewList.innerHTML = ""; // Clear existing reviews
      fetch(`http://127.0.0.1:8000/flowers/reviews/?flower_id=${flowerId}`)
        .then((res) => res.json())
        .then((data) => doctorReview(data));
    })
    .catch((error) => {
      console.error(error);
      alert("Error submitting review. Please try again later.");
    });
};


const loadTime = (id) => {
  fetch(
    `https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("time-container");
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.name;
        parent.appendChild(option);
      });
      console.log(data);
    });
};

const handleAppointment = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById("symptom").value;
  const time = document.getElementById("time-container");
  const selectedTime = time.options[time.selectedIndex];
  const patient_id = localStorage.getItem("patient_id");
  const info = {
    appointment_type: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: patient_id,
    doctor: param,
  };

  console.log(info);
  fetch("https://testing-8az5.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `pdf.html?doctorId=${param}`;
      // handlePdf();
      // console.log(data);
    });
};

const loadPatientId = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`https://testing-8az5.onrender.com/patient/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("patient_id", data[0].id);
    });
};

loadPatientId();
getparams();
loadTime();
