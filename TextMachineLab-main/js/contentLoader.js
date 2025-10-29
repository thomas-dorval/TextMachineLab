/**
 * Content loader for public pages
 * Loads dynamic content from the backend and updates the static pages
 */

const ContentLoader = {
    // API endpoints (same as admin)
    endpoints: {
        userService: 'http://localhost:8081',
        projectService: 'http://localhost:8082', 
        publicationService: 'http://localhost:8083',
        eventService: 'http://localhost:8084',
        blogService: 'http://localhost:8085'
    },

    /**
     * Make HTTP request without authentication
     */
    request: async function(url, options = {}) {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Content loading error:', error);
            return null;
        }
    },

    /**
     * Load and render projects on the projects page
     */
    loadProjects: async function() {
        try {
            const projects = await this.request(`${this.endpoints.projectService}/projects/active`);
            if (!projects) return;

            const container = document.querySelector('.project-container').parentElement;
            if (!container) return;

            // Clear existing projects (keep the filter buttons)
            const existingProjects = container.querySelectorAll('.project-container');
            existingProjects.forEach(project => project.remove());

            // Render new projects
            projects.forEach(project => {
                const projectHtml = this.renderProject(project);
                container.insertAdjacentHTML('beforeend', projectHtml);
            });

            // Initialize image loading for new content
            if (typeof ImageStorage !== 'undefined') {
                setTimeout(() => ImageStorage.initPageImages(), 100);
            }

        } catch (error) {
            console.error('Error loading projects:', error);
        }
    },

    /**
     * Render a single project
     */
    renderProject: function(project) {
        const tags = Array.isArray(project.tags) ? project.tags : [];
        const categories = Array.isArray(project.categories) ? project.categories : [];
        
        // Create filter classes from categories and tags
        const filterClasses = [...categories.map(cat => cat.name), ...tags.map(tag => tag.name)].join(' ');
        
        const imageUrl = project.imageUrl || '/img/projects/default.png';
        const externalLink = project.externalLink ? 
            `<a href="${project.externalLink}" target="_blank">${project.title}<img class="icon" src="/img/icons/external-link.png"></a>` :
            project.title;

        return `
            <div class="row project-container filterDiv ${filterClasses} type0">
                <div class="col-md-5">
                    <img class="project-image" src="${imageUrl}" alt="${project.title}">
                </div>
                <div class="col-md-7">
                    <div class="project-title">
                        <h4>${externalLink}</h4>
                    </div>
                    <div class="project-description">
                        <p>${project.description || 'No description available.'}</p>
                    </div>
                    <div class="buttons-container">
                        ${tags.map(tag => `
                            <button class="tags-button" onclick="filterSelection('${tag.name}')">
                                #${tag.displayName || tag.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Load and render events on the events page
     */
    loadEvents: async function() {
        try {
            const events = await this.request(`${this.endpoints.eventService}/events/active`);
            if (!events) return;

            const container = document.querySelector('.project-container').parentElement;
            if (!container) return;

            // Clear existing events (keep the filter buttons)
            const existingEvents = container.querySelectorAll('.project-container');
            existingEvents.forEach(event => event.remove());

            // Render new events
            events.forEach(event => {
                const eventHtml = this.renderEvent(event);
                container.insertAdjacentHTML('beforeend', eventHtml);
            });

            // Initialize image loading for new content
            if (typeof ImageStorage !== 'undefined') {
                setTimeout(() => ImageStorage.initPageImages(), 100);
            }

        } catch (error) {
            console.error('Error loading events:', error);
        }
    },

    /**
     * Render a single event
     */
    renderEvent: function(event) {
        const categories = Array.isArray(event.categories) ? event.categories : [];
        const filterClasses = categories.map(cat => cat.name).join(' ');
        
        const imageUrl = event.imageUrl || '/img/projects/default.png';
        const externalLink = event.externalLink ? 
            `<a href="${event.externalLink}" target="_blank">${event.title}<img class="icon" src="/img/icons/external-link.png"></a>` :
            event.title;

        return `
            <div class="row project-container filterDiv ${filterClasses} type">
                <div class="col-md-5">
                    <img class="project-image" src="${imageUrl}" alt="${event.title}">
                </div>
                <div class="col-md-7"> 
                    <div class="project-title">
                        <h4>${externalLink}</h4>
                    </div>
                    <div class="project-description">
                        <p>${event.description || 'No description available.'}</p>
                    </div>
                    <div class="buttons-container">
                        ${categories.map(cat => `
                            <button class="tags-button" onclick="filterSelection('${cat.name}')">
                                #${cat.displayName || cat.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Initialize content loading based on current page
     */
    init: function() {
        const path = window.location.pathname;
        
        if (path.includes('/projects/')) {
            this.loadProjects();
        } else if (path.includes('/events/')) {
            this.loadEvents();
        }
    }
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ContentLoader.init();
});