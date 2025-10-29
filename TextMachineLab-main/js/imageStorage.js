/**
 * Simple client-side image storage utility
 * Stores images in localStorage as base64 data
 */

const ImageStorage = {
    // Storage key prefix
    keyPrefix: 'tml_image_',
    
    /**
     * Store image data with a given path
     * @param {string} imagePath - The image path (e.g., '/img/projects/123_image.jpg')
     * @param {string} imageData - Base64 image data
     */
    storeImage: function(imagePath, imageData) {
        try {
            const key = this.keyPrefix + imagePath.replace(/[^a-zA-Z0-9]/g, '_');
            localStorage.setItem(key, imageData);
            console.log('Image stored:', imagePath);
        } catch (error) {
            console.error('Error storing image:', error);
        }
    },
    
    /**
     * Retrieve image data for a given path
     * @param {string} imagePath - The image path
     * @returns {string|null} Base64 image data or null if not found
     */
    getImage: function(imagePath) {
        try {
            const key = this.keyPrefix + imagePath.replace(/[^a-zA-Z0-9]/g, '_');
            return localStorage.getItem(key);
        } catch (error) {
            console.error('Error retrieving image:', error);
            return null;
        }
    },
    
    /**
     * Check if an image exists in storage
     * @param {string} imagePath - The image path
     * @returns {boolean} True if image exists
     */
    hasImage: function(imagePath) {
        return this.getImage(imagePath) !== null;
    },
    
    /**
     * Delete an image from storage
     * @param {string} imagePath - The image path
     */
    deleteImage: function(imagePath) {
        try {
            const key = this.keyPrefix + imagePath.replace(/[^a-zA-Z0-9]/g, '_');
            localStorage.removeItem(key);
            console.log('Image deleted:', imagePath);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    },
    
    /**
     * Replace image src with stored data if available
     * @param {HTMLImageElement} imgElement - The image element
     */
    loadStoredImage: function(imgElement) {
        const originalSrc = imgElement.src || imgElement.getAttribute('data-src');
        if (originalSrc) {
            // Extract path from full URL
            const url = new URL(originalSrc, window.location.origin);
            const imagePath = url.pathname;
            
            const storedData = this.getImage(imagePath);
            if (storedData) {
                imgElement.src = storedData;
                imgElement.setAttribute('data-loaded-from-storage', 'true');
            }
        }
    },
    
    /**
     * Initialize image loading for all images on the page
     */
    initPageImages: function() {
        // Load stored images for all img elements
        const images = document.querySelectorAll('img[src*="/img/"]');
        images.forEach(img => this.loadStoredImage(img));
        
        // Also handle images that might be added dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG' && node.src && node.src.includes('/img/')) {
                            this.loadStoredImage(node);
                        }
                        // Check for images within added elements
                        const imgs = node.querySelectorAll && node.querySelectorAll('img[src*="/img/"]');
                        if (imgs) {
                            imgs.forEach(img => this.loadStoredImage(img));
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ImageStorage.initPageImages();
});