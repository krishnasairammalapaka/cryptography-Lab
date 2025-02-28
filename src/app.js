const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const authService = require('./services/authService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        user: req.session.user || null
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        error: null,
        user: req.session.user || null
    });
});

// Authentication routes
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password: '[HIDDEN]' });

        const { user, error } = await authService.login(email, password);
        
        if (error) {
            console.log('Login error:', error);
            return res.render('login', {
                error: error,
                user: null
            });
        }

        // Set user session
        req.session.user = user;
        console.log('Session set:', req.session.user);

        // Redirect based on role
        switch (user.role) {
            case 'admin':
                res.redirect('/admin/dashboard');
                break;
            case 'faculty':
                res.redirect('/faculty/dashboard');
                break;
            case 'student':
                res.redirect('/student/dashboard');
                break;
            default:
                res.redirect('/');
        }
    } catch (err) {
        console.error('Route error:', err);
        res.render('login', {
            error: 'An unexpected error occurred',
            user: null
        });
    }
});

// Protected route middleware
const requireAuth = (role) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        if (role && req.session.user.role !== role) {
            return res.status(403).render('error', {
                error: 'Unauthorized access',
                user: req.session.user
            });
        }
        next();
    };
};

// Protected routes
app.get('/admin/dashboard', requireAuth('admin'), (req, res) => {
    res.render('admin/dashboard', {
        user: req.session.user
    });
});

app.get('/faculty/dashboard', requireAuth('faculty'), (req, res) => {
    res.render('faculty/dashboard', {
        user: req.session.user
    });
});

app.get('/student/dashboard', requireAuth('student'), (req, res) => {
    res.render('student/dashboard', {
        user: req.session.user
    });
});

// Logout route
app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        error: 'Something broke!',
        user: req.session.user || null
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});