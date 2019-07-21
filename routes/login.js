var express = require('express');
var router = express.Router();
var util = require('../utility/util')
var fs = require('fs');
var model = require('../model/model');
var path = require('path')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')

router.get('/',function(req, res){
    var body = req.body;
    let username = body.hasOwnProperty('username') ? body['username'] : null ;
    let password = body.hasOwnProperty('password') ? body['password'] : null ;
    if(username != null && password != null){
        let secret = fs.readFileSync(path.join(__dirname, '../keys/privateKey.pem'));
        let passwordSecret = fs.readFileSync(path.join(__dirname, '../keys/passwordEnc.txt'));
        const hash = crypto.createHmac('sha256', passwordSecret).update(password).digest('hex');
        util.findOne(model.User,{"userName" : username,"password" : hash},function(err,response){
            if(err){
                res.status(503).send("internal server error")
            }else{
                if(response == null){
                    res.status(400).send("no user found ")
                }else{
                    jwt.sign({ userName: username }, secret, { algorithm: 'RS256' }, function(err, token) {
                        if(err){
                            console.log(err)
                            res.status(500).send(err);
                        }else{
                            var tokenModel = new model.Token({
                                _id: new mongoose.Types.ObjectId(),
                                userName: username,
                                token: token
                            });
                            util.insertOne(model.Token,tokenModel,function(err,sucess){
                                if(err){
                                    res.status(502).send(err);
                                }else{
                                    res.header("sessionToken", token)
                                    res.status(200).send("user loggedin sucessfully");
                                }
                            })
                        }
                      });
                }
            }
        })
    }else{
        res.status(400).send("data is insufficent")
    }
})

module.exports = router;