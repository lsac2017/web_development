# Lifewood Backend API

Spring Boot backend application for the Lifewood website with MySQL database integration.

## Prerequisites

- Java 21
- Maven 3.6+
- MySQL 8.0+ (via XAMPP)
- IntelliJ IDEA (recommended)

## Setup Instructions

### 1. Database Setup (XAMPP)

1. Start XAMPP and ensure MySQL service is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. The application will automatically create the `lifewood_db` database on first run

### 2. Application Configuration

The application is pre-configured for local development:

```properties
# Database URL (auto-creates database)
spring.datasource.url=jdbc:mysql://localhost:3306/lifewood_db?createDatabaseIfNotExist=true

# Default MySQL credentials (adjust if needed)
spring.datasource.username=root
spring.datasource.password=

# Server runs on port 8080
server.port=8080
```

### 3. Running the Application

#### Using IntelliJ IDEA:
1. Open the project in IntelliJ IDEA
2. Wait for Maven dependencies to download
3. Run `BackendApplication.java`

#### Using Maven Command Line:
```bash
cd backend
mvn spring-boot:run
```

### 4. Default Admin Account

A default admin account is created automatically:
- **Email:** admin@lifewood.com
- **Password:** admin123

## API Endpoints

### Applicant Management
- `GET /api/applicants` - Get all applicants
- `POST /api/applicants` - Create new applicant
- `GET /api/applicants/{id}` - Get applicant by ID
- `PUT /api/applicants/{id}` - Update applicant
- `DELETE /api/applicants/{id}` - Delete applicant
- `GET /api/applicants/project/{project}` - Get applicants by project
- `GET /api/applicants/search?name={name}` - Search applicants by name

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/validate` - Validate admin token

### Projects
- `GET /api/projects` - Get all available projects

## Available Projects

1. AI Data Extraction
2. Machine Learning Enablement
3. Genealogy
4. Natural Language Processing
5. AI-Enabled Customer Service
6. Computer Vision
7. Autonomous Driving Technology

## Database Schema

### Applicants Table
- `id` (Primary Key)
- `first_name`
- `last_name`
- `age`
- `degree`
- `relevant_experience`
- `email` (Unique)
- `project_applied_for`
- `created_at`
- `updated_at`

### Admins Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Encrypted)
- `first_name`
- `last_name`
- `created_at`
- `updated_at`

## CORS Configuration

The backend is configured to accept requests from:
- http://localhost:3000 (Create React App)
- http://localhost:5173 (Vite React App)

## Security Features

- Password encryption using BCrypt
- CORS protection
- Input validation
- SQL injection prevention via JPA
- Email uniqueness validation
- Project selection validation

## Testing the API

You can test the API using tools like Postman or curl:

```bash
# Get all applicants
curl http://localhost:8080/api/applicants

# Admin login
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lifewood.com","password":"admin123"}'

# Create new applicant
curl -X POST http://localhost:8080/api/applicants \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "age": 25,
    "degree": "Computer Science",
    "relevantExperience": "2 years in web development",
    "email": "john.doe@example.com",
    "projectAppliedFor": "AI Data Extraction"
  }'
```

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Ensure XAMPP MySQL is running
   - Check database credentials in `application.properties`

2. **Port Already in Use:**
   - Change `server.port` in `application.properties`
   - Or stop the process using port 8080

3. **Maven Dependencies:**
   - Run `mvn clean install` to refresh dependencies
   - Check internet connection for dependency downloads

## Development Notes

- The application uses Spring Boot 3.5.5
- JPA/Hibernate for database operations
- Spring Security for authentication
- Lombok for reducing boilerplate code
- Bean Validation for input validation

## Next Steps

1. Start the backend server
2. Set up the React frontend
3. Test the integration between frontend and backend
4. Deploy to production environment
