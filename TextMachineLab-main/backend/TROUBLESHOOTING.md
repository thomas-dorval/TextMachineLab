# Troubleshooting Guide

## Issues Fixed
1. **Duplicate `spring:` keys in YAML files** - FIXED
2. **Invalid `repair: true` in Flyway config** - FIXED

## Current Issues

### 1. HTTP 500 Error Loading Projects
**Symptoms:** "Failed to load projects: HTTP 500" on the main page

**Possible Causes:**
- Project service not running
- Database connection issues
- Compilation errors in project service

**Solutions:**
1. **Restart Services:**
   ```bash
   cd backend
   quick-restart.bat
   ```

2. **Check Service Status:**
   - Open browser: http://localhost:8082/projects
   - Should return JSON data or error message

3. **Check Database:**
   - Ensure PostgreSQL is running on port 5432
   - Database "lokesh" exists and is accessible

### 2. Image Upload "Failed to fetch" Error
**Symptoms:** "Error uploading image: Failed to fetch"

**Possible Causes:**
- Project service not running
- CORS issues
- File upload endpoint not accessible

**Solutions:**
1. **Test Upload Endpoint:**
   ```bash
   curl -X POST http://localhost:8082/uploads/images -F "file=@test.jpg"
   ```

2. **Check Service Logs:**
   - Look at the Project Service console window
   - Check for any error messages

3. **Verify Upload Directory:**
   - Check if `backend/project-service/uploads` directory exists
   - Service should create it automatically

## Service Startup Order
1. User Service (8081) - Must start first
2. Project Service (8082)
3. Publication Service (8083)
4. Event Service (8084)
5. Blog Service (8085)

## Testing URLs
- User Service: http://localhost:8081/users/test-db
- Project Service: http://localhost:8082/projects
- Publication Service: http://localhost:8083/publications
- Event Service: http://localhost:8084/events
- Blog Service: http://localhost:8085/blogs

## Common Fixes
1. **Clean and restart:** Use `mvn clean spring-boot:run` instead of just `mvn spring-boot:run`
2. **Check ports:** Make sure no other services are using ports 8081-8085
3. **Database:** Ensure PostgreSQL is running and accessible
4. **Wait time:** Allow 30-60 seconds for each service to fully start