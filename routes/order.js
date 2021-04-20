const express = require('express');
const restaurant = require('../models/Restaurant');

const menu = require('../models/Menu');
const order = require('../models/Order');
const orderdetails = require('../models/Orderdetails');
const router = express.Router();


router.get('/', async (req, res) => {
    const orderlist = await order.find().populate('orderDetail ');
    if (!orderlist) {
        res.status(400).send('Dont have menu in database')
    }
    res.send(menus);
});

router.get('/:_id', async (req, res) => {
    const orders = await order.find({cus_id: req.params._id})
        .populate({ path: 'orderDetail', populate: 'menus , ingredient , option , varaition' })
        .populate('cus_id', 'username')
        .populate('res_id', 'restaurant_name');
    if (!orders) {
        return res.status(400).send('Dont have order in database')
    }else{
        return res.status(200).send(orders);}
});

router.get('/restaurant/:_id', async (req, res) => {
    const orders = await order.find({res_id: req.params._id})
        .populate({ path: 'orderDetail', populate: 'menus , ingredient , option , varaition' })
        .populate('cus_id', 'username')
        .populate('res_id', 'restaurant_name');
    if (!orders) {
        return res.status(400).send('Dont have order in database')
    }else{
        return res.status(200).send(orders);}
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const {
        res_id,
        cus_id,
        orderDetail,
        totalPrice,
    } = req.body

    const OrderDetailsIds = Promise.all(orderDetail.map(async ordetail => {
        let neworderdetail = new orderdetails({
            quantity: ordetail.quantity,
            menus: ordetail.menus,
            ingredient: ordetail.ingredient,
            option: ordetail.option,
            varaition: ordetail.varaition,
            describe: ordetail.describe
        });

        neworderdetail = await neworderdetail.save();

        return neworderdetail._id;
    }));
    const orderDetailIdsResolved = await OrderDetailsIds;

    let orders = new order({
        res_id: res_id,
        cus_id: cus_id,
        orderDetail: orderDetailIdsResolved,
        totalPrice: totalPrice,

    });
    orders = await orders.save();

    if (!orders) {
        return res.status(400).send('the order cannot br create!')
    }else{
        return res.status(200).send(orders);
    }
    
    
});



module.exports = router;