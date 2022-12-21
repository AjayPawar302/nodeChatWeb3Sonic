module.exports = (sequelize , dataTypes)=>{
    let room = sequelize.define('user_room',{
        id :{
            type:dataTypes.INTEGER,
            primaryKey : true,
            autoincrement: true
        },
        sender_id:{
            type:dataTypes.INTEGER
        },
        receiver_id:{
            type:dataTypes.INTEGER
        }
    },{
        timestamps: false
    });

    return room;
}