// Fetch and display users
// const fetchUsers = () => {
//     fetch("http://127.0.0.1:8000/users/")
//         .then((response) => response.json())
//         .then((users) => {
//             const usersList = document.getElementById("users-list");
//             usersList.innerHTML = ""; // Clear existing rows
//             users.forEach((user) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${user.id}</td>
//                     <td>${user.username}</td>
//                     <td>${user.email}</td>
//                     <td>${user.first_name}</td>
//                     <td>${user.last_name}</td>
//                     <td>${user.is_superuser ? 'Yes' : 'No'}</td>
//                 `;
//                 usersList.appendChild(row);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching users:", error);
//             alert("Failed to load users.");
//         });
// };
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
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="openEditModal(${user.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                    </td>
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

const openEditModal = (userId) => {
    fetch(`http://127.0.0.1:8000/users/${userId}/`)
        .then((response) => response.json())
        .then((user) => {
            document.getElementById("editUserId").value = user.id;
            document.getElementById("editUsername").value = user.username;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editFirstName").value = user.first_name;
            document.getElementById("editLastName").value = user.last_name;
            $('#editUserModal').modal('show');
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details.");
        });
};

// Handle edit form submission
const handleEditUser = (event) => {
    event.preventDefault();

    const userId = document.getElementById("editUserId").value;
    const username = document.getElementById("editUsername").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const firstName = document.getElementById("editFirstName").value.trim();
    const lastName = document.getElementById("editLastName").value.trim();

    const data = { username, email, first_name: firstName, last_name: lastName };

    fetch(`http://127.0.0.1:8000/users/${userId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
            return response.json();
        })
        .then(() => {
            alert("User updated successfully!");
            fetchUsers(); // Refresh the users list
            $('#editUserModal').modal('hide'); // Close the modal
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        });
};


const deleteUser = (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://127.0.0.1:8000/users/${userId}/`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            alert("User deleted successfully!");
            fetchUsers(); // Refresh the users list
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        });
};
