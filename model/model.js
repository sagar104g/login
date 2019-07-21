var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: String,
    userName: String
});
var Token = mongoose.model('Token', tokenSchema);

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    userName: String,
    password: String
});
var User = mongoose.model('User', userSchema);

module.exports = {
    User : User,
    Token : Token
}