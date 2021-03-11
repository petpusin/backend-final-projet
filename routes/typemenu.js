const express = require('express');
const typemenu = require('../models/Type_menu');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getType = await typemenu.find();
        if(!getType) {
            return res.status(500).json({success : false});
        }
        
        res.send(getType);

    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res) => {

    try {
        const {
            type_name,
            describe

        } = req.body;
        console.log(req.body);
        const category = await typemenu.findOne({type_name : type_name});
        if(category){
            return res.status(400).send('has type of menu yet!')
        }
        const createType = new typemenu({
            type_name: type_name,
            describe: describe
        });
        await createType.save();
        if(!createType) {
            return res.status(404).json({success : false});
        }
        res.send(createType);
       
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;