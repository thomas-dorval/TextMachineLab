# Postman Collection Setup Guide

## 📁 **Files Created**
- `TextMachineLab_CMS_API.postman_collection.json` - Complete API collection
- `TextMachineLab_Environment.postman_environment.json` - Environment variables

## 🚀 **How to Import and Use**

### **Step 1: Import Collection**
1. Open Postman
2. Click **Import** button
3. Select `TextMachineLab_CMS_API.postman_collection.json`
4. Click **Import**

### **Step 2: Import Environment**
1. Click **Import** button again
2. Select `TextMachineLab_Environment.postman_environment.json`
3. Click **Import**
4. Select **TextMachineLab Environment** from the environment dropdown (top right)

### **Step 3: Start Testing**

#### **🔐 Authentication Flow:**
1. **First, run "Login (Get JWT Token)"** from the User Service folder
   - This will automatically save the JWT token to the environment
   - Default credentials: `admin` / `admin123`

2. **All other requests will automatically use the JWT token** for authorization

#### **📋 Test Order Recommendation:**
1. **Health Checks** - Verify all services are running
2. **User Service** - Login and get JWT token
3. **Project Service** - Test CRUD operations
4. **Publication Service** - Test publication management
5. **Event Service** - Test event management
6. **Blog Service** - Test blog post management

## 📊 **Collection Structure**

### **1. User Service (Authentication)**
- ✅ Login (Get JWT Token) - **START HERE**
- ✅ Register New User (Admin Only)
- ✅ Get All Users
- ✅ Get Active Users
- ✅ Get User by ID

### **2. Project Service**
- ✅ Get All Projects
- ✅ Get Active Projects
- ✅ Create New Project
- ✅ Search Projects by Title
- ✅ Get Projects by Category
- ✅ Get All Categories
- ✅ Get All Tags

### **3. Publication Service**
- ✅ Get All Publications
- ✅ Get Publications by Year (Desc)
- ✅ Create New Publication
- ✅ Search Publications by Author
- ✅ Get Publications by Year
- ✅ Get Publication BibTeX

### **4. Event Service**
- ✅ Get All Events
- ✅ Get Active Events
- ✅ Get Upcoming Events
- ✅ Create New Event
- ✅ Search Events by Title
- ✅ Archive Event
- ✅ Get Event Categories

### **5. Blog Service**
- ✅ Get All Blog Posts
- ✅ Get Published Posts
- ✅ Get Draft Posts
- ✅ Create New Blog Post
- ✅ Publish Blog Post
- ✅ Search Posts by Title
- ✅ Get Posts by Author

### **6. Health Checks**
- ✅ User Service Health
- ✅ Project Service Health
- ✅ Publication Service Health
- ✅ Event Service Health
- ✅ Blog Service Health

## 🔧 **Environment Variables**

The environment includes these pre-configured variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `base_url_user` | `http://localhost:8081` | User Service URL |
| `base_url_project` | `http://localhost:8082` | Project Service URL |
| `base_url_publication` | `http://localhost:8083` | Publication Service URL |
| `base_url_event` | `http://localhost:8084` | Event Service URL |
| `base_url_blog` | `http://localhost:8085` | Blog Service URL |
| `jwt_token` | (auto-filled) | JWT token from login |
| `admin_username` | `admin` | Default admin username |
| `admin_password` | `admin123` | Default admin password |

## 🧪 **Sample Test Scenarios**

### **Scenario 1: Complete User Flow**
1. Login → Register Co-Admin → Get All Users
2. Create Project → Search Projects → Get Categories
3. Create Publication → Search by Author → Get BibTeX
4. Create Event → Archive Event → Get Upcoming Events
5. Create Blog Post → Publish Post → Search by Title

### **Scenario 2: Content Management Flow**
1. Login as Admin
2. Create multiple projects with different categories
3. Create publications for different years
4. Create events (some upcoming, some past)
5. Create blog posts and test publishing workflow

### **Scenario 3: Search & Filter Testing**
1. Create sample data across all services
2. Test search functionality in each service
3. Test filtering by categories, tags, years, authors
4. Test date-based filtering for events

## 🚨 **Important Notes**

1. **Start Services First**: Make sure all 5 microservices are running before testing
2. **Login First**: Always run the login request first to get the JWT token
3. **Token Auto-Save**: The login request automatically saves the JWT token
4. **Authorization**: All requests (except login and health checks) require JWT token
5. **CORS**: Services are configured to allow requests from Postman

## 🔍 **Troubleshooting**

### **If requests fail:**
1. Check if all services are running on correct ports
2. Verify JWT token is saved (check environment variables)
3. Ensure database is connected and tables exist
4. Check service logs for detailed error messages

### **Common Issues:**
- **401 Unauthorized**: JWT token missing or expired - run login again
- **404 Not Found**: Service not running or wrong port
- **500 Internal Server Error**: Database connection issue or missing tables

## 🎯 **Ready to Test!**

Import both files into Postman and start testing your complete microservices backend! 

**Happy Testing! 🚀**