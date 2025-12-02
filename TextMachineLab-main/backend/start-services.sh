#!/bin/bash

echo "Starting TextMachineLab CMS Microservices..."

echo ""
echo "Starting PostgreSQL databases..."
docker-compose up -d

echo ""
echo "Waiting for databases to be ready..."
sleep 10

echo ""
echo "Starting User Service on port 8081..."
gnome-terminal --title="User Service" -- bash -c "cd user-service && mvn spring-boot:run; exec bash"

echo ""
echo "Starting Project Service on port 8082..."
gnome-terminal --title="Project Service" -- bash -c "cd project-service && mvn spring-boot:run; exec bash"

echo ""
echo "Starting Publication Service on port 8083..."
gnome-terminal --title="Publication Service" -- bash -c "cd publication-service && mvn spring-boot:run; exec bash"

echo ""
echo "Starting Event Service on port 8084..."
gnome-terminal --title="Event Service" -- bash -c "cd event-service && mvn spring-boot:run; exec bash"

echo ""
echo "Starting Blog Service on port 8085..."
gnome-terminal --title="Blog Service" -- bash -c "cd blog-service && mvn spring-boot:run; exec bash"

echo ""
echo "All services are starting..."
echo ""
echo "Service URLs:"
echo "- User Service: http://localhost:8081/users"
echo "- Project Service: http://localhost:8082/projects"
echo "- Publication Service: http://localhost:8083/publications"
echo "- Event Service: http://localhost:8084/events"
echo "- Blog Service: http://localhost:8085/blogs"
echo ""