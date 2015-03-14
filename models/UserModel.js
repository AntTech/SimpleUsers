/**
 * Created by yangzx on 3/13/2015.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    index: Number,
    UserId: String,
    UserName: String,
    PassWord: String,
    Age: Number,
    Sex: String,
    Phone: String,
    Email: String,
    Address:String
});
//mongodb中的collection 名字是 userinfo
exports.userModel = mongoose.model('userinfo', userSchema);