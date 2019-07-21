const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB');

var insertOne = function(model, data, cb){
    model.create(data,function(err, res){
        if(err){
            cb(err,null);
        }else{
            cb(null,res)
        }
    })
}

var findOne = function(model, data, cb){
    model.findOne(data,function(err, res){
        if(err){
            cb(err,null);
        }else{
            cb(null,res)
        }
    })
}

module.exports = {
    insertOne : insertOne,
    findOne : findOne
}