import APIFacade from './facade.js';

const api = new APIFacade();
        
// Global variables
let currentStudentId = null;
let authToken = localStorage.getItem('student_id');

// Check authentication
if (!authToken) {
    window.location.href = 'login.html';
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await api.post('get_student_id',{
            student_id:localStorage.getItem('student_id')
        })
    
         console.log(response);
         
        // Load profile
        document.getElementById('student-name').textContent = response.data.Name_Student;
        document.getElementById('student-avatar').src = response.data.Img_Student || 'https://via.placeholder.com/80';
        
        // Load mentorships
        loadMentorships();
        
        // Setup event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Failed to load dashboard');
    }
});

// Load mentorship opportunities
async function loadMentorships() {
    try {
        const response = await api.post("get_all_mentorship")
         console.log(response);
         
        const container = document.getElementById('mentorship-list');
        
        if (!response || response.data.length === 0) {
            container.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-8 text-center">
                    <i class="fas fa-comment-slash text-blue-300 text-4xl mb-4"></i>
                    <p class="text-gray-600">No mentorship opportunities available</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = response.data.map(mentorship => `
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold text-blue-800">${mentorship.Topic_Mentorship}</h4>
                        <p class="text-gray-600 mt-1">${mentorship.Description_Mentorship}</p>
                        <p class="text-sm text-gray-500 mt-2">
                            <i class="fas fa-user-graduate mr-1"></i> Mentor ID: ${mentorship.Id_Alumni}
                        </p>
                    </div>
                    <button data-mentorship-id="${mentorship.Id_Mentorship}" 
                            class="apply-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Apply Now
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading mentorships:', error);
        document.getElementById('mentorship-list').innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p class="text-red-600">Failed to load mentorships</p>
                <p class="text-sm text-red-500 mt-2">${error.message}</p>
            </div>
        `;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Apply for mentorship
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('apply-btn')) {
            const mentorshipId = e.target.getAttribute('data-mentorship-id');
            applyForMentorship(mentorshipId);
        }
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Close success modal
    document.getElementById('close-success-modal').addEventListener('click', function() {
        document.getElementById('success-modal').classList.add('hidden');
    });
}

// Apply for mentorship
async function applyForMentorship(mentorshipId) {
    try {
        const response = await api.post('apply_mentorship_student',{
            mentorship_id: mentorshipId,
            student_id: currentStudentId
        });
           console.log(response);
           
        if (response.status === 'success') {
            // Show success modal
            document.getElementById('success-modal').classList.remove('hidden');
        } else {
            throw new Error(result.message || 'Application failed');
        }
    } catch (error) {
        console.error('Application error:', error);
        alert(`Failed to apply: ${error.message}`);
    }
}

// Logout function
async function logout() {
    try {
        await fetch('logout');
        localStorage.removeItem('student_token');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}
