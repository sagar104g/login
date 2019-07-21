const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const login = require('./routes/login');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/login',login);

app.listen(3000,function(err){
    console.log("listining on port 3000")
})