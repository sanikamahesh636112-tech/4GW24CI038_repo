const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../db');

const router = express.Router();

// Login route
router.post('/login', [
    body('usn').isLength({ min: 8, max: 20 }).trim().toUpperCase(),
    body('password').notEmpty().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        let { usn, password } = req.body;
        usn = usn.toUpperCase();

        // Validate USN pattern
        const usnPattern = /^4GW24CI(0[0-5][0-9]|06[0-8])$/;
        if (!usnPattern.test(usn)) {
            return res.status(401).json({ success: false, message: 'Invalid USN format' });
        }

        // Get user from database
        const [users] = await pool.query(
            'SELECT * FROM users WHERE usn = ?',
            [usn]
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = users[0];
        
        // Check password (for demo, accept 'student123' as default)
        let isValidPassword;
        if (password === 'student123') {
            isValidPassword = true;
        } else {
            isValidPassword = await bcrypt.compare(password, user.password);
        }

        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Update login info
        await pool.query(
            'UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE usn = ?',
            [usn]
        );

        // Record login history
        await pool.query(
            'INSERT INTO login_history (usn, ip_address, user_agent) VALUES (?, ?, ?)',
            [usn, req.ip || 'unknown', req.headers['user-agent'] || 'unknown']
        );

        // Get updated login count
        const [updatedUser] = await pool.query(
            'SELECT login_count FROM users WHERE usn = ?',
            [usn]
        );

        // Generate JWT token
        const token = jwt.sign(
            { usn: user.usn, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                usn: user.usn,
                role: user.role,
                loginCount: updatedUser[0]?.login_count || 0
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Register new user (for admin use)
router.post('/register', [
    body('usn').isLength({ min: 8, max: 20 }).trim().toUpperCase(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        let { usn, password } = req.body;
        usn = usn.toUpperCase();

        // Check if user exists
        const [existing] = await pool.query('SELECT * FROM users WHERE usn = ?', [usn]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await pool.query(
            'INSERT INTO users (usn, password, role) VALUES (?, ?, ?)',
            [usn, hashedPassword, 'student']
        );

        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify token route
router.post('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await pool.query(
            'SELECT usn, role FROM users WHERE usn = ?',
            [decoded.usn]
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: users[0] });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

module.exports = router;