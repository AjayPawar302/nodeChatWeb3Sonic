var db = require('../model');
var message = db.message;


exports.create = (req,res)=>{
    message.create(req.body).then(
        (data)=>{
            res.send({status:200,message : 'addedd successfully.'})
        }
    )
}   

exports.messageList = (req,res) =>{
    message.findAll({
        where :{
            room_id :1
        }
    }).then(
        (data)=>{
            res.send({status:200,result:data})
        }
    ).catch((err)=>{
        res.send({status:500,err:err});
    });
}

exports.messageListByRoomId = async (room_id) =>{
 let mesage = await message.findAll({
        where :{
            room_id :room_id
        }
    });

    return mesage;
}

exports.storeMessage = async (body)=>{
    await message.create({
        message:body.message,
        sender_id:body.sender_id,
        receiver_id:body.receiver_id,
        room_id:body.room_id
    }).then((data)=>{
        if(data){
          return data;
        }
    }).catch((err)=>{
        console.log(err);
    })
}