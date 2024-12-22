const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const address = getValue("address"); 
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    address,
    password,
    confirm_password,
  };

  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      console.log(info);

      fetch("http://127.0.0.1:8000/buyers/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Registration failed. Please try again.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert("Registration successful! Check Your Email and Activate your Account. After activated Then You can log in.");
        window.location.href = "login.html";
      })
    } else {
      document.getElementById("error").innerText =
        "pass must contain eight characters, at least one letter, one number and one special character:";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
    alert("password and confirm password do not match");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleLogin1 = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  console.log(username, password);
  // Input validation
  if (!username || !password) {
    alert("Please provide both username and password.");
    return;
  }
  else  {
    fetch("http://127.0.0.1:8000/buyers/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id ) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          
          if (data.is_superuser) {
              window.location.href = "adminPanel.html";
          } else {
              window.location.href = "index.html";
          }
          
        }
        else {
          alert("Invalid login Info Please provide both username and password.");
        }
      });
  }
};

const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("login-username");
  const password = getValue("login-password");

  // Validate inputs
  if (!username || !password) {
    alert("Please provide both username and password.");
    return;
  }

  // API call for login
  fetch("http://127.0.0.1:8000/buyers/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid username or password.");
        } else {
          throw new Error("Login failed. Please try again later.");
        }
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        

        // Use `user_id` to fetch user details
        const userId = data.user_id;
        fetch(`http://127.0.0.1:8000/users/${userId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`, // Use token for authentication
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch user details.");
            }
            return res.json();
          })
          .then((userData) => {
            console.log(userData);

            localStorage.setItem("username", userData.username);
            if (userData.is_superuser) {
              window.location.href = "adminPanel.html";
            } else {
              window.location.href = "index.html";
              
            }
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
            alert("Failed to retrieve user details. Please try again.");
          });
      } else {
        alert("Unexpected response from the server. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert(error.message);
    });
};
