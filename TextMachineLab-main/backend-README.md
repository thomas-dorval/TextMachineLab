# TextMachineLab CMS Backend

A Spring Boot backend application for managing Text Machine Lab website content with role-based authentication and authorization.

## Features

- **Authentication & Authorization**: JWT-based with Admin and Co-Admin roles
- **Content Management**: Projects, Publications, Events, Blog Posts
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with role-based access control
- **API Documentation**: Swagger/OpenAPI integration
- **Migration**: Flyway for database schema management

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: JPA/Hibernate
- **Migration**: Flyway
- **Documentation**: SpringDoc OpenAPI
- **Build Tool**: Maven

## Prerequisites

- Java 17 or higher
- PostgreSQL database
- Maven 3.6+

## Database Configuration

The application is configured to connect to:
- **URL**: `jdbc:postgresql://localhost:5432/lokesh`
- **Username**: `postgres`
- **Password**: `Gowtham@123`

## Running the Application

1. Ensure PostgreSQL is running and the database `lokesh` exists
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```
3. The application will start on `http://localhost:8080`

## API Endpoints

- **Health Check**: `GET /api/health`
- **API Documentation**: `http://localhost:8080/swagger-ui.html`
- **Actuator Health**: `http://localhost:8080/actuator/health`

## Project Structure

```
src/main/java/com/textmachinelab/cms/
├── controller/     # REST API controllers
├── service/        # Business logic services
├── repository/     # Data access repositories
├── entity/         # JPA entities
├── dto/           # Data Transfer Objects
├── config/        # Configuration classes
└── exception/     # Custom exceptions

src/main/resources/
├── db/migration/  # Flyway migration scripts
└── application.yml # Application configuration
```

## Development

The project follows Spring Boot MVC architecture with clear separation of concerns:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access
- **Entities**: JPA database entities
- **DTOs**: Data transfer between layers