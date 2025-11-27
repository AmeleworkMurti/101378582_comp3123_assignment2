# COMP3123 Assignment 2 – Full-Stack Employee Management System  
A full-stack MERN application with secure authentication, employee CRUD operations, search functionality, and profile picture uploads using Multer.  
Backend runs on **Node.js + Express + MongoDB**, and the frontend is built with **React + Bootstrap**.

---

##  Project Overview
This project includes:

### **Backend (Node.js + Express + MongoDB)**
- User signup & login with JWT  
- Employee CRUD (Create, Read, Update, Delete)  
- Image upload (profile picture)  
- Search employees by department or position  
- Protected routes requiring authentication  
- Docker containerization (Node + MongoDB + mongo-express)

### **Frontend (React)**
- Login / Signup pages  
- Protected employee dashboard  
- Add / update / delete employees  
- Search feature  
- Upload profile pictures  
- Professional UI with Bootstrap + custom CSS  
- Fully connected with backend using Axios & React Query  

---

#  Running the Full App With Docker (Recommended)

### 1 Build and start containers
```
docker-compose up --build
```

### Containers created:
| Service | Description |
|--------|-------------|
| backend-1 | Node.js Express API (port 5000) |
| mongodb-1 | MongoDB database (port 27017) |
| mongo-express-1 | MongoDB dashboard UI (port 8081) |
| frontend-1 | React app (port 3001) |

---

# 🔧 Installation (Manual Local Run)

### 1 Clone the repository
```
git clone https://github.com/AmeleworkMurti/101378582_COMP3123_Assignment2.git
```

### 2 Install backend dependencies
```
cd backend
npm install
```

### 3 Install frontend dependencies
```
cd frontend
npm install
```

### 4 Create `.env` file in backend
```
MONGO_URI=mongodb://localhost:27017/comp3123_assignment2
JWT_SECRET=mysecretkey
PORT=5000
```

### 5 Start backend
```
npm run dev
```

### 6 Start frontend
```
npm start
```

---

#  Environment Variables (Backend)

Your `.env` file should contain:

```
MONGO_URI=mongodb://root:example@mongodb:27017/
JWT_SECRET=mysecretkey
PORT=5000
```

Docker injects the MongoDB username/password automatically.

---

#  Backend API Endpoints

##  User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/user/signup | Register a new user |
| POST | /api/v1/user/login | Login user and return JWT token |

---

##  Employee Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/emp/employees | Get all employees |
| POST | /api/v1/emp/employees | Create employee (supports image upload) |
| GET | /api/v1/emp/employees/:eid | Get employee by ID |
| PUT | /api/v1/emp/employees/:eid | Update employee (supports image upload) |
| DELETE | /api/v1/emp/employees?eid=ID | Delete employee |

---

##  Search Routes
Search by department, position, or both:

```
/api/v1/emp/employees/search?department=IT
/api/v1/emp/employees/search?position=Manager
/api/v1/emp/employees/search?department=IT&position=Developer
```

---

#  File Uploads

Profile pictures are uploaded to:

```
backend/uploads/
```

They are served statically via:

```
http://localhost:5000/uploads/<filename>
```

Backend uses **Multer** to store uploaded images.

---

#  Frontend Features

✔ Login / Signup  
✔ Protected employee dashboard  
✔ Add employee (with image upload)  
✔ Update employee (with optional new image)  
✔ Delete employee  
✔ Search by department or position  
✔ Modern UI using Bootstrap + custom CSS  
✔ Transparent card styling + gradient background  

Frontend runs on:

```
http://localhost:3001
```

---

#  Testing

### ✔ Postman tests completed  
### ✔ CRUD operations verified  
### ✔ Search tested (case-insensitive)  
### ✔ Image uploads tested  
### ✔ Docker logs verified  
### ✔ MongoDB data screenshot included  

---

#  Sample Login Credentials

Use these to test the app:

```
Email: proftest@example.com
Username: proftest
Password: 1234567
```

---

#  MongoDB Access Methods

### Option 1 — mongo-express UI  
```
http://localhost:8081
```

Credentials:
```
Username: admin  
Password: pass
```

### Option 2 — Docker CLI  
Open container shell:

```
docker exec -it mongodb-1 mongosh
```

Then:

```
show dbs
use employees
show collections
db.employees.find().pretty()
```

---

#  Notes

- Image upload works for both adding and updating employees  
- JWT is required for all employee endpoints  
- Routes are fully tested and stable  
- Frontend uses Axios interceptor to attach token  
- UI fully responsive  

---

#  Final Notes

This project satisfies **all requirements** for Assignment 2:
- Full backend API  
- Secure authentication  
- Employee CRUD 
- Search   
- Docker   
- Frontend React app   
- Image upload  
- Professional UI   
- README   

  

