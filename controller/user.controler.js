var db = require('../model');
let user = db.user;


exports.findAll = (req ,res) =>{
    user.findAll().then(
        (data)=>{
            res.send({status:200,result:data})
        }
    ).catch((err)=>{
        res.send({status:500,err:err});
    });
}


  