// const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
// const userId = localStorage.getItem('user_id');  // The logged-in user's ID

// const response = await fetch(`http://127.0.0.1:8000/buyers/change_password/${userId}/`, {
//     method: 'PUT',
//     headers: {
//         'Authorization': `Token ${token}`,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         old_password: oldPassword,
//         new_password: newPassword,
//     }),
// });
document.getElementById('change-password-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    document.getElementById('error-message').classList.add('d-none');
    document.getElementById('success-message').classList.add('d-none');

    try {
        const response = await fetch(`http://127.0.0.1:8000/buyers/change_password/${userId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            }),
        });

        const responseData = await response.json(); // Parsing the response as JSON

        if (!response.ok) {
            throw new Error(responseData.error || 'An error occurred');
        }

        document.getElementById('success-message').textContent = responseData.success;
        document.getElementById('success-message').classList.remove('d-none');

    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').classList.remove('d-none');
    }
});
