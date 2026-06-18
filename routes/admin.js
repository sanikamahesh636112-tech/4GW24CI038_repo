const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../db');

const router = express.Router();

// Admin Login
router.post('/login', [
    body('adminId').trim().notEmpty(),
    body('password').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { adminId, password } = req.body;

        // Demo credentials - REPLACE WITH DATABASE QUERY IN PRODUCTION
        const validAdmins = {
            "admin001": "admin123",
            "admin002": "admin123",
            "admin@gsssietw.edu": "admin123"
        };

        if (!validAdmins[adminId]) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid Admin ID or Password' 
            });
        }

        if (validAdmins[adminId] !== password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid Admin ID or Password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: adminId, role: 'admin' },
            process.env.JWT_SECRET || 'admin-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Admin login successful',
            token: token,
            adminId: adminId,
            role: 'admin'
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login',
            error: error.message 
        });
    }
});

// Get Admin Dashboard Stats
router.get('/stats', async (req, res) => {
    try {
        // Demo data - REPLACE WITH ACTUAL DATABASE QUERIES
        const stats = {
            totalStudents: 1245,
            totalFaculty: 45,
            totalCourses: 156,
            systemStatus: 'Active'
        };

        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching stats',
            error: error.message 
        });
    }
});

// Add New Student
router.post('/add-student', [
    body('usn').trim().notEmpty(),
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('phone').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { usn, name, email, phone, address } = req.body;

        // Demo implementation - ADD TO DATABASE IN PRODUCTION
        console.log('Adding student:', { usn, name, email, phone, address });

        res.json({
            success: true,
            message: `Student ${name} (${usn}) added successfully`,
            student: { usn, name, email, phone, address }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error adding student',
            error: error.message 
        });
    }
});

// Add Faculty Member
router.post('/add-faculty', [
    body('facultyId').trim().notEmpty(),
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('department').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { facultyId, name, email, department, specialization } = req.body;

        // Demo implementation - ADD TO DATABASE IN PRODUCTION
        console.log('Adding faculty:', { facultyId, name, email, department, specialization });

        res.json({
            success: true,
            message: `Faculty ${name} (${facultyId}) added successfully`,
            faculty: { facultyId, name, email, department, specialization }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error adding faculty',
            error: error.message 
        });
    }
});

// Get All Students
router.get('/students', async (req, res) => {
    try {
        // Demo data - REPLACE WITH DATABASE QUERY
        const students = [
            { usn: '4GW24CI001', name: 'Student 1', email: 'student1@gsssietw.edu', status: 'Active' },
            { usn: '4GW24CI002', name: 'Student 2', email: 'student2@gsssietw.edu', status: 'Active' },
            { usn: '4GW24CI003', name: 'Student 3', email: 'student3@gsssietw.edu', status: 'Active' }
        ];

        res.json({
            success: true,
            students: students,
            total: students.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching students',
            error: error.message 
        });
    }
});

// Get All Faculty
router.get('/faculty', async (req, res) => {
    try {
        // Demo data - REPLACE WITH DATABASE QUERY
        const faculty = [
            { facultyId: 'FAC001', name: 'Dr. Smith', email: 'smith@gsssietw.edu', department: 'CSE', status: 'Active' },
            { facultyId: 'FAC002', name: 'Prof. Johnson', email: 'johnson@gsssietw.edu', department: 'CSE', status: 'Active' },
            { facultyId: 'FAC003', name: 'Dr. Williams', email: 'williams@gsssietw.edu', department: 'IT', status: 'Active' }
        ];

        res.json({
            success: true,
            faculty: faculty,
            total: faculty.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching faculty',
            error: error.message 
        });
    }
});

module.exports = router;
