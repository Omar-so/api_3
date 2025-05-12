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

// Utility functions for notifications
function showNotification(type, title, message) {
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    
    // Set content
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Set icon and colors based on type
    if (type === 'success') {
        notificationIcon.className = 'w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-green-100 text-green-500';
        notificationIcon.innerHTML = '<i class="fas fa-check"></i>';
    } else if (type === 'error') {
        notificationIcon.className = 'w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-red-100 text-red-500';
        notificationIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    } else {
        notificationIcon.className = 'w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-blue-100 text-blue-500';
        notificationIcon.innerHTML = '<i class="fas fa-info"></i>';
    }
    
    // Show notification
    notification.classList.remove('translate-y-full');
    
    // Auto hide after 5 seconds
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('translate-y-full');
}

// Form handling
document.getElementById('admin-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    
    if (!username) {
        document.getElementById('admin-username-error').textContent = 'Username is required';
        document.getElementById('admin-username-error').classList.remove('hidden');
        return;
    }
    
    if (!password) {
        document.getElementById('admin-password-error').textContent = 'Password is required';
        document.getElementById('admin-password-error').classList.remove('hidden');
        return;
    }
      console.log(username , " ",password);
      try {
        const response = await api.post('login_admin', {
            email: username,
            password: password
        });
        console.log("response ",response);
    
        if(response.status == 200) { 
            window.location.href='dashboard.html'
            showNotification('success', 'Login Successful', 'Welcome back, Administrator!');
            
        } else {
            showNotification('error', 'Login Failed', 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        showNotification('error', 'Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
});

document.getElementById('alumni-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('alumni-email').value.trim();
    const password = document.getElementById('alumni-password').value;
    
    if (!email) {
        document.getElementById('alumni-email-error').textContent = 'Email is required';
        document.getElementById('alumni-email-error').classList.remove('hidden');
        return;
    }
    
    if (!password) {
        document.getElementById('alumni-password-error').textContent = 'Password is required';
        document.getElementById('alumni-password-error').classList.remove('hidden');
        return;
    }
    
    try {
        const response = await api.post('login_alumni', {
            email: email,
            password: password
        });
        if(response.status == 200){
        showNotification('success', 'Login Successful', 'Welcome back to Alumni Portal!');
        localStorage.setItem('alumni_id', response.data);
        console.log(localStorage.getItem('alumni_id'));

        // Redirect to alumni dashboard
        setTimeout(() => {
            window.location.href = 'alumni_dashboard.html';
            console.log('Would redirect to alumni dashboard');
        }, 1500);
    }else{
        showNotification('error', 'Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
    } catch (error) {
        showNotification('error', 'Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
});

document.getElementById('student-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('student-id').value.trim();
    const password = document.getElementById('student-password').value;
    
    if (!studentId) {
        document.getElementById('student-id-error').textContent = 'Student ID is required';
        document.getElementById('student-id-error').classList.remove('hidden');
        return;
    }
    
    if (!password) {
        document.getElementById('student-password-error').textContent = 'Password is required';
        document.getElementById('student-password-error').classList.remove('hidden');
        return;
    }
    
    try {
        const response = await api.post('login_student', {
            email: studentId,
            password: password
        });
        console.log("thos is the response" , response);
        if(response.status == 200){
        showNotification('success', 'Login Successful', 'Welcome back, Student!');

        localStorage.setItem('student_id', response.student.id);
        console.log(response.student.id);
        
        // Redirect to student dashboard
        setTimeout(() => {
            window.location.href = 'stuednt_dashboard.html';
            console.log('Would redirect to student dashboard');
        }, 1500);
    }else{
        showNotification('error', 'Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
        
    } catch (error) {
        showNotification('error', 'Login Failed', error.message || 'Invalid credentials. Please try again.');
    }
});
