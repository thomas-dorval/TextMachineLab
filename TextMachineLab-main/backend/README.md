# TextMachineLab CMS Backend - Simple Microservices

A simple microservices-based backend system for managing Text Machine Lab website content with independent services and databases.

## Simple Microservices Architecture

```
Backend/
├── user-service/          # Authentication & User Management (Port: 8081)
├── project-service/       # Project Management (Port: 8082)
├── publication-service/   # Publication Management (Port: 8083)
├── event-service/         # Event Management (Port: 8084)
└── blog-service/          # Blog Management (Port: 8085)
```

## Services Overview

### 1. User Service (Port: 8081)
- **Purpose**: Authentication, authorization, user management
- **Database**: PostgreSQL (textlab_users)
- **Features**: JWT authentication, role-based access control
- **Endpoints**: `/users/**`

### 2. Project Service (Port: 8082)
- **Purpose**: Research project management
- **Database**: PostgreSQL (textlab_projects)
- **Features**: CRUD operations, filtering, categorization
- **Endpoints**: `/projects/**`

### 3. Publication Service (Port: 8083)
- **Purpose**: Academic publication management
- **Database**: PostgreSQL (textlab_publications)
- **Features**: BibTeX support, citation formatting
- **Endpoints**: `/publications/**`

### 4. Event Service (Port: 8084)
- **Purpose**: Workshop and conference management
- **Database**: PostgreSQL (textlab_events)
- **Features**: Event scheduling, archiving, categorization
- **Endpoints**: `/events/**`

### 5. Blog Service (Port: 8085)
- **Purpose**: Blog post management
- **Database**: PostgreSQL (textlab_blogs)
- **Features**: Rich text editing, publishing workflow
- **Endpoints**: `/blogs/**`

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL (separate DB per service)
- **Security**: JWT tokens, Spring Security
- **Communication**: Direct REST API calls
- **Monitoring**: Spring Boot Actuator

## Database Configuration

Each service has its own PostgreSQL database:
- **Base URL**: `jdbc:postgresql://localhost:5432/`
- **Username**: `postgres`
- **Password**: `Gowtham@123`
- **Databases**: 
  - `textlab_users` (User Service)
  - `textlab_projects` (Project Service)
  - `textlab_publications` (Publication Service)
  - `textlab_events` (Event Service)
  - `textlab_blogs` (Blog Service)

## Running the Services

Start each service individually in separate terminals:

```bash
# Terminal 1 - User Service
cd backend/user-service && mvn spring-boot:run

# Terminal 2 - Project Service  
cd backend/project-service && mvn spring-boot:run

# Terminal 3 - Publication Service
cd backend/publication-service && mvn spring-boot:run

# Terminal 4 - Event Service
cd backend/event-service && mvn spring-boot:run

# Terminal 5 - Blog Service
cd backend/blog-service && mvn spring-boot:run
```

## API Endpoints

Each service runs independently:

- **User Service**: `http://localhost:8081/users/**`
- **Project Service**: `http://localhost:8082/projects/**`
- **Publication Service**: `http://localhost:8083/publications/**`
- **Event Service**: `http://localhost:8084/events/**`
- **Blog Service**: `http://localhost:8085/blogs/**`

## Service Communication

- **Direct REST calls**: Services communicate directly via HTTP
- **Authentication**: JWT tokens shared across services
- **No service discovery**: Simple direct communication for college project