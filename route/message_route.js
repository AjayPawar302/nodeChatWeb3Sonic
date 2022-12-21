let express = require('express');
let route = express.Router();
let db = require('../model');
let message = db.message;

let message_controler = require('../controller/message.controler');



function addMessage(body){
    message.create({message:body.message,receiver_id:0,sender_id:body.id,room_id:1,time:body.time}).then((data)=>{
    },
    (err)=>{
        console.log("==============>",err);
    }
    )
}

route.get('',(req,res)=>{
    message_controler.messageList(req,res);
});

module.exports = {route ,addMessage};
