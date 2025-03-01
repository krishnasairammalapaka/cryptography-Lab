const express = require('express');
const router = express.Router();
const { requireAuth, checkRole } = require('../middleware/auth');
const db = require('../config/database');

// Student dashboard route
router.get('/dashboard', requireAuth, checkRole(['student']), async (req, res) => {
    try {
        // Fetch complete student information from database
        const query = `
            SELECT 
                students.student_id,
                students.name,
                students.email,
                students.department,
                students.enrollment_date,
                students.semester
            FROM students
            WHERE students.email = ?
        `;
        
        const [rows] = await db.query(query, [req.session.user.email]);
        const student = rows[0]; // Get the first row from the results

        if (!student) {
            return res.status(404).send('Student not found');
        }

        // Format the date before sending to template
        const formattedDate = student.enrollment_date ? 
            new Date(student.enrollment_date).toLocaleDateString() : 
            'Not available';

        // Render dashboard with complete student information
        res.render('student/dashboard', {
            user: {
                name: student.name || 'N/A',
                studentId: student.student_id || 'N/A',
                email: student.email || 'N/A',
                department: student.department || 'N/A',
                semester: student.semester || 'N/A',
                enrollmentDate: formattedDate
            }
        });
    } catch (error) {
        console.error('Error fetching student information:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Resources main page route
router.get('/resources', requireAuth, checkRole(['student']), async (req, res) => {
    try {
        // Fetch student information for the navbar
        const [rows] = await db.query('SELECT * FROM students WHERE email = ?', [req.session.user.email]);
        const student = rows[0];

        res.render('student/resources', {
            user: {
                name: student.name || 'N/A',
                email: student.email || 'N/A'
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
    { path: 'hash-functions', title: 'Cryptographic Hash Functions and Applications' },
    { path: 'des', title: 'Symmetric Key Encryption Standards (DES)' },
    { path: 'aes', title: 'Symmetric Key Encryption Standards (AES)' },
    { path: 'diffie-hellman', title: 'Diffie-Hellman Key Establishment' },
    { path: 'pkcs', title: 'Public-Key Cryptosystems (PKCSv1.5)' },
    { path: 'digital-signatures', title: 'Digital Signatures' }
];

// Create routes for each topic
topics.forEach(topic => {
    router.get(`/resources/${topic.path}`, requireAuth, checkRole(['student']), async (req, res) => {
        try {
            // Fetch student information for the navbar
            const [rows] = await db.query('SELECT * FROM students WHERE email = ?', [req.session.user.email]);
            const student = rows[0];

            res.render('student/resource-topic', {
                user: {
                    name: student.name || 'N/A',
                    email: student.email || 'N/A'
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

module.exports = router; 