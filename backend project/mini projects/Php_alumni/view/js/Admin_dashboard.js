import APIFacade from "./facade.js";

const api = new APIFacade();

document.addEventListener("DOMContentLoaded", function () {
  // Handle modal functionality
  const modalButtons = document.querySelectorAll("[data-modal-target]");
  const modalCloseButtons = document.querySelectorAll(".modal-close");

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      modal.classList.remove("hidden");
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[id]");
      modal.classList.add("hidden");
    });
  });

  // Handle form submissions
  const createNewsForm = document.getElementById("createNewsForm");

  async function CreateNews() {
    createNewsForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const title = document.getElementById("newsTitle").value;
      const content = document.getElementById("newsContent").value;

      if (!title || !content) {
        alert("Please fill all fields.");
        return;
      }

      console.log(title, content);
      console.log(document.cookie);

      try {
        const response = await fetch(
          "http://localhost:8000/index.php?action=create_news_admin",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title_news: title,
              content_news: content,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error("API error:", error);
          alert("Error creating news: " + error.msg);
          return;
        }

        const result = await response.json();
        console.log(result);
        alert("News created successfully.");
      } catch (err) {
        console.error("Network or CORS error:", err);
        alert("Failed to send request.");
      }
    });
  }

  if (createNewsForm) {
    CreateNews();
  }

  async function alumni_number() {
    try {
        const response = await api.post('get_all_alumni_name');

        console.log("get_all_alumni response:", response);
        
        // Make sure the response has data and it's an array
        if (response && response.data && Array.isArray(response.data)) {
            document.getElementById('alumni_number').textContent = response.data[0]["COUNT(*)"];
        } else {
            console.error("Invalid response format:", response);
            document.getElementById('alumni_number').textContent = "0";
        }
    } catch (error) {
        console.error("Error fetching alumni data:", error);
        document.getElementById('alumni_number').textContent = "Error";
    }
}

alumni_number();

async function get_all_e() {
  try {
      const response = await api.post('get_all_event');

      console.log("event response:", response);
      
      // Make sure the response has data and it's an array
      if (response && response.data && Array.isArray(response.data)) {
          document.getElementById('count_event').textContent = response.data.length;
      } else {
          console.error("Invalid response format:", response);
          document.getElementById('count_event').textContent = "0";
      }
  } catch (error) {
      console.error("Error fetching alumni data:", error);
      document.getElementById('count_event').textContent = "Error";
  }
}

get_all_e();


async function get_all_f() {
  try {
      const response = await api.post('get_all_feedback');

      console.log("feedback response:", response);
      
      // Make sure the response has data and it's an array
      if (response && response.data && Array.isArray(response.data)) {
          document.getElementById('feedback_count').textContent = response.data.length;
      } else {
          console.error("Invalid response format:", response);
          document.getElementById('feedback_count').textContent = "0";
      }
  } catch (error) {
      console.error("Error fetching alumni data:", error);
      document.getElementById('feedback_count').textContent = "Error";
  }
}

get_all_f();

  const createEventForm = document.getElementById("createEventForm");
  async function CreateEvent() {
    createEventForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("eventName").value;
      const location = document.getElementById("eventLocation").value;
      const date = document.getElementById("eventDate").value;

      if (!name || !location || !date) {
        alert("Please fill all fields.");
        return;
      }

      try {
        const response = await api.post("create_event_admin", {
          event_name: name,
          event_location: location,
          event_date: date,
        });
        alert("Event created successfully.");
      } catch (err) {
        console.error(err);
        alert("Error creating event.");
      }
    });
  }

  if (createEventForm) {
    CreateEvent();
  }

  const respondFeedbackForm = document.getElementById("respondFeedbackForm");

  async function RespondFeedback() {
    respondFeedbackForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const feedbackId = this.elements["feedback_id"].value;
      const responseText = document.getElementById("feedbackResponse").value;

      if (!responseText) {
        alert("Please enter a response.");
        return;
      }

      try {
        const response = await api.post("response_feedback_admin", {
          feedback_id: feedbackId,
          response: responseText,
        });
        console.log(response);
        
        respondFeedbackForm.reset();
      } catch (err) {
        console.error(err);
        alert("Error submitting feedback response.");
      }
    });
  }

  if (respondFeedbackForm) {
    RespondFeedback();
  }

  // Logout functionality
// Update your logout handler in Admin_dashboard.js
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:8000/index.php?action=logout", {
            method: "POST",
            credentials: "include"
        });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.status === 200) {
                // Redirect to login page after successful logout
                window.location.href = "login.html";
            } else {
                alert("Logout failed: " + (result.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Logout error:", err);
            alert("Logout failed. Please try again.");
        }
    });
}
  // News delete functionality
  const deleteNewsButtons = document.querySelectorAll("#news .fa-trash");
  console.log(deleteNewsButtons);

  async function Delete_News() {
    deleteNewsButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        if (confirm("Are you sure you want to delete this news?")) {
          const newsRow = this.closest("tr");
          const newsId = newsRow.cells[0].textContent;

          try {
            const response = await api.post("delete_news_admin", {
              id_news: newsId,
            });
            console.log(response);
            console.log("ncufisvbfuivb");

            newsRow.remove();
            alert("News deleted successfully.");
          } catch (error) {
            console.error(error);
            alert("Failed to delete news.");
          }
        }
      });
    });
  }
  if (deleteNewsButtons) {
    Delete_News();
  }

  // Load data functions
  function loadAllNews() {
    fetch("http://localhost:8000/index.php?action=get_all_news")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status == 200 && data.data) {
          const newsTable = document.querySelector("#news table tbody");
          newsTable.innerHTML = "";

          data.data.forEach((news) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                            <td class="py-4 px-4 border-b border-gray-200">${news.Id_News}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${news.Title_News}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${news.Content_News}</td>
                            <td class="py-4 px-4 border-b border-gray-200">
                                <button class="text-blue-600 hover:text-blue-800 mr-2">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        `;
            newsTable.appendChild(row);
          });

          // Reattach event listeners to newly created delete buttons
          const deleteButtons = document.querySelectorAll("#news .fa-trash");
          // Delegate the event to the parent <tbody> — it always exists
          document
            .querySelector("#news table tbody")
            .addEventListener("click", async function (e) {
              // Check if the clicked element has the trash icon class
              if (e.target.classList.contains("fa-trash")) {
                const newsRow = e.target.closest("tr");
                const newsId = newsRow.cells[0].textContent;
                console.log("Deleting ID:", newsId);

                if (confirm("Are you sure you want to delete this news?")) {
                  try {
                    const response = await api.post(
                      "delete_news_admin",
                      {
                        id_news: newsId,
                      },
                    ); 
                    console.log(response);

                    newsRow.remove();
                    alert("News deleted successfully.");
                  } catch (error) {
                    console.error(error);
                    alert("Failed to delete news.");
                  }
                }
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error loading news:", error);
      });
  }

  function loadAllEvents() {
    fetch("http://localhost:8000/index.php?action=get_all_event")
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200 && data.data) {
          const eventsTable = document.querySelector("#events table tbody");
          eventsTable.innerHTML = "";

          data.data.forEach((event) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                            <td class="py-4 px-4 border-b border-gray-200">${
                              event.Id_Event
                            }</td>
                            <td class="py-4 px-4 border-b border-gray-200">${
                              event.Name_Event
                            }</td>
                            <td class="py-4 px-4 border-b border-gray-200">${
                              event.Location_Event
                            }</td>
                            <td class="py-4 px-4 border-b border-gray-200">${
                              event.Event_Date
                            }</td>
                            <td class="py-4 px-4 border-b border-gray-200">${
                              event.registered_count || 0
                            }</td>
                            <td class="py-4 px-4 border-b border-gray-200">
                                <button class="text-blue-600 hover:text-blue-800 mr-2">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        `;
            eventsTable.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  }

  async function loadAllFeedback() {
    try {
        const response = await fetch("http://localhost:8000/index.php?action=get_all_feedback", {
            credentials: 'include'
        });
        
        const data = await response.json();
        console.log("Feedback data:", data.data);

        if (data.status == 200 && data.data) {
            const feedbackTable = document.querySelector("#feedback table tbody");
            feedbackTable.innerHTML = "";

            // Process each feedback item
            for (const item of data.data) {
                // Get alumni info for each feedback
                let alumniInfo = "N/A";
                let feedbackContent = item.Content_Feedback || "No content available";
                
                try {
                    const alumniResponse = await api.post("get_alumni_id", {
                        alumni_id: item.Id_Alumni
                    });


                    console.log(alumniResponse);

                    if (alumniResponse.status === 200 && alumniResponse.data) {
                        alumniInfo = alumniResponse.data.Name_Alumni || `Alumni ID: ${item.Id_Alumni}`;
                    }
                    
                } catch (error) {
                    console.error("Error fetching alumni info:", error);
                    alumniInfo = `Error loading (ID: ${item.Id_Alumni})`;
                }

                const statusClass = item.Id_Admin === null 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-green-100 text-green-800";
                
                const actionButton = item.Id_Admin === null 
                    ? `<button class="respond-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm" 
                         data-feedback-id="${item.Id_Feedback}"
                         data-alumni-name="${alumniInfo}"
                         data-feedback-content="${feedbackContent}"
                         data-feedback-date="${item.Submitted_At_Feedback}">
                         Respond
                       </button>`
                    : `<button class="view-btn bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                         data-feedback-id="${item.Id_Feedback}"
                         data-alumni-name="${alumniInfo}"
                         data-feedback-content="${feedbackContent}"
                         data-feedback-date="${item.Submitted_At_Feedback}"
                         data-feedback-responed="${item.Response_Admin || 'No response yet'}">
                         View
                       </button>`;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-4 px-4 border-b border-gray-200">${item.Id_Feedback}</td>
                    <td class="py-4 px-4 border-b border-gray-200">${alumniInfo}</td>
                    <td class="py-4 px-4 border-b border-gray-200">${item.Submitted_At_Feedback}</td>
                    <td class="py-4 px-4 border-b border-gray-200">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${item.Id_Admin === null ? "Pending" : "Responded"}
                        </span>
                    </td>
                    <td class="py-4 px-4 border-b border-gray-200">
                        ${actionButton}
                    </td>
                `;
                feedbackTable.appendChild(row);
            }
           
            // Event delegation for better performance
            feedbackTable.addEventListener('click', (e) => {
                const respondBtn = e.target.closest('.respond-btn');
                const viewBtn = e.target.closest('.view-btn');
                
                if (respondBtn) {
                    const feedbackId = respondBtn.getAttribute('data-feedback-id');
                    const alumniName = respondBtn.getAttribute('data-alumni-name');
                    const feedbackContent = respondBtn.getAttribute('data-feedback-content');
                    
                    const modal = document.getElementById("respondFeedbackModal");
                    modal.classList.remove("hidden");
                    document.querySelector('#respondFeedbackForm [name="feedback_id"]').value = feedbackId;
                    document.getElementById('feedbackAlumniName').textContent = alumniName;
                    document.getElementById('feedbackContent').textContent = feedbackContent;
                }
                
                if (viewBtn) {
                    const feedbackId = viewBtn.getAttribute('data-feedback-id');
                    const alumniName = viewBtn.getAttribute('data-alumni-name');
                    const feedbackContent = viewBtn.getAttribute('data-feedback-content');
                    const feedbackDate = viewBtn.getAttribute('data-feedback-date');
                    const responded = viewBtn.getAttribute('data-feedback-responed');

                    const modal = document.getElementById("viewFeedbackModal");
                    modal.classList.remove("hidden");
                    document.getElementById('viewFeedbackAlumniName').textContent = alumniName;
                    document.getElementById('viewFeedbackContent').textContent = feedbackContent;
                    document.getElementById('viewFeedbackDate').textContent = new Date(feedbackDate).toLocaleString();
                    document.getElementById('viewAdminResponse').textContent = responded;
                }
            });
        }
    } catch (error) {
        console.error("Error loading feedback:", error);
        // Show error to user
        alert("Failed to load feedback. Please try again later.");
    }
}

  function loadAllAlumni() {
    fetch("controller/get_all_alumni.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.alumni) {
          const alumniTable = document.querySelector("#alumni table tbody");
          alumniTable.innerHTML = "";

          data.alumni.forEach((alumni) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                            <td class="py-4 px-4 border-b border-gray-200">${alumni.id}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${alumni.name}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${alumni.email}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${alumni.job}</td>
                            <td class="py-4 px-4 border-b border-gray-200">${alumni.department}</td>
                            <td class="py-4 px-4 border-b border-gray-200">
                                <button class="text-blue-600 hover:text-blue-800 mr-2">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        `;
            alumniTable.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error loading alumni:", error);
      });
  }

  loadAllNews();
  loadAllEvents();
  loadAllFeedback();
  loadAllAlumni();
});
