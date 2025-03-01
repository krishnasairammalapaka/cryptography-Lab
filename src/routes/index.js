const express = require('express');
const router = express.Router();
const { requireAuth, checkRole, redirectToDashboard } = require('../middleware/auth');
const db = require('../config/database');

// Home route - redirects to appropriate dashboard
router.get('/', requireAuth, redirectToDashboard);

// Student routes
router.get('/student/dashboard', requireAuth, checkRole(['student']), (req, res) => {
    res.render('student/dashboard', { user: req.session.user });
});

router.get('/student/exercises', requireAuth, checkRole(['student']), (req, res) => {
    res.render('student/exercises', { user: req.session.user });
});

router.get('/student/progress', requireAuth, checkRole(['student']), (req, res) => {
    res.render('student/progress', { user: req.session.user });
});

// Updated resources route with proper authentication and database integration
router.get('/student/resources', requireAuth, checkRole(['student']), async (req, res) => {
    try {
        // Fetch student information from database
        const [student] = await db.query('SELECT * FROM students WHERE email = ?', [req.session.user.email]);
        
        res.render('student/resources', {
            user: {
                name: student[0]?.name || req.session.user.name || 'N/A',
                email: student[0]?.email || req.session.user.email || 'N/A',
                studentId: student[0]?.student_id || 'N/A'
            }
        });
    } catch (error) {
        console.error('Error loading resources page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Individual resource topic routes
const topics = [
    { path: 'shift-cipher', title: 'Breaking the Shift Cipher' },
    { path: 'mono-alphabetic', title: 'Breaking the Mono-alphabetic Substitution Cipher' },
    { path: 'one-time-pad', title: 'One-Time Pad and Perfect Secrecy' },
    { path: 'mac', title: 'Message Authentication Codes' },
    { path: 'hash-functions', title: 'Cryptographic Hash Functions' },
    { path: 'des', title: 'Symmetric Key Encryption Standards (DES)' },
    { path: 'aes', title: 'Symmetric Key Encryption Standards (AES)' },
    { path: 'diffie-hellman', title: 'Diffie-Hellman Key Establishment' },
    { path: 'pkcs', title: 'Public-Key Cryptosystems' },
    { path: 'digital-signatures', title: 'Digital Signatures' }
];

// Add routes for individual resource topics
topics.forEach(topic => {
    router.get(`/student/resources/${topic.path}`, requireAuth, checkRole(['student']), async (req, res) => {
        try {
            const [student] = await db.query('SELECT * FROM students WHERE email = ?', [req.session.user.email]);
            
            res.render('student/resource-topic', {
                user: {
                    name: student[0]?.name || req.session.user.name || 'N/A',
                    email: student[0]?.email || req.session.user.email || 'N/A'
                },
                topic: {
                    title: topic.title,
                    path: topic.path
                }
            });
        } catch (error) {
            console.error(`Error loading resource topic ${topic.path}:`, error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Faculty routes
router.get('/faculty/dashboard', checkRole(['faculty']), (req, res) => {
    res.render('faculty/dashboard', { user: req.session.user });
});

router.get('/faculty/students', checkRole(['faculty']), (req, res) => {
    res.render('faculty/students', { user: req.session.user });
});

router.get('/faculty/exercises', checkRole(['faculty']), (req, res) => {
    res.render('faculty/exercises', { user: req.session.user });
});

router.get('/faculty/analytics', checkRole(['faculty']), (req, res) => {
    res.render('faculty/analytics', { user: req.session.user });
});

// Admin routes
router.get('/admin/dashboard', checkRole(['admin']), (req, res) => {
    res.render('admin/dashboard', { user: req.session.user });
});

router.get('/admin/users', checkRole(['admin']), (req, res) => {
    res.render('admin/users', { user: req.session.user });
});

router.get('/admin/settings', checkRole(['admin']), (req, res) => {
    res.render('admin/settings', { user: req.session.user });
});

router.get('/admin/logs', checkRole(['admin']), (req, res) => {
    res.render('admin/logs', { user: req.session.user });
});

module.exports = router; 