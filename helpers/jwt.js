const expressJwt = require('express-jwt');
require("dotenv").config();   
function authJwt() {
    const sec = process.env.secret;
    const api = process.env.API_URL
    console.log(sec);
    return expressJwt({
        secret : sec,
        algorithms: ['HS256'],
        // isRevoked: isRevoked
    }).unless({
        path:[
            {url: `${api}/menu`, methods:['GET','OPTIONS']},
            {url: `${api}/restaurant`, methods:['GET','OPTIONS']},
            {url: `${api}/sales/`, methods:['GET','OPTIONS']},
            {url: /\/api\/v1\/home(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/public\/uploads(.*)/, methods:['GET','OPTIONS']},
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/user/login`,
            `${api}/customer/register`,
            `${api}/sales/register`,
            `${api}/typemenu`

            
            ]
    });
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;