# COMP3123 Assignment 1 - Backend

## Project Description
This project is a RESTful API built with Node.js, Express, and MongoDB.
It supports User Management and Employee Management, including full CRUD operations and user authentication.

## Installation

1. Clone the repository:
git clone https://github.com/AmeleworkMurti/101378582_COMP3123_assignment1.git

2. Install dependencies:
npm install

3. Create a .env file in the project root with the following variables:
MONGO_URI=mongodb://localhost:27017/comp3123_assignment1
PORT=5000
JWT_SECRET=mysecret

4. Run the project:
npm run dev

The server will run on http://localhost:5000

## API Endpoints

Users:
- POST /api/v1/user/signup → Create a new user
- POST /api/v1/user/login → Login with username/email + password

Employees:
- GET /api/v1/emp/employees → List all employees
- POST /api/v1/emp/employees → Create a new employee
- GET /api/v1/emp/employees/:id → Get employee by ID
- PUT /api/v1/emp/employees/:id → Update employee by ID
- DELETE /api/v1/emp/employees?eid=... → Delete employee by ID

## Testing
- All endpoints have been tested using Postman.
- Postman collection is included in the repository as COMP3123_Assignment1.postman_collection.json.
- Screenshots of successful and error responses are included.

## Sample User Credentials
Email: amymurti@example.com
Username: amymurti
Password: password123

## Notes
- Employee routes can be optionally protected with JWT.
- MongoDB database name: comp3123_assignment1
