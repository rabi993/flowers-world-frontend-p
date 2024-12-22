document.getElementById('passwordChangeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');
  
    // Clear any previous messages
    messageDiv.innerHTML = '';
  
    try {
      const response = await fetch('http://127.0.0.1:8000/password-change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add a valid token here
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        messageDiv.innerHTML = `<p class="text-success">${result.success}</p>`;
        document.getElementById('passwordChangeForm').reset();
      } else {
        if (result.error instanceof Array) {
          // If error is an array, join the messages
          messageDiv.innerHTML = `<p class="text-danger">${result.error.join('<br>')}</p>`;
        } else {
          // Single error message
          messageDiv.innerHTML = `<p class="text-danger">${result.error}</p>`;
        }
      }
    } catch (error) {
      messageDiv.innerHTML = `<p class="text-danger">An error occurred. Please try again.</p>`;
      console.error('Error:', error);
    }
  });
  