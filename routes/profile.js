const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        
        const [profiles] = await pool.query(
            'SELECT * FROM student_profiles WHERE usn = ?',
            [usn]
        );
        
        const [moocs] = await pool.query(
            'SELECT * FROM mooc_courses WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        const [activities] = await pool.query(
            'SELECT * FROM activities WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        const [user] = await pool.query(
            'SELECT login_count, last_login FROM users WHERE usn = ?',
            [usn]
        );

        res.json({
            success: true,
            profile: profiles[0] || null,
            moocs,
            activities,
            stats: user[0]
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Save/Update profile
router.post('/save', authenticateToken, [
    body('fullName').notEmpty().trim(),
    body('email').optional().isEmail(),
    body('mobile').optional().isMobilePhone()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const usn = req.user.usn;
        const {
            fullName, dob, mobile, email, linkedin, github,
            skillsboost, fatherMobile, motherMobile, hobbies,
            category, achievements, profileImage
        } = req.body;

        // Check if profile exists
        const [existing] = await pool.query(
            'SELECT * FROM student_profiles WHERE usn = ?',
            [usn]
        );

        if (existing.length > 0) {
            // Update existing profile
            await pool.query(
                `UPDATE student_profiles SET 
                    full_name = ?, dob = ?, mobile = ?, email = ?,
                    linkedin_url = ?, github_url = ?, skillsboost_url = ?,
                    father_mobile = ?, mother_mobile = ?, hobbies = ?,
                    category = ?, achievements = ?, profile_image = ?
                WHERE usn = ?`,
                [fullName, dob, mobile, email, linkedin, github, skillsboost,
                 fatherMobile, motherMobile, hobbies, category, achievements,
                 profileImage, usn]
            );
        } else {
            // Insert new profile
            await pool.query(
                `INSERT INTO student_profiles 
                    (usn, full_name, dob, mobile, email, linkedin_url, github_url,
                     skillsboost_url, father_mobile, mother_mobile, hobbies,
                     category, achievements, profile_image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [usn, fullName, dob, mobile, email, linkedin, github, skillsboost,
                 fatherMobile, motherMobile, hobbies, category, achievements, profileImage]
            );
        }

        res.json({ success: true, message: 'Profile saved successfully' });
    } catch (error) {
        console.error('Save profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Add MOOC course
router.post('/mooc/add', authenticateToken, [
    body('courseName').notEmpty().trim()
], async (req, res) => {
    try {
        const usn = req.user.usn;
        const { courseName, provider, status } = req.body;

        await pool.query(
            `INSERT INTO mooc_courses (usn, course_name, provider, status, enrollment_date)
             VALUES (?, ?, ?, ?, CURDATE())`,
            [usn, courseName, provider || 'Unknown', status || 'ongoing']
        );

        res.json({ success: true, message: 'MOOC course added successfully' });
    } catch (error) {
        console.error('Add MOOC error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete MOOC course
router.delete('/mooc/:id', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        const moocId = req.params.id;

        await pool.query(
            'DELETE FROM mooc_courses WHERE id = ? AND usn = ?',
            [moocId, usn]
        );

        res.json({ success: true, message: 'MOOC course deleted successfully' });
    } catch (error) {
        console.error('Delete MOOC error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Add activity
router.post('/activity/add', authenticateToken, [
    body('activityName').notEmpty().trim()
], async (req, res) => {
    try {
        const usn = req.user.usn;
        const { activityName, activityDate, category, description } = req.body;

        await pool.query(
            `INSERT INTO activities (usn, activity_name, activity_date, category, description)
             VALUES (?, ?, ?, ?, ?)`,
            [usn, activityName, activityDate || new Date().toISOString().split('T')[0], category || 'General', description || '']
        );

        res.json({ success: true, message: 'Activity added successfully' });
    } catch (error) {
        console.error('Add activity error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete activity
router.delete('/activity/:id', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        const activityId = req.params.id;

        await pool.query(
            'DELETE FROM activities WHERE id = ? AND usn = ?',
            [activityId, usn]
        );

        res.json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Delete activity error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;