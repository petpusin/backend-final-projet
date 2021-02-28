const express = require('express');
const restaurant = require('../models/Restaurant');

const menu = require('../models/Menu');
const order = require('../models/Order');
const orderdetails = require('../models/Orderdetails');
const router = express.Router();


router.get('/', async (req, res) => {
    const orderList = await order.find().populate('orderDetail ');
    if (!orderList) {
        res.status(400).send('Dont have menu in database')
    }
    res.send(orderList);
});

router.get('/:_id', async (req, res) => {
    const orders = await order.findById(req.params._id)
        .populate({ path: 'orderDetail', populate: 'orderlist , ingredient , option , varaition' })
        .populate('cus_id', 'cus_firstname')
        .populate('res_id', 'restaurant_name');
    if (!orders) {
        res.status(400).send('Dont have menu in database')
    }
    res.send(orders);
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
            orderlist: ordetail.orderlist,
            ingredient: ordetail.ingredient,
            option: ordetail.option,
            varaition: ordetail.varaition
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
    }
    res.send(orders);
    // res.send({
    //     massege: 'Order created!',
    //     data: orders
    // }).catch(
    //     err => console.log(err)
    // );
    // res.end();
});

router.put('/:_id', async (req, res) => {
    const {
        status
    } = req.body
    if (status == "Waiting" || status == "Cooking" || status == "Cancle") {
        const orders = await order.findByIdAndUpdate(
            req.params._id, {
            status: status

        }, { new: true })

        if (!orders) {
            return res.status(400).send('the order cannot br create!')
        }
        res.send(orders);

    } else if (status == "Finish") {
        const orders = await order.findByIdAndUpdate(
            req.params._id, {
            status: status,
            dateOrderFinish : Date.now()

        }, { new: true })

        if (!orders) {
            return res.status(400).send('the order cannot br create!')
        }
        res.send(orders);

    }
    

})

module.exports = router;