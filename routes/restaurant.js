const express = require('express');
const restaurant = require('../models/Restaurant');
const addresses = require('../models/Address');
const menu = require('../models/Menu');
const ingredients = require('../models/Ingredient');
const type_menus = require('../models/Type_menu');
const options = require('../models/Option');
const varaitions = require('../models/Varaiation');
const sales = require('../models/Sales')
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

router.get("/:_id", async (req, res) => {
    const resId = await sales.findOne({acc_id:req.params._id}).populate('restaurants')
        
    if (!resId) {
        return res.status(400).send("cannot found");
    }else{
        res.status(200).send(resId);
    }

});

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

router.post('/options', async (req, res) => {
    const {
        id,
        label,
        value
    } = req.body

    

    try {
        console.log(req.body);
        // const findOption = await options.findOne({ label: label })
        // if (findOption) {
        //     return res.status(400).send("You have option yet!")
        // }
        const option = new options({
            label: label,
            value: value

        })
        await option.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, { $push: { option: option._id } }, { new: true })
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
            label,
            value
        } = req.body
        // const findIngredient = await ingredients.findOne({ label: label })
        // if (findIngredient) {
        //     return res.status(400).send("You have ingredient yet!")
        // }
        const ingredient = new ingredients({
            label: label,
            value: value

        })
        await ingredient.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, { $push: { ingredient: ingredient._id } }, { new: true })
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
            label,
            value
        } = req.body
        // const findVaraition = await varaitions.findOne({ label: label })
        // if (findVaraition) {
        //     return res.status(400).send("You have varaition yet!")
        // }
        const varaition = await varaitions.create({
            label: label,
            value: value

        })
        await varaition.save();
        const res_update = await restaurant.findByIdAndUpdate({ _id: id }, { $push: { varaition: varaition._id } }, { new: true })
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

