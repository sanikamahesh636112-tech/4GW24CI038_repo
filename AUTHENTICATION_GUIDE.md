# Genesis Portal 3.0 - Complete Authentication System

## Overview
Genesis Portal 3.0 now includes a complete authentication system with three user roles:
- **Students** - Access student dashboard and profile
- **Faculty** - Manage classes, assignments, and grades
- **Admins** - System administration and management

---

## 📝 LOGIN CREDENTIALS

### Student Login
- **URL**: `http://localhost:5000/index.html` or `http://localhost:5000`
- **Username**: USN Format (e.g., `4GW24CI042`)
- **Password**: `student123`
- **Valid USN Range**: 4GW24CI000 to 4GW24CI068

### Faculty Login
- **URL**: `http://localhost:5000/faculty-login.html`
- **Faculty ID Options**:
  - `FAC001` / `FAC002` / `FAC003`
  - `prof@gsssietw.edu`
  - `dr.smith@gsssietw.edu`
- **Password**: `faculty123`

### Admin Login
- **URL**: `http://localhost:5000/admin-login.html`
- **Admin ID Options**:
  - `admin001` / `admin002`
  - `admin@gsssietw.edu`
- **Password**: `admin123`

---

## 🎯 Features

### Student Portal
**Dashboard**: Profile Information
- Personal details
- Academic information
- Course enrollment
- Grade tracking
- Attendance records

**Profile Page**: Update personal information

---

### Faculty Portal
**Dashboard**: Teaching Management Interface
- **Statistics**: 
  - My Classes (6)
  - Total Students (245)
  - Pending Assignments (12)
  - Class Average (78%)

- **Functions**:
  - 📤 Upload Course Material
  - ✏️ Post Assignments
  - ✔️ Grade Student Submissions
  - 📋 View Classes
  - 👥 View Students
  - 📊 Generate Report

- **Class Management**:
  - View all enrolled classes
  - Manage each class separately
  - Track student progress

- **Assignment Management**:
  - Create and post assignments
  - Set due dates
  - Track submission status
  - Grade submissions (35 of 45 graded in example)

---

### Admin Portal
**Dashboard**: System Administration Interface
- **Statistics**:
  - Total Students (1,245)
  - Faculty Members (45)
  - Courses Offered (156)
  - System Status (Active)

- **Admin Controls**:
  - ➕ Add New Student
  - ➕ Add Faculty Member
  - ➕ Create Course
  - ⚙️ System Settings
  - 👥 View All Students
  - 👨‍🏫 View Faculty

- **Student Management**:
  - Add new students with complete information
  - View all enrolled students
  - Manage student accounts

- **Faculty Management**:
  - Add faculty members
  - Assign departments
  - View all faculty
  - Manage faculty accounts

- **Activity Monitoring**:
  - Track all system activities
  - View login history
  - Monitor course operations
  - Track assignment submissions

---

## 🗂️ File Structure

### Frontend Files
```
frontend/
├── index.html              (Student Login)
├── admin-login.html        (Admin Login Page)
├── admin-dashboard.html    (Admin Dashboard)
├── faculty-login.html      (Faculty Login Page)
├── faculty-dashboard.html  (Faculty Dashboard)
├── profile.html            (Student Profile)
└── dashboard.html          (Student Dashboard)
```

### Backend Routes
```
routes/
├── auth.js                 (Student Authentication)
├── admin.js                (Admin Routes & APIs)
├── faculty.js              (Faculty Routes & APIs)
├── profile.js              (User Profile Management)
└── dashboard.js            (Dashboard Data)
```

### Backend Endpoints

#### Admin Routes
```
POST   /api/admin/login              - Admin login
GET    /api/admin/stats              - Dashboard statistics
POST   /api/admin/add-student        - Add new student
POST   /api/admin/add-faculty        - Add faculty member
GET    /api/admin/students           - Get all students
GET    /api/admin/faculty            - Get all faculty
```

#### Faculty Routes
```
POST   /api/faculty/login                 - Faculty login
GET    /api/faculty/stats/:facultyId      - Dashboard statistics
POST   /api/faculty/upload-material       - Upload course materials
POST   /api/faculty/post-assignment       - Post new assignment
GET    /api/faculty/classes/:facultyId    - Get faculty's classes
GET    /api/faculty/class-students/:courseCode    - Get class students
POST   /api/faculty/submit-grades         - Submit grades
GET    /api/faculty/pending-assignments/:facultyId - Get pending work
```

---

## 🔐 Security Features

1. **Password Protection**: All credentials are demo data (replace in production)
2. **JWT Token Support**: Backend routes support JWT authentication
3. **Session Management**: localStorage used for client-side session tracking
4. **Input Validation**: Server-side validation on all routes
5. **CORS Protection**: Cross-origin requests restricted to allowed origins
6. **Rate Limiting**: API endpoints have rate limiting (100 requests per 15 minutes)
7. **Helmet Security**: HTTP headers security enhanced

---

## 🚀 How to Run

### Prerequisites
- Node.js and npm installed
- MySQL server running (optional for demo mode)
- Port 5000 available

### Installation
```bash
cd Backend
npm install
npm start
```

### Access
- **Student**: http://localhost:5000
- **Faculty**: http://localhost:5000/faculty-login.html
- **Admin**: http://localhost:5000/admin-login.html

---

## 📱 Responsive Design
- Mobile-friendly interfaces
- Tablet compatible
- Desktop optimized
- Touch-friendly buttons and inputs

---

## 🎨 Design Features

### Color Schemes
- **Student Portal**: Blue (#2563eb)
- **Faculty Portal**: Blue (#2563eb)
- **Admin Portal**: Red (#dc2626)
- **Accent Colors**: Yellow (#fbbf24), Green (#10b981)

### UI Components
- Gradient backgrounds
- Rounded corners
- Hover effects and transitions
- Modern card-based layouts
- Responsive tables
- Modal dialogs

---

## 🔄 Data Flow

### Student Login Flow
1. User enters USN and password
2. Validation against USN format
3. Password verification
4. Session stored in localStorage
5. Redirect to student dashboard

### Faculty Login Flow
1. Faculty enters ID and password
2. Credential verification
3. JWT token generated (if using backend)
4. Session stored in localStorage
5. Redirect to faculty dashboard

### Admin Login Flow
1. Admin enters ID and password
2. Admin credential verification
3. JWT token generated (if using backend)
4. Session stored in localStorage
5. Redirect to admin dashboard

---

## 📊 Dashboard Data

### Student Dashboard
- Profile information
- Course enrollment status
- Grade history
- Attendance records
- Announcements

### Faculty Dashboard
- Teaching statistics
- Class management tools
- Assignment tracking
- Student performance metrics
- Course materials library

### Admin Dashboard
- System-wide statistics
- User management tools
- Activity logs
- System settings
- Reporting tools

---

## 🔧 Configuration

### Environment Variables (.env)
```
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=genesis_portal
```

### Customization
- Change colors in CSS variables
- Update credentials in route files
- Modify validation rules in backend routes
- Add database integration for production

---

## 📝 Notes

### Current Implementation
- Uses localStorage for client-side data storage
- Demo credentials hardcoded (replace in production)
- Mock data returned from API endpoints
- No actual database integration yet

### Production Recommendations
1. Store credentials in database with bcrypt hashing
2. Implement proper JWT token validation
3. Add database integration for all data
4. Implement role-based access control (RBAC)
5. Add email verification for registration
6. Implement password reset functionality
7. Add activity logging and audit trails
8. Use HTTPS in production
9. Implement 2FA for admin accounts
10. Regular security audits

---

## 🐛 Troubleshooting

### Login Issues
- Verify USN/Faculty ID format
- Check password spelling (case-sensitive)
- Ensure localStorage is enabled
- Clear browser cache and try again

### Dashboard Not Loading
- Check network connection
- Verify server is running
- Check browser console for errors
- Clear localStorage and login again

### API Errors
- Verify all required fields are provided
- Check request format
- Ensure server is running on correct port
- Check for CORS issues

---

## 📞 Support
For issues or questions, contact the development team.

---

## 📄 Version History
- **v3.0** (Current)
  - Added Admin Portal
  - Added Faculty Portal
  - Enhanced Security
  - Responsive Design
  - Complete API Integration

---

## ⚖️ License
All Rights Reserved © 2024 GSSSIETW Mysore
