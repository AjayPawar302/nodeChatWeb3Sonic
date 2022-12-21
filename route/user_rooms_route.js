let express = require('express');
let route = express.Router();
let userRoomControler = require('../controller/user_room.controler');


route.post('',(req,res)=>{
    userRoomControler.userAvailableRoom(req,res);
})


module.exports = route;
