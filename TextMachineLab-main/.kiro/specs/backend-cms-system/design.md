# Design Document

## Overview

The backend CMS system will be built using Spring Boot framework following MVC (Model-View-Controller) architecture pattern with PostgreSQL database. The system provides role-based authentication and authorization for managing Text Machine Lab website content including projects, publications, events, blog posts, and user management. The design ensures secure API endpoints, proper data validation, and scalable architecture.

## Architecture

### Spring Boot MVC Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │────│    Services     │────│  Repositories   │
│   (REST APIs)   │    │ (Business Logic)│    │ (Data Access)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   DTOs/Models   │    │   Entities      │    │   PostgreSQL    │
│  (Data Transfer)│    │ (JPA Entities)  │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Security Layer
- **Spring Security**: JWT-based authentication and authorization
- **Role-based Access Control**: Admin and Co-Admin roles with different permissions
- **Password Encryption**: BCrypt for secure password storage
- **CORS Configuration**: Cross-origin resource sharing for frontend integration

### Database Layer
- **PostgreSQL**: Primary database for all content storage
- **JPA/Hibernate**: Object-relational mapping
- **Connection Pooling**: HikariCP for database connection management
- **Migration**: Flyway for database schema versioning

## Components and Interfaces

### 1. Authentication & Authorization System

**JWT Authentication Service**:
```java
@Service
public class AuthenticationService {
    public AuthResponse authenticate(LoginRequest request);
    public String generateToken(User user);
    public boolean validateToken(String token);
    public User getUserFromToken(String token);
}
```

**Role-based Authorization**:
- **Admin Role**: Full access to all operations including user management
- **Co-Admin Role**: Content management access, cannot create users

### 2. User Management System

**User Entity**:
```java
@Entity
public class User {
    private Long id;
    private String username;
    private String email;
    private String password; // BCrypt encrypted
    private Role role; // ADMIN, CO_ADMIN
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**User Controller**:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/register") // Admin only
    @GetMapping("/profile")
    @PutMapping("/profile")
    @GetMapping("/list") // Admin only
}
```

### 3. Content Management System

**Project Management**:
```java
@Entity
public class Project {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String externalLink;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<Category> categories;
    private Set<Tag> tags;
}
```

**Publication Management**:
```java
@Entity
public class Publication {
    private Long id;
    private String title;
    private String authors; // JSON array or comma-separated
    private String venue;
    private Integer year;
    private String pdfUrl;
    private String bibtexData;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**Event Management**:
```java
@Entity
public class Event {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String externalLink;
    private LocalDate eventDate;
    private boolean archived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<Category> categories;
}
```

**Blog Post Management**:
```java
@Entity
public class BlogPost {
    private Long id;
    private String title;
    private String content; // Rich text/HTML
    private String author;
    private PostStatus status; // DRAFT, PUBLISHED, ARCHIVED
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### 4. Category and Tag System

**Category Entity**:
```java
@Entity
public class Category {
    private Long id;
    private String name;
    private String displayName;
    private CategoryType type; // PROJECT, EVENT
}
```

**Tag Entity**:
```java
@Entity
public class Tag {
    private Long id;
    private String name;
    private String displayName;
}
```

## Data Models

### Database Schema (PostgreSQL)

**Users Table**:
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'CO_ADMIN')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Projects Table**:
```sql
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    external_link VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Publications Table**:
```sql
CREATE TABLE publications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    authors TEXT NOT NULL,
    venue VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    pdf_url VARCHAR(500),
    bibtex_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Events Table**:
```sql
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    external_link VARCHAR(500),
    event_date DATE,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Blog Posts Table**:
```sql
CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Categories Table**:
```sql
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('PROJECT', 'EVENT'))
);
```

**Tags Table**:
```sql
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL
);
```

**Junction Tables**:
```sql
CREATE TABLE project_categories (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

CREATE TABLE project_tags (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

CREATE TABLE event_categories (
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);
```

## Error Handling

### Global Exception Handler
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex);
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex);
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex);
}
```

### Custom Exceptions
- **ValidationException**: Input validation errors
- **UnauthorizedException**: Authentication/authorization failures
- **ResourceNotFoundException**: Entity not found errors
- **DuplicateResourceException**: Unique constraint violations

### Error Response Format
```json
{
    "timestamp": "2024-01-01T12:00:00Z",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "path": "/api/projects",
    "details": {
        "title": "Title is required",
        "description": "Description must be at least 10 characters"
    }
}
```

## Testing Strategy

### Unit Testing
- **Service Layer Testing**: Business logic validation with Mockito
- **Repository Testing**: Data access layer with @DataJpaTest
- **Controller Testing**: REST API endpoints with @WebMvcTest
- **Security Testing**: Authentication and authorization flows

### Integration Testing
- **Database Integration**: Full database operations with @SpringBootTest
- **API Integration**: End-to-end API testing with TestRestTemplate
- **Security Integration**: JWT token validation and role-based access

### Test Data Management
- **Test Profiles**: Separate configuration for testing environment
- **Test Containers**: PostgreSQL test containers for isolated testing
- **Data Fixtures**: Predefined test data for consistent testing

## Implementation Approach

### Phase 1: Core Infrastructure
1. **Spring Boot Setup**: Project structure, dependencies, configuration
2. **Database Setup**: PostgreSQL connection, JPA configuration, Flyway migrations
3. **Security Configuration**: Spring Security, JWT implementation
4. **Basic User Management**: User entity, authentication endpoints

### Phase 2: Content Management
1. **Project Management**: CRUD operations for projects with categories and tags
2. **Publication Management**: Academic publication handling with BibTeX support
3. **Event Management**: Workshop and conference management with archiving
4. **Blog Management**: Rich text blog post creation and publishing

### Phase 3: Advanced Features
1. **Role-based Permissions**: Fine-grained access control implementation
2. **Data Validation**: Comprehensive input validation and sanitization
3. **API Documentation**: Swagger/OpenAPI documentation
4. **Performance Optimization**: Caching, query optimization, pagination

### Phase 4: Production Readiness
1. **Monitoring**: Application metrics and health checks
2. **Logging**: Structured logging with correlation IDs
3. **Configuration Management**: Environment-specific configurations
4. **Deployment**: Docker containerization and deployment scripts