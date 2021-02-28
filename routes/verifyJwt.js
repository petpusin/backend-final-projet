const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    const token = req.header('auth-token');
    const sec = process.env.secret;
    if(!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const verified = jwt.verify(token , sec);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}