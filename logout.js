const handlelogOut = () => {
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/buyers/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("buyer_id");
      localStorage.removeItem("username");
      localStorage.removeItem("username");
      localStorage.removeItem("order_ids");


      // Redirect to login page
      window.location.href = "login.html"; // Redirect to the login page
    });
};
