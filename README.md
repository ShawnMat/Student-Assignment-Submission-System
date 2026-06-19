# Student Assignment Submission System

## Overview

The Student Assignment Submission System is a role-based web application designed to streamline assignment management between trainers and students. Trainers can create, assign, evaluate, and track assignments, while students can view assigned work, submit assignments, and monitor their academic progress.

The application is built using HTML, CSS, Bootstrap, JavaScript, jQuery, and JSON Server as a mock backend.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* Role-based Dashboard Access
* Trainer and Student Roles
* Session Management using Local Storage

### Student Features

* View Assigned Assignments
* Submit Assignments
* Track Submission Status
* View Grades and Feedback
* Filter Assignments
* Track Progress Statistics
* View Personal Profile Information

### Trainer Features

* Create Assignments
* Assign Assignments to Students
* Update Assignment Details
* Evaluate Student Submissions
* Assign Marks and Grades
* View Submission History
* Filter Assignments
* Dashboard Analytics
* Soft Delete Assignments
* Restore Deleted Assignments
* Permanently Delete Assignments

### Assignment Management

* Assignment Creation
* Assignment Submission Tracking
* Due Date Management
* Evaluation Management
* Grade & Marks Tracking
* Assignment Status Monitoring

### Validation Features

* Assignment ID Validation
* Title Validation
* Description Validation
* Due Date Validation
* Marks Validation
* Grade Validation
* Duplicate Assignment Prevention

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (ES6)
* jQuery

### UI Libraries

* Bootstrap Icons
* Toastr Notifications
* SweetAlert2
* Chart.js

### Backend

* JSON Server (Mock REST API)

### Storage

* Local Storage
* JSON Database (db.json)

---

## Dashboard Analytics

### Trainer Dashboard

* Total Assignments
* Submitted Assignments
* Pending Assignments
* Evaluated Assignments
* Overdue Assignments

### Student Dashboard

* Total Assignments
* Submitted Assignments
* Pending Assignments
* Evaluated Assignments
* Average Marks

---

## Assignment Workflow

Trainer Creates Assignment
↓
Assignment Assigned to Student
↓
Student Views Assignment
↓
Student Submits Assignment
↓
Trainer Evaluates Submission
↓
Marks & Grade Assigned
↓
Student Views Result

---

## Assignment Status

* Assigned
* Submitted
* Pending Evaluation
* Evaluated
* Overdue

---

## Future Enhancements

* File Upload Support
* PDF Submission
* Email Notifications
* Role-Based Authentication using JWT
* MongoDB Integration
* Node.js & Express Backend
* Real-Time Notifications
* Assignment Report Generation
* Performance Analytics
