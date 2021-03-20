const express = require('express');
const bcrypt = require('bcryptjs');
const cus = require('../models/Customer');

const acc = require('../models/AccId');
const addresses = require('../models/Address');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const router = express.Router();



router.get('/', async (req, res) => {
    const userList = await acc.find().select('-password');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get('/:id', async (req, res) => {
    const user = await Customer.findOne({acc_id:req.params.id}).select('-password');

    if (!user) {
        res.status(500).json({ success: false });
    }
    res.send(user);
});

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
        res.status(200).header('auth-token', token).send({ userId: user._id, user: user.username , role: user.role, token: token });
    } else {
        res.status(400).send('password is worng!!');
    }


});


router.post('/register', async (req, res) => {
    // res.send('register route');



    try {
        const {
            cus_firstname,
            cus_lastname,
            cus_age,
            cus_phone,
            cus_email,
            username,
            password,
            career,
            careerDetail


        } = req.body;

        console.log(req.body)
        
        const cusrole = "customer";
        const account = new acc({
            username: username,
            password: bcrypt.hashSync(password, 10),
            role: cusrole
            

        })
        await account.save();

        const cust = new cus({
            cus_firstname: cus_firstname,
            cus_lastname: cus_lastname,
            cus_age: cus_age,
            cus_phone: cus_phone,
            cus_email: cus_email,
            acc_id:[account._id],
            career : career,
            careerDetail: careerDetail
        });

        await cust.save();

        res.send({massage:'customer was created!',data: cust});
    } catch (err) {
        console.log(err);
    }

})

router.get('/orders/:_id', async (req, res) => {
    const orders = await order.findOne({cus_id:req.params._id})
        .populate({ path: 'orderDetail', populate: 'orderlist , ingredient , option , varaition' })
        .populate('cus_id', 'cus_firstname')
        .populate('res_id', 'restaurant_name');
    if (!orders) {
        res.status(400).send('Dont have menu in database')
    }
    res.send(orders);
});



module.exports = router;

