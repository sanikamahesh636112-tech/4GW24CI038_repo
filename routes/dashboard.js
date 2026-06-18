const express = require('express');
const { pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get dashboard data
router.get('/data', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        
        // Get user info
        const [user] = await pool.query(
            'SELECT usn, login_count, last_login FROM users WHERE usn = ?',
            [usn]
        );
        
        // Get profile info
        const [profile] = await pool.query(
            'SELECT full_name FROM student_profiles WHERE usn = ?',
            [usn]
        );
        
        // Get MOOC count
        const [moocCount] = await pool.query(
            'SELECT COUNT(*) as count FROM mooc_courses WHERE usn = ?',
            [usn]
        );
        
        // Get activities count
        const [activityCount] = await pool.query(
            'SELECT COUNT(*) as count FROM activities WHERE usn = ?',
            [usn]
        );
        
        // Get all MOOCs
        const [moocs] = await pool.query(
            'SELECT * FROM mooc_courses WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        // Get all activities
        const [activities] = await pool.query(
            'SELECT * FROM activities WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        // Get late coming count for today
        const [lateCount] = await pool.query(
            `SELECT COUNT(*) as count FROM late_coming_records 
             WHERE usn = ? AND late_date = CURDATE()`,
            [usn]
        );

        res.json({
            success: true,
            dashboard: {
                studentName: profile[0]?.full_name || 'Student',
                usn: user[0]?.usn,
                loginCount: user[0]?.login_count || 0,
                lastLogin: user[0]?.last_login,
                totalMoocs: moocCount[0]?.count || 0,
                totalActivities: activityCount[0]?.count || 0,
                lateComingToday: lateCount[0]?.count || 0,
                moocs: moocs,
                activities: activities
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all MOOCs for user
router.get('/moocs', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        
        const [moocs] = await pool.query(
            'SELECT * FROM mooc_courses WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        res.json({ success: true, moocs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all activities for user
router.get('/activities', authenticateToken, async (req, res) => {
    try {
        const usn = req.user.usn;
        
        const [activities] = await pool.query(
            'SELECT * FROM activities WHERE usn = ? ORDER BY created_at DESC',
            [usn]
        );
        
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;