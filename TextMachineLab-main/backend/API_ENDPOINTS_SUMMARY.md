# TextMachineLab CMS Backend - Complete API Endpoints

## ✅ **ALL MICROSERVICES ARE NOW COMPLETE!**

### **1. User Service (Port: 8081)**
**Base URL**: `http://localhost:8081/users`

#### Authentication Endpoints:
- `POST /users/login` - User login
- `POST /users/register` - Register new user (Admin only)

#### User Management Endpoints:
- `GET /users` - Get all users
- `GET /users/active` - Get active users only
- `GET /users/{id}` - Get user by ID
- `GET /users/username/{username}` - Get user by username
- `PUT /users/{id}` - Update user
- `PUT /users/{id}/activate` - Activate user
- `PUT /users/{id}/deactivate` - Deactivate user

---

### **2. Project Service (Port: 8082)**
**Base URL**: `http://localhost:8082/projects`

#### Project Endpoints:
- `GET /projects` - Get all projects
- `GET /projects/active` - Get active projects only
- `GET /projects/{id}` - Get project by ID
- `POST /projects` - Create new project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

#### Search & Filter Endpoints:
- `GET /projects/search?title={title}` - Search projects by title
- `GET /projects/category/{categoryName}` - Get projects by category
- `GET /projects/tag/{tagName}` - Get projects by tag

#### Reference Data Endpoints:
- `GET /projects/categories` - Get all project categories
- `GET /projects/tags` - Get all project tags

---

### **3. Publication Service (Port: 8083)**
**Base URL**: `http://localhost:8083/publications`

#### Publication Endpoints:
- `GET /publications` - Get all publications
- `GET /publications/by-year` - Get publications ordered by year (desc)
- `GET /publications/{id}` - Get publication by ID
- `POST /publications` - Create new publication
- `PUT /publications/{id}` - Update publication
- `DELETE /publications/{id}` - Delete publication

#### Search & Filter Endpoints:
- `GET /publications/year/{year}` - Get publications by specific year
- `GET /publications/year-range?startYear={start}&endYear={end}` - Get publications by year range
- `GET /publications/search/title?title={title}` - Search by title
- `GET /publications/search/author?author={author}` - Search by author
- `GET /publications/search/venue?venue={venue}` - Search by venue

#### BibTeX Endpoints:
- `GET /publications/{id}/bibtex` - Get BibTeX for publication

---

### **4. Event Service (Port: 8084)**
**Base URL**: `http://localhost:8084/events`

#### Event Endpoints:
- `GET /events` - Get all events
- `GET /events/active` - Get active (non-archived) events
- `GET /events/archived` - Get archived events
- `GET /events/by-date` - Get events ordered by date (desc)
- `GET /events/{id}` - Get event by ID
- `POST /events` - Create new event
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event

#### Time-based Endpoints:
- `GET /events/upcoming` - Get future events
- `GET /events/past` - Get past events
- `GET /events/date-range?startDate={start}&endDate={end}` - Get events by date range

#### Search & Filter Endpoints:
- `GET /events/search?title={title}` - Search events by title
- `GET /events/category/{categoryName}` - Get events by category

#### Archive Management:
- `PUT /events/{id}/archive` - Archive event
- `PUT /events/{id}/unarchive` - Unarchive event

#### Reference Data:
- `GET /events/categories` - Get all event categories

---

### **5. Blog Service (Port: 8085)**
**Base URL**: `http://localhost:8085/blogs`

#### Blog Post Endpoints:
- `GET /blogs` - Get all blog posts
- `GET /blogs/by-date` - Get blog posts ordered by creation date (desc)
- `GET /blogs/{id}` - Get blog post by ID
- `POST /blogs` - Create new blog post (as draft)
- `PUT /blogs/{id}` - Update blog post
- `DELETE /blogs/{id}` - Delete blog post

#### Status-based Endpoints:
- `GET /blogs/published` - Get published posts only
- `GET /blogs/drafts` - Get draft posts only
- `GET /blogs/archived` - Get archived posts only

#### Author Endpoints:
- `GET /blogs/author/{author}` - Get all posts by author
- `GET /blogs/author/{author}/published` - Get published posts by author

#### Search Endpoints:
- `GET /blogs/search/title?title={title}` - Search by title
- `GET /blogs/search/content?content={content}` - Search by content

#### Publishing Workflow:
- `PUT /blogs/{id}/publish` - Publish blog post
- `PUT /blogs/{id}/unpublish` - Unpublish blog post (back to draft)
- `PUT /blogs/{id}/archive` - Archive blog post
- `PUT /blogs/{id}/unarchive` - Unarchive blog post (back to draft)

---

## **Authentication & Authorization**

### **Default Admin Credentials:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### **JWT Token Usage:**
1. Login via `POST /users/login` to get JWT token
2. Include token in Authorization header: `Authorization: Bearer {token}`
3. Token expires in 24 hours

### **Role Permissions:**
- **ADMIN**: Full access to all endpoints including user management
- **CO_ADMIN**: Access to all content management but cannot create users

---

## **Sample API Calls**

### **1. Login:**
```bash
curl -X POST http://localhost:8081/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### **2. Create Project:**
```bash
curl -X POST http://localhost:8082/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title": "New Research Project",
    "description": "Description of the project",
    "imageUrl": "/img/projects/new-project.jpg",
    "externalLink": "https://example.com",
    "categories": [{"name": "Biomedical", "displayName": "Biomedical"}],
    "tags": [{"name": "AI", "displayName": "Artificial Intelligence"}]
  }'
```

### **3. Create Publication:**
```bash
curl -X POST http://localhost:8083/publications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title": "Advanced NLP Techniques",
    "authors": "John Doe, Jane Smith",
    "venue": "ACL 2024",
    "year": 2024,
    "pdfUrl": "https://example.com/paper.pdf"
  }'
```

### **4. Create Event:**
```bash
curl -X POST http://localhost:8084/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title": "NLP Workshop 2024",
    "description": "Annual workshop on NLP advances",
    "eventDate": "2024-06-15",
    "externalLink": "https://workshop.example.com",
    "categories": [{"name": "Archive", "displayName": "Archive"}]
  }'
```

### **5. Create Blog Post:**
```bash
curl -X POST http://localhost:8085/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title": "Latest Research Findings",
    "content": "Detailed content of the blog post...",
    "author": "Dr. Smith"
  }'
```

---

## **Ready for Frontend Development! 🚀**

All 5 microservices are now complete with:
- ✅ **Full CRUD operations** for all entities
- ✅ **Search and filtering** capabilities
- ✅ **Role-based authentication** and authorization
- ✅ **Comprehensive API endpoints** for frontend integration
- ✅ **Database migrations** with sample data
- ✅ **Error handling** and validation
- ✅ **CORS configuration** for frontend calls

You can now proceed to build the frontend application that consumes these APIs!