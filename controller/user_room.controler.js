var db = require('../model');
const { QueryTypes } = require('sequelize');
let user_room = db.rooms;
let message_controler = require('./message.controler');
let userTable = db.user;

exports.userAvailableRoom = async (req, res) => {
    let user = await db.sequelize.query('select * from user_rooms where sender_id IN(:sender_id) and receiver_id IN(:receiver_id)', {
        replacements: { sender_id: [req.body.sender_id, req.body.receiver_id], receiver_id: [req.body.sender_id, req.body.receiver_id] },
        type: QueryTypes.SELECT,
    });
    if (user.length > 0) {
        res.status(200).send({
            room_id: user[0].id,
    })
    }
    else {

        isNewRecord = await createRoom(req.body.sender_id, req.body.receiver_id);
       
        if (isNewRecord) {
            let newAddedRoomMessageList = await db.sequelize.query('select * from user_rooms where sender_id IN(:sender_id) and receiver_id IN(:receiver_id)', {
                replacements: { sender_id: [req.body.sender_id, req.body.receiver_id], receiver_id: [req.body.sender_id, req.body.receiver_id] },
                type: QueryTypes.SELECT,
            });
            res.status(200).send({
                        room_id: newAddedRoomMessageList[0].id,
                })
          
        }else{
            res.status(400).send({
                message:'filed to create room'
            })
        }
    }

}

async function createRoom(sender_id, receiver_id) {
    await user_room.create({ sender_id: sender_id, receiver_id: receiver_id }).then((result) => {
        return result;
    }).catch((err) => {
        console.log(err);
    })

}