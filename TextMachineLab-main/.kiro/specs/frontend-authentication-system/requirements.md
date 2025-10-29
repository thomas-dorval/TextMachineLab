# Requirements Document

## Introduction

This feature adds a comprehensive authentication system to the Text Machine Lab website, including a login button on the home page, login/registration pages, and admin dashboard pages that integrate with the existing backend microservices (user-service, project-service, event-service, blog-service, and publication-service).

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want to see a login button on the home page, so that I can access the admin functionality.

#### Acceptance Criteria

1. WHEN a user visits the home page THEN the system SHALL display a "Login" button positioned below the PI image on the left side
2. WHEN a user clicks the login button THEN the system SHALL navigate to the login page
3. WHEN a user is already logged in THEN the system SHALL display "Dashboard" instead of "Login"

### Requirement 2

**User Story:** As an administrator, I want to log in with my credentials, so that I can access the content management system.

#### Acceptance Criteria

1. WHEN a user accesses the login page THEN the system SHALL display a login form with email and password fields
2. WHEN a user submits valid credentials THEN the system SHALL authenticate against the user-service backend
3. WHEN authentication is successful THEN the system SHALL store the JWT token and redirect to the dashboard
4. WHEN authentication fails THEN the system SHALL display an error message
5. WHEN a user clicks "Register" link THEN the system SHALL navigate to the registration page

### Requirement 3

**User Story:** As a new administrator, I want to register an account, so that I can access the content management system.

#### Acceptance Criteria

1. WHEN a user accesses the registration page THEN the system SHALL display a registration form with name, email, and password fields
2. WHEN a user submits valid registration data THEN the system SHALL create an account via the user-service backend
3. WHEN registration is successful THEN the system SHALL automatically log in the user and redirect to the dashboard
4. WHEN registration fails THEN the system SHALL display appropriate error messages

### Requirement 4

**User Story:** As an authenticated administrator, I want to access a dashboard, so that I can manage website content.

#### Acceptance Criteria

1. WHEN an authenticated user accesses the dashboard THEN the system SHALL display navigation options for Projects, Events, Publications, and Blog Posts
2. WHEN a user is not authenticated THEN the system SHALL redirect to the login page
3. WHEN a user clicks logout THEN the system SHALL clear the authentication token and redirect to the home page

### Requirement 5

**User Story:** As an authenticated administrator, I want to manage projects, so that I can add, edit, and delete project information.

#### Acceptance Criteria

1. WHEN a user accesses the projects management page THEN the system SHALL display a list of existing projects from the project-service
2. WHEN a user clicks "Add Project" THEN the system SHALL display a form to create a new project
3. WHEN a user submits a new project THEN the system SHALL save it via the project-service API
4. WHEN a user clicks "Edit" on a project THEN the system SHALL display an edit form with current project data
5. WHEN a user clicks "Delete" on a project THEN the system SHALL confirm and delete via the project-service API

### Requirement 6

**User Story:** As an authenticated administrator, I want to manage events, so that I can add, edit, and delete event information.

#### Acceptance Criteria

1. WHEN a user accesses the events management page THEN the system SHALL display a list of existing events from the event-service
2. WHEN a user clicks "Add Event" THEN the system SHALL display a form to create a new event
3. WHEN a user submits a new event THEN the system SHALL save it via the event-service API
4. WHEN a user clicks "Edit" on an event THEN the system SHALL display an edit form with current event data
5. WHEN a user clicks "Delete" on an event THEN the system SHALL confirm and delete via the event-service API

### Requirement 7

**User Story:** As an authenticated administrator, I want to manage publications, so that I can add, edit, and delete publication information.

#### Acceptance Criteria

1. WHEN a user accesses the publications management page THEN the system SHALL display a list of existing publications from the publication-service
2. WHEN a user clicks "Add Publication" THEN the system SHALL display a form to create a new publication
3. WHEN a user submits a new publication THEN the system SHALL save it via the publication-service API
4. WHEN a user clicks "Edit" on a publication THEN the system SHALL display an edit form with current publication data
5. WHEN a user clicks "Delete" on a publication THEN the system SHALL confirm and delete via the publication-service API

### Requirement 8

**User Story:** As an authenticated administrator, I want to manage blog posts, so that I can add, edit, and delete blog content.

#### Acceptance Criteria

1. WHEN a user accesses the blog management page THEN the system SHALL display a list of existing blog posts from the blog-service
2. WHEN a user clicks "Add Blog Post" THEN the system SHALL display a form to create a new blog post
3. WHEN a user submits a new blog post THEN the system SHALL save it via the blog-service API
4. WHEN a user clicks "Edit" on a blog post THEN the system SHALL display an edit form with current blog data
5. WHEN a user clicks "Delete" on a blog post THEN the system SHALL confirm and delete via the blog-service API

### Requirement 9

**User Story:** As a system, I want to handle authentication tokens securely, so that user sessions are properly managed.

#### Acceptance Criteria

1. WHEN a user logs in successfully THEN the system SHALL store the JWT token in localStorage
2. WHEN making API requests THEN the system SHALL include the JWT token in the Authorization header
3. WHEN a token expires THEN the system SHALL redirect the user to the login page
4. WHEN a user logs out THEN the system SHALL clear the stored token
5. WHEN a user refreshes the page THEN the system SHALL check for a valid stored token and maintain the session

### Requirement 10

**User Story:** As a system, I want to maintain consistent styling, so that the new pages match the existing website design.

#### Acceptance Criteria

1. WHEN displaying any new page THEN the system SHALL use the existing CSS styles and Bootstrap framework
2. WHEN displaying forms THEN the system SHALL follow the existing visual design patterns
3. WHEN displaying the navigation THEN the system SHALL maintain the existing navbar structure
4. WHEN displaying content THEN the system SHALL use the existing typography and color scheme