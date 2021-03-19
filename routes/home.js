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
        const rest_menu = await restaurant.findById(req.params._id)
            .populate('menus')
            .populate('option')
            .populate('ingredient')
            .populate('varaition')
        if (!rest_menu) {
            return res.status(400).send('Can not found restaurant and menu');
        }
        res.status(200).send(rest_menu);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

})
router.get("/options/:_id", async (req, res) => {
    try {
        const res_option = await restaurant.findOne({ menus: req.params._id }).populate('option').select('option -_id');
        if (!res_option) {
            return res.status(400).send("Can not found option");

        }
        return res.status(200).send(res_option);
    } catch (error) {
        return res.status(500).send(error)
    }

});
router.get("/ingredients/:_id", async (req, res) => {
    try {
        const res_ingredients = await restaurant.findOne({ menus: req.params._id }).populate('ingredient').select('ingredient -_id');
        if (!res_ingredients) {
            return res.status(400).send("Can not found ingredients");

        }
        return res.status(200).send(res_ingredients);
    } catch (error) {
        return res.status(500).send(error)
    }
});
router.get("/varaitions/:_id", async (req, res) => {
    try {
        const res_varaitions = await restaurant.findOne({ menus: req.params._id }).populate('varaition').select('varaition -_id ');
        if (!res_varaitions) {
            return res.status(400).send("Can not found varaitions");

        }
        return res.status(200).send(res_varaitions);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/op/:_id", async (req, res) => {
    try {
        const res_varaitions = await restaurant.findOne({ menus: req.params._id }).populate('varaition').select('varaition -_id ').populate('option').select('option -_id ').populate('ingredient').select('ingredient -_id ');
        if (!res_varaitions) {
            return res.status(400).send("Can not found varaitions");

        }
        return res.status(200).send(res_varaitions);
    } catch (error) {
        return res.status(500).send(error);
    }
});




module.exports = router;