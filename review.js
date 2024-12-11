const handleReview = (event) => {
    event.preventDefault();
  
    const buyerId = localStorage.getItem("user_id");
    const flowerId = new URLSearchParams(window.location.search).get("flowerid");
    const body = document.getElementById("body").value;
    const rating = document.getElementById("rating").value;
  
    if (!buyerId || !flowerId || !body || !rating) {
      document.getElementById("error").innerText = "All fields are required!";
      return;
    }
  
    const info = {
      reviewer_id: buyerId,
      flower_id: flowerId,
      body,
      rating,
    };
  
    fetch("http://127.0.0.1:8000/flowers/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit the review.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Review submitted successfully!");
        document.querySelector("form").reset();
        document.getElementById("error").innerText = "";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("error").innerText =
          "An error occurred. Please try again.";
      });
  };

  <div id="review-form">
      <h1 class="title">Add Review</h1>
      <p class="description text-center w-50 m-auto">
        Share your feedback about our flowers!
      </p>
      <form onsubmit="handleReview(event)">
        <p id="error" class="text-danger"></p>
    
        <!-- Reviewer Name (Auto-filled, Non-editable) -->
        <input
          id="reviewer"
          type="text"
          class="input"
          placeholder="Reviewer Name"
          readonly
        />
    
        <!-- Flower Title (Auto-filled, Non-editable) -->
        <input
          id="flower"
          type="text"
          class="input"
          placeholder="Flower Title"
          readonly
        />
    
        <!-- Review Body -->
        <textarea
          id="body"
          class="input"
          placeholder="Write your review"
          rows="4"
          required
        ></textarea>
    
        <!-- Rating -->
        <select id="rating" class="input" required>
          <option value="" disabled selected>Select Rating</option>
          <option value="⭐">⭐</option>
          <option value="⭐⭐">⭐⭐</option>
          <option value="⭐⭐⭐">⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
        </select>
    
        <button type="submit" class="submit-btn">Submit Review</button>
      </form>
    </div>
  