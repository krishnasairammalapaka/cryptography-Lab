const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Access Denied: You do not have the required role to access this resource');
        }

        next();
    };
};

const redirectToDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    switch (req.session.user.role) {
        case 'student':
            return res.redirect('/student/dashboard');
        case 'faculty':
            return res.redirect('/faculty/dashboard');
        case 'admin':
            return res.redirect('/admin/dashboard');
        default:
            return res.redirect('/login');
    }
};

module.exports = {
    requireAuth,
    checkRole,
    redirectToDashboard
}; 