const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const authService = require('./services/authService');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// Session configuration
app.use(session({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
app.get('/', (req, res) => {
    if (req.session.user) {
        switch (req.session.user.role) {
            case 'student':
                return res.redirect('/student/dashboard');
            default:
                return res.redirect('/');
        }
    }
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        switch (req.session.user.role) {
            case 'student':
                return res.redirect('/student/dashboard');
            default:
                return res.redirect('/');
        }
    }
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

// Authentication routes
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, error } = await authService.login(email, password);
        
        if (error) {
            return res.status(401).json({ error });
        }

        // Set user session
        req.session.user = user;

        // Send response with redirect URL
        let redirectUrl = '/';
        switch (user.role) {
            case 'student':
                redirectUrl = '/student/dashboard';
                break;
        }

        res.json({ 
            success: true, 
            redirect: redirectUrl,
            user: {
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Route error:', err);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

// Mount student routes
app.use('/student', studentRoutes);

// Logout route
app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'views/error.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});