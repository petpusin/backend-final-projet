const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');
const Sales = require('./routes/sales.js');
const Customer = require('./routes/customer');
const Restaurants = require('./routes/restaurant.js');
const Menu = require('./routes/menu.js');
const Typemenu = require('./routes/type_menu.js');
const Order = require('./routes/order');
const Home = require('./routes/home');
const User = require('./routes/user');
// middleware JWT
const authJwt = require('./helpers/jwt');
// const verifyToken = require('./routes/verifyJwt');
//error-handle
const errorHandler = require('./helpers/error-handler');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt());
// app.use(errorHandler);
app.use('/public/uploads/restaurants', express.static(__dirname + '/public/uploads/restaurants/'));
app.use('/public/uploads/menus', express.static(__dirname + '/public/uploads/menus/'));
app.get('/', (req,res) => {
    res.send('Sales Home');
});

require('dotenv').config();
const port = process.env.PORT || 3000;
const api = process.env.API_URL;
app.use(`${api}/sales`, Sales);
app.use(`${api}/customer`, Customer);
app.use(`${api}/restaurant`, Restaurants);
app.use(`${api}/menu`, Menu);
app.use(`${api}/typemenu`, Typemenu);
app.use(`${api}/order` , Order);
app.use(`${api}/home`, Home);
app.use(`${api}/user`, User);


// app.get('/', (req,res) =>{
//     res.send('Welcome to express!!');
// });

// app.get('/api/listen' , (req,res) =>{
//     res.send([{id: 1 , roomType: 'Duplex'}, {id:2 , roomType: 'Sing'}])
// });

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster.40z2p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false}).then(
    resule =>{
        app.listen(port,() => console.log(`Server is runing on port ${port}`))
    }
).catch(err => console.log(err));


//Production
// var server = app.listen(process.env.PORT || 3000 , function(){
//     var port = server.address().port;
//     console.log("Express is working on port " + port);
// });