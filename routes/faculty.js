const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../db');

const router = express.Router();

// Faculty Login
router.post('/login', [
    body('facultyId').trim().notEmpty(),
    body('password').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { facultyId, password } = req.body;

        // Demo credentials - REPLACE WITH DATABASE QUERY IN PRODUCTION
        const validFaculty = {
            "FAC001": "faculty123",
            "FAC002": "faculty123",
            "FAC003": "faculty123",
            "prof@gsssietw.edu": "faculty123",
            "dr.smith@gsssietw.edu": "faculty123"
        };

        if (!validFaculty[facultyId]) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid Faculty ID or Password' 
            });
        }

        if (validFaculty[facultyId] !== password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid Faculty ID or Password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { facultyId: facultyId, role: 'faculty' },
            process.env.JWT_SECRET || 'faculty-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Faculty login successful',
            token: token,
            facultyId: facultyId,
            role: 'faculty'
        });

    } catch (error) {
        console.error('Faculty login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login',
            error: error.message 
        });
    }
});

// Get Faculty Dashboard Stats
router.get('/stats/:facultyId', async (req, res) => {
    try {
        const { facultyId } = req.params;

        // Demo data - REPLACE WITH ACTUAL DATABASE QUERIES
        const stats = {
            myClasses: 6,
            totalStudents: 245,
            pendingAssignments: 12,
            classAverage: 78
        };

        res.json({
            success: true,
            stats: stats,
            facultyId: facultyId
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching stats',
            error: error.message 
        });
    }
});

// Upload Course Material
router.post('/upload-material', [
    body('courseCode').trim().notEmpty(),
    body('title').trim().notEmpty(),
    body('description').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { courseCode, title, description } = req.body;

        // Demo implementation - HANDLE FILE UPLOAD IN PRODUCTION
        console.log('Uploading material:', { courseCode, title, description });

        res.json({
            success: true,
            message: `Material "${title}" uploaded successfully for course ${courseCode}`,
            material: { courseCode, title, description, uploadTime: new Date() }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error uploading material',
            error: error.message 
        });
    }
});

// Post Assignment
router.post('/post-assignment', [
    body('courseCode').trim().notEmpty(),
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('dueDate').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { courseCode, title, description, dueDate } = req.body;

        // Demo implementation - ADD TO DATABASE IN PRODUCTION
        console.log('Posting assignment:', { courseCode, title, description, dueDate });

        res.json({
            success: true,
            message: `Assignment "${title}" posted successfully for course ${courseCode}`,
            assignment: { courseCode, title, description, dueDate, postedTime: new Date() }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error posting assignment',
            error: error.message 
        });
    }
});

// Get Faculty Classes
router.get('/classes/:facultyId', async (req, res) => {
    try {
        const { facultyId } = req.params;

        // Demo data - REPLACE WITH DATABASE QUERY
        const classes = [
            { courseCode: 'CS301', courseName: 'Data Structures', students: 45, semester: 5, status: 'Active' },
            { courseCode: 'CS302', courseName: 'Database Management', students: 42, semester: 5, status: 'Active' },
            { courseCode: 'CS303', courseName: 'Web Development', students: 50, semester: 5, status: 'Active' },
            { courseCode: 'CS304', courseName: 'Operating Systems', students: 48, semester: 5, status: 'Active' }
        ];

        res.json({
            success: true,
            classes: classes,
            total: classes.length,
            facultyId: facultyId
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching classes',
            error: error.message 
        });
    }
});

// Get Class Students
router.get('/class-students/:courseCode', async (req, res) => {
    try {
        const { courseCode } = req.params;

        // Demo data - REPLACE WITH DATABASE QUERY
        const students = [
            { usn: '4GW24CI001', name: 'Student 1', email: 'student1@gsssietw.edu', attendance: '92%' },
            { usn: '4GW24CI002', name: 'Student 2', email: 'student2@gsssietw.edu', attendance: '88%' },
            { usn: '4GW24CI003', name: 'Student 3', email: 'student3@gsssietw.edu', attendance: '95%' }
        ];

        res.json({
            success: true,
            students: students,
            courseCode: courseCode,
            total: students.length
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching class students',
            error: error.message 
        });
    }
});

// Submit Grades
router.post('/submit-grades', [
    body('courseCode').trim().notEmpty(),
    body('grades').isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { courseCode, grades } = req.body;

        // Demo implementation - UPDATE DATABASE IN PRODUCTION
        console.log('Submitting grades for course:', courseCode, 'Grades:', grades);

        res.json({
            success: true,
            message: `Grades submitted successfully for course ${courseCode}`,
            gradesSubmitted: grades.length,
            courseCode: courseCode
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error submitting grades',
            error: error.message 
        });
    }
});

// Get Pending Assignments
router.get('/pending-assignments/:facultyId', async (req, res) => {
    try {
        const { facultyId } = req.params;

        // Demo data - REPLACE WITH DATABASE QUERY
        const assignments = [
            { assignmentId: 1, title: 'Assignment 1: Arrays', courseCode: 'CS301', total: 45, graded: 35, pending: 10 },
            { assignmentId: 2, title: 'SQL Query Practice', courseCode: 'CS302', total: 42, graded: 28, pending: 14 },
            { assignmentId: 3, title: 'HTML/CSS Project', courseCode: 'CS303', total: 50, graded: 50, pending: 0 }
        ];

        res.json({
            success: true,
            assignments: assignments,
            total: assignments.length,
            pendingGrading: assignments.reduce((sum, a) => sum + a.pending, 0)
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching pending assignments',
            error: error.message 
        });
    }
});

module.exports = router;
