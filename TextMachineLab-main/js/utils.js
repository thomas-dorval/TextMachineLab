/**
 * Utility functions for Text Machine Lab CMS
 * Provides form validation, date formatting, DOM manipulation helpers
 */

const Utils = {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate username format
     * @param {string} username - Username to validate
     * @returns {Object} Validation result with isValid and message
     */
    validateUsername: function(username) {
        if (!username || username.length < 3) {
            return { isValid: false, message: 'Username must be at least 3 characters long' };
        }
        if (username.length > 50) {
            return { isValid: false, message: 'Username must be no more than 50 characters long' };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} Validation result with isValid and message
     */
    validatePassword: function(password) {
        if (!password || password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Sanitize HTML input to prevent XSS
     * @param {string} input - Input string to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeHtml: function(input) {
        if (!input) return '';
        
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    /**
     * Format date for display
     * @param {string|Date} date - Date to format
     * @param {string} format - Format type ('short', 'long', 'datetime')
     * @returns {string} Formatted date string
     */
    formatDate: function(date, format = 'short') {
        if (!date) return '';
        
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return '';

        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            datetime: { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }
        };

        return dateObj.toLocaleDateString('en-US', options[format] || options.short);
    },

    /**
     * Show loading spinner
     * @param {HTMLElement} element - Element to show spinner in
     */
    showLoading: function(element) {
        if (!element) return;
        
        element.innerHTML = `
            <div class="text-center">
                <i class="fa fa-spinner fa-spin fa-2x"></i>
                <p>Loading...</p>
            </div>
        `;
    },

    /**
     * Show error message
     * @param {HTMLElement} element - Element to show error in
     * @param {string} message - Error message
     */
    showError: function(element, message) {
        if (!element) return;
        
        element.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fa fa-exclamation-triangle"></i>
                ${this.sanitizeHtml(message)}
            </div>
        `;
    },

    /**
     * Show success message
     * @param {HTMLElement} element - Element to show success in
     * @param {string} message - Success message
     */
    showSuccess: function(element, message) {
        if (!element) return;
        
        element.innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="fa fa-check-circle"></i>
                ${this.sanitizeHtml(message)}
            </div>
        `;
    },

    /**
     * Clear message area
     * @param {HTMLElement} element - Element to clear
     */
    clearMessage: function(element) {
        if (element) {
            element.innerHTML = '';
        }
    },

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Get URL parameters
     * @param {string} param - Parameter name
     * @returns {string|null} Parameter value or null
     */
    getUrlParam: function(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Confirm action with user
     * @param {string} message - Confirmation message
     * @returns {boolean} True if confirmed
     */
    confirm: function(message) {
        return window.confirm(message);
    },

    /**
     * Validate form fields
     * @param {HTMLFormElement} form - Form element to validate
     * @returns {Object} Validation result with isValid and errors
     */
    validateForm: function(form) {
        const errors = [];
        const formData = new FormData(form);
        
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const value = formData.get(field.name);
            if (!value || value.trim() === '') {
                errors.push(`${field.getAttribute('data-label') || field.name} is required`);
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Validate username fields
        const usernameFields = form.querySelectorAll('input[name="username"]');
        usernameFields.forEach(field => {
            const value = formData.get(field.name);
            if (value) {
                const validation = this.validateUsername(value);
                if (!validation.isValid) {
                    errors.push(validation.message);
                    field.classList.add('error');
                }
            }
        });

        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const value = formData.get(field.name);
            if (value && !this.isValidEmail(value)) {
                errors.push('Please enter a valid email address');
                field.classList.add('error');
            }
        });

        // Validate password fields
        const passwordFields = form.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            const value = formData.get(field.name);
            if (value) {
                const validation = this.validatePassword(value);
                if (!validation.isValid) {
                    errors.push(validation.message);
                    field.classList.add('error');
                }
            }
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Convert form data to object
     * @param {HTMLFormElement} form - Form element
     * @returns {Object} Form data as object
     */
    formToObject: function(form) {
        const formData = new FormData(form);
        const obj = {};
        
        for (let [key, value] of formData.entries()) {
            // Handle multiple values (checkboxes, multi-select)
            if (obj[key]) {
                if (Array.isArray(obj[key])) {
                    obj[key].push(value);
                } else {
                    obj[key] = [obj[key], value];
                }
            } else {
                obj[key] = value;
            }
        }
        
        return obj;
    },

    /**
     * Populate form with data
     * @param {HTMLFormElement} form - Form element
     * @param {Object} data - Data to populate
     */
    populateForm: function(form, data) {
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = Boolean(data[key]);
                } else if (field.type === 'radio') {
                    const radioButton = form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radioButton) radioButton.checked = true;
                } else {
                    field.value = data[key] || '';
                }
            }
        });
    },

    /**
     * Create pagination HTML
     * @param {number} currentPage - Current page number
     * @param {number} totalPages - Total number of pages
     * @param {Function} onPageChange - Callback for page change
     * @returns {string} Pagination HTML
     */
    createPagination: function(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';

        let html = '<nav><ul class="pagination">';
        
        // Previous button
        if (currentPage > 1) {
            html += `<li><a href="#" onclick="${onPageChange.name}(${currentPage - 1})">&laquo; Previous</a></li>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? ' class="active"' : '';
            html += `<li${activeClass}><a href="#" onclick="${onPageChange.name}(${i})">${i}</a></li>`;
        }
        
        // Next button
        if (currentPage < totalPages) {
            html += `<li><a href="#" onclick="${onPageChange.name}(${currentPage + 1})">Next &raquo;</a></li>`;
        }
        
        html += '</ul></nav>';
        return html;
    }
};