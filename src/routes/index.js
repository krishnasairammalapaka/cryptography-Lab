const express = require('express');
const router = express.Router();
const { requireAuth, checkRole, redirectToDashboard } = require('../middleware/auth');

// Home route - redirects to appropriate dashboard
router.get('/', requireAuth, redirectToDashboard);

// Student routes
router.get('/student/dashboard', checkRole(['student']), (req, res) => {
    res.render('student/dashboard', { user: req.session.user });
});

router.get('/student/exercises', checkRole(['student']), (req, res) => {
    res.render('student/exercises', { user: req.session.user });
});

router.get('/student/progress', checkRole(['student']), (req, res) => {
    res.render('student/progress', { user: req.session.user });
});

router.get('/student/resources', checkRole(['student']), (req, res) => {
    res.render('student/resources', { user: req.session.user });
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