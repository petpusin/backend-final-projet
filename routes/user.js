const express = require('express');
const bcrypt = require('bcryptjs');
const acc = require('../models/AccId');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/login', async (req, res) => {
    console.log(req.body);
    const user = await acc.findOne({ username: req.body.username });
    const secret = process.env.secret;
    console.log(secret);
    if (!user) {
        return res.status(400).send('The user is not found!!');
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, secret, { expiresIn: '1d' });
        res.status(200).header('auth-token', token).send({ userId: user._id, user: user.username, role:user.role, token: token });
    } else {
        res.status(400).send('password is worng!!');
    }


});

module.exports = router;