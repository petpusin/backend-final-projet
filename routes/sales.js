const express = require('express');
const bcrypt = require('bcryptjs');
const sales = require('../models/Sales');
const restaurant = require('../models/Restaurant');
const acc = require('../models/AccId');
const addresses = require('../models/Address');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const router = express.Router();
const path = require('path');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type')
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads/restaurants');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});
var uploadOption = multer({ storage: storage })


router.get('/', async (req, res) => {
    const userList = await sales.find().populate('restaurants').select('-password');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get('/:id', async (req, res) => {
    const user = await acc.findById({ _id: req.params.id }).select('-password');

    if (!user) {
        return res.status(500).json({ success: false });
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


router.post('/register', uploadOption.single("res_image"), async (req, res) => {
    // res.send('register route');



    try {
        const {
            sale_firstname,
            sale_lastname,
            sale_age,
            sale_gender,
            sale_phone,
            sale_email,
            username,
            password,
            restaurant_name,
            addr_line1,
            road,
            subdistrict,
            district,
            province,
            postalcode,
            line,
            website



        } = req.body;
        // const userList = await acc.findOne({ username: username });
        // if (userList) {
        //     return  res.status(400).send('The user is  found!! ');
        // } 

        console.log(req.body)
        const addr = new addresses({
            addr_line1: addr_line1,
            road: road,
            subdistrict: subdistrict,
            district: district,
            province: province,
            postalcode: postalcode,
        }); //address/id
        await addr.save();
        //ingredient
        // const ingredientId = Promise.all(restaurants.ingredient.map(async ingre => {
        //     let ingredientNew = new ingredients({
        //         ingredient_name: ingre.ingredient_name,
        //         ingredient_price: ingre.ingredient_price
        //     });
        //     ingredientNew = await ingredientNew.save();
        //     return ingredientNew._id;
        // }));
        // //options 
        // const optionId = Promise.all(restaurants.option.map(async op => {
        //     let opNew = new options({
        //         option_name: op.option_name,
        //         option_price: op.option_price
        //     });
        //     opNew = await opNew.save();
        //     return opNew._id;
        // }));
        // // variation

        // const variationId = Promise.all(restaurants.varaition.map(async vara => {
        //     let varaNew = new varaitions({
        //         varaition_name: vara.varaition_name,
        //         varaition_price: vara.varaition_price
        //     });
        //     varaNew = await varaNew.save();
        //     return varaNew._id;
        // }));

        // const optionIdResolved = await optionId;
        // const ingredientIdResolved = await ingredientId;
        // const variationResolved = await variationId;
        const FileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/restaurants/`
        const rest = new restaurant({
            restaurant_name: restaurant_name,
            address: [addr._id],
            website: website,
            res_image: `${basePath}${FileName}`
        });
        await rest.save();
        const resrole = "restaurant";
        const account = new acc({
            username: username,
            password: bcrypt.hashSync(password, 10),
            role: resrole
        })
        await account.save();

        const sale = new sales({
            sale_firstname: sale_firstname,
            sale_lastname: sale_lastname,
            sale_age: sale_age,
            sale_gender: sale_gender,
            sale_phone: sale_phone,
            sale_email: sale_email,
            acc_id: [account._id],
            restaurants: [rest._id],
            line: line
        });

        await sale.save();
        if (sale) {
            return res.send({ massage: 'sale created!', data: sale });
        }
        
    } catch (err) {
        console.log(err);
    }

})

router.put("/:_id",uploadOption.single("res_image"), async (req,res) => {
    
    const FileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/restaurants/`
    const res_update = await restaurant.findByIdAndUpdate(req.params._id, {
        res_image: `${basePath}${FileName}`

    }, { new: true })
    if (!res_update) {
        return res.status(400).send('the res_update cannot br create!')
    }
    res.send(res_update);
})

module.exports = router;

