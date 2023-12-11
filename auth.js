const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send("You are not logged in, please log in and try again");
    }
    try {
        req.user = jwt.verify(token, 'TOKEN');
    } catch (error) {
        return res.status(401).send("Invalid user, please log in and try again");
    }
    return next();
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden: You do not have permission to perform this action');
        }
        next();
    }
}

module.exports = { auth, authorize };