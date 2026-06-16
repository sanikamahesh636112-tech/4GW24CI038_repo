# GENESIS PORTAL 3.0 - LOGIN CREDENTIALS

## 🎓 STUDENT LOGIN
URL: http://localhost:5000 (or /index.html)
- USN: 4GW24CI042 (or any USN from 4GW24CI000 to 4GW24CI068)
- Password: student123

## 👨‍🏫 FACULTY LOGIN  
URL: http://localhost:5000/faculty-login.html
- Faculty ID: FAC001, FAC002, or FAC003
- Alternative: prof@gsssietw.edu or dr.smith@gsssietw.edu
- Password: faculty123

## 🛡️ ADMIN LOGIN
URL: http://localhost:5000/admin-login.html
- Admin ID: admin001 or admin002
- Alternative: admin@gsssietw.edu
- Password: admin123

---

## Quick Test Credentials

### Students
| USN | Password | Status |
|-----|----------|--------|
| 4GW24CI001 | student123 | Active |
| 4GW24CI042 | student123 | Active |
| 4GW24CI068 | student123 | Active |

### Faculty
| Faculty ID | Password | Department |
|-----------|----------|------------|
| FAC001 | faculty123 | CSE |
| FAC002 | faculty123 | CSE |
| FAC003 | faculty123 | IT |
| prof@gsssietw.edu | faculty123 | CSE |
| dr.smith@gsssietw.edu | faculty123 | CSE |

### Admin
| Admin ID | Password | Role |
|----------|----------|------|
| admin001 | admin123 | Administrator |
| admin002 | admin123 | Administrator |
| admin@gsssietw.edu | admin123 | Administrator |

---

## Navigation

From any login page, you can navigate between different portals:
- **Student Login** → Links to Faculty & Admin login
- **Faculty Login** → Links to Student & Admin login  
- **Admin Login** → Links to Student & Faculty login

---

## Features by Role

### 🎓 STUDENT FEATURES
✅ View Profile
✅ Access Dashboard
✅ View Courses
✅ Check Grades
✅ View Attendance
✅ Download Materials

### 👨‍🏫 FACULTY FEATURES
✅ Upload Course Materials
✅ Post Assignments
✅ Grade Student Work
✅ View Classes
✅ Manage Students
✅ Generate Reports
✅ Track Submissions

### 🛡️ ADMIN FEATURES
✅ Add Students
✅ Add Faculty
✅ Create Courses
✅ System Settings
✅ View All Users
✅ Activity Monitoring
✅ Generate Reports
✅ Manage System

---

## Default Dashboard Statistics

### Student Dashboard
- Personal Profile
- Course Enrollment
- Grade Records
- Attendance Tracking

### Faculty Dashboard
- 6 Active Classes
- 245 Total Students
- 12 Pending Assignments
- 78% Class Average

### Admin Dashboard
- 1,245 Total Students
- 45 Faculty Members
- 156 Courses Offered
- All Systems Active

---

## Tips & Tricks

1. **Quick Login**: Press Enter after entering password
2. **Auto-Redirect**: Already logged in users are redirected to dashboard
3. **Logout**: Use the LOGOUT button in dashboard header
4. **Session**: Data stored in browser localStorage
5. **Mobile**: All pages are mobile responsive

---

## Common Issues & Solutions

❌ "Invalid USN format"
✅ Use format: 4GW24CI0XX (where XX is 00-68)

❌ "Invalid password"
✅ Password is case-sensitive, check spelling

❌ Page not loading
✅ Ensure server is running on port 5000

❌ Stuck on login page
✅ Clear browser cache and try again

---

## Server Setup

Start the backend server:
```bash
cd Backend
npm install
npm start
```

Server runs on: **http://localhost:5000**

---

## Files Created

### Frontend
- ✅ admin-login.html
- ✅ admin-dashboard.html
- ✅ faculty-login.html
- ✅ faculty-dashboard.html
- ✅ Updated index.html (with links)

### Backend Routes
- ✅ routes/admin.js
- ✅ routes/faculty.js
- ✅ Updated Backend/server.js

### Documentation
- ✅ AUTHENTICATION_GUIDE.md
- ✅ CREDENTIALS.md (this file)

---

## API Endpoints Available

### Admin API
```
POST   /api/admin/login
GET    /api/admin/stats
POST   /api/admin/add-student
POST   /api/admin/add-faculty
GET    /api/admin/students
GET    /api/admin/faculty
```

### Faculty API
```
POST   /api/faculty/login
GET    /api/faculty/stats/:facultyId
POST   /api/faculty/upload-material
POST   /api/faculty/post-assignment
GET    /api/faculty/classes/:facultyId
GET    /api/faculty/class-students/:courseCode
POST   /api/faculty/submit-grades
GET    /api/faculty/pending-assignments/:facultyId
```

---

## Next Steps

1. ✅ Review login credentials
2. ✅ Start the server
3. ✅ Test each login portal
4. ✅ Explore all features
5. ✅ Customize as needed

---

**Last Updated**: 2024
**Status**: Production Ready
