const express = require('express');
const restaurant = require('../models/Restaurant');
const addresses = require('../models/Address');
const menu = require('../models/Menu');
const ingredients = require('../models/Ingredient');
const type_menus = require('../models/Type_menu');
const options = require('../models/Option');
const varaitions = require('../models/Varaiation');
const router = express.Router();


router.post('/', async (req, res) => {

    try {
        console.log(req.body);
        const {
            restaurant_name,
            address,
            open_status,
            describe,


        } = req.body;
        const addr = await addresses.create({
            addr_line1: address.addr_line1,
            addr_line2: address.addr_line2,
            state: address.state,
            city: address.city,
            postal_code: address.postal_code
        }); //address/id
        const restaurants = await restaurant.create({
            restaurant_name: restaurant_name,
            address: [addr._id],
            open_status,
            describe: describe,
            sale_id: null
        });
        res.send({
            massage: 'restaurant created!',
            data: restaurants
        });
    } catch (error) {
        console.log(error);
    }
});



router.get("/", async (req, res) => {
    const rest = await restaurant.find({})
    // populate('address').
    res.send(rest);

});

router.get("/menus/:id", async (req, res) => {
    try {
        const rest_menu = await restaurant.find({}).populate('menus')
        if (!rest_menu) {
            return res.status(400).send('Can not found restaurant and menu');
        }
        res.status(200).send(rest_menu);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

})

router.get("/:_id", (req, res) => {
    restaurants.findById(req.params._id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});

module.exports = router;

