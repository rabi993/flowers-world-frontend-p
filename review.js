// document.addEventListener("DOMContentLoaded", () => {
//   const userId = localStorage.getItem("user_id");
//   const flowerId = new URLSearchParams(window.location.search).get("flowerId");

//   if (!userId || !flowerId) {
//     alert("Missing user or flower information.");
//     return;
//   }

//   // Fetch and fill the reviewer's name
//   fetch(`http://127.0.0.1:8000/users/${userId}/`) // Replace with your actual user API endpoint
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }
//       return response.json();
//     })
//     .then((userData) => {
//       const reviewerNameInput = document.getElementById("reviewerName");
//       reviewerNameInput.value = userData.first_name || "Guest";
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Failed to retrieve user details.");
//     });

//   // Fetch and fill the flower's name
//   fetch(`http://127.0.0.1:8000/flowers/${flowerId}/`) // Replace with your actual flower API endpoint
//     .then((response) => {
//       if (!response.ok) {
//         // throw new Error("Failed to fetch flower details");
//       }
//       return response.json();
//     })
//     .then((flowerData) => {
//       const flowerNameInput = document.getElementById("flowerName");
//       flowerNameInput.value = flowerData.title || "Unknown Flower";
//     })
//     .catch((error) => {
//       console.error(error);
//       // alert("Failed to retrieve flower details.");
//     });
// });

// const handleReviewSubmission = (event) => {
//   event.preventDefault(); // Prevent form refresh

//   const userId = localStorage.getItem("user_id");
//   const flowerId = new URLSearchParams(window.location.search).get("flowerId");

//   if (!userId || !flowerId) {
//     alert("Missing user or flower information.");
//     return;
//   }

//   // Gather form data
//   const reviewBody = document.getElementById("reviewBody").value;
//   const reviewRating = document.getElementById("reviewRating").value;

//   const reviewData = {
//     reviewer: userId, // Use user ID for backend submission
//     flower: flowerId, // Use flower ID for backend submission
//     body: reviewBody,
//     rating: reviewRating,
//   };

//   // Submit the review
//   fetch("http://127.0.0.1:8000/flowers/reviews/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reviewData),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to submit review");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       alert("Review submitted successfully!");

//       // Optionally reload reviews section
//       const reviewList = document.getElementById("doc-details-review");
//       reviewList.innerHTML = ""; // Clear existing reviews
//       fetch(`http://127.0.0.1:8000/flowers/reviews/?flower_id=${flowerId}`)
//         .then((res) => res.json())
//         .then((data) => doctorReview(data)); // Update the reviews display
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Error submitting review. Please try again later.");
//     });
// };

