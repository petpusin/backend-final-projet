const express = require('express');
const bcrypt = require('bcryptjs');
const cus = require('../models/Customer');

const acc = require('../models/AccId');
const addresses = require('../models/Address');
const jwt = require('jsonwebtoken')

const router = express.Router();


// router.post('/', (req, res) => {
//     const sale = new Sales({
//         sale_id: req.body.sale_id,
//         sale_firstname: req.body.sale_firstname,
//         sale_lastname: req.body.sale_lastname,
//         sale_age: req.body.sale_age,
//         sale_phone: req.body.sale_phone,
//         sale_email: req.body.sale_email,
//         create: req.body.create,
//         restaurant_id: req.body.restaurant_id
//     });
//     sale.save().then(result => {
//         res.send({
//             massage: 'Sale created!',
//             data: result
//         }).catch(
//             err => console.log(err)
//         )
//     })
// });

router.get('/', async (req, res) => {
    const userList = await acc.find().select('-password');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get('/:id', async (req, res) => {
    const user = await acc.findById({_id:req.params.id}).select('-password');

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
            username: user.username
        }, secret, { expiresIn: '1d' });
        res.status(200).header('auth-token', token).send({ userId: user._id, user: user.username, token: token });
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
            acc_id,
            career,
            careerDetail


        } = req.body;

        console.log(req.body)
        

        const account = new acc({
            username: acc_id.username,
            password: bcrypt.hashSync(acc_id.password, 10),
            

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



module.exports = router;

