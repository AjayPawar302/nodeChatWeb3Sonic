let express = require('express');
let route = express.Router();
let user_controler = require('../controller/user.controler');


route.get('/',(req,res)=>{
    user_controler.findAll(req,res)
})

route.get('/login',(req,res)=>{
    user_controler.findByEmail(req,res)
})

route.post('/add',(req,res)=>{
    user_controler.addUser(req,res);
})

module.exports = route;