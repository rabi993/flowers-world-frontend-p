
      // Check if the user is logged in
      if (localStorage.getItem("buyer_id")) {
        // Show Logout and Profile links
        document.querySelector(".logout-menu").classList.remove("d-none");
        document.querySelector(".profile-menu").classList.remove("d-none");
  
        // Hide Login and Registration links
        document.querySelector(".login-menu").classList.add("d-none");
        document.querySelector(".registration-menu").classList.add("d-none");
      } else {
        // Show Login and Registration links
        document.querySelector(".login-menu").classList.remove("d-none");
        document.querySelector(".registration-menu").classList.remove("d-none");
  
        // Hide Logout and Profile links
        document.querySelector(".logout-menu").classList.add("d-none");
        document.querySelector(".profile-menu").classList.add("d-none");
      }
  
      
    