document.getElementById("change-password-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmNewPassword = document.getElementById("confirm-new-password").value;

  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  console.log("Token:", token);

  if (!token) {
      document.getElementById("message").innerText = "You are not logged in.";
      return;
  }

  try {
      const response = await fetch("http://127.0.0.1:8000/buyers/change-password/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`
          },
          body: JSON.stringify({
              old_password: oldPassword,
              new_password: newPassword,
              confirm_new_password: confirmNewPassword
          })
      });

      const data = await response.json();

      if (response.ok) {
          document.getElementById("message").innerText = data.success;
          document.getElementById("change-password-form").reset();
      } else {
          document.getElementById("message").innerText = data.error || "Something went wrong!";
      }
  } catch (error) {
      document.getElementById("message").innerText = "An error occurred.";
  }
});
