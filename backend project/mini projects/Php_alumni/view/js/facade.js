export default class APIFacade {
    constructor() {
        this.baseUrl = "http://localhost:8000/index.php?action=";
    }

    // Construct the FormData or JSON data
    constructFormData(data, isMultipart = false) {
        if (isMultipart) {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            return formData;
        }
        return JSON.stringify(data);
    }

    // Handle response and check if request was successful
    async handleResponse(response) {
        if (!response.ok) {
            // Assuming the backend provides an error message in JSON format
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }
        return response.json(); // Assuming JSON is returned from the API
    }

    async post(endpoint, data, isMultipart = false) {
        const options = {
            method: "POST",
            body: this.constructFormData(data, isMultipart),
            credentials: "include" // Always include credentials
        };
    
        if (!isMultipart) {
            options.headers = { "Content-Type": "application/json" };
        }
    
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            return this.handleResponse(response);
        } catch (error) {
            console.error("API request error:", error);
            throw error;
        }
    }
    
    
    }

