/**
 * API communication module for Text Machine Lab CMS
 * Handles HTTP requests to all backend microservices
 */

const API = {
    // Service endpoints configuration
    endpoints: {
        userService: 'http://localhost:8081',
        projectService: 'http://localhost:8082', 
        publicationService: 'http://localhost:8083',
        eventService: 'http://localhost:8084',
        blogService: 'http://localhost:8085'
    },

    /**
     * Make HTTP request with automatic token inclusion
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Response>} Fetch response
     */
    request: async function(url, options = {}) {
        // Merge auth headers with provided headers
        const headers = {
            ...Auth.getAuthHeader(),
            ...(options.headers || {})
        };
        
        // Only set Content-Type to application/json if not already specified and not FormData
        if (!options.headers?.hasOwnProperty('Content-Type') && !(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            
            // Handle authentication errors
            if (response.status === 401) {
                Auth.logout();
                window.location.href = '/login/';
                throw new Error('Authentication required');
            }
            
            if (response.status === 403) {
                throw new Error('Access denied');
            }

            return response;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    },

    /**
     * GET request helper
     * @param {string} url - Request URL
     * @returns {Promise<Object>} Response data
     */
    get: async function(url) {
        const response = await this.request(url, { method: 'GET' });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        
        return response.json();
    },

    /**
     * POST request helper
     * @param {string} url - Request URL
     * @param {Object} data - Request body data
     * @returns {Promise<Object>} Response data
     */
    post: async function(url, data) {
        const response = await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        
        return response.json();
    },

    /**
     * PUT request helper
     * @param {string} url - Request URL
     * @param {Object} data - Request body data
     * @returns {Promise<Object>} Response data
     */
    put: async function(url, data) {
        const response = await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        
        return response.json();
    },

    /**
     * DELETE request helper
     * @param {string} url - Request URL
     * @returns {Promise<void>}
     */
    delete: async function(url) {
        const response = await this.request(url, { method: 'DELETE' });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
    },

    /**
     * File upload helper
     * @param {string} url - Upload URL
     * @param {File} file - File to upload
     * @returns {Promise<Object>} Upload response
     */
    uploadFile: async function(url, file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await this.request(url, {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type, let browser set it with boundary
                ...Auth.getAuthHeader()
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        
        return response.json();
    },

    // Project Service API methods
    projects: {
        getAll: () => API.get(`${API.endpoints.projectService}/projects`),
        getById: (id) => API.get(`${API.endpoints.projectService}/projects/${id}`),
        create: (data) => API.post(`${API.endpoints.projectService}/projects`, data),
        update: (id, data) => API.put(`${API.endpoints.projectService}/projects/${id}`, data),
        delete: (id) => API.delete(`${API.endpoints.projectService}/projects/${id}`),
        getCategories: () => API.get(`${API.endpoints.projectService}/projects/categories`),
        getTags: () => API.get(`${API.endpoints.projectService}/projects/tags`),
        uploadImage: (file) => API.uploadFile(`${API.endpoints.projectService}/uploads/images`, file)
    },

    // Event Service API methods
    events: {
        getAll: () => API.get(`${API.endpoints.eventService}/events`),
        getById: (id) => API.get(`${API.endpoints.eventService}/events/${id}`),
        create: (data) => API.post(`${API.endpoints.eventService}/events`, data),
        update: (id, data) => API.put(`${API.endpoints.eventService}/events/${id}`, data),
        delete: (id) => API.delete(`${API.endpoints.eventService}/events/${id}`),
        getCategories: () => API.get(`${API.endpoints.eventService}/events/categories`),
        uploadImage: (file) => API.uploadFile(`${API.endpoints.eventService}/uploads/images`, file)
    },

    // Publication Service API methods
    publications: {
        getAll: () => API.get(`${API.endpoints.publicationService}/publications`),
        getById: (id) => API.get(`${API.endpoints.publicationService}/publications/${id}`),
        create: (data) => API.post(`${API.endpoints.publicationService}/publications`, data),
        update: (id, data) => API.put(`${API.endpoints.publicationService}/publications/${id}`, data),
        delete: (id) => API.delete(`${API.endpoints.publicationService}/publications/${id}`)
    },

    // Blog Service API methods
    blog: {
        getAll: () => API.get(`${API.endpoints.blogService}/blogs`),
        getById: (id) => API.get(`${API.endpoints.blogService}/blogs/${id}`),
        create: (data) => API.post(`${API.endpoints.blogService}/blogs`, data),
        update: (id, data) => API.put(`${API.endpoints.blogService}/blogs/${id}`, data),
        delete: (id) => API.delete(`${API.endpoints.blogService}/blogs/${id}`),
        uploadImage: (file) => API.uploadFile(`${API.endpoints.blogService}/uploads/images`, file)
    },

    // User Service API methods (for admin user management)
    users: {
        getProfile: () => API.get(`${API.endpoints.userService}/users/profile`),
        updateProfile: (data) => API.put(`${API.endpoints.userService}/users/profile`, data),
        getAll: () => API.get(`${API.endpoints.userService}/users`),
        getById: (id) => API.get(`${API.endpoints.userService}/users/${id}`),
        getByUsername: (username) => API.get(`${API.endpoints.userService}/users/username/${username}`),
        create: (data) => API.post(`${API.endpoints.userService}/users/register`, data),
        update: (id, data) => API.put(`${API.endpoints.userService}/users/${id}`, data),
        activate: (id) => API.put(`${API.endpoints.userService}/users/${id}/activate`, {}),
        deactivate: (id) => API.put(`${API.endpoints.userService}/users/${id}/deactivate`, {})
    }
};