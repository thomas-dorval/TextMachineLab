/**
 * Authentication utility module for Text Machine Lab CMS
 * Handles JWT token management, login/logout, and session management
 */

const Auth = {
    // Configuration
    config: {
        userServiceUrl: 'http://localhost:8081',
        tokenKey: 'tml_auth_token',
        userKey: 'tml_user_data'
    },

    /**
     * Store JWT token in localStorage
     * @param {string} token - JWT token
     */
    setToken: function(token) {
        localStorage.setItem(this.config.tokenKey, token);
    },

    /**
     * Retrieve JWT token from localStorage
     * @returns {string|null} JWT token or null if not found
     */
    getToken: function() {
        return localStorage.getItem(this.config.tokenKey);
    },

    /**
     * Store user data in localStorage
     * @param {Object} userData - User information
     */
    setUser: function(userData) {
        localStorage.setItem(this.config.userKey, JSON.stringify(userData));
    },

    /**
     * Retrieve user data from localStorage
     * @returns {Object|null} User data or null if not found
     */
    getUser: function() {
        const userData = localStorage.getItem(this.config.userKey);
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Check if user is currently authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    isAuthenticated: function() {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Basic JWT validation - check if token is expired
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (payload.exp && payload.exp < currentTime) {
                // Token is expired, clear it
                this.logout();
                return false;
            }
            
            return true;
        } catch (error) {
            // Invalid token format
            this.logout();
            return false;
        }
    },

    /**
     * Login user with username and password
     * @param {string} username - Username
     * @param {string} password - User password
     * @returns {Promise<Object>} Promise resolving to login response
     */
    login: async function(username, password) {
        try {
            const response = await fetch(`${this.config.userServiceUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            
            // Store token and user data
            this.setToken(data.token);
            this.setUser({
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role
            });

            return data;
        } catch (error) {
            console.error('Login error:', error);
            console.error('Login URL:', `${this.config.userServiceUrl}/users/login`);
            console.error('Login payload:', { username, password: '***' });
            throw error;
        }
    },

    /**
     * Register new user
     * @param {string} username - Username
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {string} role - User role (defaults to USER)
     * @returns {Promise<Object>} Promise resolving to registration response
     */
    register: async function(username, email, password, role = 'USER') {
        try {
            const response = await fetch(`${this.config.userServiceUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const userData = await response.json();
            
            // Registration successful, now login automatically
            const loginResponse = await this.login(username, password);
            
            return loginResponse;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    /**
     * Logout user and clear stored data
     */
    logout: function() {
        localStorage.removeItem(this.config.tokenKey);
        localStorage.removeItem(this.config.userKey);
    },

    /**
     * Get authorization header for API requests
     * @returns {Object} Authorization header object
     */
    getAuthHeader: function() {
        const token = this.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    },

    /**
     * Redirect to login page if not authenticated
     */
    requireAuth: function() {
        if (!this.isAuthenticated()) {
            window.location.href = '/login/';
        }
    },

    /**
     * Initialize authentication state on page load
     */
    init: function() {
        // Check authentication status and update UI accordingly
        const isAuth = this.isAuthenticated();
        const user = this.getUser();
        
        // Dispatch custom event for other components to listen to
        document.dispatchEvent(new CustomEvent('authStateChanged', {
            detail: { isAuthenticated: isAuth, user: user }
        }));
    }
};

// Initialize auth on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    Auth.init();
});