const express = require('express');
const path = require('path');
const router = express.Router();

// Middleware to check if user is authenticated as student
const requireStudentAuth = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'student') {
        return res.redirect('/login');
    }
    next();
};

// Apply student authentication middleware to all routes
router.use(requireStudentAuth);

// Student Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/dashboard.html'));
});

// Student Overview
router.get('/overview', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/overview.html'));
});

// Student Resources
router.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/resources.html'));
});

// Student Courses
router.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/courses.html'));
});

// Student Assignments
router.get('/assignments', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/assignments.html'));
});

// Student Progress
router.get('/progress', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/student/progress.html'));
});

// Individual Resource Pages
router.get('/resources/:topic', (req, res) => {
    const topic = req.params.topic;
    res.sendFile(path.join(__dirname, `../views/student/resources/${topic}.html`));
});

module.exports = router; 