# Design Document

## Overview

The frontend authentication system will extend the existing Text Machine Lab website with a complete admin interface that integrates with the backend microservices. The system will maintain the existing visual design while adding secure authentication and content management capabilities.

## Architecture

### Frontend Architecture
- **Static HTML/CSS/JavaScript**: Maintain the existing static site structure
- **Client-side Authentication**: JWT token-based authentication stored in localStorage
- **API Integration**: RESTful API calls to backend microservices
- **Responsive Design**: Bootstrap 3.3.7 framework (matching existing site)

### Backend Integration Points
- **User Service**: `http://localhost:8081` - Authentication and user management
- **Project Service**: `http://localhost:8082` - Project CRUD operations
- **Event Service**: `http://localhost:8083` - Event CRUD operations
- **Publication Service**: `http://localhost:8084` - Publication CRUD operations
- **Blog Service**: `http://localhost:8085` - Blog post CRUD operations

## Components and Interfaces

### 1. Authentication Components

#### Login Page (`/login/index.html`)
```html
- Email input field
- Password input field
- Login button
- Register link
- Error message display area
- Consistent navbar and footer
```

#### Registration Page (`/register/index.html`)
```html
- Name input field
- Email input field
- Password input field
- Confirm password field
- Register button
- Login link
- Error message display area
- Consistent navbar and footer
```

### 2. Dashboard Components

#### Main Dashboard (`/admin/index.html`)
```html
- Welcome message with user name
- Navigation cards for:
  - Projects Management
  - Events Management
  - Publications Management
  - Blog Posts Management
- Logout button
- Statistics overview (optional)
```

#### Projects Management (`/admin/projects/index.html`)
```html
- Projects list table with:
  - Title, Description, Tags, Actions
- Add New Project button
- Edit/Delete actions per project
- Search and filter functionality
- Pagination for large datasets
```

#### Events Management (`/admin/events/index.html`)
```html
- Events list table with:
  - Title, Date, Description, Category, Actions
- Add New Event button
- Edit/Delete actions per event
- Search and filter functionality
- Pagination for large datasets
```

#### Publications Management (`/admin/publications/index.html`)
```html
- Publications list table with:
  - Title, Authors, Year, Type, Actions
- Add New Publication button
- Edit/Delete actions per publication
- Search and filter functionality
- Pagination for large datasets
```

#### Blog Management (`/admin/blog/index.html`)
```html
- Blog posts list table with:
  - Title, Author, Date, Status, Actions
- Add New Post button
- Edit/Delete actions per post
- Search and filter functionality
- Pagination for large datasets
```

### 3. Form Components

#### Project Form (`/admin/projects/form.html`)
```html
- Title input
- Description textarea
- Image URL input
- External URL input
- Tags multi-select
- Category selection
- Save/Cancel buttons
```

#### Event Form (`/admin/events/form.html`)
```html
- Title input
- Description textarea
- Date picker
- Location input
- Image URL input
- External URL input
- Category selection
- Save/Cancel buttons
```

#### Publication Form (`/admin/publications/form.html`)
```html
- Title input
- Authors input
- Year input
- Abstract textarea
- DOI input
- PDF URL input
- Publication type selection
- Save/Cancel buttons
```

#### Blog Post Form (`/admin/blog/form.html`)
```html
- Title input
- Content rich text editor
- Author input
- Tags input
- Featured image URL
- Status selection (draft/published)
- Save/Cancel buttons
```

## Data Models

### Frontend Data Structures

#### User Object
```javascript
{
  id: number,
  name: string,
  email: string,
  role: string,
  token: string
}
```

#### Project Object
```javascript
{
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  externalUrl: string,
  tags: string[],
  category: string,
  createdAt: string,
  updatedAt: string
}
```

#### Event Object
```javascript
{
  id: number,
  title: string,
  description: string,
  eventDate: string,
  location: string,
  imageUrl: string,
  externalUrl: string,
  category: string,
  createdAt: string,
  updatedAt: string
}
```

#### Publication Object
```javascript
{
  id: number,
  title: string,
  authors: string,
  year: number,
  abstract: string,
  doi: string,
  pdfUrl: string,
  publicationType: string,
  createdAt: string,
  updatedAt: string
}
```

#### Blog Post Object
```javascript
{
  id: number,
  title: string,
  content: string,
  author: string,
  tags: string[],
  featuredImage: string,
  status: string,
  createdAt: string,
  updatedAt: string
}
```

## Error Handling

### Authentication Errors
- **401 Unauthorized**: Redirect to login page
- **403 Forbidden**: Display access denied message
- **Token Expiry**: Clear localStorage and redirect to login

### API Errors
- **Network Errors**: Display "Connection failed" message with retry option
- **400 Bad Request**: Display validation errors from backend
- **404 Not Found**: Display "Resource not found" message
- **500 Server Error**: Display generic error message

### Form Validation
- **Client-side Validation**: Real-time validation for required fields
- **Server-side Validation**: Display backend validation errors
- **File Upload Validation**: Check file types and sizes for images

## Testing Strategy

### Manual Testing Approach
1. **Authentication Flow Testing**
   - Test login with valid/invalid credentials
   - Test registration with various input combinations
   - Test token expiry and refresh scenarios
   - Test logout functionality

2. **CRUD Operations Testing**
   - Test create, read, update, delete for each content type
   - Test form validation and error handling
   - Test pagination and search functionality
   - Test file upload functionality

3. **Integration Testing**
   - Test API integration with all backend services
   - Test error handling for backend failures
   - Test responsive design on different screen sizes
   - Test browser compatibility

4. **Security Testing**
   - Test JWT token handling
   - Test unauthorized access attempts
   - Test XSS prevention in form inputs
   - Test CSRF protection

### Browser Compatibility
- **Primary**: Chrome, Firefox, Safari, Edge (latest versions)
- **Secondary**: Internet Explorer 11+ (basic functionality)
- **Mobile**: iOS Safari, Android Chrome

## Security Considerations

### Token Management
- Store JWT tokens in localStorage (not sessionStorage for persistence)
- Include tokens in Authorization header for all API requests
- Clear tokens on logout or expiry
- Validate token format before API calls

### Input Sanitization
- Sanitize all user inputs before display
- Use proper encoding for HTML content
- Validate file uploads on client and server side
- Implement rate limiting for form submissions

### HTTPS Requirements
- All API communications must use HTTPS in production
- Secure cookie settings for any session data
- Content Security Policy headers

## Performance Considerations

### Loading Optimization
- Lazy load admin pages (only load when accessed)
- Minimize JavaScript bundle size
- Use CDN for external libraries (Bootstrap, jQuery)
- Implement client-side caching for API responses

### API Optimization
- Implement pagination for large datasets
- Use debouncing for search functionality
- Cache frequently accessed data
- Minimize API calls through efficient state management

## Deployment Strategy

### File Structure
```
/
├── login/
│   └── index.html
├── register/
│   └── index.html
├── admin/
│   ├── index.html
│   ├── projects/
│   │   ├── index.html
│   │   └── form.html
│   ├── events/
│   │   ├── index.html
│   │   └── form.html
│   ├── publications/
│   │   ├── index.html
│   │   └── form.html
│   └── blog/
│       ├── index.html
│       └── form.html
├── js/
│   ├── auth.js
│   ├── api.js
│   ├── admin.js
│   └── utils.js
└── css/
    └── admin.css
```

### Configuration Management
- Environment-specific API endpoints
- Feature flags for development/production
- Error logging configuration
- Analytics integration points