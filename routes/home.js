const express = require('express');
const restaurant = require('../models/Restaurant');
const menu = require('../models/Menu');
const type_menus = require('../models/Type_menu');
const router = express.Router();

router.get("/", async (req, res) => {
    const rest = await restaurant.find({}).populate('menus').select('restaurant_name res_image')
    // populate('address').
    res.send(rest);

});

router.get("/:_id", async (req, res) => {
    try {
        console.log(req.params._id);
        const rest_menu = await restaurant.findById(req.params._id).populate('menus')
        if (!rest_menu) {
            return res.status(400).send('Can not found restaurant and menu');
        }
        res.status(200).send(rest_menu);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

})



module.exports = router;