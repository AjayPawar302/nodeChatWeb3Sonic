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

        const [results, metadata] = await db.sequelize.query(
            "SELECT * FROM users JOIN customer_profiles ON customer_profiles.user_id = users.id where users.id= :user_id"
            ,
            {
                replacements: { user_id: [req.body.receiver_id] },
                type: QueryTypes.SELECT,
            });
        console.log(JSON.stringify(results.profile_image, null, 2));
        let userInfo = await db.user.findOne({ where: { id: req.body.receiver_id } })
        res.status(200).send({
            room_id: user[0].id,
            ...userInfo.dataValues,
            image_path: results.profile_image
        })
    }
    else {

        isNewRecord = await createRoom(req.body.sender_id, req.body.receiver_id);

        if (isNewRecord) {
            let newAddedRoomMessageList = await db.sequelize.query('select * from user_rooms where sender_id IN(:sender_id) and receiver_id IN(:receiver_id)', {
                replacements: { sender_id: [req.body.sender_id, req.body.receiver_id], receiver_id: [req.body.sender_id, req.body.receiver_id] },
                type: QueryTypes.SELECT,
            });

            const [results, metadata] = await db.sequelize.query(
                "SELECT * FROM users JOIN customer_profiles ON customer_profiles.user_id = users.id where users.id= :user_id"
                ,
                {
                    replacements: { user_id: [req.body.receiver_id] },
                    type: QueryTypes.SELECT,
                });
            let userInfo = await db.user.findOne({ where: { id: req.body.receiver_id } })
            res.status(200).send({
                room_id: newAddedRoomMessageList[0].id,
                ...userInfo.dataValues,
                image_path: results.profile_image
            })

        } else {
            res.status(400).send({
                message: 'filed to create room'
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