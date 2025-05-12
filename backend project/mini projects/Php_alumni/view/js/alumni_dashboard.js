
import APIFacade from './facade.js';

const api = new APIFacade();

// Global variables
let currentAlumniId = null;
let authToken = localStorage.getItem('alumni_id');

// DOM Elements
const navLinks = {
    dashboard: document.getElementById('dashboard-link'),
    mentorship: document.getElementById('mentorship-link'),
    groups: document.getElementById('groups-link'),
    events: document.getElementById('events-link'),
    stories: document.getElementById('stories-link')
};

const contentSections = {
    dashboard: document.getElementById('dashboard-content'),
    mentorship: document.getElementById('mentorship-content'),
    groups: document.getElementById('groups-content'),
    events: document.getElementById('events-content'),
    stories: document.getElementById('stories-content')
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set up navigation
    setupNavigation();
    
    // Load initial data
    loadProfileData();
    loadUpcomingEvents();
    loadRecentNews();
    loadYourGroups();

    loadRecentFeedback(); 

    
    setupEventListeners();
    
});

function setupNavigation() {
    showSection('dashboard');
    
    for (const [section, link] of Object.entries(navLinks)) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(section);
            
            if (section === 'mentorship') {
                loadMentorshipOpportunities();
            } else if (section === 'groups') {
                loadAllGroups();
            } else if (section === 'events') {
                loadAllEvents();
            } else if (section === 'stories') {
                loadAllStories();
            }
        });
    }
}

function showSection(section) {
    for (const contentSection of Object.values(contentSections)) {
        contentSection.classList.add('hidden');
    }
    
    contentSections[section].classList.remove('hidden');
    
    for (const [linkSection, link] of Object.entries(navLinks)) {
        if (linkSection === section) {
            link.classList.add('text-blue-300', 'font-semibold');
        } else {
            link.classList.remove('text-blue-300', 'font-semibold');
        }
    }
}

function setupEventListeners() {
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Edit profile
    document.getElementById('edit-profile-btn').addEventListener('click', showEditProfileModal);
    document.getElementById('close-modal-btn').addEventListener('click', hideEditProfileModal);
    document.getElementById('cancel-edit-btn').addEventListener('click', hideEditProfileModal);
    document.getElementById('edit-profile-form').addEventListener('submit', updateProfile);
    
    // Quick actions
    document.getElementById('create-story-btn').addEventListener('click', () => {
        showSection('stories');
        document.getElementById('new-story-btn').click();
    });
    document.getElementById('offer-mentorship-btn').addEventListener('click', () => {
        showSection('mentorship');
        document.getElementById('new-mentorship-btn').click();
    });
    document.getElementById('create-group-btn').addEventListener('click', () => {
        showSection('groups');
        document.getElementById('new-group-btn').click();
    });

    document.getElementById('view-all-feedback')?.addEventListener('click', (e) => {
        e.preventDefault();
        showAllFeedbackModal();
    });

   document.getElementById('Create Feedback').addEventListener('click', showFeedbackModal);
    console.log(
        document.getElementById('Create Feedback'));
    
    // Mentorship
    document.getElementById('new-mentorship-btn').addEventListener('click', toggleMentorshipForm);
    document.getElementById('cancel-mentorship-btn').addEventListener('click', toggleMentorshipForm);
    document.getElementById('offer-mentorship-form').addEventListener('submit', offerMentorship);
    
    // Groups
    document.getElementById('new-group-btn').addEventListener('click', toggleGroupForm);
    document.getElementById('cancel-group-btn').addEventListener('click', toggleGroupForm);
    document.getElementById('create-group-form').addEventListener('submit', createGroup);
    
    // Stories
    document.getElementById('new-story-btn').addEventListener('click', toggleStoryForm);
    document.getElementById('cancel-story-btn').addEventListener('click', toggleStoryForm);
    document.getElementById('create-story-form').addEventListener('submit', createStory);
}


// Data Loading Functions
async function loadProfileData() {
    try {
        const data = await api.post('get_alumni_id',{
            alumni_id : authToken
        });
        currentAlumniId = data.data.Id_Alumni;

        
        document.getElementById('profile-name').textContent = data.data.Name_Alumni;
        document.getElementById('profile-job').textContent = data.data.Job_Alumni || 'Not specified';
        document.getElementById('profile-dept').textContent = data.data.Department_Alumni || 'Not specified';
        document.getElementById('profile-img').src = data.data.Img_Alumni || 'https://via.placeholder.com/80';
        
        document.getElementById('edit-name').value = data.data.Name_Alumni;
        document.getElementById('edit-email').value = data.data.Email_Alumni;
        document.getElementById('edit-job').value = data.data.Job_Alumni || '';
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}
function showAllFeedbackModal() {
    const modal = document.createElement('div');
    modal.id = 'all-feedback-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">All Feedback</h3>
                    <button id="close-all-feedback-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="all-feedback-list" class="overflow-y-auto max-h-[70vh] pr-2">
                    <div class="text-center py-4">
                        <i class="fas fa-spinner fa-spin text-blue-500"></i>
                        <p class="mt-2 text-gray-600">Loading feedback...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    loadAllFeedback();
    
    document.getElementById('close-all-feedback-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

async function loadAllFeedback() {
    try {
        const response = await api.post('get_all_feedback');
        console.log(response);
        
        const container = document.getElementById('all-feedback-list');
        if (!container) return;
        
        if (!response.data || response.data.length === 0) {
            container.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-8 text-center">
                    <i class="fas fa-comment-slash text-blue-300 text-4xl mb-4"></i>
                    <p class="text-gray-600">No feedback submissions found</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="space-y-4">
                ${response.data.map(feedback => `
                    <div class="bg-white border rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h4 class="font-semibold capitalize">${feedback.Content_Feedback}</h4>
                                <p class="text-sm text-gray-500">${formatDate(feedback.Submitted_At_Feedback)}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full 
                                ${feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  feedback.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                                  'bg-blue-100 text-blue-800'}">
                                ${feedback.status}
                            </span>
                        </div>
                        <p class="text-gray-700">${feedback.content}</p>
                        ${feedback.response ? `
                            <div class="mt-3 pt-3 border-t">
                                <h5 class="font-medium text-gray-900">Admin Response:</h5>
                                <p class="text-gray-600 mt-1">${feedback.Response_Admin}</p>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading all feedback:', error);
        const container = document.getElementById('all-feedback-list');
        container.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p class="text-red-600">Failed to load feedback</p>
                <p class="text-sm text-red-500 mt-2">${error.message}</p>
            </div>
        `;
    }
}


async function loadUpcomingEvents() {
    const container = document.getElementById('upcoming-events'); 

    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_event", {
            method: 'GET',
            credentials: 'include' 
        });

        const data = await response.json();
        console.log(data);

        if ( data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No upcoming events</p>';
            return;
        }

        const now = new Date();
        const upcomingEvents = data.data
            .filter(event => new Date(event.Event_Date) >= now)
            .sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date))
            .slice(0, 3);

        if (upcomingEvents.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No upcoming events</p>';
            return;
        }

        container.innerHTML = upcomingEvents.map(event => `
            <div class="border-l-4 border-blue-500 pl-4 py-2">
                <h4 class="font-semibold">${event.Name_Event}</h4>
                <p class="text-sm text-gray-600">${formatDate(event.Event_Date)}</p>
                <p class="text-sm text-gray-600">${event.Location_Event}</p>
                <button data-event-id="${event.Id_Event}" class="mt-2 text-blue-600 hover:underline text-sm register-event-btn">Register</button>
            </div>
        `).join('');

    
        document.querySelectorAll('.register-event-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.getAttribute('data-event-id');
                registerForEvent(eventId);
            });
        });

    } catch (error) {
        console.error('Error loading upcoming events:', error);
        container.innerHTML = '<p class="text-red-600">Failed to load events.</p>';
    }
}


async function loadRecentNews() {
    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_news", {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();
        console.log(data);    
         const container = document.getElementById('recent-news');
        
        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No recent news</p>';
            return;
        }
        
        const recentNews = data.data.slice(0, 3);
        
        container.innerHTML = recentNews.map(news => `
            <div class="border-b pb-4">
                <h4 class="font-semibold">${news.Title_News}</h4>
                <p class="text-gray-600 mt-1">${news.Content_News.substring(0, 100)}${news.Content_News.length > 100 ? '...' : ''}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading recent news:', error);
    }
}

async function loadYourGroups() {
    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_groups", {
            method: 'GET',
            credentials: 'include' 
        });

        const data = await response.json();
        console.log(data);       
         const container = document.getElementById('your-groups');
        
        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">You are not part of any groups yet</p>';
            return;
        }
        
        const yourGroups = data.data.slice(0, 3);
        
        container.innerHTML = yourGroups.map(group => `
            <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-semibold">${group.Name_Group}</h4>
                <p class="text-sm text-gray-600 capitalize">${group.Type_Group}</p>
                <div class="mt-3 flex justify-between items-center">
                    <button data-group-id="${group.Id_Group}" class="text-blue-600 hover:underline text-sm view-group-btn">View</button>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.view-group-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const groupId = e.target.getAttribute('data-group-id');
                showGroupPosts(groupId);
            });
        });
    } catch (error) {
        console.error('Error loading your groups:', error);
    }
}
/////////////


async function loadRecentFeedback() {
    try {
        const response = await api.post('get_all_feedback');
        
        console.log(response);
        
        const container = document.getElementById('recent-feedback');
        
        if (!response.data || response.data.length === 0) {
            container.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-4 text-center">
                    <i class="fas fa-comment-slash text-blue-300 text-2xl mb-2"></i>
                    <p class="text-gray-600">No feedback submissions yet</p>
                </div>
            `;
            return;
        }
        
        const recentFeedback = response.data.slice(0, 3);
        container.innerHTML = recentFeedback.map(feedback => `
            <div class="border-l-4 border-blue-500 pl-4 py-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold capitalize">UNKOWN</h4>
                        <p class="text-gray-600 mt-1">${feedback.Content_Feedback.substring(0, 80)}${feedback.Content_Feedback.length > 80 ? '...' : ''}</p>
                    </div>
                    <span class="text-sm text-gray-500">${formatDate(feedback.Submitted_At_Feedback)}</span>
                </div>
                <div class="mt-2">
                    ${feedback.Response_Admin ? `
                        <div class="bg-green-50 border-l-4 border-green-400 pl-3 py-1">
                            <p class="text-xs font-medium text-green-800">Admin Response:</p>
                            <p class="text-sm text-green-700">${feedback.Response_Admin}</p>
                        </div>
                    ` : `
                        <span class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                        </span>
                    `}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading recent feedback:', error);
        const container = document.getElementById('recent-feedback');
        container.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p class="text-red-600">Failed to load feedback</p>
                <p class="text-sm text-red-500 mt-2">${error.message}</p>
            </div>
        `;
    }
}

///////////////////

async function loadMentorshipOpportunities() {
    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_mentorship", {
            method: 'GET',
            credentials: 'include' 
        });
        
        const container = document.getElementById('mentorship-list');
        const data = await response.json();
        console.log(data.data);      

        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No mentorship opportunities available</p>';
            return;
        }
        
        container.innerHTML = data.data.map(mentorship => `
            <div class="bg-white border rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold">${mentorship.Topic_Mentorship}</h4>
                        <p class="text-gray-600 mt-1">${mentorship.Description_Mentorship}</p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${mentorship.status || 'Available'}</span>
                </div>
                <div class="mt-3 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <img src="${mentorship.alumni_img || 'https://via.placeholder.com/30'}" alt="Mentor" class="h-6 w-6 rounded-full">
                        <span class="text-sm text-gray-600">${mentorship.Id_Alumni}</span>
                    </div>
                    <button data-mentorship-id="${mentorship.Id_Mentorship}" class="text-blue-600 hover:underline text-sm view-mentorship-btn">Details</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading mentorship opportunities:', error);
    }
}

async function loadAllGroups() {
    try {
       const response = await fetch("http://localhost:8000/index.php?action=get_all_groups", {
            method: 'GET',
            credentials: 'include' // Important if you're using cookies/sessions
        });
        
        const data = await response.json();       
         const container = document.getElementById('all-groups-list');
        
        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No groups available</p>';
            return;
        }
        
        container.innerHTML = data.data.map(group => `
            <div class="bg-white border rounded-lg p-3 flex justify-between items-center">
                <div>
                    <h4 class="font-semibold">${group.Name_Group}</h4>
                    <p class="text-sm text-gray-600 capitalize">${group.Type_Group}</p>
                </div>
                <div class="flex space-x-2">
                    <button data-group-id="${group.Id_Group}" class="text-blue-600 hover:underline text-sm join-group-btn">Join</button>
                    <button data-group-id="${group.Id_Group}" class="text-gray-600 hover:underline text-sm view-group-btn">View</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to buttons
        document.querySelectorAll('.join-group-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const groupId = e.target.getAttribute('data-group-id');
                joinGroup(groupId);
            });
        });
        
        document.querySelectorAll('.view-group-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const groupId = e.target.getAttribute('data-group-id');
                showGroupPosts(groupId);
            });
        });
    } catch (error) {
        console.error('Error loading all groups:', error);
    }
}

async function showGroupPosts(groupId) {
    try {
        const response = await api.post('get_all_post_goups', {
            group_id: groupId 
        });
        
        console.log('API Response:', response);
        
        const container = document.getElementById('group-posts-container');
        if (!container) {
            console.error('Container element not found');
            return;
        }

        if (!response || response.status !== "success" || !Array.isArray(response.data)) {
            throw new Error('Invalid response structure from server');
        }

        if (response.data.length === 0) {
            container.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-8 text-center">
                    <i class="fas fa-comment-slash text-blue-300 text-4xl mb-4"></i>
                    <p class="text-gray-600">No posts in this group yet</p>
                    <button data-group-id="${groupId}" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg create-post-btn">
                        Create First Post
                    </button>
                </div>
            `;
            
            document.querySelector('.create-post-btn')?.addEventListener('click', (e) => {
                createGroupPost(groupId);
            });
            
            return;
        }
        
        container.innerHTML = `
            <div class="mb-6">
                <button data-group-id="${groupId}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg create-post-btn">
                    Create Post
                </button>
            </div>
            <div class="space-y-6" id="group-posts-list">
                ${response.data.map(post => `
                    <div class="bg-white border rounded-lg p-4 shadow-sm">
                        <div class="flex items-center space-x-3 mb-3">
                            <img src="${post.Img_Alumni || 'https://via.placeholder.com/40'}" 
                                 alt="Author" 
                                 class="h-10 w-10 rounded-full object-cover">
                            <div>
                                <h4 class="font-semibold">${post.Name_Alumni}</h4>
                                <p class="text-xs text-gray-500">${formatDate(post.Created_At_Post)}</p>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-3">${post.Content_Post}</p>
                        ${post.Img_Post ? `
                            <img src="${post.Img_Post}" 
                                 alt="Post image" 
                                 class="w-full h-auto rounded-lg mb-3">
                        ` : ''}
                        
                        <div class="border-t pt-3">
                            <div class="flex items-center space-x-2 mb-3">
                                <input type="text" 
                                       placeholder="Add a comment..." 
                                       class="flex-1 px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                       data-post-id="${post.Id_Post}">
                                <button class="text-blue-600 text-sm post-comment-btn" 
                                        data-post-id="${post.Id_Post}">
                                    Post
                                </button>
                            </div>
                            
                            <div id="comments-${post.Id_Post}" class="space-y-3">
                                <div class="text-center py-2">
                                    <i class="fas fa-spinner fa-spin text-blue-500 text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.querySelector('.create-post-btn')?.addEventListener('click', () => {
            createGroupPost(groupId);
        });
        
        document.querySelectorAll('.post-comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.target.getAttribute('data-post-id');
                const commentInput = document.querySelector(`input[data-post-id="${postId}"]`);
                const commentContent = commentInput?.value.trim();
                
                if (commentContent) {
                    createComment(postId, commentContent);
                    commentInput.value = '';
                }
            });
        });
        
        // Load comments for each post
        response.data.forEach(post => {
            loadPostComments(post.Id_Post);
        });
        
    } catch (error) {
        console.error('Error loading group posts:', error);
        const container = document.getElementById('group-posts-container');
        if (container) {
            container.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                    <p class="text-red-600">Error loading posts. Please try again later.</p>
                    <p class="text-sm text-red-500 mt-2">${error.message}</p>
                </div>
            `;
        }
    }
}
async function loadPostComments(postId) {
    try {
        const response = await api.post('get_comment_post', {
            post_id: postId 
        });

        console.log('API Response:', response);
        const data = response.data; 

        const container = document.getElementById(`comments-${postId}`);
        
        if (!data || data.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 text-center">No comments yet</p>';
            return;
        }
        
        container.innerHTML = data.map(comment => `
            <div class="flex items-start space-x-2 mb-3">
                <img src="${comment.Img_Alumni || 'https://via.placeholder.com/30'}" alt="Commenter" class="h-6 w-6 rounded-full mt-1">
                <div class="flex-1">
                    <div class="bg-gray-100 rounded-lg p-2">
                        <h5 class="text-sm font-semibold">${comment.Alumni_Name}</h5>
                        <p class="text-sm text-gray-700">${comment.Content_Comment}</p>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${formatDate(comment.Created_At_Comment)}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading post comments:', error);
    }
}

async function loadAllEvents() {
    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_event", {
            method: 'GET',
            credentials: 'include' // Important if you're using cookies/sessions
        });
        
        const data = await response.json();       

        console.log(data);
        
        const container = document.getElementById('events-list');
        
        if (data.data.length === 0) {
            container.innerHTML = '<p class="text-gray-600">No events scheduled</p>';
            return;
        }
        
        // Sort by date (soonest first)
        const sortedEvents = data.data.sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date));
        
        container.innerHTML = sortedEvents.map(event => `
            <div class="bg-white border rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold">${event.Name_Event}</h4>
                        <p class="text-gray-600 mt-1">${event.Location_Event}</p>
                        <p class="text-sm text-gray-500 mt-2">${formatDate(event.Event_Date)}</p>
                    </div>
                    <button data-event-id="${event.Id_Event}" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm register-event-btn">
                        ${event.registered ? 'Registered' : 'Register'}
                    </button>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.register-event-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.getAttribute('data-event-id');
                registerForEvent(eventId);
            });
        });
    } catch (error) {
        console.error('Error loading all events:', error);
    }
}

async function loadAllStories() {
    try {
        const response = await api.post('get_all_story_alumni', {
            alumni_id: authToken 
        });
        
        const container = document.getElementById('stories-list');
        console.log('API Response:', response);
        
        if (response.status == 404) {
            container.innerHTML = '<p class="text-gray-600">You have not created any stories yet</p>';
            return;
        }
        
        container.innerHTML = response.data.map(story => `
            <div class="bg-white border rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-semibold">${story.Title_Story}</h4>
                    <button data-story-id="${story.Id_Story}" class="text-red-600 hover:text-red-800 text-sm delete-story-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="text-gray-700 mb-3">${story.Content_Story}</p>
                <p class="text-xs text-gray-500">${formatDate(story.Created_At_Story)}</p>
            </div>
        `).join('');
        
        document.querySelectorAll('.delete-story-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const storyId = e.target.getAttribute('data-story-id');
                deleteStory(storyId);
            });
        });
    } catch (error) {
        console.error('Error loading all stories:', error);
    }
}

// Action Functions
async function logout() {
    try {
        const response = await api.post('logout');
        console.log(response);
        if(response.status == 200){
        localStorage.removeItem('alumni_token');
        window.location.href = 'login.html';}else{throw new Error('failed bad')}   
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

function showEditProfileModal() {
    document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function hideEditProfileModal() {
    document.getElementById('edit-profile-modal').classList.add('hidden');
}

async function updateProfile(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        job: document.getElementById('edit-job').value
    };
    
    const password = document.getElementById('edit-password').value;
    if (password) {
        formData.password = password;
    }
    
    try {
        const response = await api.post('update_alumni', {
        alumni_id: authToken ,
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,
        password : document.getElementById('edit-password').value,
        job: document.getElementById('edit-job').value
        });
        console.log(response);
        
        if(reponse.status == 201){
        showAlert('success', 'Profile updated successfully');
        loadProfileData();
        hideEditProfileModal();}else{
            throw new Error(response.data.message || 'Update failed');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showAlert('error', error.message);
    }
}

function toggleMentorshipForm() {
    const form = document.getElementById('mentorship-form');
    form.classList.toggle('hidden');
}

async function offerMentorship(e) {
    e.preventDefault();
    
 
    
    try {
        const response = await api.post('offer_mentorship_alumni', {
            field: document.getElementById('mentorship-field').value,
            description: document.getElementById('mentorship-description').value          
            });
            console.log(response);
            if (response.status =='success'){
        showAlert('success', 'Mentorship offered successfully');
        toggleMentorshipForm();
        loadMentorshipOpportunities();
        
        // Reset form
        document.getElementById('offer-mentorship-form').reset();}else{
            throw new Error("didnot updated")
        }
    } catch (error) {
        console.error('Error offering mentorship:', error);
        showAlert('error', error.message);
    }
}

function toggleGroupForm() {
    const form = document.getElementById('group-form');
    form.classList.toggle('hidden');
}

async function createGroup(e) {
    e.preventDefault();
    

    try {
        const response = await api.post('create_group_alumni', {
            name: document.getElementById('group-name').value,
            type: document.getElementById('group-type').value       
            });
            console.log(response);
         if(response.status == 'success'){
        showAlert('success', 'Group created successfully');
        toggleGroupForm();
        loadAllGroups();
        loadYourGroups();
        
        // Reset form
        document.getElementById('create-group-form').reset()
    }
        else{
            throw new Error("not created ")
        }
    }
    catch (error) {
        console.error('Error creating group:', error);
        showAlert('error', error.message);
    }
}

async function joinGroup(groupId) {
    
    try {
        const response = await api.post('join_group_alumni', {
            group_id : groupId    
            });
            console.log(response);
            if(response.status=='success'){
        showAlert('success', 'Joined group successfully');
        loadAllGroups();
        loadYourGroups();}
        else{
            throw new Error('that not good')
        }
    } catch (error) {
        console.error('Error joining group:', error);
        showAlert('error', error.message);
    }
}

function toggleStoryForm() {
    const form = document.getElementById('story-form');
    form.classList.toggle('hidden');
}

async function createStory(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('story-title').value,
        content: document.getElementById('story-content').value
    };
    
    try {
        const response = await api.post('create_story_alumni', {
            title: document.getElementById('story-title').value,
            content: document.getElementById('story-content').value
                    });
            console.log(response);
            if(response.status == 201){
        showAlert('success', 'Story published successfully');
        toggleStoryForm();
        loadAllStories();
        
        // Reset form
        document.getElementById('create-story-form').reset();}
        else{
            throw new Error("didnot work")
        }
    } catch (error) {
        console.error('Error creating story:', error);
        showAlert('error', error.message);
    }
}

async function deleteStory(storyId) {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    try {
        const response = await api.post('delete_story_alumni', {
            story_id: storyId 
                    });

            console.log(response);

            if(response.status == 200){
        showAlert('success', 'Story deleted successfully');
        loadAllStories();
    }else {
            throw new Error('didnot deleted')
        }
    } catch (error) {
        console.error('Error deleting story:', error);
        showAlert('success', 'Story deleted successfully');
    }
}

async function registerForEvent(eventId) {
    try {
        const response = await api.post('alumni_register_event', {
            event_id: eventId
                    });
            console.log(response);
            if(response.status == 201){
        showAlert('success', 'Registered for event successfully');
        loadUpcomingEvents();
        loadAllEvents();}
        else{
            throw new Error('bad by me')
        }
    } catch (error) {
        console.error('Error registering for event:', error);
        showAlert('error', error.message);
    }
}



async function createComment(postId, content) {
    try {
        const response = await api.post('create_comment_alumni', {
            post_id: postId,
            content: content
                            });
            console.log(response);

        if(response.status == 'success'){
        loadPostComments(postId);
        showAlert('success', 'comment created successfully');
    }else{
        throw new Error('not good')
    }
    } catch (error) {
        console.error('Error creating comment:', error);
        showAlert('error', error.message);
    }
}
// Feedback Functions
function showFeedbackModal() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'feedback-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Modal content
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Provide Feedback</h3>
                    <button id="close-feedback-modal-btn" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="feedback-form">
                    <div class="mb-4">
                        <label for="feedback-type" class="block text-gray-700 mb-2">Feedback Type</label>
                        <select id="feedback-type" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select type</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="bug">Bug Report</option>
                            <option value="compliment">Compliment</option>
                            <option value="general">General Feedback</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="feedback-content" class="block text-gray-700 mb-2">Your Feedback</label>
                        <textarea id="feedback-content" rows="5" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="Please share your thoughts..."></textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancel-feedback-btn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to the DOM
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('feedback-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const type = document.getElementById('feedback-type').value;
        const content = document.getElementById('feedback-content').value.trim();
        
        if (!type || !content) {
            showAlert('error', 'Please fill all fields');
            return;
        }
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            // Send feedback to server
            const response = await api.post('submit_feedback_alumni', {
                content: content,
            });
            
            if (response.status === 'success') {
                showAlert('success', 'Thank you for your feedback!');
                closeFeedbackModal();
            } else {
                throw new Error(response.message || 'Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            showAlert('error', error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
        }
    });
    
    // Handle modal close
    const closeFeedbackModal = () => {
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    };
    
    document.getElementById('close-feedback-modal-btn').addEventListener('click', closeFeedbackModal);
    document.getElementById('cancel-feedback-btn').addEventListener('click', closeFeedbackModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFeedbackModal();
        }
    });
}

// Helper Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 500);
    }, 3000);
}


async function createGroupPost(groupId) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'create-post-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Modal content
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Create Post</h3>
                    <button id="close-post-modal-btn" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="create-post-form">
                    <div class="mb-4">
                        <label for="post-content" class="block text-gray-700 mb-2">Content</label>
                        <textarea id="post-content" name="content" rows="6" 
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="post-image" class="block text-gray-700 mb-2">Image (optional)</label>
                        <input type="file" id="post-image" name="image" 
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*">
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancel-post-btn" 
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" 
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to the DOM
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('create-post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const content = document.getElementById('post-content').value.trim();
        const imageInput = document.getElementById('post-image');
        let imageFile = null;
        
        if (!content) {
            showAlert('error', 'Please enter post content');
            return;
        }
        

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
        
        try {
            // Handle image upload if present
            if (imageInput.files.length > 0) {
                imageFile = imageInput.files[0];
            }
            console.log("dffdf" , groupId);
            
             
            // Create the post
            const response = await api.post('create_post_alumni', {
                group_id: groupId,
                content: content,
                img: imageFile
            },true);

            console.log(response);
            
            if (response.status === 'success') {
                showAlert('success', 'Post created successfully');
                closeModal();
                showGroupPosts(groupId);
            } else {
                throw new Error(response.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error creating group post:', error);
            showAlert('error', error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Post';
        }
    });
    
    // Handle modal close
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    document.getElementById('close-post-modal-btn').addEventListener('click', closeModal);
    document.getElementById('cancel-post-btn').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });



// Feedback Functions
}