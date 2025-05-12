export default class APIFacade {
    constructor({ baseurl } = {}) {
        this.baseUrl = baseurl || "http://localhost:8000/index.php?action=";
    }

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

    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }
        return response.json(); 
    }

    async post(endpoint, data, isMultipart = false) {
        const options = {
            method: "POST",
            body: this.constructFormData(data, isMultipart),
            credentials: "include"
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
