import APIFacade from './facade.js';

const api = new APIFacade();
        
// Toggle between user types
document.getElementById('btn-admin').addEventListener('click', function() {
    document.getElementById('admin-form').classList.remove('hidden');
    document.getElementById('alumni-form').classList.add('hidden');
    document.getElementById('student-form').classList.add('hidden');
    
    this.classList.remove('bg-transparent', 'text-white', 'border', 'border-white');
    this.classList.add('bg-white', 'text-blue-800');
    
    document.getElementById('btn-alumni').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-alumni').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
    
    document.getElementById('btn-student').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-student').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
});

document.getElementById('btn-alumni').addEventListener('click', function() {
    document.getElementById('admin-form').classList.add('hidden');
    document.getElementById('alumni-form').classList.remove('hidden');
    document.getElementById('student-form').classList.add('hidden');
    
    // Update active button styles
    this.classList.remove('bg-transparent', 'text-white', 'border', 'border-white');
    this.classList.add('bg-white', 'text-blue-800');
    
    document.getElementById('btn-admin').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-admin').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
    
    document.getElementById('btn-student').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-student').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
});

document.getElementById('btn-student').addEventListener('click', function() {
    document.getElementById('admin-form').classList.add('hidden');
    document.getElementById('alumni-form').classList.add('hidden');
    document.getElementById('student-form').classList.remove('hidden');
    
    // Update active button styles
    this.classList.remove('bg-transparent', 'text-white', 'border', 'border-white');
    this.classList.add('bg-white', 'text-blue-800');
    
    document.getElementById('btn-admin').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-admin').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
    
    document.getElementById('btn-alumni').classList.remove('bg-white', 'text-blue-800');
    document.getElementById('btn-alumni').classList.add('bg-transparent', 'text-white', 'border', 'border-white');
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordInput = this.closest('div').querySelector('input');
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Toggle dark/light theme
let darkMode = false;
document.getElementById('theme-toggle').addEventListener('click', function() {
    const icon = this.querySelector('i');
    darkMode = !darkMode;
    
    if (darkMode) {
        document.body.classList.add('bg-gray-900');
        document.querySelectorAll('.bg-white').forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-gray-800');
        });
        document.querySelectorAll('.text-gray-700, .text-gray-800').forEach(el => {
            el.classList.add('text-gray-300');
            el.classList.remove('text-gray-700', 'text-gray-800');
        });
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('bg-gray-900');
        document.querySelectorAll('.bg-gray-800').forEach(el => {
            el.classList.remove('bg-gray-800');
            el.classList.add('bg-white');
        });
        document.querySelectorAll('.text-gray-300').forEach(el => {
            el.classList.remove('text-gray-300');
            el.classList.add('text-gray-700');
        });
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});


function showNotification(type, title, message) {
  const notification = document.getElementById("notification");
  const notificationIcon = document.getElementById("notificationIcon");
  const notificationTitle = document.getElementById("notificationTitle");
  const notificationMessage = document.getElementById("notificationMessage");

  // Set content
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  // Set icon and colors based on type
  if (type === "success") {
    notificationIcon.className =
      "w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-green-100 text-green-500";
    notificationIcon.innerHTML = '<i class="fas fa-check"></i>';
  } else if (type === "error") {
    notificationIcon.className =
      "w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-red-100 text-red-500";
    notificationIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  } else {
    notificationIcon.className =
      "w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-100 text-blue-500";
    notificationIcon.innerHTML = '<i class="fas fa-info"></i>';
  }

  // Show notification
  notification.classList.remove("translate-y-full");

  // Auto hide after 5 seconds
  setTimeout(hideNotification, 5000);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("translate-y-full");
}

// function validateEmail(email) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

// function validatePassword(password) {
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//   return re.test(String(password));
// }

function validateImageFile(file) {
  // Check file type
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Invalid file type. Please upload JPG, PNG or GIF",
    };
  }

  // Check file size (max 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    return { valid: false, message: "File size exceeds 2MB limit" };
  }

  return { valid: true };
}

// Handle image preview
document
  .getElementById("profileImage")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const imagePreview = document.getElementById("imagePreview");
    const imageError = document.getElementById("imageError");

    // Validate image
    const validation = validateImageFile(file);
    if (!validation.valid) {
      imageError.textContent = validation.message;
      imageError.classList.remove("hidden");
      // Reset file input
      this.value = "";
      return;
    }

    // Hide error if previously shown
    imageError.classList.add("hidden");

    // Create preview
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
    };
    reader.readAsDataURL(file);
  });

// Form submission
document
  .getElementById("alumni-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Reset error messages
    document
      .querySelectorAll('[id$="Error"]')
      .forEach((el) => el.classList.add("hidden"));

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const job = document.getElementById("job").value.trim();
    const department = document.getElementById("department").value;
    const imageFile = document.getElementById("profileImage").files[0];
console.log( name ,email);

    // Validate  inputs
    let isValid = true;

    if (!name) {
      document.getElementById("nameError").textContent = "Name is required";
      document.getElementById("nameError").classList.remove("hidden");
      isValid = false;
    }

    if (!email) {
      document.getElementById("emailError").textContent = "Email is required";
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    } 

    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required";
      document.getElementById("passwordError").classList.remove("hidden");
      isValid = false;
    } 
    
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match";
      document
        .getElementById("confirmPasswordError")
        .classList.remove("hidden");
      isValid = false;
    }

    if (!job) {
      document.getElementById("jobError").textContent =
        "Current job is required";
      document.getElementById("jobError").classList.remove("hidden");
      isValid = false;
    }

    if (!department) {
      document.getElementById("departmentError").textContent =
        "Department is required";
      document.getElementById("departmentError").classList.remove("hidden");
      isValid = false;
    }

    if (!imageFile) {
      document.getElementById("imageError").textContent =
        "Profile image is required";
      document.getElementById("imageError").classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) return;

    // Prepare form data for submission
    const formData = {
      name: name,
      email: email,
      password: password,
      job: job,
      department: department,
      img: imageFile,
    };    
    try {
      console.log(formData);
      
      // Submit using our API facade
      const response = await api.post("alumni_register", formData, true);
       
      console.log("this is the response" , response);
      
      if(response.status == 201 ){
      showNotification(
        "success",
        "Registration Successful",
        "Your alumni account has been created successfully."
      );

      // Reset form
      this.reset();
      document.getElementById("imagePreview").innerHTML =
        '<i class="fas fa-user text-gray-400 text-4xl"></i>';

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        // window.location.href = 'login.html';
        console.log("Would redirect to login page");
      }, 2000);
    }
    } catch (error) {
      // Show error notification
      showNotification(
        "error",
        "Registration Failed",
      );
    }
  });


  document
  .getElementById("admin-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Reset error messages
    document
      .querySelectorAll('[id$="Error"]')
      .forEach((el) => el.classList.add("hidden"));

    // Get form values
    const name = document.getElementById("name_admin").value.trim();
    const email = document.getElementById("email_admin").value.trim();
    const password = document.getElementById("password_admin").value;
    const confirmPassword = document.getElementById("confirmPassword_admin").value;
    const imageFile = document.getElementById("profileImage_admin").files[0];
     console.log( name ,email, imageFile);

    // Validate  inputs
    let isValid = true;

    if (!name) {
      document.getElementById("nameError").textContent = "Name is required";
      document.getElementById("nameError").classList.remove("hidden");
      isValid = false;
    }

    if (!email) {
      document.getElementById("emailError").textContent = "Email is required";
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    } 

    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required";
      document.getElementById("passwordError").classList.remove("hidden");
      isValid = false;
    } 
    
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match";
      document
        .getElementById("confirmPasswordError")
        .classList.remove("hidden");
      isValid = false;
    }

   
    if (!imageFile) {
      document.getElementById("imageError").textContent =
        "Profile image is required";
      document.getElementById("imageError").classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) return;

    // Prepare form data for submission
    const formData = {
      name: name,
      email: email,
      password: password,
      img: imageFile,
    };    
    try {
      console.log(formData);
      
      // Submit using our API facade
      const response = await api.post("reg_admin", formData, true);
       
      console.log("this is the response" , response);
      
      if(response.status == 201 ){
      showNotification(
        "success",
        "Registration Successful",
        "Your admin account has been created successfully."
      );

      // Reset form
      this.reset();
      document.getElementById("imagePreview").innerHTML =
        '<i class="fas fa-user text-gray-400 text-4xl"></i>';

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        // window.location.href = 'login.html';
        console.log("Would redirect to login page");
      }, 2000);
    }
    } catch (error) {
      // Show error notification
      showNotification(
        "error",
        "Registration Failed",
      );
    }
  });


  document.getElementById("student-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Reset error messages
    document
      .querySelectorAll('[id$="Error"]')
      .forEach((el) => el.classList.add("hidden"));

    // Get form values
    const name = document.getElementById("name_st").value.trim();
    const email = document.getElementById("email_st").value.trim();
    const password = document.getElementById("password_st").value;
    const confirmPassword = document.getElementById("confirmPassword_st").value;
    const imageFile = document.getElementById("profileImage_st").files[0];
console.log( name ,email , imageFile);

    // Validate  inputs
    let isValid = true;

    if (!name) {
      document.getElementById("nameError").textContent = "Name is required";
      document.getElementById("nameError").classList.remove("hidden");
      isValid = false;
    }

    if (!email) {
      document.getElementById("emailError").textContent = "Email is required";
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    } 

    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required";
      document.getElementById("passwordError").classList.remove("hidden");
      isValid = false;
    } 
    
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match";
      document
        .getElementById("confirmPasswordError")
        .classList.remove("hidden");
      isValid = false;
    }

   
    if (!imageFile) {
      document.getElementById("imageError").textContent =
        "Profile image is required";
      document.getElementById("imageError").classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) return;

    // Prepare form data for submission
    const formData = {
      name: name,
      email: email,
      password: password,
      img: imageFile,
    };    
    try {
      console.log(formData);
      
      // Submit using our API facade
      const response = await api.post("reg_student", formData, true);
       
      console.log("this is the response" , response);
      
      if(response.status == 201 ){
      showNotification(
        "success",
        "Registration Successful",
        "Your student account has been created successfully."
      );

      // Reset form
      this.reset();
      document.getElementById("imagePreview").innerHTML =
        '<i class="fas fa-user text-gray-400 text-4xl"></i>';

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        // window.location.href = 'login.html';
      }, 2000);
    }
    } catch (error) {
      // Show error notification
      showNotification(
        "error",
        "Registration Failed",
      );
    }
  });
