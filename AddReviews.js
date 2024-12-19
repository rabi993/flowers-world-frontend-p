// Fetch and display reviews
const fetchReviews = () => {
    fetch("http://127.0.0.1:8000/flowers/reviews/")
        .then((response) => response.json())
        .then((reviews) => {
            const reviewsList = document.getElementById("reviews-list");
            reviewsList.innerHTML = ""; // Clear existing rows
            reviews.forEach((review) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${review.reviewer || "Anonymous"}</td>
                    <td>${review.flower}</td>
                    <td>${review.body}</td>
                    <td>${review.rating}</td>
                    <td>${new Date(review.created).toLocaleString()}</td>
                `;
                reviewsList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching reviews:", error);
            alert("Failed to load reviews.");
        });
};

// Handle form submission to add a review
const handleAddReview = (event) => {
    event.preventDefault();

    const flowerTitle = document.getElementById("flowerTitle").value.trim();
    const reviewBody = document.getElementById("reviewBody").value.trim();
    const reviewRating = document.getElementById("reviewRating").value;

    // Ensure all fields are filled
    if (!flowerTitle || !reviewBody || !reviewRating) {
        alert("All fields are required.");
        return;
    }

    const reviewData = {
        flower: flowerTitle,
        body: reviewBody,
        rating: reviewRating,
    };

    fetch("http://127.0.0.1:8000/flowers/reviews/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Review added successfully!");
            document.getElementById("review-form").reset();
            fetchReviews(); // Refresh the reviews list
        })
        .catch((error) => {
            console.error("Error adding review:", error);
            alert(`Error: ${error.message}`);
        });
};

// Initialize: Fetch reviews
fetchReviews();
