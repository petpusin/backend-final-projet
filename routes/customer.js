const express = require('express');
const bcrypt = require('bcryptjs');
const cus = require('../models/Customer');
const acc = require('../models/AccId');
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


router.post('/register', async (req, res) => {
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

router.get('/history/:_id', async (req, res) => {
    const orders = await order.findOne({cus_id:req.params._id , status:"Finish"})
        .populate({ path: 'orderDetail', populate: 'orderlist , ingredient , option , varaition' })
        .populate('cus_id', 'cus_firstname')
        .populate('res_id', 'restaurant_name');
    if (!orders) {
        res.status(400).send('Dont have menu in database')
    }
    res.send(orders);
});



module.exports = router;

