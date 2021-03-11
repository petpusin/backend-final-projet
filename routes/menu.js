const express = require('express');
const restaurant = require('../models/Restaurant');
const menu = require('../models/Menu');
const router = express.Router();
const type_menus = require('../models/Type_menu');
const multer = require('multer');
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
        if(isValid){
            uploadError = null ;
        }
        cb(uploadError, 'public/uploads/menus')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});
var uploadOption = multer({ storage: storage })

router.get('/', async (req, res) => {
    const menuList = await menu.find();
    if (!menuList) {
        return res.status(400).send('Dont have menu in database')
    }
    res.send(menuList);
});

router.post('/',uploadOption.single("menu_image"), async (req, res) => {
    console.log(req.body);
    const {
        _id_res,
        menu_name,
        describe,
        price,
        type_menu

    } = req.body
    console.log(type_menu);
    const typemenu = await type_menus.findById(type_menu);
    const file = req.file;
    if (!typemenu) {
        return res.status(400).send('Invalid type of menu')
    }
    if (!file) {
        return res.status(400).send('Not image in the request')
    }

    const FileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/menus/`
    let menus = new menu({
        menu_name: menu_name,
        describe: describe,
        price: price,
        type_menu: type_menu,
        active: false,
        menu_image: `${basePath}${FileName}`
    });
    menus = await menus.save();
    console.log(menus._id);
    // await restaurant.findByIdAndUpdate({ _id }, { $push: { menus: menus._id } });
    const rest = await await restaurant.findByIdAndUpdate({ _id:_id_res }, { $push: { menus: menus._id } })

    res.send({
        massege: 'menu created!',
        data: rest
    }).catch(
        err => console.log(err)
    );
    // res.end();
});

router.put("/:_id",uploadOption.single("menu_image"), async (req,res) => {
    
    const FileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/menus/`
    const menu_update = await menu.findByIdAndUpdate(req.params._id, {
        menu_image: `${basePath}${FileName}`

    }, { new: true })
    if (!menu_update) {
        return res.status(400).send('the res_update cannot br create!')
    }
    res.send(menu_update);
})

module.exports = router;