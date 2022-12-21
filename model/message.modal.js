
module.exports = (sequelize,dataTypes) =>{
    const message = sequelize.define('message',{
        id :{
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        message:{
            type:dataTypes.STRING
        },
        receiver_id:{
            type :dataTypes.INTEGER,
            // references : {
            //     model : 'users',
            //     key : 'id'
            // }
        },
        sender_id :{
            type :dataTypes.INTEGER,
            references : {
                model : 'users',
                key : 'id'
            }
        },
        room_id :{
            type :dataTypes.INTEGER,
            references : {
                model : 'user_rooms',
                key : 'id'
            }
        },
        time:{
            type:dataTypes.DATE
        }
    },{
        timestamps :false
    });

    return message;
}