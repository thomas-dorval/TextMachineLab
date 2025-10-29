# TextMachineLab CMS Backend Setup Guide

## Prerequisites

Before running the services, make sure you have:

1. **Java 17 or higher** installed
2. **Maven 3.6+** installed
3. **PostgreSQL** running on localhost:5432 with database `lokesh`

## Quick Setup Check

Run these commands to verify your setup:

```bash
# Check Java version
java -version

# Check Maven version
mvn --version

# Check PostgreSQL connection
psql -h localhost -p 5432 -U postgres -d lokesh
```

## Database Setup

Since all services use the same PostgreSQL database (`lokesh`), the tables will be created automatically by Flyway migrations when you start each service.

**Default Admin User:**
- Username: `admin`
- Password: `admin123`
- Role: `ADMIN`

## Running Services

### Option 1: Manual Startup (Recommended)

Open 5 separate terminal windows and run each service:

**Terminal 1 - User Service:**
```bash
cd backend/user-service
mvn spring-boot:run
```

**Terminal 2 - Project Service:**
```bash
cd backend/project-service
mvn spring-boot:run
```

**Terminal 3 - Publication Service:**
```bash
cd backend/publication-service
mvn spring-boot:run
```

**Terminal 4 - Event Service:**
```bash
cd backend/event-service
mvn spring-boot:run
```

**Terminal 5 - Blog Service:**
```bash
cd backend/blog-service
mvn spring-boot:run
```

### Option 2: Using IDE

Import each service as a separate Maven project in your IDE (IntelliJ IDEA, Eclipse, VS Code) and run the main application classes:

- `UserServiceApplication.java` (Port 8081)
- `ProjectServiceApplication.java` (Port 8082)
- `PublicationServiceApplication.java` (Port 8083)
- `EventServiceApplication.java` (Port 8084)
- `BlogServiceApplication.java` (Port 8085)

## Service URLs

Once all services are running:

- **User Service**: http://localhost:8081/users
- **Project Service**: http://localhost:8082/projects  
- **Publication Service**: http://localhost:8083/publications
- **Event Service**: http://localhost:8084/events
- **Blog Service**: http://localhost:8085/blogs

## Testing the Services

### 1. Test User Service (Authentication)

**Login Request:**
```bash
curl -X POST http://localhost:8081/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "email": "admin@textmachinelab.com",
  "role": "ADMIN"
}
```

### 2. Test Project Service

**Get All Projects:**
```bash
curl http://localhost:8082/projects
```

**Get Categories:**
```bash
curl http://localhost:8082/projects/categories
```

### 3. Health Checks

Check if services are running:
```bash
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
curl http://localhost:8085/actuator/health
```

## Troubleshooting

### Common Issues:

1. **Port Already in Use:**
   - Change the port in `application.yml` for the conflicting service
   - Or kill the process using the port: `netstat -ano | findstr :8081`

2. **Database Connection Failed:**
   - Verify PostgreSQL is running: `pg_ctl status`
   - Check database exists: `psql -l | grep lokesh`
   - Verify credentials in `application.yml`

3. **Flyway Migration Issues:**
   - The services are configured with `validate-on-migrate: false` to handle checksum mismatches
   - If issues persist, you can manually drop and recreate tables

4. **Maven Not Found:**
   - Install Maven from https://maven.apache.org/download.cgi
   - Add Maven to your PATH environment variable
   - Or use your IDE's built-in Maven support

## Development Tips

1. **Start services in order:** User Service first (for authentication), then others
2. **Use Postman or curl** to test API endpoints
3. **Check logs** in the terminal for any errors
4. **Database tables** are created automatically by Flyway migrations
5. **CORS is enabled** for localhost:3000 and localhost:8080 for frontend integration

## Next Steps

Once all services are running successfully:
1. Test the authentication flow with the User Service
2. Create some test data using the Project Service
3. Build a frontend application to interact with these APIs
4. Add more features as needed for your college project

Happy coding! 🚀