# FOFS2020
Food Ordering Facilitate System [FOFS] 

resources
- Visual Studio Code (Optional)
- Nodejs (Framework)
- Mongo DB
- Postman
- Express
- JWT (Authorization)

# [Installation/Configuration Manual]

### run Local

```
$ git init
$ git clone https://github.com/petpusin/backend-final-projet.git
$ cd backend-final-project
$ npm install 
$ nodemon app.js
```

### run on heroku
#### URL https://guarded-inlet-94713.herokuapp.com/api/v1/

# Routes

### GET 
```
GET    /home
GET    /home/customer
GET    /home/restaurant/:_id
GET    /home/options/:_id
GET    /home/ingredients/:_id
GET    /home/varaitions/:_id
GET    /restaurant/orders/:_id
GET    /orders
```
### POST
```
POST    /user/login
POST    /menu
POST    /sales/register
POST    /customer/register
POST    /orders

```
### PUT
```
PUT     /menu/:_id
PUT     /restaurant/orders/:_id
PUT     /restaurant/:_id
```

### DELETE
```
DELTEL  /restaurant/option/:_id
DELTEL  /menu/:_id
DELTEL  /restaurant/option/:_id

```

