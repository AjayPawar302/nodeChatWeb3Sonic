module.exports = (sequelize,Sequelize) => {
    const user = sequelize.define('user',{
        id :{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoincrement: true
        },
        name:{
            type :Sequelize.STRING
        },
        email:{
            type :Sequelize.STRING
        },
        password:{
            type :Sequelize.STRING
        }
    },{
        timestamps :false
    });

    return user;
}