const express = require('express');
const typemenu = require('..//models/Type_menu');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getType = await typemenu.find();
        if(!getType) {
            res.status(500).json({success : false});
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

        const category = typemenu.find({type_name : type_name});

        if(!category){
            res.status(400).send('has type of menu yet!')
        }
        let createType = new typemenu({
            type_name: type_name,
            describe: describe
        });
        createType = await createType.save();
        if(!createType) {
            res.status(404).json({success : false});
        }
        res.send(createType);
       
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;