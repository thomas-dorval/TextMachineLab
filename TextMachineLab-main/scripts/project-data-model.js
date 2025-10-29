/**
 * Project Data Model and Validation
 * Defines the structure and validation for project data
 */

/**
 * Project data model schema
 */
const ProjectSchema = {
    title: {
        type: 'string',
        required: true,
        minLength: 1
    },
    description: {
        type: 'string',
        required: true,
        minLength: 10
    },
    image: {
        type: 'string',
        required: false,
        pattern: /\.(jpg|jpeg|png|gif|svg)$/i
    },
    tags: {
        type: 'array',
        required: false,
        items: {
            type: 'string'
        }
    },
    categories: {
        type: 'array',
        required: false,
        items: {
            type: 'string'
        }
    },
    externalLink: {
        type: 'string',
        required: false,
        pattern: /^https?:\/\/.+/
    }
};

/**
 * Validate a single project object
 * @param {Object} project - Project object to validate
 * @returns {Object} - Validation result with isValid and errors
 */
function validateProject(project) {
    const errors = [];
    
    if (!project || typeof project !== 'object') {
        return {
            isValid: false,
            errors: ['Project must be an object']
        };
    }
    
    // Validate each field according to schema
    for (const [field, rules] of Object.entries(ProjectSchema)) {
        const value = project[field];
        
        // Check required fields
        if (rules.required && (value === undefined || value === null || value === '')) {
            errors.push(`Field '${field}' is required`);
            continue;
        }
        
        // Skip validation if field is not required and not present
        if (!rules.required && (value === undefined || value === null)) {
            continue;
        }
        
        // Type validation
        if (rules.type === 'string' && typeof value !== 'string') {
            errors.push(`Field '${field}' must be a string`);
        } else if (rules.type === 'array' && !Array.isArray(value)) {
            errors.push(`Field '${field}' must be an array`);
        }
        
        // String-specific validations
        if (rules.type === 'string' && typeof value === 'string') {
            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`Field '${field}' must be at least ${rules.minLength} characters long`);
            }
            
            if (rules.pattern && !rules.pattern.test(value)) {
                errors.push(`Field '${field}' does not match required pattern`);
            }
        }
        
        // Array-specific validations
        if (rules.type === 'array' && Array.isArray(value)) {
            if (rules.items && rules.items.type === 'string') {
                value.forEach((item, index) => {
                    if (typeof item !== 'string') {
                        errors.push(`Item at index ${index} in '${field}' must be a string`);
                    }
                });
            }
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate an array of projects
 * @param {Array} projects - Array of project objects
 * @returns {Object} - Validation summary
 */
function validateProjects(projects) {
    if (!Array.isArray(projects)) {
        return {
            isValid: false,
            errors: ['Projects must be an array'],
            validProjects: 0,
            totalProjects: 0
        };
    }
    
    const results = projects.map((project, index) => {
        const validation = validateProject(project);
        return {
            index,
            project,
            ...validation
        };
    });
    
    const validProjects = results.filter(r => r.isValid);
    const invalidProjects = results.filter(r => !r.isValid);
    
    return {
        isValid: invalidProjects.length === 0,
        validProjects: validProjects.length,
        totalProjects: projects.length,
        invalidProjects: invalidProjects.map(r => ({
            index: r.index,
            title: r.project?.title || 'Unknown',
            errors: r.errors
        })),
        summary: {
            valid: validProjects.length,
            invalid: invalidProjects.length,
            total: projects.length
        }
    };
}

/**
 * Clean and normalize project data
 * @param {Object} project - Raw project object
 * @returns {Object} - Cleaned project object
 */
function cleanProject(project) {
    if (!project) return null;
    
    return {
        title: project.title ? project.title.trim() : '',
        description: project.description ? project.description.trim() : '',
        image: project.image ? project.image.trim() : null,
        tags: Array.isArray(project.tags) ? project.tags.filter(tag => tag && tag.trim()) : [],
        categories: Array.isArray(project.categories) ? project.categories.filter(cat => cat && cat.trim()) : [],
        externalLink: project.externalLink && project.externalLink.trim() !== '' ? project.externalLink.trim() : null
    };
}

/**
 * Generate project statistics
 * @param {Array} projects - Array of project objects
 * @returns {Object} - Statistics summary
 */
function generateProjectStats(projects) {
    if (!Array.isArray(projects)) {
        return null;
    }
    
    const stats = {
        total: projects.length,
        withImages: projects.filter(p => p.image).length,
        withExternalLinks: projects.filter(p => p.externalLink).length,
        withTags: projects.filter(p => p.tags && p.tags.length > 0).length,
        categories: {},
        tags: {},
        averageDescriptionLength: 0
    };
    
    // Calculate category distribution
    projects.forEach(project => {
        if (project.categories) {
            project.categories.forEach(category => {
                stats.categories[category] = (stats.categories[category] || 0) + 1;
            });
        }
        
        if (project.tags) {
            project.tags.forEach(tag => {
                stats.tags[tag] = (stats.tags[tag] || 0) + 1;
            });
        }
    });
    
    // Calculate average description length
    const totalDescLength = projects.reduce((sum, project) => {
        return sum + (project.description ? project.description.length : 0);
    }, 0);
    stats.averageDescriptionLength = Math.round(totalDescLength / projects.length);
    
    return stats;
}

/**
 * Export projects to structured JSON format
 * @param {Array} projects - Array of validated project objects
 * @param {Object} metadata - Additional metadata
 * @returns {Object} - Structured export object
 */
function exportProjectData(projects, metadata = {}) {
    const validation = validateProjects(projects);
    const stats = generateProjectStats(projects);
    
    return {
        metadata: {
            exportedAt: new Date().toISOString(),
            version: '1.0.0',
            ...metadata
        },
        validation,
        statistics: stats,
        projects: projects.map(cleanProject).filter(p => p !== null)
    };
}

module.exports = {
    ProjectSchema,
    validateProject,
    validateProjects,
    cleanProject,
    generateProjectStats,
    exportProjectData
};