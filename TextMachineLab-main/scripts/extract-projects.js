/**
 * Project Data Extraction Script
 * Extracts project information from projects/index.html
 */

const fs = require('fs');
const path = require('path');

// Read the projects HTML file
function extractProjectData() {
    try {
        const htmlContent = fs.readFileSync('projects/index.html', 'utf8');
        
        // Extract all project containers
        const projectRegex = /<div class="row project-container filterDiv([^"]*)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
        const projects = [];
        
        let match;
        while ((match = projectRegex.exec(htmlContent)) !== null) {
            const categories = match[1].trim();
            const projectContent = match[2];
            
            // Extract project details
            const project = extractProjectDetails(projectContent, categories);
            if (project) {
                projects.push(project);
            }
        }
        
        return projects;
    } catch (error) {
        console.error('Error reading projects file:', error);
        return [];
    }
}

function extractProjectDetails(content, categories) {
    try {
        // Extract image
        const imageMatch = content.match(/<img class="project-image" src=([^>]+)>/);
        const image = imageMatch ? imageMatch[1].replace(/['"]/g, '') : null;
        
        // Extract title and external link
        const titleMatch = content.match(/<h4><a href="([^"]*)"[^>]*>([^<]+)(?:<img[^>]*>)?<\/a><\/h4>/);
        const title = titleMatch ? titleMatch[2].trim() : null;
        const externalLink = titleMatch ? titleMatch[1] : null;
        
        // Extract description
        const descMatch = content.match(/<div class="project-description">\s*<p>([\s\S]*?)<\/p>\s*<\/div>/);
        let description = '';
        if (descMatch) {
            // Clean up nested <p> tags and extract text
            description = descMatch[1]
                .replace(/<\/?p>/g, '')
                .replace(/<ol>[\s\S]*?<\/ol>/g, (match) => {
                    // Convert ordered lists to text
                    return match.replace(/<li>/g, '\n- ').replace(/<\/li>/g, '').replace(/<\/?ol>/g, '');
                })
                .replace(/\s+/g, ' ')
                .trim();
        }
        
        // Extract tags from buttons
        const tagMatches = content.match(/onclick="filterSelection\('([^']+)'\)"/g);
        const tags = [];
        if (tagMatches) {
            tagMatches.forEach(match => {
                const tagMatch = match.match(/filterSelection\('([^']+)'\)/);
                if (tagMatch) {
                    tags.push(tagMatch[1]);
                }
            });
        }
        
        // Parse categories from class names
        const categoryList = categories.split(' ').filter(cat => 
            cat && !['type0', 'type1', 'type2', 'type3'].includes(cat)
        );
        
        return {
            title,
            description,
            image,
            tags,
            categories: categoryList,
            externalLink: externalLink !== '#' ? externalLink : null
        };
    } catch (error) {
        console.error('Error extracting project details:', error);
        return null;
    }
}

// Extract available filter categories
function extractFilterCategories() {
    try {
        const htmlContent = fs.readFileSync('projects/index.html', 'utf8');
        const buttonMatches = htmlContent.match(/onclick="filterSelection\('([^']+)'\)">([^<]+)</g);
        const categories = [];
        
        if (buttonMatches) {
            buttonMatches.forEach(match => {
                const categoryMatch = match.match(/filterSelection\('([^']+)'\)">([^<]+)/);
                if (categoryMatch && categoryMatch[1] !== 'all') {
                    categories.push({
                        id: categoryMatch[1],
                        label: categoryMatch[2].replace('#', '').trim()
                    });
                }
            });
        }
        
        return categories;
    } catch (error) {
        console.error('Error extracting categories:', error);
        return [];
    }
}

// Main extraction function
function main() {
    console.log('Extracting project data...');
    
    const projects = extractProjectData();
    const categories = extractFilterCategories();
    
    const extractedData = {
        metadata: {
            extractedAt: new Date().toISOString(),
            totalProjects: projects.length,
            availableCategories: categories
        },
        projects: projects
    };
    
    // Create output directory if it doesn't exist
    const outputDir = 'extracted-data';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write extracted data to JSON file
    const outputPath = path.join(outputDir, 'projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(extractedData, null, 2));
    
    console.log(`Extracted ${projects.length} projects`);
    console.log(`Available categories: ${categories.map(c => c.label).join(', ')}`);
    console.log(`Data saved to: ${outputPath}`);
    
    return extractedData;
}

// Export functions for use in other scripts
module.exports = {
    extractProjectData,
    extractFilterCategories,
    main
};

// Run if called directly
if (require.main === module) {
    main();
}