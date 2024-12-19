// Fetch and display users
const fetchUsers = () => {
    fetch("http://127.0.0.1:8000/users/")
        .then((response) => response.json())
        .then((users) => {
            const usersList = document.getElementById("users-list");
            usersList.innerHTML = ""; // Clear existing rows
            users.forEach((user) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.is_superuser ? 'Yes' : 'No'}</td>
                `;
                usersList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            alert("Failed to load users.");
        });
};

// Handle form submission to add a new user
const handleAddUser = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();
    const address = document.getElementById("address").value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const data = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: confirmPassword,
        address
    };

    fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        alert("User added successfully!");
        document.getElementById("user-form").reset();
        fetchUsers(); // Refresh the users list
    })
    .catch((error) => {
        console.error("Error adding user:", error);
        alert(`Error: ${error.message}`);
    });
};

// Initialize: Fetch users
fetchUsers();
