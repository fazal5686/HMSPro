# HMSPro - Hospital Management System

## Project Overview

HMSPro is a professional Hospital Management System built using the MERN stack:

* MongoDB - Database
* Express.js - Backend API Framework
* React.js - Frontend User Interface
* Node.js - Backend Runtime Environment

The goal of HMSPro is to provide a complete healthcare management platform with secure authentication, role-based access, patient management, doctor management, appointments, billing, reports, and administrative features.

---

# Technology Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JWT Authentication
* bcrypt Password Encryption
* Express Validator
* Multer File Upload

## Frontend

* React.js
* Vite
* Axios
* React Router
* Context API / State Management

---

# Project Structure

## Backend Architecture

```text
backend/
├── config/
├── database/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middleware/
├── validators/
├── utils/
├── constants/
├── uploads/
│   ├── patients/
│   ├── doctors/
│   ├── prescriptions/
│   └── reports/
├── logs/
├── cron/
├── sockets/
├── docs/
├── tests/
├── app.js
├── server.js
├── package.json
└── .env
```

### Backend Architecture Rules

* Controllers handle HTTP requests and responses only.
* Services contain business logic.
* Repositories handle database operations.
* Models define MongoDB schemas.
* Middleware handles authentication and security.
* Validators handle request validation.
* Utils contain reusable helper functions.

---

## Frontend Architecture

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   └── apiRoutes.js
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

# Implemented Modules

## Authentication Module

Completed:

* User registration
* User login
* JWT token generation
* Password hashing
* Protected routes
* Role-based authorization

Supported roles:

* ADMIN
* DOCTOR
* PATIENT
* STAFF

---

## Patient Module

Completed:

* Patient profile creation
* Get patient profile
* Update patient profile
* Patient repository layer
* Patient service layer
* Patient controller layer

---

# Database

Database:

```text
MongoDB
Database Name: HMSPro
```

Collections:

```text
users
patients
```

---

# Development Rules

To maintain a professional and scalable project:

1. Do not randomly change the folder architecture.
2. Keep business logic inside services.
3. Keep database queries inside repositories.
4. Keep controllers clean.
5. Use reusable components.
6. Follow proper naming conventions.
7. Commit changes regularly with meaningful messages.

---

# Future Modules

Planned modules:

* Doctor Management
* Department Management
* Appointment System
* Room Management
* Admission Management
* Medicine Inventory
* Pharmacy Module
* Billing System
* Reports
* Notifications
* Admin Dashboard
* Analytics

---

# Version Control

Repository:

HMSPro

Branch:

main

Git workflow:

```text
git add .
git commit -m "message"
git push
```

---

# Project Status

Current Status:

Authentication and Patient Management modules completed successfully.

Development will continue module by module while maintaining the fixed architecture.
