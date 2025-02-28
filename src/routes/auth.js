const express = require('express');
const router = express.Router();
const { redirectToDashboard } = require('../middleware/auth');

// Mock user database (replace with actual database implementation)
const users = [
    { email: 'student1@example.com', password: 'student123', role: 'student', name: 'John Student' },
    { email: 'student2@example.com', password: 'student123', role: 'student', name: 'Jane Student' },
    { email: 'faculty1@example.com', password: 'faculty123', role: 'faculty', name: 'Dr. Smith' },
    { email: 'faculty2@example.com', password: 'faculty123', role: 'faculty', name: 'Prof. Johnson' },
    { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' }
];

// Login route
router.get('/login', (req, res) => {
    res.render('login', { error: req.flash('error') });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
    }

    // Store user information in session
    req.session.user = {
        email: user.email,
        role: user.role,
        name: user.name
    };

    // Redirect based on role
    redirectToDashboard(req, res);
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router; 