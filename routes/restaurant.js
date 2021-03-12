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
    restaurant.findById(req.params._id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});

router.get("/options/:_id", (req, res) => {
    restaurant.find({menus:req.params._id}).populate('option').select('option -_id').exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});
router.get("/ingredients/:_id", (req, res) => {
    restaurant.find({menus:req.params._id}).populate('ingredient').select('ingredient -_id').exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});
router.get("/varaitions/:_id", (req, res) => {
    restaurant.find({menus:req.params._id}).populate('varaition').select('varaition -_id').exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    });
});

router.post('/options', async (req, res) => {
    const {
        id,
        option_name,
        option_price
    } = req.body
    
    try {
        console.log(req.body);
        const findOption = await options.findOne({ option_name: option_name })
        if (findOption) {
            return res.status(400).send("You have option yet!")
        }
        const option = new options({
            option_name: option_name,
            option_price: option_price

        })
        await option.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, { $push :{option: option._id }}, { new: true })
        if (!(option) && !(res_update)) {
            return res.status(500).send("Can not create this option");
        } else {
            return res.status(200).send({
                massage: 'option created!',
                data: option
            })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/ingredients', async (req, res) => {
    try {
        const {
            id,
            ingredient_name,
            ingredient_price
        } = req.body
        const findIngredient = await ingredients.findOne({ ingredient_name: ingredient_name })
        if (findIngredient) {
            return res.status(400).send("You have ingredient yet!")
        }
        const ingredient = new ingredients({
            ingredient_name: ingredient_name,
            ingredient_price: ingredient_price

        })
        await ingredient.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, { $push:{ingredient: ingredient._id} }, { new: true })
        if (!(ingredient) && !(res_update)) {
            return res.status(500).send("Can not create this ingredient");
        } else {
            return res.status(200).send({
                massage: 'ingredient created!',
                data: ingredient
            })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/varaitions', async (req, res) => {
    try {
        const {
            id,
            varaition_name,
            varaition_price
        } = req.body
        const findVaraition = await varaitions.findOne({ varaition_name: varaition_name })
        if (findVaraition) {
            return res.status(400).send("You have varaition yet!")
        }
        const varaition = await varaitions.create({
            varaition_name: varaition_name,
            varaition_price: varaition_price

        })
        await varaition.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, {  $push:{varaition: varaition._id }}, { new: true })
        if (!varaition) {
            return res.status(500).send("Can not create this varaition");
        } else {
            return res.status(200).send({
                massage: 'varaition created!',
                data: varaition
            })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;

